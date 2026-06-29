const SUPPORTED_LANGUAGES = ["en", "zh-CN"];
const DEFAULT_LANGUAGE = "en";
const STORAGE_KEY = "portfolio-language";

const path = window.location.pathname.split("/").pop() || "index.html";

function getNestedValue(source, key) {
  return key.split(".").reduce((value, part) => {
    if (value && Object.prototype.hasOwnProperty.call(value, part)) {
      return value[part];
    }
    return undefined;
  }, source);
}

function getPreferredLanguage() {
  const params = new URLSearchParams(window.location.search);
  const queryLanguage = params.get("lang");
  const storedLanguage = localStorage.getItem(STORAGE_KEY);
  const browserLanguage = navigator.language && navigator.language.startsWith("zh")
    ? "zh-CN"
    : DEFAULT_LANGUAGE;

  return [queryLanguage, storedLanguage, browserLanguage, DEFAULT_LANGUAGE]
    .find((language) => SUPPORTED_LANGUAGES.includes(language)) || DEFAULT_LANGUAGE;
}

async function loadMessages(language) {
  try {
    const response = await fetch(`./locales/${language}.json`, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Unable to load locale ${language}`);
    }
    return response.json();
  } catch (error) {
    console.warn(error);
    if (language !== DEFAULT_LANGUAGE) {
      return loadMessages(DEFAULT_LANGUAGE);
    }
    return {};
  }
}

function applyAttributes(element, messages) {
  const attrSpec = element.getAttribute("data-i18n-attr");
  if (!attrSpec) {
    return;
  }

  attrSpec.split(";").forEach((entry) => {
    const [attribute, key] = entry.split(":").map((part) => part && part.trim());
    if (!attribute || !key) {
      return;
    }

    const value = getNestedValue(messages, key);
    if (typeof value === "string") {
      element.setAttribute(attribute, value);
    }
  });
}

function applyMessages(messages, language) {
  document.documentElement.lang = language === "zh-CN" ? "zh-Hans-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = getNestedValue(messages, element.getAttribute("data-i18n"));
    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    applyAttributes(element, messages);
  });

  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    const isCurrent = button.dataset.langOption === language;
    button.classList.toggle("is-active", isCurrent);
    button.setAttribute("aria-pressed", String(isCurrent));
  });
}

async function setLanguage(language) {
  const nextLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
  const messages = await loadMessages(nextLanguage);
  localStorage.setItem(STORAGE_KEY, nextLanguage);
  applyMessages(messages, nextLanguage);
}

document.querySelectorAll("[data-nav]").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === path || (path === "" && href === "index.html")) {
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-lang-option]").forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.langOption);
  });
});

setLanguage(getPreferredLanguage());
