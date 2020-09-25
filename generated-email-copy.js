const emailCopy = sessionStorage.getItem("Email-copy");

summerConfig = {
  tabsize: 2,
  toolbar: [
    ['style', ['style']],
    ['font', ['bold', 'underline', 'italic',]],
    ['insert', ['lin""k']],
    ['para', ['ul', 'ol']],
    ['font', [ 'superscript', 'subscript']]
  ]
};
$('#summernote').summernote(summerConfig);
$('#summernote').summernote('poppins', 'Arial');

document.querySelector(".note-editor.note-frame .note-editable").innerHTML = emailCopy;