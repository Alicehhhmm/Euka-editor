'use client'

import { OrganizationProfile } from '@clerk/nextjs'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import { useModal } from '@/hooks/use-modal-store'

export const InviteMembersModal = () => {
    const { isOpen, onClose, type } = useModal()

    console.log('InviteMembersModal', type, isOpen)

    const isModalOpen = isOpen && type === 'invite'

    const handleClose = () => {
        onClose()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='p-0 bg-transparent border-none min-h-[30rem] max-w-[880px]'>
                <OrganizationProfile />
            </DialogContent>
        </Dialog>
    )
}
