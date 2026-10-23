import type { Metadata } from 'next';
import { DemoProvider } from '@/components/store';
import { Shell } from '@/components/shell';
import './globals.css';
export const metadata: Metadata = {title:'VELORA — The game. Your perspective.',description:'A premium football prediction demo. Mock fixtures, virtual credits, no real money.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><a className="skip-link" href="#main-content">Skip to content</a><DemoProvider><Shell>{children}</Shell></DemoProvider></body></html>;}
