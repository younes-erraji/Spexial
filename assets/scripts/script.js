let rootElement = document.querySelector(":root"),
  landingPage = document.querySelector(".landing-page"),
  backs = ["B-1.jpg", "B-2.jpg", "intro-bg.png"],
  backLength = backs.length,
  xRandom = 0,
  settings = document.querySelector(".settings-box"),
  toggleSettings = document.querySelector(".settings-box .toggle-settings"),
  settingsIcon = document.querySelector(".settings-box .toggle-settings .icon"),
  autoBack = document.querySelectorAll(
    ".settings-box .settings-container span"
  ),
  randomBack,
  backImage,
  colors = document.querySelectorAll(
    ".settings-box .settings-container .recolor ul li"
  );
function randomBackground() {
  randomBack = setInterval(() => {
    with (Math) {
      xRandom = floor(random() * backLength);
    }
    landingPage.style.backgroundImage = `url('./assets/images/backs/${backs[xRandom]}')`;
    backImage = `url('./assets/images/backs/${backs[xRandom]}')`;
  }, 18000);
}

toggleSettings.onclick = () => {
  settings.classList.toggle("shown");
  settingsIcon.classList.toggle("fa-spin");
};

if (localStorage.background === "off") {
  document
    .querySelector(".settings-box .settings-container span.off")
    .classList.add("active");
  landingPage.style.backgroundImage = localStorage.backgroundImage;
} else if (localStorage.background === "on") {
  randomBackground();
  document
    .querySelector(".settings-box .settings-container span.on")
    .classList.add("active");
} else {
  randomBackground();
  document
    .querySelector(".settings-box .settings-container span.on")
    .classList.add("active");
}

autoBack.forEach((element) => {
  element.addEventListener("click", function () {
    if (this.classList.contains("on")) {
      if (!this.classList.contains("active")) {
        this.classList.add("active");
        this.nextElementSibling.classList.remove("active");
        localStorage.background = this.dataset.background;
        randomBackground();
      }
    } else if (this.classList.contains("off")) {
      if (!this.classList.contains("active")) {
        this.classList.add("active");
        this.previousElementSibling.classList.remove("active");
        clearInterval(randomBack);
        localStorage.background = this.dataset.background;
        localStorage.backgroundImage = backImage;
      }
    }
  });
});

colors.forEach((color) => {
  color.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      removeSelectedClass();
      this.classList.add("selected");
      // rootElement.style["--main-color"] = this.dataset.color; // Not working
      rootElement.style.setProperty("--main-color", this.dataset.color);
      localStorage.setItem("--main-color", this.dataset.color);
    }
  });
});

function removeSelectedClass() {
  colors.forEach((color) => {
    color.classList.remove("selected");
  });
}

let storageColor = localStorage["--main-color"];
// if (storageColor !== null && storageColor !== undefined && storageColor !== '')
if (storageColor) {
  rootElement.style.setProperty("--main-color", storageColor);
  removeSelectedClass();
  colors.forEach((color) => {
    if (color.dataset.color === storageColor) {
      color.classList.add("selected");
      rootElement.style.setProperty("--main-color", color.dataset.color);
    }
  });
}
const skills = document.querySelector(".skills"),
  skillBoxes = document.querySelectorAll(".skill-box .skill-progress span");
window.onscroll = function () {
  let skillOffsetTop = skills.offsetTop,
    skillOuterHeight = skills.offsetHeight,
    windowHeight = this.innerHeight,
    windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillOffsetTop + skillOuterHeight - windowHeight) {
    skillBoxes.forEach((skill) => {
      skill.style.width = skill.parentElement.dataset.progress;
    });
  }
};

let gallery = document.querySelectorAll(".gallery .images-box img");
gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);

    let imageHeading = document.createElement("h4"),
      imageHeadingContent = document.createTextNode(img.alt || "Anonymous");
    imageHeading.appendChild(imageHeadingContent);
    popupBox.prepend(imageHeading);

    let closeSpan = document.createElement("span"),
      closeX = document.createTextNode("X");
    closeSpan.appendChild(closeX);
    closeSpan.classList.add("close-span");
    popupBox.appendChild(closeSpan);

    document.body.appendChild(popupBox);

    // document.querySelector(".close-span").onclick = function () {
    //   document.querySelector(".popup-box").remove();
    //   document.querySelector(".popup-overlay").remove();
    // };

    // document.querySelector(".popup-overlay").onclick = function () {
    //   document.querySelector(".popup-box").remove();
    //   this.remove();
    // };
  });
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-span")) {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  } else if (e.target.classList.contains("popup-overlay")) {
    document.querySelector(".popup-box").remove();
    e.target.remove();
  }
});

const allBullets = document.querySelectorAll(".nav-bullets .bullet"),
  allLinks = document.querySelectorAll(".list li a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span"),
  bulletsContainer = document.querySelector(".nav-bullets"),
  bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .show").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .hide").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear():
  localStorage.removeItem("--main-color");
  localStorage.removeItem("background");
  localStorage.removeItem("bullets_option");
  window.location.reload(true);
};

let toggleButton = document.querySelector(".toggle-menu"),
  tLinks = document.querySelector("nav ul");

toggleButton.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== tLinks) {
    console.log("1");
    if (tLinks.classList.contains("open")) {
      toggleButton.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation();
};
