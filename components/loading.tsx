import Image from 'next/image'

export const Loading = () => {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
            <Image src='/next.svg' alt='Loading...' width={64} height={64} className='animate-pulse duration-700' />
        </div>
    )
}
