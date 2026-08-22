/** Render a shimmer block for transaction and discovery loading states. */
export function SkeletonBlock({ className = 'h-5 w-40' }: { className?: string }): JSX.Element { return <div aria-label="loading" className={`skeleton rounded ${className}`} /> }
