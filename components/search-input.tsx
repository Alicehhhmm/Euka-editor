'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import qs from 'query-string'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts'
import { Input } from '@/components/ui/input'

export const SearchInput = () => {
    const router = useRouter()
    const [defaultValue, setDefaultValue] = useState('')
    const [debouncedValue, setValue] = useDebounceValue(defaultValue, 500)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDefaultValue(e.target.value)
    }

    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: '/',
                query: {
                    search: debouncedValue,
                },
            },
            { skipEmptyString: true, skipNull: true }
        )

        router.push(url)
    }, [debouncedValue, router])

    return (
        <div className='w-full relative'>
            <Search className='h-4 w-4 absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground ' />
            <Input className='w-full max-w-[516px] pl-9' placeholder='Search Design' onChange={handleChange} value={defaultValue} />
        </div>
    )
}
