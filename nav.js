const Nav = {
  nav: {
    burgerBtn: document.querySelector("#nav-hamburger"),
    burgerList: document.querySelector("#nav-list"),
  },
  init() {
    Nav.navBurger();
  },
  navBurger() {
    // Nav.nav.burgerList.classList.add("hidden");
    Nav.nav.burgerBtn.addEventListener("click", (e) => {
      Nav.nav.burgerList.classList.toggle("hidden");
    });
  },
};

window.addEventListener("load", Nav.init);
