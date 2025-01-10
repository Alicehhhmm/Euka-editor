import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/provider/theme-provider'
import { ConvexClientProvider } from '@/components/provider/convex-client-provider'
import { ModalProvider } from '@/components/provider/modal-provider'

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
                        {children}
                    </ThemeProvider>
                </ConvexClientProvider>
            </body>
        </html>
    )
}
