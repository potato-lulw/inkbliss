"use client"
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useTheme } from 'next-themes';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const LOGO_LIGHT = "/images/inkbliss-logo.png";
const LOGO_DARK = "/images/inkbliss-logo-light.png";
const USER_PLACEHOLDER = "/images/user-placeholder.png";

const WorkSpaceHeader = (props: any) => {
    const [logo, setLogo] = useState(LOGO_LIGHT);
    const { theme } = useTheme();
   
    
    useEffect(() => {
        setLogo(theme === "light" ? LOGO_LIGHT : LOGO_DARK);
    }, [theme]);
  return (
    <div className='w-full'>
        <div className='flex gap-2'>
        <Image src={logo} alt='logo' width={20} height={30}  />
        <h2 className='text-2xl text-primary'>{props.fileName}</h2>
        </div>
    </div>
  )
}

export default WorkSpaceHeader