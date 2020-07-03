//hide or show presentation  template modal
document.querySelector(".video-script-section-overlay .close").addEventListener(
    "click", hideModal);
const presentationTemplates = document.querySelector(".video-script-templates");
const videoPresentationOverlay = document.querySelector(".video-script-section-overlay");
document.querySelector(".video-script-section .use-template-btn")
.addEventListener("click", showModal);
videoPresentationOverlay.addEventListener("click", hideModal);

function hideModal(e){
    closeTemplate();
    
    presentationTemplates.classList.remove("slide-in");
    setTimeout(() => videoPresentationOverlay.classList.remove("display"), 500);
}

function showModal(e){
    
    videoPresentationOverlay.classList.add("display");document.querySelector(".open")
    setTimeout(() => presentationTemplates.classList.add("slide-in"), 100);
}

//hide or show template
const headings = document.querySelectorAll(".video-script-template .heading");
headings.forEach(heading => heading.addEventListener("click", showTemplate));

function showTemplate(){
    if(this == closeTemplate()) return;
    console.log(this);
    this.classList.add("add-border-bottom");
    this.nextElementSibling.classList.add("open");
    this.querySelector(".arrow").classList.add("rotate-90deg");
}

function closeTemplate(){
    openedTemplate = document.querySelector(".open");
    if(openedTemplate){
        openedTemplate.previousElementSibling.classList.remove("add-border-bottom");
        openedTemplate.classList.remove("open");
        openedTemplate.previousElementSibling.querySelector(".arrow").classList.remove("rotate-90deg");
        return openedTemplate.previousElementSibling;
    }
    
}


//stop propagation
document.querySelector(".video-script-templates").addEventListener("click", myStopPropagation);
function myStopPropagation(e){
    e.stopPropagation();
  }

//add template to body
const templates = document.querySelectorAll(".video-script-template--body");
templates.forEach(template => template.addEventListener("click", addTemplate));

function addTemplate(e){
    templateSections = this.querySelectorAll(".input");
    const textareas = document.querySelectorAll("textarea");
    for(let i = 0; i<textareas.length; i++){
        textareas[i].value = templateSections[i].textContent;
    }
}