export const AB_TEST_COOKIE_NAME = 'ab-test-variant';
export const VARIANT_A = 'a';
export const VARIANT_B = 'b';

export type ABVariant = typeof VARIANT_A | typeof VARIANT_B;

export function getABVariant(cookieValue?: string): ABVariant {
    // if (cookieValue === VARIANT_B) {
    //   return VARIANT_B;
    // }
    return VARIANT_A; // Force Variant A for all users (debugging)
}

export function generateRandomVariant(): ABVariant {
    // return Math.random() < 0.5 ? VARIANT_A : VARIANT_B;
    return VARIANT_A; // Force Variant A for debugging/verification
}
