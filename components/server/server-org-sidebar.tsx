'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { LayoutDashboard, Star } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const font = Poppins({
    subsets: ['latin'],
    weight: ['600'],
})

export const ServerOrgSidebar = () => {
    const searchParams = useSearchParams()
    const favorites = searchParams.get('favorites')

    return (
        <div className='bg-white w-[206px] p-5 hidden lg:flex flex-col space-y-4'>
            <Link href='/'>
                <div className='flex items-center gap-x-2'>
                    <Image src='/next.svg' alt='Logo' width={60} height={60} />
                    <span className={cn('font-semibold text-2xl', font.className)}>Euka</span>
                </div>
            </Link>
            <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        },
                        organizationSwitcherTrigger: {
                            padding: '6px',
                            width: '100%',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            justifyContent: 'space-between',
                            backgroundColor: 'white',
                        },
                    },
                }}
            />
            <div className='space-y-1 w-full'>
                <Button asChild size='lg' variant={favorites ? 'ghost' : 'secondary'} className='w-full font-semibold justify-start px-2'>
                    <Link href='/'>
                        <LayoutDashboard className='w-4 h-4 mr-2' />
                        <span>Team Design</span>
                    </Link>
                </Button>
                <Button asChild size='lg' variant={favorites ? 'secondary' : 'ghost'} className='w-full font-semibold justify-start px-2'>
                    <Link
                        href={{
                            pathname: '/',
                            query: {
                                favorites: true,
                            },
                        }}
                    >
                        <Star className='w-4 h-4 mr-2' />
                        <span>Favorites Design</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
