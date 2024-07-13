import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section >
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:py-44  lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Magic of limitless creativity
                        <strong className="font-extrabold text-border bg-primary my-2 rounded-md inline-block p-2 w-fit mx-auto"> In the World of InkBliss </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Unleash your creativity with InkBliss. Transform ideas into reality effortlessly.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            className="  font-medium shadow focus:outline-none focus:ring sm:w-auto"
                            href="#"
                        >
                            <Button className='px-14 w-full sm:w-auto py-8 text-base'>

                            Get Started
                            </Button>
                        </Link>

                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero