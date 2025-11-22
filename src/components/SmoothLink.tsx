import { Link, LinkProps } from 'react-router-dom';

// Simple link wrapper - no animations or effects
interface SmoothLinkProps extends LinkProps {
    to: string;
    delay?: number; // Kept for backward compatibility but ignored
}

export function SmoothLink({ to, delay, children, className, ...props }: SmoothLinkProps) {
    return (
        <Link
            to={to}
            className={className}
            {...props}
        >
            {children}
        </Link>
    );
}

// Keep for backward compatibility
export function useSmoothNavigate() {
    return { smoothNavigate: () => { }, isNavigating: false };
}
