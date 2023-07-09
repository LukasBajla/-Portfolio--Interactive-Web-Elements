const filterTag = {
  $: {
    imgContainer: document.querySelector("#imageContainer"),
    filterButtons: document.querySelectorAll(".filters__buttons button"),
  },
  init() {
    filterTag.importImages();
    filterTag.filterButtonStyle();
  },
  importImages() {
    fetch("./images/tagFiltering/images.json")
      .then((result) => result.json())
      .then((data) => {
        data.forEach((image) => {
          const newEl = document.createElement("img");
          newEl.src = image.url;
          newEl.alt = image.name;
          newEl.id = image.category;
          newEl.setAttribute("aria-hidden", false);
          filterTag.$.imgContainer.appendChild(newEl);
        });

        /*  FILTER by ID */
        filterTag.$.filterButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            const imgs = document.querySelectorAll("#imageContainer img");
            imgs.forEach((filitem) => {
              filitem.setAttribute("aria-hidden", false);
              if (button.id == "filterAll") {
                filitem.setAttribute("aria-hidden", false);
              } else if (filitem.id != button.id) {
                filitem.setAttribute("aria-hidden", true);
              }
            });
          });
        });
      });
  },
  filterButtonStyle() {
    filterTag.$.filterButtons.forEach(button => {
        button.addEventListener("click", e => {
            filterTag.$.filterButtons.forEach(btn => btn.setAttribute("aria-checked", false))
            e.target.setAttribute("aria-checked", true)
        })
    })
  },
};

window.addEventListener("load", filterTag.init);
