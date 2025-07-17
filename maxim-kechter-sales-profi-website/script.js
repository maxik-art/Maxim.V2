// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Form Feedback (optional)
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("Vielen Dank für Ihre Nachricht. Ich melde mich zeitnah zurück.");
  this.reset();
});
