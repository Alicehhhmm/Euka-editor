'use client'

import { useState, useEffect, FormEventHandler } from 'react'

import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { api } from '@/convex/_generated/api'
import { useModal } from '@/hooks/use-modal-store'
import { useApiMutation } from '@/hooks/use-api-mutation'

export const RenameBoardModal = () => {
    const { mutate, pending } = useApiMutation(api.board.update)

    const { isOpen, onClose, type, data } = useModal()

    const isModalOpen = isOpen && type === 'renameBoard'

    const { id, title } = data
    const [titles, setTitles] = useState(title)

    useEffect(() => {
        setTitles(title)
    }, [isModalOpen, title])

    const onSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()

        mutate({
            id,
            title: titles,
        })
            .then(() => {
                toast.success('Board renamed successfully!')
                onClose()
            })
            .catch(() => {
                toast.error('Failed to rename board!')
                onClose()
            })
    }

    const handleClose = () => {
        onClose()
        console.log('X')
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className=''>
                <DialogHeader>
                    <DialogTitle>Edit board title</DialogTitle>
                    <DialogDescription>Enter a new title for this board.</DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-3'>
                    <Input
                        value={titles}
                        required
                        disabled={pending}
                        maxLength={60}
                        onChange={e => setTitles(e.target.value)}
                        placeholder='Board title'
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button' variant='outline'>
                                Close
                            </Button>
                        </DialogClose>
                        <Button type='submit' disabled={pending}>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
