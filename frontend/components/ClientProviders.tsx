'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import { AuthProvider } from '@/context/AuthContext';
import { AuthProvider } from '../context/AuthContext';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
}
