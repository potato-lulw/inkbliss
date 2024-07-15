"use client"
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DashboardLayout = ({children,}: Readonly<{children: React.ReactNode;}>) => {
    const router = useRouter();
    const convex = useConvex();
    const {user}: any = useKindeBrowserClient();

    useEffect(() => {
        if(user) {
            checkTeam()
        }
    }, [user])

    const checkTeam = async () => {
        const result = await convex.query(api.teams.getTeam, {email: user?.email});
        console.log(result);
        if(!result?.length) {
            router.push("teams/create")
        }   
    }
    return (
        <div>{children}</div>
    )
}

export default DashboardLayout