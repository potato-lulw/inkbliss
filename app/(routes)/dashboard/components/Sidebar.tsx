"use client"
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { api } from '@/convex/_generated/api';
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { Grid2X2Icon, LogOutIcon, SettingsIcon, UsersIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import SidebarBottom, { SidebarBottomProps } from './SidebarBottom';
import { PopoverClose } from '@radix-ui/react-popover';
import { toast } from 'sonner';
import { useFilesContext } from '@/app/_context/FilesListContext';

export interface Team {
    createdBy: string,
    teamName: string,
    _id: string,
}
export interface File {
    _id: string,
    archived: boolean,
    createdBy: string,
    document: string,
    fileName: string,
    teamId: string,
    whiteboard: string,
}

const LOGO_LIGHT = "/images/inkbliss-logo.png";
const LOGO_DARK = "/images/inkbliss-logo-light.png";
const USER_PLACEHOLDER = "/images/user-placeholder.png";

const Sidebar = () => {
    const { theme } = useTheme();
    const convex = useConvex();
    const [logo, setLogo] = useState(LOGO_LIGHT);
    const { user }: { user: any } = useKindeBrowserClient();
    const [fullName, setFullName] = useState("Loading...");
    const [email, setEmail] = useState("Loading...");
    const [imageSrc, setImageSrc] = useState("");
    const [teamList, setTeamList] = useState<Team[]>();
    const [selectedTeam, setSelectedTeam] = useState<Team>({ createdBy: "Loading...", teamName: "Loading...", _id: "Loading" });
    const createFile = useMutation(api.files.createFile);
    const [files, setFiles] = useState<File[]>();
    const [progress, setProgress] = useState<number>(0);
    const {fileList, setFileList} = useFilesContext();

    const getTeams = useCallback(async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.email ?? "" });
        if (result.length > 0) {
            setTeamList(result);
            setSelectedTeam(result[0]);
        }
    }, [convex, user?.email]);

    const getFiles = useCallback(async () => {
        const result = await convex.query(api.files.getFiles, { teamId: selectedTeam?._id });
        if (result && result.length > 0) {
            setFiles(result);
            setFileList(result);
            setProgress(result.length);
        }else{
            setFileList([]);
            setProgress(0);
        }
    }, [convex, selectedTeam]);



    useEffect(() => {
        if (user) {
            setFullName(`${user.given_name} ${user.family_name}`);
            setEmail(user.email ?? "");
            setImageSrc(user.picture ?? USER_PLACEHOLDER);
            getTeams();
        }
    }, [getTeams, user]);

    useEffect(() => {
        if (selectedTeam) getFiles();
    }, [selectedTeam, getFiles]);

    useEffect(() => {
        setLogo(theme === "light" ? LOGO_LIGHT : LOGO_DARK);
    }, [theme]);

    const handleFileCreate: SidebarBottomProps['onFileCreate'] = (fileName) => {
        createFile({
            fileName,
            teamId: selectedTeam?._id,
            createdBy: user?.email,
            archived: false,
            document: "",
            whiteboard: "",
        })
            .then(() => {
                toast.success("New File Created Successfully")
                getFiles();
            })
            .catch(err => {
                console.error(`Failed to create file: ${err.message}`);
                toast.error("Failed to Create File");
            });
    };

    const userImageLoader = useMemo(() => ({ src }: { src: string }) => imageSrc, [imageSrc]);

    return (
        <div className='h-screen w-72 border-r-[1px] p-6 py-12 bg-background flex flex-col gap-8'>
            <Popover>
                <PopoverTrigger>
                    <div className='text-[17px] items-center flex gap-2 font-bold hover:bg-accent p-2 transition hover:cursor-pointer rounded-md w-full mx-auto'>
                        <Image src={logo} alt='logo' width={20} height={30}  />
                        <span>{selectedTeam?.teamName}</span>
                        <FaAngleDown />
                    </div>
                </PopoverTrigger>
                <PopoverContent className='ml-6 gap-2 text-sm'>
                    <PopoverClose>
                        {teamList?.map((team) => (
                            <h2
                                className={`text-base hover:bg-accent rounded-md px-2 py-1 font-medium cursor-pointer my-1 text-left ${selectedTeam?._id === team._id ? "bg-accent" : ""}`}
                                onClick={() => setSelectedTeam(team)}
                                key={team._id}
                            >
                                {team.teamName}
                            </h2>
                        ))}
                    </PopoverClose>
                    <Separator className='m-2' />
                    <div className='space-y-1'>
                        <Link href={"/teams/create"}>
                            <div className='flex gap-2 hover:bg-accent p-2 rounded-md'><UsersIcon size={16} />Join or Create Team</div>
                        </Link>
                        <div className='flex gap-2 hover:bg-accent p-2 rounded-md'><SettingsIcon size={16} />Settings</div>
                        <div className='flex gap-2 hover:bg-accent p-2 rounded-md'><LogOutIcon size={16} /><LogoutLink>Logout</LogoutLink></div>
                    </div>
                    <Separator className='my-2' />
                    <div className='flex items-center p-2 gap-2'>
                        <Image loader={userImageLoader} src={imageSrc} width={35} height={35} alt='user-image' className='rounded-full' />
                        <div className='text-base'>
                            <p>{fullName}</p>
                            <p className='text-muted-foreground'>{email}</p>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <Button className='flex gap-4 justify-start font-semibold text-base' variant={"secondary"}><Grid2X2Icon /> All Files</Button>
            <div className='flex-1'></div>
            <SidebarBottom onFileCreate={handleFileCreate} progress={progress} />
        </div>
    );
};

export default Sidebar;
