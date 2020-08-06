let temps = document.querySelectorAll(`.section--templates`);
temps.forEach(temp => {
  let text = temp.innerHTML;
  text = text.replace(/\.\.\.*\.*\.\./g, '<span contenteditable="true">................</span>');
  console.log(text);
  temp.innerHTML = text;
})

