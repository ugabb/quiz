"use client"

import { useAuthState } from '@/lib/authState'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathName = usePathname()
    const { currentUser, logout } = useAuthState()

    return (
        <>
            {(pathName !== '/login' && pathName !== '/sign-up') && (
                <header className="flex bg-zinc-100 items-center justify-center">
                    
                    <div
                        className='w-full max-w-screen-md'
                    >
                        <div className='flex justify-between'>
                            <Image src="/cnvv-logo.png" alt="Logo CNVV" width={100} height={100} className='m-4' />
                            <Image src="/penatrans.png" alt="Logo PNATRANS" width={100} height={100} className='m-4' />
                            {currentUser && (
                                <details className="dropdown dropdown-end">
                                    <summary className="btn m-1">
                                        <div className="avatar placeholder gap-2 items-center">
                                            <div className="bg-blue-500 text-neutral-content w-8 rounded-full">
                                                <span className="text-xs">{currentUser?.name[0].toUpperCase()}</span>
                                            </div>
                                            <span className='text-sm text-zinc-800 font-semibold'>{currentUser?.name}</span>
                                        </div>
                                    </summary>
                                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li>
                                            <span className='text-sm font-semibold' onClick={logout}>Logout</span>
                                        </li>
                                    </ul>
                                </details>
                            )}
                        </div>
                    </div>
                </header>
            )}

        </>
    )
}

export default Header;
