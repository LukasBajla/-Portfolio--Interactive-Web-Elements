const shopList = {
  $: {
    inputContent: document.querySelector("#shoplist-input-field"),
    inputBtn: document.querySelector("#shoplist-input-btn"),
    shopList: document.querySelector("#shoplist-list"),
    newItem: document.querySelectorAll("#shoplist-newItem"),
    deleteAll: document.querySelector("#shoplist-delete-all"),
  },
  init() {
    shopList.showLocalData();
    shopList.deleteAll();
    shopList.createShoppingItem();
  },
  createShoppingItem() {
    shopList.$.inputBtn.addEventListener("click", (e) => {
      if (shopList.$.inputContent.value == "") return;
      createElements();
      setData();
    });
    shopList.$.inputContent.addEventListener("keypress", (e) => {
      if (shopList.$.inputContent.value == "") return;
      else if (e.key === "Enter") {
        createElements();
        setData();
      } else return;
    });

    function createElements() {
      const tmplDiv = `
      <p id="shoplist-newItem">${shopList.$.inputContent.value}</p>
      <button id="shoplist-delete-btn"><i class="fa-solid fa-trash-can"></i></button>
    `;
      const newDiv = document.createElement("div");
      newDiv.classList.add("shoplist__item");
      newDiv.innerHTML = tmplDiv;
      shopList.$.shopList.appendChild(newDiv);

      const deleteBtn = document.querySelectorAll("#shoplist-delete-btn");
      shopList.deleteShoppinItem(deleteBtn);
    }

    function setData() {
      localStorage.setItem(
        `shopItem${localStorage.length+1}`,
        shopList.$.inputContent.value
      );
      console.log(localStorage);
    }
  },
  deleteShoppinItem(deleteBtn) {
    deleteBtn.forEach((button) => {
      button.addEventListener("click", (e) => {

        /* Delete div element*/
        const parentDiv = button.closest(".shoplist__item");
        parentDiv.remove();

        /*Get index of deleted item and remove from local storage*/
        const newItemSet = document.querySelectorAll("#shoplist-newItem");
        localStorage.clear()
        Array.from(newItemSet).forEach((item) => {
          localStorage.setItem(
            `shopItem${localStorage.length+1}`,
            item.innerHTML
          );
        });
        console.log(localStorage);
      
      });
    });
  },
  deleteAll() {
    shopList.$.deleteAll.addEventListener("click", (e) => {
      localStorage.clear();
      console.log("Local storage cleared");
      const allItems = document.querySelectorAll(".shoplist__item");
      allItems.forEach((item) => {
        item.remove();
      });
    });
    console.log(localStorage);
  },
  showLocalData() {
    if(localStorage.length == 0) return;
    for (let i = 1; i <= localStorage.length; i++) {
      const tmplDiv = `
      <p id="shoplist-newItem">${localStorage.getItem(`shopItem${i}`)}</p>
      <button id="shoplist-delete-btn"><i class="fa-solid fa-trash-can"></i></button>
    `;
      const newDiv = document.createElement("div");
      newDiv.classList.add("shoplist__item");
      newDiv.innerHTML = tmplDiv;
      shopList.$.shopList.appendChild(newDiv);

      const deleteBtn = document.querySelectorAll("#shoplist-delete-btn");
      shopList.deleteShoppinItem(deleteBtn);
    }
  },
};

window.addEventListener("load", shopList.init);
