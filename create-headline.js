//Summernote Initialization
$('#summernote').summernote({
  tabsize: 2,
  toolbar: [
    ['style', ['style']],
    ['font', ['bold', 'underline', 'italic',]],
    ['insert', ['link']],
    ['para', ['ul', 'ol']],
    ['font', [ 'superscript', 'subscript']]
  ]
});

$('#summernote').summernote('poppins', 'Arial');


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


function playAnimation(tl){
  tl.reversed() ? tl.play() : tl.reverse();
}

function showInModal(){
  playAnimation(t1);
  const headline = this.previousSibling.textContent.trim().replace(/(^|\s)\.{1,}(\s|$)/g, " <mark>......</mark> ");
  document.querySelector(".add-headline__body").innerHTML = headline;
}
//show and hide headline modal
document.querySelectorAll(".headline-list__btn").forEach(
  btn => btn.addEventListener("click", showInModal.bind(btn, t1))
)
document.querySelector(".add-headline__close").addEventListener("click", () =>{
  playAnimation(t1);
})

//show and hide editor modal
document.querySelector(".add-headline__btn--insert").addEventListener("click", () =>{
  playAnimation(t1);
  playAnimation(t2);
})
document.querySelector(".editor__close-btn").addEventListener("click", playAnimation.bind(this, t2));

//highlight headline modal placeholder
function setPlaceholder(){
  console.log("me");
}
document.querySelector(".add-headline__body:nth-of-type(2)").addEventListener("focus", setPlaceholder);