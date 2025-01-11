'use client'

import React from 'react'
import { useOrganization } from '@clerk/nextjs'

import { Empty } from '@/components/empty'
import { ServerOrgList } from '@/components/server/server-org-list'

interface DashboardPageProps {
    searchParams: {
        search?: string
        favorites?: string
    }
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
    const query: any = React.use(searchParams as any)
    const { organization } = useOrganization()

    return (
        <main className='bg-slate-100 flex-1 h-[calc(100%-80px)] p-6'>
            {!organization ? (
                <Empty type='orgEmpty' title='Welcome to Euka' imgUrl='/file.svg' />
            ) : (
                <>
                    <ServerOrgList orgId={organization.id} query={query} />
                </>
            )}
        </main>
    )
}

export default DashboardPage
