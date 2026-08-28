document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("portfolio-grid");
  const filterButtons = document.querySelectorAll("[data-filter]");

  if (!grid) return;

  let portfolioItems = [];
  let activeFilter = "all";

  try {
    const response = await fetch("data/portfolio.json");

    if (!response.ok) {
      throw new Error("Gagal memuat portfolio.");
    }

    portfolioItems = await response.json();

    renderPortfolio();
  } catch (error) {
    console.error(error);

    grid.innerHTML = `
      <p class="portfolio__error">
        Portfolio belum dapat dimuat.
      </p>
    `;
  }

  function renderPortfolio() {
    const filteredItems =
      activeFilter === "all"
        ? portfolioItems
        : portfolioItems.filter(
            (item) => item.category === activeFilter
          );

    grid.innerHTML = filteredItems
      .map(
        (item) => `
          <article
            class="portfolio-card"
            data-category="${item.category}"
            data-project-id="${item.id}"
          >
            <button
              class="portfolio-card__preview"
              type="button"
              data-portfolio-preview="${item.id}"
              aria-label="Lihat preview ${item.name}"
            >
              <div class="portfolio-card__image-wrap">
                <img
                  src="${item.image}"
                  alt="${item.name} — ${item.descriptor}"
                  class="portfolio-card__image"
                  loading="lazy"
                />

                <div class="portfolio-card__overlay">
                  <span>Lihat Project</span>
                </div>
              </div>
            </button>

            <div class="portfolio-card__meta">
              <div>
                <span class="portfolio-card__category">
                  ${item.categoryLabel}
                </span>

                <h3>${item.name}</h3>

                <p>${item.descriptor}</p>
              </div>

              <button
                type="button"
                class="portfolio-card__cta"
                data-portfolio-order="${item.id}"
              >
                ${item.cta}
              </button>
            </div>
          </article>
        `
      )
      .join("");
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("is-active");
      });

      button.classList.add("is-active");

      renderPortfolio();
    });
  });
});