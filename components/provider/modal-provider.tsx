'use client'

import { useEffect, useState } from 'react'
import { CreateOrgModal } from '@/components/modals/create-org-modal'

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <CreateOrgModal />
        </>
    )
}
