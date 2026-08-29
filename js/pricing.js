document.addEventListener("DOMContentLoaded", async () => {
  const pricingGrid = document.getElementById("pricing-grid");

  if (!pricingGrid) return;

  let pricingData = null;
  let currentMode = "regular";

  try {
    const response = await fetch("data/pricing.json");

    if (!response.ok) {
      throw new Error("Gagal memuat data pricing.");
    }

    pricingData = await response.json();

    renderRegularPricing();
  } catch (error) {
    console.error(error);

    pricingGrid.innerHTML = `
      <p class="pricing__error">
        Paket desain belum dapat dimuat.
      </p>
    `;
  }

  function renderRegularPricing() {
    if (!pricingData?.regular) return;

    currentMode = "regular";

    pricingGrid.innerHTML = pricingData.regular
      .map((item) => createPricingCard(item))
      .join("");
  }

  function renderCompanyPricing() {
    if (!pricingData?.company) return;

    currentMode = "company";

    pricingGrid.innerHTML = createPricingCard(
      pricingData.company,
      true
    );
  }

  function createPricingCard(item, isCompany = false) {
    return `
      <article
        class="pricing-card ${item.recommended ? "is-recommended" : ""} ${isCompany ? "pricing-card--company" : ""}"
        data-package-id="${item.id}"
      >

        ${
          item.badge
            ? `<span class="pricing-card__badge">${item.badge}</span>`
            : ""
        }

        <div class="pricing-card__header">
          <span class="pricing-card__name">
            ${item.name}
          </span>

          <h3 class="pricing-card__price">
            ${item.priceLabel}
          </h3>

          <p class="pricing-card__description">
            ${item.description}
          </p>
        </div>

        <ul class="pricing-card__features">
          ${item.features
            .map(
              (feature) => `
                <li>
                  <span class="pricing-card__check">✓</span>
                  <span>${feature}</span>
                </li>
              `
            )
            .join("")}
        </ul>

        <button
  type="button"
  class="btn btn--primary pricing-card__cta"
  data-package-select
  data-select-package="${item.id}"
  data-package-id="${item.id}"
  data-package-name="${item.name}"
  data-package-price="${item.price}"
>
          Pilih Paket →
        </button>

      </article>
    `;
  }

  document.addEventListener("click", (event) => {
    const portfolioOrderButton = event.target.closest(
      "[data-portfolio-order]"
    );

    if (!portfolioOrderButton) return;

    const card = portfolioOrderButton.closest(".portfolio-card");
    const category = card?.dataset.category;

    if (category === "perusahaan") {
      renderCompanyPricing();
    } else {
      renderRegularPricing();
    }

    document
      .getElementById("pricing")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  });

  window.BorneoPricing = {
    showRegular: renderRegularPricing,
    showCompany: renderCompanyPricing,
    getMode: () => currentMode
  };
});