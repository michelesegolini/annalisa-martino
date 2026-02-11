'use client';

import Script from 'next/script';

export default function ContentSquare() {
    const customId = process.env.NEXT_PUBLIC_CONTENTSQUARE_ID;

    if (!customId) {
        return null;
    }

    return (
        <Script
            src={`https://t.contentsquare.net/uxa/${customId}.js`}
            strategy="afterInteractive"
        />
    );
}
