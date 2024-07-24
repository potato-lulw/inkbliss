"use client"

import { Info, Save, Share } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import CustomDropDown from '@/components/ui/CustomDropDown';
import { Button } from '@/components/ui/button';
import { FaRegCommentAlt } from 'react-icons/fa';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const LOGO_LIGHT = "/images/inkbliss-logo.png";
const LOGO_DARK = "/images/inkbliss-logo-light.png";
const USER_PLACEHOLDER = "/images/user-placeholder.png";

const WorkSpaceHeader = (props: any) => {
  const [logo, setLogo] = useState(LOGO_LIGHT);
  const { theme } = useTheme();
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    setLogo(theme === "light" ? LOGO_LIGHT : LOGO_DARK);
  }, [theme]);

  // Example file creation and modification times

    const fileCreationTime = new Date(props.file?._creationTime); // Replace with actual file creation time
    const fileModificationTime = new Date(props.file?._creationTime); // Replace with actual file modification time
  

  return (
    <div className='w-full px-4 py-2 border-b border-border justify-between flex'>
      <div className='flex gap-2 items-center'>
        <Image src={logo} alt='logo' width={20} height={10} className='w-5 h-5' />
        {props.file && <h2 className='text-lg font-medium text-primary'>{props.file.fileName}</h2>}
        
        <CustomDropDown />
      </div>

      <div>
        {/* You can add other elements here */}
      </div>

      <div className='flex gap-3 items-center'>

        <Button size={'sm'} className='gap-2 items-center flex ' onClick={props.onSave}>Save <Save className='' size={18} /></Button>
        <Button variant={"secondary"} size={'sm'} className='gap-2 items-center flex '>Share <Share className='' size={18} /></Button>
        <FaRegCommentAlt />

        <HoverCard>
          <HoverCardTrigger><Info size={18}/></HoverCardTrigger>
          <HoverCardContent>
            <div className='flex flex-col gap-2 text-sm'>
              <div className='grid-cols-2 grid'>
                <p className='col-span-1'>Created</p>
                {props.file && <p className='col-span-1'>{moment(fileCreationTime).fromNow()}</p>}
                
              </div>
              <div className='grid-cols-2 grid'>
                <p className='col-span-1'>Last Modified</p>
                {props.file && <p className='col-span-1'>{moment(fileModificationTime).fromNow()}</p>}
              </div>
              <div className='grid-cols-2 grid'>
                <p className='col-span-1'>Author</p>
                <div className='col-span-1 gap-2 flex'>

                <Image src={user?.picture || USER_PLACEHOLDER} alt='author' width={18} height={18} className='rounded-full' />
                <p>{user?.given_name}</p>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}

export default WorkSpaceHeader
