// Google Analytics 4 events tracking

export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData)
  }
}

export const EVENTS = {
  PAGE_VIEW: 'page_view',
  APPLY_CTA_CLICK: 'apply_cta_click',
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  STARTER_PACK_VIEW: 'starter_pack_view',
  STARTER_PACK_DOWNLOAD: 'starter_pack_download',
  CIRCLE_CTA_CLICK: 'circle_cta_click',
}
