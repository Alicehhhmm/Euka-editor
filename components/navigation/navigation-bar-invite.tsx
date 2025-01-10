'use client'

import { Plus } from 'lucide-react'
import { ActionTooltip } from '@/components/action-tooltip'
import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'

export const NavigationBarInvite = () => {
    const { onOpen } = useModal()

    return (
        <div>
            <ActionTooltip side='bottom' align='center' label='Invite members'>
                <Button variant='outline' onClick={() => onOpen('invite')} className=''>
                    <Plus className='h-4 w-4 mr-2' size={25} />
                    Invite members
                </Button>
            </ActionTooltip>
        </div>
    )
}
