import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { DialogClose } from '@radix-ui/react-dialog'

export interface SidebarBottomProps {
    onFileCreate: (fileName: string) => void;
}

const SidebarBottom: React.FC<SidebarBottomProps> = ({ onFileCreate }) => {

    const [fileName, setFileName] = useState("");

    const menuList = [
        {
            id: "1",
            name: "Getting Started",
            icon: Flag,
            path: "",
        },
        {
            id: "2",
            name: "Github",
            icon: Github,
            path: "",
        },
        {
            id: "3",
            name: "Archive",
            icon: Archive,
            path: "",
        }
    ]
    return (
        <div className='flex flex-col gap-4'>
            <ul className='flex flex-col gap-2'>
                {menuList.map((menu, index) => (
                    <li key={menu.id} className='flex gap-2 items-center hover:bg-secondary px-2 py-1 cursor-pointer'>
                        <menu.icon className='w-5 h-5 text-primary' />
                        <span>{menu.name}</span>
                    </li>
                ))}
            </ul>


            {/* dialog */}

            <Dialog>
                <DialogTrigger className='w-full' asChild>
                    <Button className='w-full flex justify-between' variant={'outline'} >
                        New File
                        <FaAngleDown />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a new file</DialogTitle>
                        <DialogDescription>
                            <Input placeholder='File name' className='mt-5' value={fileName} onChange={(e) => setFileName(e.target.value)} />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button variant={"outline"} className='w-full' disabled={fileName === ""} onClick={() => onFileCreate(fileName)}>
                                Save
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* progress */}
            <div className='flex flex-col gap-1 justify-self-end'>
                <Progress value={50} />
                <span className='text-xs'>1 out of 5 files used.</span>
                <span className='text-sm'><span className='underline'>Upgrade</span> for unlimited file access</span>
            </div>
        </div>
    )
}

export default SidebarBottom