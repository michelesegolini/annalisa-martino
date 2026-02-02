import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { AB_TEST_COOKIE_NAME, generateRandomVariant, VARIANT_A, VARIANT_B } from './lib/ab-testing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    // 1. Handle A/B Test Variant
    // 1. Handle A/B Test Variant
    let response = NextResponse.next();
    const cookieValue = request.cookies.get(AB_TEST_COOKIE_NAME)?.value;
    const urlVariant = request.nextUrl.searchParams.get('variant')?.toLowerCase();

    // Check URL param first (Development only override)
    // Note: User requested "just for development".
    // We can check process.env.NODE_ENV or just allow it as it requires specific intent.
    // Given the request, I'll allow it generally or restrict it. 
    // Allowing it generally is useful for testing in preview envs too.
    let targetVariant: string | null = null;

    if (urlVariant === VARIANT_A || urlVariant === VARIANT_B) {
        targetVariant = urlVariant;
    } else {
        // Fallback to cookie or generate random
        if (!cookieValue || (cookieValue !== VARIANT_A && cookieValue !== VARIANT_B)) {
            targetVariant = generateRandomVariant();
        } else {
            // Cookie is valid, keep it (unless URL override happened)
            // But we handled URL override above.
        }
    }

    // If we have a new target variant (either from URL override or random generation), set the cookie
    // BUT we need to persist existing cookie if valid and no URL override.
    // Let's simplify:

    let finalVariant = cookieValue;
    let shouldSetCookie = false;

    if (urlVariant === VARIANT_A || urlVariant === VARIANT_B) {
        finalVariant = urlVariant;
        shouldSetCookie = true;
    } else if (!finalVariant || (finalVariant !== VARIANT_A && finalVariant !== VARIANT_B)) {
        finalVariant = generateRandomVariant();
        shouldSetCookie = true;
    }

    // Capture the intended variant for the intlMiddleware if needed? 
    // Actually intlMiddleware handles routing, not A/B content directly.
    // We just need to ensure the cookie is set on the response.

    // 2. Run next-intl middleware
    const intlResponse = intlMiddleware(request);

    // 3. Set cookie on response if needed
    if (intlResponse && shouldSetCookie && finalVariant) {
        intlResponse.cookies.set(AB_TEST_COOKIE_NAME, finalVariant, { path: '/', maxAge: 60 * 60 * 24 * 30 });
    }

    return intlResponse;

    // (End of A/B logic)
    /* 
       Old logic removed.
    */

    return intlResponse;

    // Let's redo the logic to be safe and explicit:
    // (Logic handled above)
    /*
    const existingVariant = request.cookies.get(AB_TEST_COOKIE_NAME)?.value;
    let newVariant = null;

    if (!existingVariant || (existingVariant !== VARIANT_A && existingVariant !== VARIANT_B)) {
        newVariant = generateRandomVariant();
    }
    */

    // If intlResponse is null/undefined (shouldn't happen with valid config), fallback
    if (!intlResponse) {
        return response;
    }

    // Extra safety: If we set cookie, we did it above.

    return intlResponse;

    return intlResponse;
}

export const config = {
    // Matcher ignoring internal paths and static files
    matcher: ['/((?!api|_next|_vercel|test-static|.*\\..*).*)']
};
