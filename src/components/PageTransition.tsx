import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Simple component to handle scroll-to-top on route changes
export default function PageTransition({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    return <>{children}</>;
}
