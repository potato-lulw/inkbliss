"use client"
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import Sidebar from './components/Sidebar';
import { FilesContextProvider } from '@/app/_context/FilesListContext';

const DashboardLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    const router = useRouter();
    const convex = useConvex();
    const { user }: any = useKindeBrowserClient();

    const checkTeam = useCallback(async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.email });
        // console.log(result);
        if (!result?.length) {
            router.push("teams/create")
        }
    }, [convex, router, user])
    useEffect(() => {
        if (user) {
            checkTeam()
        }
    }, [user, checkTeam])

    return (
        <div className='flex h-screen'>

                <div className='fixed h-screen w-72'>
                    <Sidebar />
                </div>
                <div className='flex-1 ml-72'>
                    {children}
                </div>
            
        </div>
    )
}

export default DashboardLayout