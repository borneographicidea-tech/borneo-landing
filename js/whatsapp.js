document.addEventListener("DOMContentLoaded", async () => {
  const briefForm = document.getElementById("brief-form");

  let settings = null;

  try {
    const response = await fetch("data/settings.json");

    if (!response.ok) {
      throw new Error("Gagal memuat settings.");
    }

    settings = await response.json();

    applyGlobalLinks();
  } catch (error) {
    console.error(error);
  }

  function applyGlobalLinks() {
    if (!settings) return;

    document
      .querySelectorAll("[data-whatsapp-link]")
      .forEach((link) => {
        if (!settings.whatsappNumber) return;

        link.href = `https://wa.me/${settings.whatsappNumber}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      });

    document
      .querySelectorAll("[data-instagram-link]")
      .forEach((link) => {
        if (!settings.instagramUrl) return;

        link.href = settings.instagramUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      });

    document
      .querySelectorAll("[data-facebook-link]")
      .forEach((link) => {
        if (!settings.facebookUrl) return;

        link.href = settings.facebookUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      });

    document
      .querySelectorAll("[data-terms-link]")
      .forEach((link) => {
        if (!settings.termsUrl) return;

        link.href = settings.termsUrl;
      });

    document
      .querySelectorAll("[data-privacy-link]")
      .forEach((link) => {
        if (!settings.privacyUrl) return;

        link.href = settings.privacyUrl;
      });
  }

  briefForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const orderState =
  window.BorneoOrder?.getState?.() || {};

if (!orderState.packageId) {
  alert("Silakan pilih paket desain terlebih dahulu.");

  document
    .getElementById("pricing")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  return;
}

    if (!settings?.whatsappNumber) {
      alert("Nomor WhatsApp belum tersedia.");
      return;
    }

    const formData = new FormData(briefForm);

    const businessName = formData.get("businessName")?.trim();
    const businessField = formData.get("businessField")?.trim();
    const city = formData.get("city")?.trim();
    const logoColor = formData.get("logoColor")?.trim();
    const backgroundColor = formData.get("backgroundColor")?.trim();
    const notes = formData.get("notes")?.trim();

    const concepts = formData.getAll("concept");

    if (!concepts.length) {
      alert("Pilih minimal satu konsep logo.");
      return;
    }


    const message = buildWhatsAppMessage({
      orderState,
      businessName,
      businessField,
      city,
      concepts,
      logoColor,
      backgroundColor,
      notes
    });

    const whatsappUrl =
      `https://wa.me/${settings.whatsappNumber}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  });

  function buildWhatsAppMessage({
    orderState,
    businessName,
    businessField,
    city,
    concepts,
    logoColor,
    backgroundColor,
    notes
  }) {
    const lines = [
      "Halo Borneo Graphicidea 👋",
      "",
      "Saya tertarik membuat logo.",
      "",
      `Referensi Portfolio: ${orderState.portfolio || "-"}`,
      `Kategori: ${formatCategory(orderState.category)}`,
      `Paket: ${
        orderState.packageName
          ? `${orderState.packageName}${orderState.packagePrice ? ` — ${orderState.packagePrice}` : ""}`
          : "-"
      }`,
      "",
      `Nama Logo / Bisnis: ${businessName || "-"}`,
      `Bidang Usaha: ${businessField || "-"}`,
      `Kota: ${city || "-"}`,
      `Konsep: ${concepts.join(", ") || "-"}`,
      `Warna Logo: ${logoColor || "-"}`,
      `Background / Kemasan: ${backgroundColor || "-"}`,
      `Catatan: ${notes || "-"}`
    ];

    return lines.join("\n");
  }

  function formatCategory(category) {
    const labels = {
      fnb: "F&B",
      umkm: "UMKM",
      perusahaan: "Perusahaan",
      umum: "Umum"
    };

    return labels[category] || category || "-";
  }
});