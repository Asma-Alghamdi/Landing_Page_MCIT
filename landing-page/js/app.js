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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const mainContent = document.getElementsByTagName('section');
const navBar = document.getElementById('navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function remove_active(){
    const preActiveSection = document.querySelector('.your-active-class');
    if(preActiveSection != null && preActiveSection != ""){
        preActiveSection.classList.remove('your-active-class');
    }
}


function activeNavItem(dataNav){

    const listItems = navBar.children;
    const listArray = Array.from(listItems);

    for(let i = 0; i < listArray.length; i++ ){
        if(dataNav == listArray[i].innerText){
            listArray[i].childNodes[0].classList.add("active");
        }else{
            listArray[i].childNodes[0].classList.remove("active");
        }
    }

}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    for (const block of mainContent) {
        const newListItem= document.createElement('li');
        const newA = document.createElement('a');

        newA.innerHTML = block.getAttribute('data-nav');
        newA.className = "menu__link";
        newA.href = '#' + block.getAttribute('id');

        newListItem.append(newA);
        navBar.appendChild(newListItem);
    }
}

// Add class 'active' to section when near top of viewport
function SetSectionActive(){
    let activeDataNav = '';
    remove_active();

    for (const block of mainContent) {
        var bounds = block.getBoundingClientRect();
        if (bounds.top >= -400 && bounds.top <= 150) {
            block.classList.add("your-active-class");
            activeDataNav= block.getAttribute('data-nav');
          }
      }

    activeNavItem(activeDataNav);

}


// Scroll to anchor ID using scrollTO event
function scrollToAnchor(e){
    e.preventDefault();
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        scrollToAnchor(e)
    });
});

// Set sections as active
document.addEventListener("scroll", SetSectionActive);


