document.addEventListener("DOMContentLoaded", () => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return;

  // =========================
  // CLOSE MODAL
  // =========================

  function closeModal() {
    modalRoot.innerHTML = "";
    document.body.classList.remove("modal-open");
  }

  // =========================
  // PORTFOLIO PREVIEW
  // =========================

  function openPortfolioPreview(card) {
    if (!card) return;

    const image = card.querySelector(".portfolio-card__image");
    const title = card.querySelector("h3");
    const category = card.querySelector(".portfolio-card__category");
    const descriptor = card.querySelector(".portfolio-card__meta p");

    if (!image || !title) return;

    modalRoot.innerHTML = `
      <div class="modal portfolio-lightbox" role="dialog" aria-modal="true">

        <button
          class="modal__backdrop"
          type="button"
          aria-label="Tutup preview"
          data-close-modal
        ></button>

        <div class="portfolio-lightbox__panel">

          <button
            class="modal__close"
            type="button"
            aria-label="Tutup preview"
            data-close-modal
          >
            ×
          </button>

          <div class="portfolio-lightbox__image">
            <img
              src="${image.src}"
              alt="${image.alt}"
            />
          </div>

          <div class="portfolio-lightbox__info">
            <span>
              ${category?.textContent.trim() || ""}
            </span>

            <h2>
              ${title.textContent.trim()}
            </h2>

            <p>
              ${descriptor?.textContent.trim() || ""}
            </p>
          </div>

        </div>
      </div>
    `;

    document.body.classList.add("modal-open");

    modalRoot
      .querySelectorAll("[data-close-modal]")
      .forEach((button) => {
        button.addEventListener("click", closeModal);
      });

    modalRoot.querySelector(".modal__close")?.focus();
  }

  // =========================
  // PROJECT CATEGORY SELECTOR
  // =========================

  function openCategorySelector() {
    modalRoot.innerHTML = `
      <div class="modal project-selector" role="dialog" aria-modal="true">

        <button
          class="modal__backdrop"
          type="button"
          aria-label="Tutup pilihan kategori"
          data-close-modal
        ></button>

        <div class="project-selector__panel">

          <button
            class="modal__close"
            type="button"
            aria-label="Tutup"
            data-close-modal
          >
            ×
          </button>

          <span class="eyebrow">
            MULAI PROJECT
          </span>

          <h2>
            Pilih kategori bisnismu.
          </h2>

          <p>
            Kami akan mengarahkanmu ke paket desain
            yang paling sesuai.
          </p>

          <div class="project-selector__options">

            <button
              type="button"
              data-project-category="fnb"
            >
              <span>01</span>
              <strong>F&amp;B</strong>
              <small>
                Makanan, minuman &amp; kuliner
              </small>
            </button>

            <button
              type="button"
              data-project-category="umkm"
            >
              <span>02</span>
              <strong>UMKM</strong>
              <small>
                Usaha lokal &amp; bisnis berkembang
              </small>
            </button>

            <button
              type="button"
              data-project-category="perusahaan"
            >
              <span>03</span>
              <strong>Perusahaan</strong>
              <small>
                PT, CV &amp; kebutuhan corporate
              </small>
            </button>

            <button
              type="button"
              data-project-category="umum"
            >
              <span>04</span>
              <strong>Umum</strong>
              <small>
                Brand, jasa &amp; kebutuhan lainnya
              </small>
            </button>

          </div>

        </div>
      </div>
    `;

    document.body.classList.add("modal-open");

    modalRoot
      .querySelectorAll("[data-close-modal]")
      .forEach((button) => {
        button.addEventListener("click", closeModal);
      });

    modalRoot.querySelector(".modal__close")?.focus();
  }

  // =========================
  // PORTFOLIO CLICK
  // =========================

  document.addEventListener("click", (event) => {
    const previewButton = event.target.closest(
      "[data-portfolio-preview]"
    );

    if (!previewButton) return;

    const card = previewButton.closest(".portfolio-card");

    openPortfolioPreview(card);
  });

  // =========================
  // START PROJECT CLICK
  // =========================

  document.addEventListener("click", (event) => {
    const startButton = event.target.closest(
      "[data-start-project]"
    );

    if (!startButton) return;

    openCategorySelector();
  });

  // =========================
  // CATEGORY SELECTION
  // =========================

  document.addEventListener("click", (event) => {
    const categoryButton = event.target.closest(
      "[data-project-category]"
    );

    if (!categoryButton) return;

    const category =
  categoryButton.dataset.projectCategory;

window.BorneoOrder?.setCategory?.(category);

closeModal();

    if (category === "perusahaan") {
      window.BorneoPricing?.showCompany?.();
    } else {
      window.BorneoPricing?.showRegular?.();
    }

    document
      .getElementById("pricing")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  });

  // =========================
  // ESC CLOSE
  // =========================

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const activeModal =
      modalRoot.querySelector(".modal");

    if (activeModal) {
      closeModal();
    }
  });
});