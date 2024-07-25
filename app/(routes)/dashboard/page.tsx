"use client"

import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation } from 'convex/react'
import React, { useEffect } from 'react'
import Header from './components/Header'
import FileList from './components/FileList'


const DashBoardPage = () => {
    const { user }: any = useKindeBrowserClient();
    const convex = useConvex();

    const createUser = useMutation(api.user.createUser);

    useEffect(() => {
        const checkUser = async () => {
            const result = await convex.query(api.user.getUser, { email: user?.email });
            if (!result?.length) {
                createUser({
                    name: user.given_name,
                    email: user.email,
                    image: user.picture
                }).then((resp) => {
                    console.log(resp)
                })
            }
    
        }
        if (user) {
            checkUser()
        }
    }, [user, convex, createUser])


   
    return (
        <div>
            <Header/>
            <FileList/>
            
        </div>
    )
}

export default DashBoardPage