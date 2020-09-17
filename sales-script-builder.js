//add Input
function addInput (){
  this.parentNode.insertAdjacentHTML("beforebegin", '<input class="form-detail__input"></input>');
}
document.querySelectorAll(".form-detail__add").forEach( add => add.addEventListener("click", addInput));

//autofill
const templates = [
  "For Sale By Owners",
  "Jim Edwards",
  "How to Avoid Paying $12,913 or More in Real Estate Commissions by Selling Without an Agent!",
  "save the commission",
  "instant Access",
  "Glucosamene Powder",
  "How to get FREE and Low-Cost Advertising",
  'Bonus "10 secrets to success"',
  "$97",
  "As one of the next 22 Buyers, for this week only",
  "$47, over 50% OFF!",
  "Download Now",
  "Other sellers will leave you in the dust"
]

function fillTemplate(){
  document.querySelectorAll(".form-detail__input:first-of-type")
    .forEach((input, index) => input.value = templates[index]);
}
document.querySelector(".builder-form__heading button")
  .addEventListener("click", fillTemplate);

//validate form
let stopClick = false;

function validateForm(e){
  document.querySelectorAll(".form-detail__input").forEach(
    input => {
      if(!input.value) {
        document.querySelector(".warning").style.display = "block";
        e.preventDefault();
        document.documentElement.scrollTop = 0;
      }
    }
  )
}

//document.querySelector(".form-btn--build").addEventListener("mousedown", validateForm);
document.querySelector(".form-btn--build").addEventListener("click", validateForm);


//collect userInput
inputSpec = ["audience", "seller-name", "headline", "benefits", "access", "product-name",
  "access-list", "bonus-list", "regular-price", "price-drop-reason", "special-price", "CTA",
  "negative"
]
userInputs = Object.create(null);
function collectInput(){
  for(let input of inputSpec){
    input = document.querySelector(`#${input}`);
    if(input.tagName !== "LI"){
      userInputs[input.id] = input.value;
      input.value = "";
    }
    else{
      userInputs[input.id] = [];
      input.querySelectorAll("input").forEach( childInput =>{
        userInputs[input.id].push(childInput.value);
        childInput.value = "";
      })
    }
  }
  sessionStorage.setItem("userInputs", JSON.stringify(userInputs));
}
window.addEventListener("beforeunload", collectInput);

