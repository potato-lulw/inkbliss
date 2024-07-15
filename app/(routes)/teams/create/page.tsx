"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from 'convex/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RiTeamFill } from "react-icons/ri";
import { toast } from 'sonner';

const CreateTeamPage = () => {
    const { theme } = useTheme();
    const [logoSrc, setLogoSrc] = useState('/images/inkbliss-logo.png');
    const { user } : any = useKindeBrowserClient();

    const [teamName, setTeamName] = useState(`${user?.given_name ?? "User"}'s team`);
    const createTeam = useMutation(api.teams.createTeam);

    const router = useRouter();
    useEffect(() => {
        setLogoSrc(`/images/inkbliss-logo${theme === "dark" ? "-light" : ""}.png`);
    }, [theme]);

    useEffect(() => {
        setTeamName(`${user?.given_name ?? "User"}'s team`);

    }, [user])

    // useEffect(() => {
    //     createNewTeam();
    // }, [user, teamName])

    const createNewTeam = () => {
        createTeam({
            teamName: teamName,
            createdBy: user?.email,
        }).then((res) => {
            console.log(res);
            toast.success('Team created successfully!');
            
            setTeamName(`${user?.given_name?? "User"}'s team`);
            router.push("/dashboard");
        }).catch((error) => {
            alert(`Failed to create team: ${error.message}`);
        });
    }

    return (
        <div className='p-12 sm:p-24 flex flex-col justify-center gap-16 h-screen mt-[-5%]'>
            <div className='text-2xl sm:text-4xl flex gap-2 items-center font-bold'>
                <Image src={logoSrc} alt='logo' width={50} height={50} className='sm:w-12 w-8' />
                <span>InkBliss</span>
            </div>
            <div className='flex flex-col gap-3 text-center items-center'>
                <span className='bg-muted w-fit px-2 py-1 flex gap-2 items-center rounded-md'>
                    <RiTeamFill />Team Name
                </span>
                <span className='text-3xl font-semibold'>What Is Your Team Called?</span>
                <span className='text-muted-foreground'>Worry not! It can be changed later</span>
            </div>
            <div className='relative sm:w-[60%] md:w-[50%] self-center w-full'>
                <span className='text-muted-foreground absolute top-[-2rem] left-0'>Team name</span>
                <Input 
                    placeholder='Team Name'
                    className='relative w-full'
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />
            </div>
            <div className='flex justify-center'>
                <Button className='w-full sm:w-[60%] md:w-[50%] lg:w-[30%]' disabled={!(teamName) && teamName.length == 0} onClick={() => createNewTeam()}>Create Team</Button>
            </div>
        </div>
    );
};

export default CreateTeamPage;
