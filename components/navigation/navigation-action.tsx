'use client'

import { Plus } from 'lucide-react'
import { ActionTooltip } from '@/components/action-tooltip'
import { useModal } from '@/hooks/use-modal-store'

export const NavigationAction = () => {
    const { onOpen } = useModal()

    return (
        <div>
            <ActionTooltip side='right' align='center' label='add a several'>
                <div className='aspect-square'>
                    <button
                        onClick={() => onOpen('createOrganization')}
                        className='group bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'
                    >
                        <Plus className='group-hover:text-white transition text-emerald-500' size={25} />
                    </button>
                </div>
            </ActionTooltip>
        </div>
    )
}
