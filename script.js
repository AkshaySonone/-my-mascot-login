const mascot = document.getElementById('mascot');
const pupilLeft = document.getElementById('pupilLeft');
const pupilRight = document.getElementById('pupilRight');
const revealBtn = document.getElementById('revealBtn');
const password = document.getElementById('password');

let trackingEnabled = true; // 👈 flag to control eye tracking

function trackEyes(e) {
  if (!trackingEnabled) return; // 👈 stop tracking if disabled

  const rect = mascot.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  const range = 18;
  const nx = Math.max(-range, Math.min(range, (dx / (window.innerWidth / 2)) * range));
  const ny = Math.max(-range, Math.min(range, (dy / (window.innerHeight / 2)) * range));

  pupilLeft.style.transform = `translate(${nx}px, ${ny}px)`;
  pupilRight.style.transform = `translate(${nx}px, ${ny}px)`;
}

// Attach listener once
document.addEventListener('mousemove', trackEyes);

// Toggle reveal
revealBtn.addEventListener('click', () => {
  if (password.type === "password") {
    password.type = "text";
    mascot.classList.add('turn');
    trackingEnabled = false; // 👈 disable eye tracking
  } else {
    password.type = "password";
    mascot.classList.remove('turn');
    trackingEnabled = true; // 👈 re‑enable eye tracking
  }
});

// Sign in button redirect
const signinBtn = document.getElementById('signinBtn');
const username = document.getElementById('username');
signinBtn.addEventListener('click', () => {
  // Simple validation: check if username and password are not empty
  if (username.value.trim() !== '' && password.value.trim() !== '') {
    // Redirect to home.html
    window.location.href = 'home.html';
  } else {
    alert('Please enter username and password.');
  }
});

// Allow pressing Enter to submit
username.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    signinBtn.click();
  }
});

password.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    signinBtn.click();
  }
});

// Clear input fields on page load
username.value = '';
password.value = '';

// Also clear after a short delay to override any autofill
setTimeout(() => {
  username.value = '';
  password.value = '';
}, 100);

// Reset mascot position when returning to tab
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // Reset to initial state
    mascot.classList.remove('turn');
    trackingEnabled = true;
    pupilLeft.style.transform = 'translate(0px, 0px)';
    pupilRight.style.transform = 'translate(0px, 0px)';
    password.type = 'password';
  }
});
