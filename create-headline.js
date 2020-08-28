let review = document.querySelector(".add-headline__body");
let placeholders;
let activeTable = document.querySelector(".table-header__heading");
document.querySelector(`#${activeTable.innerText}`).style.display = "block";
let activePage = document.querySelector(`${activeTable.id} #page1`);
activePage.style.display = "block";
let activeBtn;


//Summernote Initialization
summerConfig = {
  tabsize: 2,
  toolbar: [
    ['style', ['style']],
    ['font', ['bold', 'underline', 'italic',]],
    ['insert', ['lin""k']],
    ['para', ['ul', 'ol']],
    ['font', [ 'superscript', 'subscript']]
  ]
};
$('#summernote').summernote(summerConfig);
$('#summernote').summernote('poppins', 'Arial');

//summernote for user headline
$('#new-headline').summernote(summerConfig);
const headlineNote = document.querySelector(".add-headline .note-editable");
const placeholdersInput = document.querySelector(".add-headline .note-editable");

//transition with gsap
const timelineDefault = {defaults: {duration: 0.4 }, paused: true, reversed: true};
const t1 = gsap.timeline(timelineDefault);
const t2 = gsap.timeline(timelineDefault);

t1.to('.overlay',{
  backdropFilter: "blur(5px)",
  display: "block"
})
.to(".add-headline",{
  top: "20%",
  opacity: 1,
  display: "block"
})

t2.to('.overlay',{
  delay: 0.8,
  display: "block"
})
.to(".editor", {
  display: "block",
  right: "6%",
  top: "10%",
  opacity: 1
})


//generate page numbers
function setPageNumbers(){
  const contents = document.querySelectorAll("#Content ul");
  const headlines = document.querySelectorAll("#Headlines ul");

  const generatePageNo = function(table){
    if(!table) return;
    let arrow = table[0].parentNode.querySelector(".table-nav__arrow");
    table.forEach((_, index) => {
      ele = `<span class="table-nav__page-no 
        ${index ? "" : "table-nav__page-no--active"}">
        ${index+1}
        </span>`
      arrow.insertAdjacentHTML("beforebegin", ele);
    });
  }
  generatePageNo(contents);
  generatePageNo(headlines);
}
setPageNumbers();
activeBtn = document.querySelector(".table-nav__page-no--active");

function playAnimation(tl){
  tl.reversed() ? tl.play() : tl.reverse();
}

//show headline or content in editor
function showInEditor(){
  playAnimation(t1);
  const headline = this.previousElementSibling.outerHTML.trim()
    .replace(/(?<=>|^|\s)\.{1,}(?=\s|$|<)/g, " <mark></mark> ");
  review.innerHTML = headline;
  placeholders = review.querySelectorAll("mark");
}

//change review placeholder with user input
function syncReview(e){
  let sync = () =>{
    let inputs = headlineNote.innerText.split("\n\n");
    inputs.forEach((input, index) => { 
      index < placeholders.length ?
      placeholders[index].textContent = input.trim() :
      ''; 
    });
  }
  setTimeout(sync, 0.1);
}

//remove overlay
function removeOverlay(e){
  
  if (this !== e.target) return;
    placeholdersInput.innerHTML = "";
    t1.reverse();
    t2.reverse();
}

function switchPages (page){
  activePage.style.display = "none";
  activePage = document.querySelector(`#${activeTable.innerText.trim()} #page${page.innerText.trim()}`);
  activePage.style.display = "block";
}

function switchBtns (btn){
  activeBtn.classList.remove("table-nav__page-no--active");
  activeBtn = btn;
  activeBtn.classList.add("table-nav__page-no--active");
}

function switchPgBtn(e){
  if(activeBtn.nextElementSibling.tagName !== "SPAN") return;
  switchPages(activeBtn.nextElementSibling);
  switchBtns(activeBtn.nextElementSibling);
}

function switchTables(e){
  activeTable.classList.remove("table-header__heading--active");
  let table = activeTable.innerText.trim();
  document.querySelector(`#${table}`).style.display = "none";
  e.target.classList.add("table-header__heading--active");
  activeTable = e.target;
  table = activeTable.innerText.trim();
  document.querySelector(`#${table}`).style.display = "block";
  
  //switch the buttons and pages
  switchBtns(document.querySelector(`#${table} .table-nav__page-no`));
  switchPages(document.querySelector(`#${table} .table-nav__page-no`));
}

//sync initial entry
headlineNote.addEventListener("keydown", syncReview);

//show and hide headline modal transition
document.querySelectorAll(".headline-list__btn").forEach(
  btn => btn.addEventListener("click", showInEditor.bind(btn, t1))
)
document.querySelector(".add-headline__close").addEventListener("click", () =>{
  placeholdersInput.innerHTML = "";
  playAnimation(t1);
})

//show and hide editor modal transition
document.querySelector(".add-headline__btn--insert").addEventListener("click", () =>{
  playAnimation(t1);
  playAnimation(t2);
})
document.querySelector(".editor__close-btn").addEventListener("click", function(){
  placeholdersInput.innerHTML = "";
  playAnimation(t2);
});

document.querySelector(".overlay").addEventListener("click", removeOverlay);

//insert headline/content into editor
document.querySelector(".add-headline__btn--insert").addEventListener("click", () =>{
  document.querySelector(".editor .note-editable").innerHTML += review.innerHTML;
})

//make table header active
document.querySelectorAll(".table-header__heading").forEach( heading => 
  heading.addEventListener("click", switchTables)
)

//add event listener to page numbers
document.querySelectorAll(".table-nav__page-no").forEach( num => {
  num.addEventListener("click", (e) =>{
    switchPages(e.target);
    switchBtns(e.target);
  })
})

document.querySelectorAll(".table-nav__arrow").forEach(arrow => 
  arrow.addEventListener("click", switchPgBtn));