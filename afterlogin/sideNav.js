document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");
  const mainContent = document.getElementById("mainContent");

// Handle sidebar toggle
document.getElementById('toggleBtn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    
    // Toggle the 'closed' class
    sidebar.classList.toggle('closed');
});

});
