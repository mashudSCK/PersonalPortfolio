import { initCaptcha } from "./js/captcha.js";
import { initContactForm } from "./js/contact.js";
import { initInteractions } from "./js/interactions.js";
import { initNavigation } from "./js/navigation.js";
import { renderPortfolioContent } from "./js/render.js";
import { addStructuredData } from "./js/seo.js";
import { initTheme } from "./js/theme.js";

renderPortfolioContent();
initCaptcha();
initTheme();
initNavigation();
initInteractions();
initContactForm();
addStructuredData();
