document.addEventListener("DOMContentLoaded", () => {

  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".admin-section");
  const topbar = document.querySelector(".admin-topbar");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      // Highlight active button
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Switch visible section
      const target = btn.dataset.section;
      sections.forEach(sec => sec.classList.remove("active"));
      document.getElementById(target).classList.add("active");

      // Update top bar
      topbar.textContent = btn.textContent;
    });
  });

  // Activities
  const activityList = document.getElementById("activity-list");
  const addActivityBtn = document.getElementById("add-activity");

  addActivityBtn.addEventListener("click", () => {
    const name = document.getElementById("activity-name").value;
    const desc = document.getElementById("activity-desc").value;

    if (!name) return;

    const li = document.createElement("li");
    li.textContent = `${name} – ${desc}`;
    activityList.appendChild(li);

    document.getElementById("activity-name").value = "";
    document.getElementById("activity-desc").value = "";
  });

  // Users (demo)
  const userList = document.getElementById("user-list");
  ["Alice", "Bob", "Charlie", "Derek"].forEach(user => {
    const li = document.createElement("li");
    li.textContent = user;
    userList.appendChild(li);
  });

  // Site settings
  document.getElementById("save-site").addEventListener("click", () => {
    alert("Site settings saved!");
  });

  // Map settings
  document.getElementById("save-map").addEventListener("click", () => {
    alert("Map settings saved!");
  });

});
