'use client'

import { Empty } from '@/components/empty'

const DashboardPage = () => {
    return (
        <main className='bg-slate-100 flex-1 h-[calc(100%-80px)] p-6'>
            <h1>Dashboard Page</h1>
            <Empty type='orgEmpty' title='Welcome to Euka' imgUrl='/file.svg' />
        </main>
    )
}

export default DashboardPage
