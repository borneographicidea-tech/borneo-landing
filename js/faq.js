document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq__question");

    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("is-open");

        faqItem
          .querySelector(".faq__question")
          ?.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
});