"use client";
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function LoadingBar() {
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        try {
            NProgress.configure({
                showSpinner: false,
                speed: 500,
                minimum: 0.1,
            });
        } catch (error) {
            console.warn('NProgress configuration failed:', error);
        }
    }, [isClient]);

    useEffect(() => {
        if (!isClient) return;

        try {
            NProgress.done();
        } catch (error) {
            console.warn('NProgress done failed:', error);
        }
    }, [pathname, searchParams, isClient]);

    if (!isClient) {
        return null;
    }

    return null;
}
