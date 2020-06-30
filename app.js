//Navbar control
const arrow = document.querySelector(".arrow-right");


arrow.addEventListener("click", showSmallMenu);

function showSmallMenu(){
    document.querySelector(".header").classList.toggle("small-menu");
    document.querySelector(".header--left").classList.toggle("small-menu");
    document.querySelector(".header--right").classList.toggle("small-menu");
    document.querySelector(".dashboard").classList.toggle("small-menu");
    document.querySelector(".header--right .arrow-right").classList.toggle("small-menu");
    document.querySelector(".header--left .big-menu").classList.toggle("small-menu");
    document.querySelector(".dashboard--menu--farleft").classList.toggle("small-menu");
    try{
        document.querySelector(".dashboard--view--welcome").classList.toggle("small-menu");
    }
    catch(e){console.log(e.message) }
    
    menuItemViews = document.querySelectorAll(".menu-item-view");
    menuItemViews.forEach(item => { item.classList.toggle("small-menu")});
};

//display logout button
const profileArrow = document.querySelector(".header--right .profile-arrow");
const logoutButton = document.querySelector(".header--right .log-out");
profileArrow.addEventListener("click", showLogout);

function showLogout(e){  
  this.querySelector("svg")
    .classList.toggle("log-out-open");
  logoutButton.classList.toggle("log-out-open");
}