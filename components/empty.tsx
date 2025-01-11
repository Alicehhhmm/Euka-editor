import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { PackageOpen } from 'lucide-react'

import { useModal } from '@/hooks/use-modal-store'

type EmptyProps = {
    title?: string
    description?: string
    icon?: React.ReactNode
    imgUrl?: string
    type?: 'defaultEmpty' | 'orgEmpty'
}

export const Empty = ({
    title = 'No Data',
    description = 'There is no data to display.',
    icon = <PackageOpen size={64} />,
    imgUrl = '',
    type = 'defaultEmpty',
}: EmptyProps) => {
    const { onOpen } = useModal()

    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
            {type === 'orgEmpty' && imgUrl ? (
                <Image src={imgUrl} alt='Empty' height={200} width={200} className='opacity-20' />
            ) : (
                <div className='p-2 opacity-20'>{icon}</div>
            )}
            <h2 className='text-2xl font-semibold mt-4'>{title}</h2>
            <p className='text-muted-foreground text-sm mt-2'>{description}</p>
            {type === 'orgEmpty' && (
                <div className='mt-6'>
                    <Button onClick={() => onOpen('createOrganization')} size='lg'>
                        Create Organization
                    </Button>
                </div>
            )}
        </div>
    )
}
