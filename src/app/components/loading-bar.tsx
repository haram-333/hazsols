"use client";
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function LoadingBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.configure({
            showSpinner: false,
            speed: 500,
            minimum: 0.1,
        });
    }, []);

    useEffect(() => {
        NProgress.done();
    }, [pathname, searchParams]);

    return null;
}
