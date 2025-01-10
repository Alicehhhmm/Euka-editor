import { NavigationSidebar } from '@/components/navigation/navigation-sidebar'
import { ServerOrgSidebar } from '@/components/server/server-org-sidebar'
import { NavigationBar } from '@/components/navigation/navigation-bar'

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <main className='h-full'>
            <NavigationSidebar />
            <div className='h-full pl-[60px] bg-slate-300/40'>
                <div className='h-full flex'>
                    <ServerOrgSidebar />
                    <div className='h-full flex-1'>
                        <NavigationBar />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashboardLayout
