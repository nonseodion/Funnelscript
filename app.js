//Navbar control
const arrow = document.querySelector(".arrow-right");


arrow.addEventListener("click", showSmallMenu);

function showSmallMenu(){
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

let selectedItem = 0;

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
    console.log(view1, view2)

    view1.classList.toggle("no-display");
    view2.classList.toggle("no-display");
    if(index == 0 || selectedItem == 0) document.querySelector(".dashboard--view").classList.toggle("sitting-human");
    

    selectedItem = index;
}

//Editor-section
//Initialize Quill editor
  var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{'align': 'right'},'align', {'align': 'center'}, {'align': 'justify'}],
      ['image'],
      ['code-block']
    ]
  },
  });