// displays the popup of instructions
function showPopup(){
	document.querySelector(".popup").classList.toggle("active");
}

// adds WYSIWYG editor
window.addEventListener("load", ()=>{
  ClassicEditor
    .create( document.querySelector( '#other' ) )
    .catch( error => {
    console.error( error );
  } );
});


// when button is clicked to run report, this function fires
// functional programming is used to prevent bugs
function submitReport(){
	const formData = getFormData();
	displayReport(formData.googleSheet); 
}


// grabs info from the form inputs and returns JSON
function getFormData(){
	let formData = {
		"googleSheet": document.querySelector("#google-sheet").value,
		"sheetRow": document.querySelector("#google-sheet-num	").value,
		"textHTML": document.querySelector(".ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline").innerHTML
	};
	return formData;
}


// displays report after form data is processed
function displayReport(formData){
	document.querySelector("#main").classList.add("active");
	document.querySelector("#main").scrollIntoView();
}









