const sidebar = document.querySelector("#sidebar");

sidebar.addEventListener("mouseover", function () {
  sidebar.classList.add("expand");
});

sidebar.addEventListener("mouseout", function () {
  timeoutId = setTimeout(function () {
    sidebar.classList.remove("expand");
  }, 10000);
});