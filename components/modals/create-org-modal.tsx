'use client'

import { CreateOrganization } from '@clerk/nextjs'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import { useModal } from '@/hooks/use-modal-store'

export const CreateOrgModal = () => {
    const { isOpen, onClose, type } = useModal()

    const isModalOpen = isOpen && type === 'createOrganization'

    const handleClose = () => {
        onClose()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='p-0 bg-transparent border-none max-w-[430px]'>
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    )
}
