document.addEventListener("DOMContentLoaded", () => {
  function trackEvent(eventName, eventData = {}) {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...eventData
    };

    console.log("[BORNEO TRACKING]", payload);

    window.dispatchEvent(
      new CustomEvent("borneo:tracking", {
        detail: payload
      })
    );

    // Future integration:
    // Meta Pixel
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, eventData);
    }

    // Future integration:
    // Google Analytics / GTM
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    }
  }

  // =========================
  // VIEW PORTFOLIO
  // =========================

  const portfolioSection =
    document.getElementById("portfolio");

  if (portfolioSection) {
    let portfolioViewed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !portfolioViewed
          ) {
            portfolioViewed = true;

            trackEvent("view_portfolio");

            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.25
      }
    );

    observer.observe(portfolioSection);
  }

  // =========================
  // GLOBAL CLICK TRACKING
  // =========================

  document.addEventListener("click", (event) => {
    const portfolioCTA = event.target.closest(
      "[data-portfolio-order]"
    );

    if (portfolioCTA) {
      const card =
        portfolioCTA.closest(".portfolio-card");

      trackEvent("select_portfolio", {
        project:
          card
            ?.querySelector("h3")
            ?.textContent
            ?.trim() || null,

        category:
          card
            ?.querySelector(
              ".portfolio-card__category"
            )
            ?.textContent
            ?.trim() || null
      });

      return;
    }

    const packageButton = event.target.closest(
      "[data-package-select]"
    );

    if (packageButton) {
      trackEvent("select_package", {
        packageId:
          packageButton.dataset.packageSelect || null,

        packageName:
          packageButton.dataset.packageName || null
      });

      return;
    }

    const startProjectButton =
      event.target.closest(
        "[data-start-project]"
      );

    if (startProjectButton) {
      trackEvent("start_project");

      return;
    }

    const categoryButton =
      event.target.closest(
        "[data-project-category]"
      );

    if (categoryButton) {
      trackEvent("select_category", {
        category:
          categoryButton.dataset.projectCategory ||
          null
      });
    }
  });

  // =========================
  // BRIEF TRACKING
  // =========================

  const briefForm =
    document.getElementById("brief-form");

  if (briefForm) {
    let briefStarted = false;

    briefForm.addEventListener(
      "focusin",
      () => {
        if (briefStarted) return;

        briefStarted = true;

        const orderState =
          window.BorneoOrder?.getState?.() || {};

        trackEvent("start_brief", {
          portfolio:
            orderState.portfolio || null,

          category:
            orderState.category || null,

          packageId:
            orderState.packageId || null,

          packageName:
            orderState.packageName || null
        });
      }
    );
  }

  // =========================
  // PUBLIC API
  // =========================

  window.BorneoTracking = {
    track: trackEvent
  };
});