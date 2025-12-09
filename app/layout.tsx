import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Agent Flow',
    description: 'UI to create custom AI flows',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="overflow-hidden">
        {children}
        </body>
        </html>
    );
}