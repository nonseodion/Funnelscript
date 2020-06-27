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
        document.querySelector(".editor-section").classList.toggle("small-menu");
    }
    catch(e){console.log(e.message)}
    try{
        document.querySelector(".dashboard--view--welcome").classList.toggle("small-menu");
    }
    catch(e){console.log(e.message) }
    
    menuItemViews = document.querySelectorAll(".menu-item-view");
    menuItemViews.forEach(item => { item.classList.toggle("small-menu")});
};

//show menu-item-view
const farLeftMenuitems =  Array.from(document.querySelectorAll(".dashboard--menu--farleft li"));
const closeLeftMenuitems =  Array.from(document.querySelectorAll(".dashboard--menu--closeleft li"));

farLeftMenuitems.forEach(item => item.addEventListener("click", showContent));
closeLeftMenuitems.forEach(item => item.addEventListener("click", showContent));

farLeftMenuitems.forEach(item => item.addEventListener("click", checkIfInDashboard));
closeLeftMenuitems.forEach(item => item.addEventListener("click", checkIfInDashboard));

let selectedItem = 0;

function checkIfInDashboard(){
if(!document.querySelector(".dashboard--view")){
  setTimeout( ()=> console.log("working"), 3000)
  }
}

function showContent(e){
    //show color
    let index = farLeftMenuitems.indexOf(this)==-1 
                    ?closeLeftMenuitems.indexOf(this)
                    :farLeftMenuitems.indexOf(this);
    
    if(selectedItem == index) return;
    

    let closeLeftMenuitem1 = closeLeftMenuitems[selectedItem];
    let closeLeftMenuitem2 = closeLeftMenuitems[index];
    

    link1 = closeLeftMenuitem1.querySelector("a");
    link2 = closeLeftMenuitem2.querySelector("a");
    
    link1.classList.toggle("purple")
    link2.classList.toggle("purple");

    //show Content
    target1 = closeLeftMenuitem1.dataset.target;
    target2 = closeLeftMenuitem2.dataset.target;
    
    view1 = document.getElementById(target1);
    view2 = document.getElementById(target2);

    view1.classList.toggle("no-display");
    view2.classList.toggle("no-display");
    if(index == 0 || selectedItem == 0) document.querySelector(".dashboard--view").classList.toggle("sitting-human");
    

    selectedItem = index;
}


//Editor-section
const sectionTemplates = document.querySelectorAll(".section--template");
const editorOverlay = document.querySelector(".editor-section-overlay");
const sectionList = document.querySelector(" .editor-section-overlay--add-section");
const templateList = document.querySelector(" .editor-section-overlay--add-template");
const templateSpans = document.querySelectorAll(".section--template span");
const editor = document.getElementById("editor");
//Initialize Quill editor
  var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['align', {'align': 'right'}, {'align': 'center'}, {'align': 'justify'}],
      ['image'],
      ['code-block']
    ]
  },
  });

  
//section modal
let openedSection;
sections = Array.from(document.querySelectorAll(".section"));
sections.forEach(section => section.addEventListener("click", openSection));

function openSection(e, ignoreThis){
  if(openedSection){
    document.querySelector(`#${openedSection} .section--templates`).classList.toggle("open");
    document.querySelector(`#${openedSection} .section--name`).classList.toggle("add-border-bottom");
    document.querySelector(`#${openedSection} .arrow`).classList.toggle("rotate-90deg");
  }
  
  if(openedSection !== this.id && !ignoreThis){
    
    document.querySelector(`#${this.id} .section--templates`).classList.toggle("open");
    document.querySelector(`#${this.id} .section--name`).classList.toggle("add-border-bottom");
    document.querySelector(`#${this.id} .arrow`).classList.toggle("rotate-90deg");
    openedSection = this.id;
  }
  else{ openedSection = null};
}


//hide/show editor-overlay
document.querySelector(".editor-section-overlay").addEventListener("click", hideModal);
document.querySelectorAll(".editor-section-overlay .close").forEach(close => close.addEventListener("click", hideModal));

//shows modal
document.querySelector(".editor-section--control-top .first").addEventListener("click", showModal);
document.querySelector(".editor-section--control-top .second").addEventListener("click", showModal);
//stopPropagation when modal is clicked
document.querySelector(".editor-section-overlay--add-section")
  .addEventListener("click", (e)=> {
    e.stopPropagation();
  });

  document.querySelector(".editor-section-overlay--add-template")
  .addEventListener("click", (e)=> {
    e.stopPropagation();
  });

  document.querySelectorAll(".section--template").forEach( text =>
    text.addEventListener("click",
      (e) => e.stopPropagation()
    ))


function showModal(e){
  editorOverlay.classList.add("display");
  if(this.textContent === "Add Section"){
    setTimeout(() => sectionList.classList.add("slide-in"), 100);
  }
  else{
    setTimeout(() => templateList.classList.add("slide-in"), 100);
  }
}

function hideModal(e){
  templateList.classList.remove("slide-in");
  sectionList.classList.remove("slide-in");
  setTimeout(() => editorOverlay.classList.remove("display"), 500);
  openSection(e, true);
  e.stopPropagation();
}


//loop through editable contents in each sectiontemplate
for (let i = 0; i < templateSpans.length; i++){
  templateSpans[i].tabIndex = `${i+1}`;
}


sectionTemplates.forEach(sectionTemplate =>{
  const spans = sectionTemplate.querySelectorAll("span");
  for(let i = 0; i<spans.length; i++){

    spans[i].addEventListener("focus", () => spans[i].select());
    
    if(i==0) {
      spans[i].addEventListener("focus", () =>
        spans[spans.length-1].focus()
      )
    }
    else if( i == spans.length-1){
      spans[i].addEventListener("focus", () =>
        spans[1].focus()
      )
    }
  }
});

//add Enter event to sectionTemplates, so they appear in editor
sectionTemplates.forEach(
  sectionTemplate => sectionTemplate.addEventListener("keydown", (e) =>{
    if(e.keyCode == 13) {
      e.preventDefault();
      paragraph = document.createTextNode("p");
      paragraph.textContent = sectionTemplate.textContent.trim();
      let qlEditor = document.querySelector(".ql-editor");
      qlEditor.appendChild(paragraph);
    }
  }
))