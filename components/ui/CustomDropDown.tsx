import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Archive, Delete, Edit, MoreHorizontal } from 'lucide-react';

const CustomDropDown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none'><MoreHorizontal size={20} /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='gap-2'><Archive className='h-4 w-4' /> Archive</DropdownMenuItem>
                <DropdownMenuItem className='gap-2'><Delete className='h-4 w-4' /> Delete</DropdownMenuItem>
                <DropdownMenuItem className='gap-2'><Edit className='h-4 w-4' /> Edit</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CustomDropDown