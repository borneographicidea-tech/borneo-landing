document.addEventListener("DOMContentLoaded", () => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return;

  function closeModal() {
    modalRoot.innerHTML = "";
    document.body.classList.remove("modal-open");
  }

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
            <span>${category?.textContent.trim() || ""}</span>
            <h2>${title.textContent.trim()}</h2>
            <p>${descriptor?.textContent.trim() || ""}</p>
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

  document.addEventListener("click", (event) => {
    const previewButton = event.target.closest(
      "[data-portfolio-preview]"
    );

    if (!previewButton) return;

    const card = previewButton.closest(".portfolio-card");

    openPortfolioPreview(card);
  });

  document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  const activeModal = modalRoot.querySelector(".modal");

  if (activeModal) {
    closeModal();
  }
  });
});