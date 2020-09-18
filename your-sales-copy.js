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

//export PDF
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
      `${document.querySelector(".message__body").textContent}`,
      `${document.querySelector(".message__body:nth-of-type(3)").textContent}`,
      
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

//export DOCX
function generate() {
  const doc = new docx.Document();

  doc.addSection({
      properties: {},
      children: [
          new docx.Paragraph({
            text: `${document.querySelector(".sales-copy__headline").textContent}`,
            heading: docx.HeadingLevel.HEADING_1,
            alignment: docx.AlignmentType.CENTER,
          }),
          new docx.Paragraph({
            text: `${document.querySelector(".sales-copy__bonuses").textContent}`,
          }),
          new docx.Paragraph({
            text: `${document.querySelector(".access__heading").textContent}`,
            heading: docx.HeadingLevel.HEADING_3,
            alignment: docx.AlignmentType.CENTER,
          }),
          
          ...[...document.querySelectorAll(".access__list li")].map(item => new docx.Paragraph({text: item.textContent})),

          new docx.Paragraph({
            text: document.querySelector(".bonus__heading").textContent,
            heading: docx.HeadingLevel.HEADING_3,
            alignment: docx.AlignmentType.CENTER,
          }),

          ...[...document.querySelectorAll(".access__list li")].map(item => new docx.Paragraph({text: item.textContent})),

          new docx.Paragraph({
            text: document.querySelector(".gurantee__heading").textContent,
            heading: docx.HeadingLevel.HEADING_3,
            alignment: docx.AlignmentType.CENTER,
          }),
          new docx.Paragraph({
            text: document.querySelector(".gurantee__body").innerText,
          }),        
          new docx.Paragraph({
            spacing: {
              before: 300,
            },
            text: document.querySelector(".sales-copy__price").textContent,
          }),
          new docx.Paragraph({
            spacing: {
              before: 300,
            },
            text: document.querySelector("#price-drop-reason").textContent,
          }),
          new docx.Paragraph({
            text: document.querySelector(".sales-copy__actions").textContent,
            heading: docx.HeadingLevel.HEADING_3,
            alignment: docx.AlignmentType.CENTER,
          }),
          new docx.Paragraph({
            spacing: {
              before: 300,
              after: 400,
            },
            text: "To Your Success,",
          }),
          new docx.Paragraph({
            text: document.querySelector(".message__recipient").textContent,
            bold: true,
          }),
          new docx.Paragraph({
            spacing: {
              before: 200,
            },
            text: document.querySelector(".message__body").innerText,
          }),
          new docx.Paragraph({
            spacing: {
              before: 200,
            },
            text: document.querySelector(".message__body:nth-of-type(3)").innerText,
            
          }),
          new docx.Paragraph({
            spacing: {
              before: 300,
            },
            text:  `Your Company Contact Information, Phone, Email, Help Desk, Legal Disclaimers, Etc. Go Here `,
            alignment: docx.AlignmentType.CENTER,
            bold: true,
          })
      ],
  });

  docx.Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
  });
}

document.querySelector(".export__format.export__format--docx").addEventListener("click", generate);