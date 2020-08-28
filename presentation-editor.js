const templates = [
    "For Sale By Owners",
    "Jim Edwards",
    "How to Avoid Paying $12,913 or More in Real Estate Commissions by Selling Without an Agent!",
    "save the commission",
    "instant Access",
    "Glucosamene Powder",
  ]

  function fillTemplate(){
    document.querySelectorAll(".presentation__input")
      .forEach((input, index) => input.value = templates[index]);
  }
  document.querySelector(".presentation__btn--use-template")
    .addEventListener("click", fillTemplate);