'use client'

import { useMutation } from 'convex/react'
import { useOrganization } from '@clerk/nextjs'

import { api } from '@/convex/_generated/api'
import { Empty } from '@/components/empty'

interface ServerOrgListProps {
    orgId: string
    query: {
        search?: string
        favorites?: string
    }
}

export const ServerOrgList = ({ orgId, query }: ServerOrgListProps) => {
    const { search, favorites } = query
    const { organization } = useOrganization()
    const createBoards = useMutation(api.boards.create)

    const data = []

    const handleCreated = () => {
        if (!organization) return

        createBoards({
            orgId: organization.id,
            title: 'Untitled',
        })
    }

    // TODO: update different status icons or images
    if (!data.length && search) {
        return (
            <div className='w-full h-full'>
                <Empty
                    type='defaultEmpty'
                    title='Search Organizations'
                    imgUrl='/file.svg'
                    description={`No organizations found for search query: ${search}`}
                />
            </div>
        )
    }

    if (!data.length && favorites) {
        return (
            <div className='w-full h-full'>
                <Empty
                    type='defaultEmpty'
                    title='favorites Organizations'
                    imgUrl='/file.svg'
                    description={`No organizations found for favorites`}
                />
            </div>
        )
    }

    if (!data.length) {
        return (
            <div className='w-full h-full'>
                <Empty
                    type='teamEmpty'
                    title='Organizations List'
                    imgUrl='/file.svg'
                    description={`No organizations found at all`}
                    btnTitle='Create Boards'
                    handle={handleCreated}
                />
            </div>
        )
    }

    return (
        <div>
            <h1>serverOrgList</h1>
        </div>
    )
}
