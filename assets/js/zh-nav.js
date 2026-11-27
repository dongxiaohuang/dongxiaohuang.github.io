// On /zh/ pages, point the theme navbar at the Chinese pages and translate its labels.
// The navbar markup is owned by al_folio_core, so this runs after it renders.
(function () {
  if (location.pathname.indexOf("/zh/") !== 0) return;
  var map = {
    "/": ["/zh/", "关于"],
    "/publications/": ["/zh/publications/", "研究"],
    "/projects/": ["/zh/projects/", "项目"],
    "/blog/": ["/zh/blog/", "博客"],
    "/cv/": ["/zh/cv/", "简历"],
  };
  document.documentElement.lang = "zh-CN";
  var brand = document.querySelector(".navbar-brand");
  if (brand) brand.setAttribute("href", "/zh/");
  document.querySelectorAll(".navbar-nav .nav-link").forEach(function (a) {
    var m = map[a.getAttribute("href")];
    if (!m) return;
    a.setAttribute("href", m[0]);
    var label = Array.prototype.find.call(a.childNodes, function (n) {
      return n.nodeType === 3 && n.textContent.trim();
    });
    if (label) label.textContent = m[1];
    var li = a.closest(".nav-item");
    var here = location.pathname === m[0] || (m[0] !== "/zh/" && location.pathname.indexOf(m[0]) === 0);
    if (li) li.classList.toggle("active", here);
  });
})();
