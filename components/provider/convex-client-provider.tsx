'use client'

import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { Loading } from '@/components/loading'
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!

const convex = new ConvexReactClient(convexUrl)

interface ConvexClientProviderProps {
    children: React.ReactNode
}

export const ConvexClientProvider: React.FC<ConvexClientProviderProps> = ({ children }) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <Authenticated>{children}</Authenticated>
                <AuthLoading>
                    <Loading />
                </AuthLoading>
                <Unauthenticated>Unauthenticated..</Unauthenticated>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}
