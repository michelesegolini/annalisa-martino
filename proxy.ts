import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { AB_TEST_COOKIE_NAME, generateRandomVariant, VARIANT_A, VARIANT_B } from './lib/ab-testing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    // 1. Handle A/B Test Variant
    let response = NextResponse.next();
    let variant = request.cookies.get(AB_TEST_COOKIE_NAME)?.value;

    if (!variant || (variant !== VARIANT_A && variant !== VARIANT_B)) {
        variant = generateRandomVariant();
        // We need to set the cookie on the response
        // But since we are likely returning the intlMiddleware response, we need to handle that carefully.
        // However, intlMiddleware returns a response. We can clone/modify it or just set cookies on the request for downstream?
        // Actually, we want to set the cookie on the USER'S browser, so it must be on the response.

        // Simplest way: if we need to set a cookie, we set it on the response returned by initMiddleware
        request.cookies.set(AB_TEST_COOKIE_NAME, variant);
    }

    // 2. Run next-intl middleware
    const intlResponse = intlMiddleware(request);

    // 3. Merge cookies if we generated a new variant
    if (!request.cookies.get(AB_TEST_COOKIE_NAME)) {
        // If we didn't have a cookie incoming, we definitely generated one in step 1 (conceptually). 
        // Wait, modifying request.cookies (step 1) passes it to intlMiddleware? 
        // NextRequest cookies are immutable-ish or at least modifying them doesn't automatically persist to response.
        // We need to explicitly Set-Cookie on the outgoing response.
    }

    // Let's redo the logic to be safe and explicit:
    const existingVariant = request.cookies.get(AB_TEST_COOKIE_NAME)?.value;
    let newVariant = null;

    if (!existingVariant || (existingVariant !== VARIANT_A && existingVariant !== VARIANT_B)) {
        newVariant = generateRandomVariant();
    }

    // If intlResponse is null/undefined (shouldn't happen with valid config), fallback
    if (!intlResponse) {
        return response;
    }

    if (newVariant) {
        intlResponse.cookies.set(AB_TEST_COOKIE_NAME, newVariant, { path: '/', maxAge: 60 * 60 * 24 * 30 }); // 30 days
    }

    return intlResponse;
}

export const config = {
    // Matcher ignoring internal paths and static files
    matcher: ['/((?!api|_next|_vercel|test-static|.*\\..*).*)']
};
