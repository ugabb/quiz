"use client"

import { useAuthState } from '@/lib/authState'
import { useRouter } from 'next/navigation'
import React from 'react'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useAuthState()
    const router = useRouter()

    if (!currentUser) {
        router.push('/login')
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthProvider