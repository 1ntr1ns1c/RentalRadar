import './globals.css';
import type { Metadata } from 'next';
import ClientProviders from '@/components/ClientProviders';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import 'aos/dist/aos.css';

export const metadata: Metadata = {
  title: 'RentalRadar - Find Your Perfect Home',
  description: 'Discover amazing rental properties in your area',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
