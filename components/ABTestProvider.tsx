'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ABVariant, VARIANT_A } from '../lib/ab-testing';

/*
 * We can reuse the cookie logic or pass the variant from a server component.
 * Passing from server component (layout) is cleaner to avoid hydration mismatch 
 * if we read cookies on client vs server differently.
 */

const ABTestContext = createContext<ABVariant>(VARIANT_A);

export function useABVariant() {
    return useContext(ABTestContext);
}

export function ABTestProvider({
    children,
    variant,
}: {
    children: React.ReactNode;
    variant: ABVariant;
}) {
    return (
        <ABTestContext.Provider value={variant}>
            {children}
        </ABTestContext.Provider>
    );
}
