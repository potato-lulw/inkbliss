"use client"
import { ToggleTheme } from '@/app/components/ToggleTheme'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react'
import React, { useEffect } from 'react'


const DashBoardPage = () => {
    const { user }: any = useKindeBrowserClient();
    const convex = useConvex();

    const createUser = useMutation(api.user.createUser);

    useEffect(() => {
        if (user) {
            checkUser()
        }
    }, [user])


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
    return (
        <div>
            <Button><LogoutLink>Log out</LogoutLink></Button>
            <ToggleTheme/>
        </div>
    )
}

export default DashBoardPage