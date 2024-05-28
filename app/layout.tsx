import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Blockchain',
    description: 'AV3 T300-24 Programação funcional',
    icons: 'https://www.unifor.br/o/unifor-theme/images/favicon.ico',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
