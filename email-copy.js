let activeForm = document.querySelector("#step1");
activeForm.style.display = "block";

const nextBtns = document.querySelectorAll(".email-btns__btn--next");
const backBtns = document.querySelectorAll(".email-btns__btn--back");

document.querySelectorAll(".email-btns__btn").forEach(btn => {
  btn.addEventListener("click", () => setTimeout(() => document.documentElement.scrollTop = 0, 10));
});

//add input 
function addInput (){
  this.parentNode.insertAdjacentHTML("beforebegin", '<input type="text" class="email-detail__input"></input>');
}
document.querySelectorAll(".email-detail__add").forEach( add => add.addEventListener("click", addInput));

//also next
function validateForm(e){
  let next = [...nextBtns].indexOf(this) + 2;
  let stop = false;
  form = document.querySelector(`#step${next - 1}`);
  form.querySelectorAll(`input[type = text]`).forEach(
    input => {
      if(!input.value){
        form.querySelector(".warning").style.display = "block";
        e.stopImmediatePropagation();
        stop = true;
      }
    }
  )
  if(stop) return;
  if(next >= nextBtns.length + 1) return;
  setActiveForm(document.querySelector(`#step${next}`));
}

//back
function goBack(){
  let prev = [...backBtns].indexOf(this) + 1;
  setActiveForm(document.querySelector(`#step${prev}`));
}

function setActiveForm(form){
  activeForm.style.display = "none";
  activeForm = form;
  activeForm.style.display = "block";
}

document.querySelectorAll(".email-btns__btn--next").forEach(
  btn => btn.addEventListener("click", validateForm));

document.querySelectorAll(".email-btns__btn--back").forEach(
  btn => btn.addEventListener("click", goBack));


function generate(){
  const inputs = [...document.querySelectorAll("form input[type=text]")].map( (input) =>
    `<p>
      ${input.value}
    </p>
    `
  ).join("");
  
  sessionStorage.setItem("Email-copy", inputs);
}

document.querySelector("#generate-btn").addEventListener("click", generate);
window.addEventListener("beforeunload", generate);