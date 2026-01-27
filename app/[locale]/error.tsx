'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
            <h2>Something went wrong!</h2>
            <p style={{ color: 'red', marginBottom: '1rem' }}>{error.message || 'Unknown error'}</p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                style={{
                    padding: '10px 20px',
                    background: 'black',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Try again
            </button>
        </div>
    );
}
