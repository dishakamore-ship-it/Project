const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "Light" : "Dark";
});

function setError(input, message) {
  const error = input.parentElement.querySelector(".error");
  error.textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  let valid = true;

  formStatus.textContent = "";
  [name, email, message].forEach((input) => setError(input, ""));

  if (name.value.trim().length < 2) {
    setError(name, "Please enter your name.");
    valid = false;
  }

  if (!isValidEmail(email.value.trim())) {
    setError(email, "Please enter a valid email address.");
    valid = false;
  }

  if (message.value.trim().length < 10) {
    setError(message, "Message should be at least 10 characters.");
    valid = false;
  }

  if (!valid) {
    formStatus.textContent = "Please fix the highlighted fields.";
    return;
  }

  formStatus.textContent = "Thank you! Your message is ready to send.";
  contactForm.reset();
});
