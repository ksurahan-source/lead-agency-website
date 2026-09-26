// Preserve the public site's existing analytics identities and PageView deduplication.
// No customer profile or Studio project content is sent by the landing page.
if (location.hostname === "hi-ob.com" && !navigator.globalPrivacyControl) {
  const eventId = crypto.randomUUID();
  window.dataLayer = window.dataLayer || [];
  let analyticsStarted = false;
  const startAnalytics = () => {
    if (analyticsStarted) return;
    analyticsStarted = true;
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const append = (src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    };
    append("https://www.googletagmanager.com/gtm.js?id=GTM-P74PV945");
    if (!window.fbq) {
      const fbq = function () {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
        else fbq.queue.push(arguments);
      };
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = "2.0";
      window.fbq = fbq;
      window._fbq = fbq;
    }
    append("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", "1715625702927911");
    window.fbq("track", "PageView", {}, { eventID: eventId });
    fetch("/api/track-view", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        eventSourceUrl: location.href,
        eventId,
        eventName: "PageView",
      }),
      keepalive: true,
    }).catch(() => {});
  };
  const timer = setTimeout(startAnalytics, 3000);
  addEventListener(
    "pointerdown",
    () => {
      clearTimeout(timer);
      startAnalytics();
    },
    { once: true, passive: true },
  );
  document
    .querySelectorAll('a[href^="https://studio.hi-ob.com/"]')
    .forEach((link) =>
      link.addEventListener("click", () =>
        window.dataLayer.push({
          event: "hiob_workspace_start",
          placement: link.closest("section")?.id || "navigation",
        }),
      ),
    );
}
