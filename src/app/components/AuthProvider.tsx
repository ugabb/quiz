"use client"

import { useAuthState } from '@/lib/authState'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useAuthState()
    const router = useRouter()
    const pathName = usePathname()

    if (!currentUser && pathName === "/dashboard") {
        router.push('/login')
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthProvider