import { NavigationAction } from './navigation-action'
import { NavigationList } from './navigation-list'

export const NavigationSidebar = () => {
    return (
        <div className='fixed z-[1] left-0 bg-slate-200 h-full w-[60px] flex p-3 flex-col gap-y-4 overflow-hidden'>
            <NavigationAction />
            <NavigationList />
        </div>
    )
}
