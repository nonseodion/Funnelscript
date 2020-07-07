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
let removeBonus = document.querySelectorAll(".offer .step4 .remove-bonus");
const addBonus = document.querySelector(".offer .step4 .add-bonus");
const bonusTemplate = document.querySelector(".offer .bonus");
let noOfOffers = document.querySelector(".status .no-of-offers p:nth-child(2)");
let offerStrength = "Empty";


let prices = document.querySelectorAll(".chosen-offerings input[placeholder=Price]");


//show offer generator
createOffer.addEventListener("click", showGenerator);
function showGenerator(){
    offerGenerator.classList.add("slide-in");
}
//close offer generator
arrowClose.forEach(arrow => arrow.addEventListener("click", closeGenerator));
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

//clear form
cancel.forEach(n => n.addEventListener("click", previousStep));
function previousStep(){
    grandParent = this.parentNode.parentNode;
    grandParent.reset();
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
    let offers = chosenOfferings.querySelectorAll("input[type=text]").length - 
                    chosenOfferings.querySelectorAll(".no-display").length;
    
    let price = document.querySelector(".status .price p:nth-child(2)");
    noOfOffers.textContent = offers;
    price.textContent = "$ "+ totalPrice;

    const statusList = document.querySelectorAll(".status-list>div");
    statusList.forEach(status => status.classList.add("no-display"));
    
    if(offers >= 7){
        statusList[0].classList.remove("no-display");
        offerStrength = statusList[0].classList[0];
    }
    else if(offers >= 5){
        statusList[1].classList.remove("no-display");
        offerStrength = statusList[1].classList[0];
    }
    else if(offers >= 3){
        statusList[2].classList.remove("no-display");
        offerStrength = statusList[2].classList[0];
    }
    else{
        statusList[3].classList.remove("no-display");
        offerStrength = statusList[3].classList[0];
    }
}


//addBonuses
addBonus.addEventListener("click", add_bonus);
function add_bonus(){
    let hiddenBonusArray = document.querySelectorAll(".step4 .tab-body .bonuses .bonus.no-display");
    let displayedBonuses = checkDisplayedBonuses(hiddenBonusArray);

    //hide addBonus button
    if(Number(noOfOffers.textContent) <= displayedBonuses+1) addBonus.classList.add("no-display");
    hiddenBonusArray[0].classList.remove("no-display");
}

//remove Bonus
removeBonus.forEach(bonus => bonus.addEventListener("click", remove_bonus));
function remove_bonus(){
    let bonus = this.parentNode;
    bonus.classList.add("no-display");

    //show addBonus button
    let hiddenBonusArray = document.querySelectorAll(".step4 .tab-body .bonuses .bonus.no-display");
    let displayedBonuses = checkDisplayedBonuses(hiddenBonusArray);
    if(Number(noOfOffers.textContent) > displayedBonuses) addBonus.classList.remove("no-display");
}

function checkDisplayedBonuses(hiddenBonusArray){
    let bonusArray = document.querySelectorAll(".step4 .tab-body .bonuses .bonus");
    return bonusArray.length - hiddenBonusArray.length;
}