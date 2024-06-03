// Function to update the favicon based on dark mode
function updateFavicon() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const favicon = document.getElementById('tab-icon');
    if (isDarkMode) {
      favicon.href = '../images/material-symbols--restaurant.png';
    } else {
      favicon.href = '../images/material-symbols--restaurant (1).png';
    }
  }

  // Check for dark mode on initial load
  updateFavicon();

  // Listen for changes in dark mode preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);