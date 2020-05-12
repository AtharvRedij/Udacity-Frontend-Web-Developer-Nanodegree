//////////// GLOBAL VALRIABLES

// Navbar
const navbarList = document.querySelector("#navbar__list");

// Main Tag
const mainElement = document.querySelector("main");

// Counting number of children of main to dynamically populate navbar
const divCount = mainElement.childElementCount - 1;

// Variable to keep track of active link
let activeNavLink = 1;

//////////// HELPER FUNCTIONS

// Helper function to change name of section to its ID
const nameToId = name => {
  const parts = name.split(" ");
  return parts[0].toLowerCase() + parts[1];
};

// Function to check if element is in viewport
const isInViewport = elem => {
  let bounding = elem.getBoundingClientRect();
  return (
    bounding.top <= 50 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Function to check if all sections are in viewport
const checkIfSectionInView = () => {
  for (i = 1; i < divCount + 1; i++) {
    let sectionInFullView = document.getElementById("section" + i);

    const currentNavItem = document.querySelector("#nav-item-section" + i);

    if (isInViewport(sectionInFullView)) {
      sectionInFullView.classList.add("active");

      if (i !== activeNavLink) {
        const lastActiveNavLink = document.querySelector(
          "#nav-item-section" + activeNavLink
        );
        lastActiveNavLink.classList.remove("active");
        activeNavLink = i;
        currentNavItem.classList.add("active");
      }
    } else {
      sectionInFullView.classList.remove("active");
    }
  }
};

//////////// EVENT LISTNERS

// Listener function to check if navItem is clicked if so scroll to the selected section
navItemClickListener = event => {
  const sectionId = nameToId(event.target.textContent);

  const currentSection = document.querySelector("#" + sectionId);

  currentSection.scrollIntoView({ behavior: "smooth" });
};

window.addEventListener("scroll", checkIfSectionInView);

//////////// MAIN CODE

// For loop to create a navItem, set its properties and add to navbar
for (let i = 1; i <= divCount; i++) {
  const navItem = document.createElement("li");
  navItem.setAttribute("id", "nav-item-" + nameToId("Section " + i));
  navItem.textContent = "Section " + i;
  navItem.classList.add("menu__link");

  if (i == 1) {
    navItem.classList.add("active");
  }

  navItem.addEventListener("click", navItemClickListener);

  navbarList.appendChild(navItem);
}
