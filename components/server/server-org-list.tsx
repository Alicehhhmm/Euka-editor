'use client'

import { useQuery } from 'convex/react'
import { useOrganization } from '@clerk/nextjs'
import { toast } from 'sonner'

import { useApiMutation } from '@/hooks/use-api-mutation'
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

    // use convex db
    const { mutate, pending } = useApiMutation(api.board.create)

    const data = useQuery(api.boards.get, { orgId })

    const handleCreated = () => {
        if (!organization) return

        mutate({
            orgId: organization.id,
            title: 'Untitled',
        })
            .then(() => {
                toast.success('Board created successfully!')
                // TODO: Redirect to board/{id}
            })
            .catch(e => {
                toast.error('Failed to create board: ' + e.message)
            })
    }

    if (data === undefined) {
        // TODO: Update loading animations render
        return <div className='w-full h-full'>Logading....</div>
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
                    disabled={pending}
                    handle={handleCreated}
                />
            </div>
        )
    }

    return (
        <div>
            <h1>serverOrgList</h1>
            {JSON.stringify(data)}
        </div>
    )
}
