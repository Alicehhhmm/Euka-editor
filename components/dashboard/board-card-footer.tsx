import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BoardCardFooterProps {
    isFavorites: boolean
    title: string
    authorLabel: string
    createAtLabel: string
    disabled: boolean
    onClick: () => void
}
export const BoardCardFooter = ({ isFavorites, title, authorLabel, createAtLabel, disabled, onClick }: BoardCardFooterProps) => {
    
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
        onClick()
        // toggle favorite
        // mutate favorite state
    }

    return (
        <div className='relative bg-white p-3'>
            <p className='text-[13px] truncate max-w-[calc(100%-20px)]'>{title}</p>
            <p className=' opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate'>
                {authorLabel},{createAtLabel}
            </p>
            <button
                disabled={disabled}
                onClick={handleOnClick}
                className={cn(
                    'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600',
                    disabled && 'cursor-not-allowed opacity-75'
                )}
            >
                <Star className={cn('h-4 w-4 ', isFavorites && 'text-blue-600 fill-blue-600')} />
            </button>
        </div>
    )
}
