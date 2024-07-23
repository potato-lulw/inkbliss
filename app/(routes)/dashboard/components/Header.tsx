import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Search, Send } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'

const Header = () => {

    const [search, setSearch] = useState<string>("");
    const { user }: { user: any } = useKindeBrowserClient();

    const tabs = [
        {
            name: "All",
            link: "/all"
        },
        {
            name: "Created By",
            link: "/created-by"
        },
        {
            name: "Recent",
            link: "/recent"
        },
        {
            name: "Folder",
            link: "/folder"
        },
        {
            name: "Unsorted",
            link: "/unsorted"
        }
    ]
    return (
        <header className='p-8 w-full flex flex-row lg:justify-between justify-end'>
            <div className='lg:flex items-center hidden '>
                <ul className='flex space-x-4 items-center'>
                    {
                        tabs.map((tab, index) => (
                            <li key={index} className={`flex items-center gap-2 text-sm `}>
                                <a href={tab.link}>{tab.name}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className='relative flex items-center gap-2'>

                <Search className='absolute left-3' size={20} />
                <Input type="text" placeholder='Search' className='w-40  pl-10' value={search} onChange={(e) => setSearch(e.target.value)}/>
                {
                    user && <Image src={user?.picture || ""} alt='user' width={40} height={40} className='rounded-full' />
                }
                
                <Button className='flex gap-2'><Send/> Invite</Button>
            </div>
            
        </header>
    )
}

export default Header