export function initCaptcha() {
  const localHosts = new Set(["localhost", "127.0.0.1"]);
  if (localHosts.has(window.location.hostname)) return;
  const script = document.createElement("script");
  script.src = "https://web3forms.com/client/script.js";
  script.async = true;
  script.defer = true;
  document.head.append(script);
}
