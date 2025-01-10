'use client'

import Image from 'next/image'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { ActionTooltip } from '@/components/action-tooltip'

interface NavigationItemProps {
    id: string
    name: string
    imageUrl: string
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
    const { organization } = useOrganization()
    const { setActive } = useOrganizationList()

    const isActive = organization?.id === id

    console.log('onClick isActive', isActive)

    const onClick = () => {
        if (!isActive) return null

        if (setActive) {
            console.log('onClick setActive')
            setActive({ organization: id })
        }
    }

    return (
        <ActionTooltip side='right' align='center' label={name}>
            <button onClick={onClick} className='group relative flex items-center'>
                <div
                    className={cn(
                        `absolute left-0 bg-primary rounded-r-full transition-all w-[4px]`,
                        !isActive && `group-hover:h-[28px]`,
                        isActive ? 'h-[28px]' : 'h-[10px]'
                    )}
                />
                <div
                    className={cn(
                        'relative group flex mx-2 h-[28px] w-[28px] rounded-[14px] group-hover:rounded-[16px] transition-all overflow-hidden',
                        isActive && 'bg-primary/10 text-primary rounded-[16px]'
                    )}
                >
                    <Image
                        fill
                        src={imageUrl}
                        alt={name}
                        className={cn('rounded-md cursor-pointer opacity-75 hover:opacity-100 transition', isActive && 'opacity-100')}
                    />
                </div>
            </button>
        </ActionTooltip>
    )
}
