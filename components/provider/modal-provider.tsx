'use client'

import { useEffect, useState } from 'react'
import { CreateOrgModal } from '@/components/modals/create-org-modal'
import { InviteMembersModal } from '@/components/modals/invite-members-modal'
import { RenameBoardModal } from '@/components/modals/rename-board-modal'

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
            <InviteMembersModal />
            <RenameBoardModal />
        </>
    )
}
