"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ToggleTheme } from './ToggleTheme'
import { useTheme } from 'next-themes'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'

const Header = () => {
    const { theme } = useTheme();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return (
        <header>
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link className=" flex gap-2 items-center  " href="/">
                            <span className="sr-only">Home</span>
                            {isHydrated && (
                                <>
                                    {theme === "light" && <Image src="/images/inkbliss-logo.png" alt='logo' width={20} height={20} />}
                                    {theme === "dark" && <Image src="/images/inkbliss-logo-light.png" alt='logo' width={20} height={20} />}
                                </>
                            )}
                            <span className="font-bold text-2xl text-primary sm:block hidden">InkBliss</span>
                        </Link>
                    </div>

                    {/* <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <a className="text-primary transition hover:text-primary/75" href="#"> About </a>
                                </li>
                                <li>
                                    <a className="text-primary transition hover:text-primary/75" href="#"> Careers </a>
                                </li>
                                <li>
                                    <a className="text-primary transition hover:text-primary/75" href="#"> History </a>
                                </li>
                                <li>
                                    <a className="text-primary transition hover:text-primary/75" href="#"> Services </a>
                                </li>
                                <li>
                                    <a className="text-primary transition hover:text-primary/75" href="#"> Projects </a>
                                </li>
                                <li>
                                    <a className="text-primary transition hover:text-primary/75" href="#"> Blog </a>
                                </li>
                            </ul>
                        </nav>
                    </div> */}

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <Button variant={"ghost"} className=' sm:flex'>
                                <LoginLink>Login</LoginLink></Button>
                            <Button variant={"default"} className='hidden sm:flex'><RegisterLink>Register</RegisterLink></Button>
                            <ToggleTheme />
                        </div>

                        <div className="block md:hidden ">
                            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header
