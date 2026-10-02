const endpoint = "https://api.web3forms.com/submit";

function setMessage(element, type, message) {
  element.className = `form-message${type ? ` ${type}` : ""}`;
  element.textContent = message;
}

export function initContactForm() {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector(".btn-submit");
    const message = form.querySelector("#form-message");
    const formData = new FormData(form);
    const captcha = formData.get("h-captcha-response");

    if (!captcha) {
      setMessage(
        message,
        "error",
        "Please complete the CAPTCHA before sending.",
      );
      return;
    }

    document.querySelector("#replyto").value = formData.get("email");
    formData.set("replyto", formData.get("email"));
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    setMessage(message, "", "Sending message…");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(result.message || "Submission failed");
      form.reset();
      window.hcaptcha?.reset();
      setMessage(
        message,
        "success",
        "Message sent. Thanks for reaching out! I'll reply soon.",
      );
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage(
        message,
        "error",
        "Message could not be sent. Please try again or email me directly.",
      );
    } finally {
      button.disabled = false;
      button.removeAttribute("aria-busy");
    }
  });
}
