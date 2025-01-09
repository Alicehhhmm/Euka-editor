'use client'

import { useConvexAuth } from 'convex/react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function Home() {
    const { isLoading, isAuthenticated } = useConvexAuth()
    const tasks = useQuery(api.tasks.get)

    return (
        <div className=''>
            <h1>hello world</h1>
            <div className='App'>{isAuthenticated ? 'Logged in' : 'Logged out or still loading'}</div>
            {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
        </div>
    )
}
