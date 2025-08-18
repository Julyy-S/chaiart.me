document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname; // ex: /reves/en/ or /cauchemars/
  const [frLink, enLink] = document.querySelectorAll(".language-switch a") || [];

  if (!frLink || !enLink) return;

  // ---- Helpers
  const isEnglishPath = (p) => p.includes("/en/");
  const toFrPath = (p) => p.replace("/en/", "/");
  const toEnPath = (p) => (p.endsWith("/") ? p + "en/" : p + "/en/");

  // Base de la page (même page, sans /en/)
  const basePath = isEnglishPath(path) ? toFrPath(path) : path;

  // Alimente les href du footer pour rester sur la même page
  frLink.setAttribute("href", basePath);
  enLink.setAttribute("href", toEnPath(basePath));

  // Marque la langue active visuellement
  if (isEnglishPath(path)) {
    enLink.classList.add("active");
    frLink.classList.remove("active");
  } else {
    frLink.classList.add("active");
    enLink.classList.remove("active");
  }

  // ---- Mémorisation au clic
  frLink.addEventListener("click", () => {
    try { localStorage.setItem("lang", "fr"); } catch (e) {}
  });
  enLink.addEventListener("click", () => {
    try { localStorage.setItem("lang", "en"); } catch (e) {}
  });

  // ---- Redirection douce selon la langue mémorisée
  try {
    const saved = localStorage.getItem("lang"); // 'fr' | 'en' | null
    if (!saved) return;

    const currentlyEn = isEnglishPath(path);

    // Si la langue mémorisée ne correspond pas à l’URL courante, on redirige vers la même page dans la bonne langue
    if (saved === "en" && !currentlyEn) {
      // évite les boucles: si on est déjà à la bonne URL, ne rien faire
      const target = toEnPath(basePath);
      if (target !== path) window.location.replace(target);
    } else if (saved === "fr" && currentlyEn) {
      const target = toFrPath(path);
      if (target !== path) window.location.replace(target);
    }
  } catch (e) {
    // si localStorage indisponible, on ne redirige pas
  }
});

// Bouton retour contact version FR/EN
document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.getElementById("back-contact");
  if (!backBtn) return;

  if (window.location.pathname.includes("/en/")) {
    backBtn.setAttribute("href", "/contact/en/");
  } else {
    backBtn.setAttribute("href", "/contact/");
  }
});

