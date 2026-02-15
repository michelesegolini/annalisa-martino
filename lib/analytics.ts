import { sendGTMEvent } from '@next/third-parties/google';

type EventName =
    | 'open_inquire_modal'
    | 'inquire_form_submit'
    | 'inquire_form_error'
    | 'click_social'
    | 'click_contact';

interface AnalyticsEvent {
    event: EventName;
    [key: string]: string | number | boolean | undefined;
}

export const trackEvent = (eventName: EventName, params?: Record<string, string | number | boolean>) => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GTM_ID) {
        sendGTMEvent({ event: eventName, ...params });
    }
};
