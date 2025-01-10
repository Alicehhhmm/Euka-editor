'use client'

import { UserButton } from '@clerk/nextjs'

export const NavigationBar = () => {
    return (
        <div className='bg-slate-500 flex items-center gap-x-4 p-5'>
            <div className='hidden lg:flex lg:flex-1'>
                {/* TODO: add Search */}
                <h1>search</h1>
            </div>
            <UserButton />
        </div>
    )
}
