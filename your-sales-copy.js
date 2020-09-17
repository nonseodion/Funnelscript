userInput = JSON.parse(sessionStorage.getItem("userInputs"));
for(let key of Object.keys(userInput)){
  const placeholder = document.querySelector(`#${key}`);
  if(typeof(userInput[key]) == "string"){
    placeholder.textContent = userInput[key];
  }
  else{
    if(placeholder.tagName !== "UL"){
      placeholder.textContent = userInput[key].join(", ");
    }
    else{
      const list = userInput[key].map(item => `<li ><span class="pointer">*</span>${item}</li>`).join("");
      placeholder.innerHTML = list;
    }
  }
}

//export modal animation
const tween = gsap.timeline({paused: true, reversed: true});
tween.to(".overlay", {display: "block", opacity: 1});

document.querySelector(".sales-copy__btns--export").addEventListener("click", () => { 
  tween.reversed() ? tween.play() : tween.reverse(); 
})
document.querySelector(".export__btn--cancel").addEventListener("click", () => { 
  tween.reversed() ? tween.play() : tween.reverse(); 
})


function getPDF(){
  return {
    content: [
      {
        text: `${document.querySelector(".sales-copy__headline").textContent}\n\n`,
        style: 'header',
        alignment: 'center',
        bold: true,
        fontSize: 20
      },
      {
        text: `${document.querySelector(".sales-copy__bonuses").textContent}`,
        alignment: 'center',
        style: "body"
      },
      {
        text: `\n${document.querySelector(".access__heading").textContent}`,
        alignment: 'center',
        style: "subHeader"
      },
      [
        ...[...document.querySelectorAll(".access__list li")].map(item => item.textContent)
      ],
      {
        text: `\n${document.querySelector(".bonus__heading").textContent}`,
        alignment: 'center',
        style: "subHeader"
      },
        [
          ...[...document.querySelectorAll(".bonus__list li")].map(item => item.textContent)
        ],
      {
          text: `\n${document.querySelector(".gurantee__heading").textContent}`,
          style: "subHeader"
      },
       `${document.querySelector(".gurantee__body").innerText}`,
      
      `\n${document.querySelector(".sales-copy__price").textContent}`,
      
      `\n${document.querySelector("#price-drop-reason").textContent}`,
      
      {
          text: `\n${document.querySelector(".sales-copy__actions").textContent}`,
          style: "subHeader"
      },
      "To Your Success,",
      
      {
          text: `\n\n${document.querySelector(".message__recipient").textContent}`,
          style: "body",
          bold: true
      },
      `\n\n${document.querySelector(".message__body").textContent}`,
      `\n${document.querySelector(".message__body:nth-of-type(3)").textContent}`,
      
      {
          text: "\nYour Company Contact Information, Phone, Email, Help Desk, Legal Disclaimers, Etc. Go Here",
          style: "subHeader"
      },
    ],
    styles: {
      body: {
        fontSize: 13,
        alignment: 'justify'
      },
      subHeader:{
          fontSize: 17,
          alignment: "center"
      }
    }
  }
}

function downloadPDF(){
  const PDF = getPDF();
  pdfMake.createPdf(PDF).download("Sales-copy");
}

document.querySelector(".export__format.export__format--pdf").addEventListener("click", downloadPDF);