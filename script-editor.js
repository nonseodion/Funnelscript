document.querySelector(".editor-section").classList.toggle("small-menu");

//Editor-section
const sectionTemplates = document.querySelectorAll(".section--template");
const editorOverlay = document.querySelector(".editor-section-overlay");
const sectionList = document.querySelector(" .editor-section-overlay--add-section");
const templateList = document.querySelector(" .editor-section-overlay--add-template");
const templateSpans = document.querySelectorAll(".section--template span");
const editor = document.getElementById("editor"); 
const downloadOptions = document.querySelector(".editor-section-overlay--download-option");

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
document.querySelector(".templates-close").addEventListener("click", hideModal);

//shows modal
document.querySelector(".editor-section--control-top .first").addEventListener("click", showModal);
document.querySelector(".editor-section--control-top .second").addEventListener("click", showModal);
document.querySelector(".editor-section--control-bottom a.second").addEventListener("click", showModal);

//stopPropagation when modal is clicked
document.querySelector(".editor-section-overlay--add-section")
  .addEventListener("click", myStopPropagation);

document.querySelector(".editor-section-overlay--add-template")
.addEventListener("click", myStopPropagation);

document.querySelectorAll(".section--template").forEach( text =>
  text.addEventListener("click", myStopPropagation));
downloadOptions.addEventListener("click", myStopPropagation);



function myStopPropagation(e){
  e.stopPropagation();
}

function showModal(e){
  editorOverlay.classList.add("display");
  if(this.textContent === "Add Section"){
    setTimeout(() => sectionList.classList.add("slide-in"), 100);
  }
  else if(this.textContent === "Export Script"){
    setTimeout(() => downloadOptions.classList.add("slide-in"), 100);
  }
  else{
    setTimeout(() => templateList.classList.add("slide-in"), 100);
  }
  console.log(this.nextSibling);
}

function hideModal(e){
  templateList.classList.remove("slide-in");
  sectionList.classList.remove("slide-in");
  downloadOptions.classList.remove("slide-in");
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

//add Enter event to sections, so they appear in editor
//add click event to Templates, so they appear in editor

const templates = document.querySelectorAll(".section--templates p");
templates.forEach(template => template.addEventListener("click", enterEditor));

sectionTemplates.forEach(
  sectionTemplate => sectionTemplate.addEventListener("keydown", enterEditor)
)
  
  function enterEditor(e){
    if(e.keyCode === 13) {
      e.preventDefault();
      showInEditor(this, e);
    }
    else if(e.type === "click"){
      showInEditor(e.target, e);
    }
  }

  function showInEditor(sectionType, e){
      node = document.createElement(`${sectionType.tagName}`);
      console.log(node);
      node.textContent = e.target.parentNode.textContent.trim();
      const qlEditor = document.querySelector(".ql-editor");
      qlEditor.appendChild(node);
  }
