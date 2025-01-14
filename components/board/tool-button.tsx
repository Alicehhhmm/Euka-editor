import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/action-tooltip'
import { LucideIcon } from 'lucide-react'

interface ToolButtonProps {
    label: string
    icon: LucideIcon
    onClick: () => void
    isAction?: boolean
    isDisabled?: boolean
}

export const ToolButton = ({ label, icon: Icon, onClick, isAction, isDisabled }: ToolButtonProps) => {
    return (
        <ActionTooltip label={label} side='right' sideOffset={14}>
            <Button disabled={isDisabled} onClick={onClick} variant={isAction ? 'boardAction' : 'board'}>
                <Icon />
            </Button>
        </ActionTooltip>
    )
}
