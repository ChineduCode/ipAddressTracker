import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IP Address Tracker',
  description: 'Find the location of an IP address or domain.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
