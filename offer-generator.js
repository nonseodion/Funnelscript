const createOffer = document.querySelector(".offer-generator-section .create");
const offerGenerator = document.querySelector(".offer");
const offerScript = document.querySelector(".offer-script");
const arrowClose = document.querySelectorAll(".offer .close");
const arrowClose2 = document.querySelector(".offer-script .close");
const next = document.querySelectorAll(".offer .next");
const cancel = document.querySelectorAll(".offer .cancel");
const forms = Array.from(document.querySelectorAll(".offer form"));
const checkboxes = document.querySelectorAll("#step3 input[type=checkbox]");
const chosenOfferings = document.querySelector(".chosen-offerings");
let removeBonus = document.querySelector(".offer .step4 .remove-bonus");
const addBonus = document.querySelector(".offer .step4 .add-bonus");
const bonusTemplate = document.querySelector(".offer .bonus");

let prices = document.querySelectorAll(".chosen-offerings input[placeholder=Price]");


//show offer generator
createOffer.addEventListener("click", showGenerator);
function showGenerator(){
    offerGenerator.classList.add("slide-in");
}
//close offer generator
arrowClose.forEach(arrow => arrow.addEventListener("click", closeGenerator));
arrowClose2.addEventListener("click", closeGenerator);
function closeGenerator(){
    offerGenerator.classList.remove("slide-in");
}

//show error message
function showError(element){
    element.querySelector(" .error-message")
    .classList.add("visible");
}

//go to next step
next.forEach(n => n.addEventListener("click", nextStep));
function nextStep(){
    grandParent = this.parentNode.parentNode;
    const index = forms.indexOf(grandParent);
    if(index < 3){
        const inputs = Array.from(grandParent.querySelectorAll("input"));    

        if(inputs.some(input => input.value === "") && index < 2){
            showError(grandParent);
            return;
        }
        forms[index].classList.add("no-display");
        forms[index+1].classList.remove("no-display");
    }
    else{
        forms[index].classList.add("no-display");
        offerScript.classList.remove("no-display");
    }
    
    if(index < forms.length-1){
    }
}

//go to previous step or clear
cancel.forEach(n => n.addEventListener("click", previousStep));
function previousStep(){
    grandParent = this.parentNode.parentNode;
    grandParent.reset();
    
    
    // const index = forms.indexOf(grandParent);
    // if (index == 0) return;
    // forms[index].classList.add("no-display");
    // forms[index-1].classList.remove("no-display");
}


//show checkboxes in step 3
checkboxes.forEach(box => box.addEventListener("click", toggleCheckbox));
function toggleCheckbox(){
    if(this.checked){
        this.classList.add("visible");   
        
        let offer = chosenOfferings.querySelector(`#${this.id}`);
        offer.classList.remove("no-display");

        let inputs = offer.querySelectorAll("input");
        inputs.forEach(input => {
            input.name = this.value;
            input.addEventListener("change", updateStatus);
        })

        chosenOfferings.appendChild(offer);
        updateStatus();
    }
    else{
        this.classList.remove("visible");
        let offer = chosenOfferings.querySelector(`#${this.id}`);
        offerInputs = offer.querySelectorAll("input");
        offerInputs.forEach(offerInput => offerInput.value = "");
        offer.classList.add("no-display");
        updateStatus();
    }
}

//update status with change in entered prices of offers

function updateStatus(){
    let prices = Array.from(chosenOfferings.querySelectorAll("input[type=number]")).map(price => Number(price.value));
    let totalPrice = prices.reduce((total, price) => total + price);
    let offers = chosenOfferings.querySelectorAll("input[type=text]").length;
    let noOfOffers = document.querySelector(".status .no-of-offers p:nth-child(2)");
    let price = document.querySelector(".status .price p:nth-child(2)");
    noOfOffers.textContent = offers;
    price.textContent = "$ "+ totalPrice
    console.log(totalPrice, offers-1);

    const statusList = document.querySelectorAll(".status-list>div");
    statusList.forEach(status => status.classList.add("no-display"));
    
    if(offers >= 7){
        statusList[0].classList.remove("no-display");
    }
    else if(offers >= 5){
        statusList[1].classList.remove("no-display");
    }
    else if(offers >= 3){
        statusList[2].classList.remove("no-display");
    }
    else{
        statusList[3].classList.remove("no-display");
    }
}


//addBonuses
addBonus.addEventListener("click", add_bonus);
function add_bonus(){
    let bonus = bonusTemplate.cloneNode(true);
    bonus.classList.remove("no-display");
    let bonuses = document.querySelector(".step4 .tab-body .bonuses");
    bonuses.appendChild(bonus);
    bonus.querySelector(".remove-bonus").addEventListener("click", remove_bonus);
}

//remove Bonus
removeBonus.addEventListener("click", remove_bonus);
function remove_bonus(){
    console.log("me");
    let bonus = this.parentNode;
    bonus.parentNode.removeChild(bonus);
}