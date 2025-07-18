
function validateForm() {
  const consent = document.getElementById('gdprConsent');
  if (!consent.checked) {
    alert('Please accept the privacy policy before submitting.');
    return false;
  }
  return true;
}

function handleSubmit(event) {
  event.preventDefault();
  if (!validateForm()) return;

  const form = document.getElementById('contactForm');
  const formData = new FormData(form);

  fetch("https://formsubmit.co/ajax/maxim.s.kechter@gmail.com", {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    console.log("RESPONSE:", response);  // Debugging line
    if (response.ok) {
      form.reset();
      document.getElementById('thankYouPopup').style.display = 'block';
    } else {
      alert("There was a problem submitting the form.");
    }
  })
  .catch(error => {
    console.error("ERROR:", error);  // Debugging line
    alert("Error occurred. Please try again later.");
  });

  return false;
}

function closePopup() {
  document.getElementById('thankYouPopup').style.display = 'none';
}
