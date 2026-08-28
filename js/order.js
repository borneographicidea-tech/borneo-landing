document.addEventListener("DOMContentLoaded", () => {
  const briefSection = document.getElementById("brief");
  const briefSummary = document.getElementById("brief-summary");

  const orderState = {
    portfolio: null,
    category: null,
    packageId: null,
    packageName: null,
    packagePrice: null
  };

  // =========================
  // PORTFOLIO SELECTION
  // =========================

  document.addEventListener("click", (event) => {
    const portfolioButton = event.target.closest(
      "[data-portfolio-order]"
    );

    if (!portfolioButton) return;

    const card = portfolioButton.closest(".portfolio-card");

    if (!card) return;

    const projectName = card
      .querySelector("h3")
      ?.textContent.trim();

    const category = card.dataset.category;

    orderState.portfolio = projectName || null;
    orderState.category = category || null;

    // Reset package lama jika user memilih portfolio lain
    orderState.packageId = null;
    orderState.packageName = null;
    orderState.packagePrice = null;

    updateBriefSummary();
  });

  // =========================
  // PACKAGE SELECTION
  // =========================

  document.addEventListener("click", (event) => {
    const packageButton = event.target.closest(
      "[data-select-package]"
    );

    if (!packageButton) return;

    const card = packageButton.closest(".pricing-card");

    if (!card) return;

    const packageId = packageButton.dataset.selectPackage;

    const packageName = card
      .querySelector(".pricing-card__name")
      ?.textContent.trim();

    const packagePrice = card
      .querySelector(".pricing-card__price")
      ?.textContent.trim();

    orderState.packageId = packageId || null;
    orderState.packageName = packageName || null;
    orderState.packagePrice = packagePrice || null;

    updateBriefSummary();

    briefSection?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  // =========================
  // BRIEF SUMMARY
  // =========================

  function updateBriefSummary() {
    if (!briefSummary) return;

    if (
      !orderState.portfolio &&
      !orderState.packageName
    ) {
      briefSummary.innerHTML = "";
      return;
    }

    briefSummary.innerHTML = `
      <div class="brief-summary__content">

        ${
          orderState.portfolio
            ? `
              <div class="brief-summary__item">
                <span>Referensi Portfolio</span>
                <strong>${orderState.portfolio}</strong>
              </div>
            `
            : ""
        }

        ${
          orderState.category
            ? `
              <div class="brief-summary__item">
                <span>Kategori</span>
                <strong>${formatCategory(orderState.category)}</strong>
              </div>
            `
            : ""
        }

        ${
          orderState.packageName
            ? `
              <div class="brief-summary__item">
                <span>Paket</span>
                <strong>
                  ${orderState.packageName}
                  ${
                    orderState.packagePrice
                      ? `— ${orderState.packagePrice}`
                      : ""
                  }
                </strong>
              </div>
            `
            : ""
        }

      </div>
    `;
  }

  function formatCategory(category) {
    const categoryLabels = {
      fnb: "F&B",
      umkm: "UMKM",
      perusahaan: "Perusahaan",
      umum: "Umum"
    };

    return categoryLabels[category] || category;
  }

  // =========================
  // PUBLIC STATE
  // =========================

  window.BorneoOrder = {
    getState: () => ({ ...orderState })
  };
});