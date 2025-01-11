import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { PackageOpen } from 'lucide-react'

type EmptyProps = {
    title?: string
    description?: string
    icon?: React.ReactNode
    imgUrl?: string
    type?: 'defaultEmpty' | 'orgEmpty' | 'teamEmpty'
    btnTitle?: string
    disabled?: boolean
    handle?: () => void
}

export const Empty = ({
    title = 'No Data',
    description = 'There is no data to display.',
    icon = <PackageOpen size={64} />,
    imgUrl = '',
    type = 'defaultEmpty',
    handle,
    btnTitle = 'Create Button',
    disabled = false,
}: EmptyProps) => {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
            {imgUrl ? (
                <Image src={imgUrl} alt='Empty' height={200} width={200} className='opacity-20' />
            ) : (
                <div className='p-2 opacity-20'>{icon}</div>
            )}
            <h2 className='text-2xl font-semibold mt-4'>{title}</h2>
            <p className='text-muted-foreground text-sm mt-2'>{description}</p>
            <div className='mt-6'>
                {type === 'orgEmpty' && (
                    <Button onClick={handle} size='lg'>
                        {btnTitle}
                    </Button>
                )}
                {type === 'teamEmpty' && (
                    <Button disabled={disabled} onClick={handle} size='lg'>
                        {btnTitle}
                    </Button>
                )}
            </div>
        </div>
    )
}
