const App = {
  $: {
    lightbox: document.querySelector(".lightbox"),
    galleryImgs: document.querySelectorAll("#gallery-item"),
    gallery: document.querySelector(".gallery"),
    arrowForward: document.querySelector("#arrow-forward"),
    arrowBack: document.querySelector("#arrow-back"),
  },
  init() {
    App.lightbox();
  },
  lightbox() {

    const lightboxCont = App.$.lightbox.querySelector(".container");

    // show clicked img in lightbox
    App.$.galleryImgs.forEach((item) => {
      item.addEventListener("click", (e) => {
        App.$.lightbox.classList.toggle("hidden");
        while (lightboxCont.firstChild) {
          lightboxCont.removeChild(lightboxCont.firstChild);
        }
        const img = document.createElement("img");
        const imgSource = item.querySelector("img");
        img.src = imgSource.src;
        lightboxCont.appendChild(img);
        item.classList.add("gallery-item-active");
      });
    });

    // universal function - move through gallery
    const switchGallery = (currentImg, targetImg) => {
      // get current img, get previous img and current lightbox img
      const currentLightbox = App.$.lightbox.querySelector("img");
      //swap sources and change 'current' img
      currentLightbox.src = targetImg.firstElementChild.src;
      currentImg.classList.remove("gallery-item-active");
      targetImg.classList.add("gallery-item-active");
    }

    // move through gallery backwards 
    const galleryItemBack = () => {
      const currentImg = App.$.gallery.querySelector(".gallery-item-active");
      const targetImg = currentImg.previousElementSibling;
      //break if no previous child, aka first img in gallery
      if(!targetImg) return;
      switchGallery(currentImg, targetImg)
    }
     // move through gallery forwards
    const galleryItemForward = () => {
      const currentImg = App.$.gallery.querySelector(".gallery-item-active");
      const targetImg = currentImg.nextElementSibling;
      //break if no next child, aka it's the last img in gallery
      if(!targetImg) return;
      switchGallery(currentImg, targetImg)
    }
    // call functions to move through gallery while in lightbox
    App.$.arrowBack.addEventListener("click",galleryItemBack)
    App.$.arrowForward.addEventListener("click",galleryItemForward)

    // using keyboard arrows to move through lightbox / gallery ------------- TODO
    window.addEventListener("keydown", (e) => {
      if(App.$.lightbox.className.includes("hidden") == false) {
        if(e.key === 'ArrowRight') galleryItemForward();
        if(e.key === 'ArrowLeft') galleryItemBack();
        if(e.key === 'Escape') {
          App.$.lightbox.classList.toggle("hidden");
          App.$.galleryImgs.forEach(item => item.classList.remove("gallery-item-active"))
        }
      }
    });
   

    // Lightbox touch screen scrolling
    (lightboxTouchScreen = () => {
    
    let touchstartX = 0
    let touchendX = 0

    function checkDirection() {
      if (touchendX < touchstartX) galleryItemBack()
      if (touchendX > touchstartX) galleryItemForward()
    }
    
    document.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX
    })
    
    document.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX
      checkDirection()
    })
  })();


    // Exit lightbox ------------- TODO
    App.$.lightbox.addEventListener("click", (e) => {
      console.log(e.target);
      console.log(e.currentTarget);
      if (e.target != e.currentTarget) return;
      App.$.lightbox.classList.toggle("hidden");
      App.$.galleryImgs.forEach(item => item.classList.remove("gallery-item-active"))
    });
  },  
};

window.addEventListener("load", App.init);
