/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const nav = document.querySelector(".navbar__menu");
const position = 0;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
window.onload = function () {
  loadNavigationItems();
  initializeScrollBehaviour();
};

let timer = null;
window.addEventListener("scroll", () => {
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    document.getElementById("myBtn").style.display = "none";
  }, 5000);
});
// When the user clicks on the button, scroll to the top of the document
const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

const scrollSmoothly = (event) => {
  let element = event.target;
  let section_id = element.getAttribute("data-section-id");
  document.querySelector("#" + section_id).scrollIntoView({
    behavior: "smooth",
  });

  let previousActiveElement = document.getElementsByClassName("active-class");
  previousActiveElement[0].className = "";

  let current_active_section = document.getElementById(section_id);
  current_active_section.className = "active-class";
};

const loadNavigationItems = () => {
  let sections = document.getElementsByTagName("section");
  let navbar__list = document.getElementById("navbar__list");
  for (let i = 0; i < sections.length; ++i) {
    let section_id = sections[i].getAttribute("id");
    let li = document.createElement("li");
    li.className = "navbar__item";
    let span = document.createElement("span");
    span.setAttribute("data-section-id", section_id);
    span.onclick = scrollSmoothly;
    span.innerHTML = sections[i].getAttribute("data-nav");
    li.appendChild(span);
    navbar__list.appendChild(li);
  }
};
// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click
const initializeScrollBehaviour = () => {
  var mybutton = document.getElementById("myBtn");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    setActiveClass();
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
};

const getSectionDetails = () => {
  let sections = document.getElementsByTagName("section");
  let each_section_height = {};
  for (let i = 0; i < sections.length; ++i) {
    let section_id = sections[i].getAttribute("id");
    let section_height = document.getElementById(section_id).offsetTop;
    each_section_height[section_id] = section_height;
  }
  return each_section_height;
};

const setActiveClass = () => {
  let sections_and_heights = getSectionDetails();
  for (let key in sections_and_heights) {
    let low = sections_and_heights[key] - 50;
    let high = sections_and_heights[key] + 50;

    if (
      low <= document.documentElement.scrollTop &&
      document.documentElement.scrollTop <= high
    ) {
      let previousActiveElement = document.getElementsByClassName(
        "active-class"
      );
      previousActiveElement[0].className = "";

      let current_active_section = document.getElementById(key);
      current_active_section.className = "active-class";
    }
  }
};
