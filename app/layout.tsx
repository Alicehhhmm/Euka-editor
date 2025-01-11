import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/provider/theme-provider'
import { ModalProvider } from '@/components/provider/modal-provider'
import { ConvexClientProvider } from '@/components/provider/convex-client-provider'

const font = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Euka Editor Application',
    description: 'Team Online collaborative editor Application',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={cn(font.className, `antialiased`, `bg-white dark:bg-[#313333]`)}>
                <ConvexClientProvider>
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='light'
                        enableSystem={false}
                        storageKey='euka-theme'
                        disableTransitionOnChange
                    >
                        <ModalProvider />
                        <Toaster />
                        {children}
                    </ThemeProvider>
                </ConvexClientProvider>
            </body>
        </html>
    )
}
