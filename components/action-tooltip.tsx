'user client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ActionTooltipProps {
    label: string
    children: React.ReactNode
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    sideOffset?: number
}

export const ActionTooltip = ({ label, children, side = 'top', align = 'start', sideOffset = 0 }: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align} sideOffset={sideOffset}>
                    <p className='font-semibold text-sm capitalize'>{label.toLowerCase()}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
