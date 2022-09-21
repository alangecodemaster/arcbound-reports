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



// makes element selecting WAY easier
function $(selector){
	return document.querySelector(selector);
}


// when button is clicked to run report, this function fires and triggers all other functions
// functional programming is used to prevent bugs
function submitReport(){
	const formData = getFormData();
	if(!displayReport(formData)){
		return;
	}
	const clientNameRequestURL = parseGoolgeSheet(formData, formData.client_name);
	makeFetchRequest(clientNameRequestURL, "name", formData.sheetRow);

}








//plays a funny saying
function playCoolSaying(){
	let coolPhraseArray = ["Yahoo!", "Here we go!", "Let's do this!", "Let's make like a killer and slaughter this!", "This is the best report you're ever going to make!", "Watch out! Cool report stuff ahead!", "You thirsty? 'Cause you're about to drink in some stats!", "There are two types of reports: this one, and all the other boring ones.", "Money money money. Must be funny. In a rich man's report!", "What time is it!? REPORT TIME!", "When I say monthly, you say report! Monthly...", "They're always after me lucky reports.", "Oh yeah!", "Da da da da dum, I'm loving it!", "A diamond is girl's best friend but this report is forever.", "There are some things money just can't buy. For everything else, there's this report!", "Save time, save money!", "Protect yourself from mahem with a report like me.", "This report is money. What's in your wallet!?", "Snap, crackle, REPORT!", "This resport is finger-lickin' good.", "Can you hear me now!?", "If America runs on Dunkin, then Dunkin must run on this report!"]
		alert(coolPhraseArray[Math.floor(Math.random()*coolPhraseArray.length)]);
}


// grabs info from the form inputs and returns JSON
function getFormData(){
	let formData = {
		"client_name": document.querySelector("#client-name").value,
		"googleSheet": document.querySelector("#google-sheet").value,
		"sheetRow": document.querySelector("#google-sheet-num	").value,
		"textHTML": document.querySelector(".ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline").innerHTML,
		"instagram": document.querySelector("#insta").checked ? true : false,
		"facebook": document.querySelector("#fb").checked ? true : false,
		"twitter": document.querySelector("#tw").checked ? true : false,
		"newsletter": document.querySelector("#nl").checked ? true : false
	};
	return formData;
}


// displays report after form data is processed
function displayReport(formData){

	if(!formData.googleSheet || !formData.sheetRow){
		alert("You tried to submit your form without some needed information. Please check that each field is filled out correctly and try again.");
		return null;
	}else{
		document.querySelector("#main").classList.add("active");
		document.querySelector("#main").scrollIntoView();
		return true;
	}
}

function parseGoolgeSheet(formData, sheetName){
	// https://docs.google.com/spreadsheets/d/1UYcbZ8LSAwQXThat30vRa2GVtknxPcrXSyJq8-sxHQw/edit#gid=0
	let sheetKey = formData.googleSheet.split("/d/")[1].split("/edit")[0];
	
	return `https://sheets.googleapis.com/v4/spreadsheets/${sheetKey}/values/${sheetName}?alt=json&key=AIzaSyDhuWkJewik0MgaTUOSbNsDcT9mpEuMTeU`;
}


function makeFetchRequest(url, reportType, sheetRow){
		console.log(url);
		fetch(url)
		.then(response => {
			if(!response.ok){
				alert("There has been an error retrieving the URL you provided. Please refresh and try again.");
				return response;
			}else{
				return response.json();
			}
		})
		.then(data => {
			if(reportType == "name" && data){
				replaceNameLinkedinInfo(data, sheetRow);
			}
		})
		.catch((e)=>{
			alert("Error! Error! Oh no, something screwed up! Try it again...");
			console.log(e);
		})
		
}


function replaceNameLinkedinInfo(sheetData, sheetRow){
	console.log(sheetData);
	console.log(sheetRow);
	playCoolSaying();

	let reportMonth = sheetData.values[Number(sheetRow) - 1][0];
	let clientName = sheetData.values[Number(sheetRow) - 1][1];
	let prevViews = sheetData.values[Number(sheetRow) - 1][2];
	let currentViews = sheetData.values[Number(sheetRow) - 1][3];
	let prevLikes = sheetData.values[Number(sheetRow) - 1][4];
	let currentLikes = sheetData.values[Number(sheetRow) - 1][5];
	let prevComments = sheetData.values[Number(sheetRow) - 1][6];
	let currentComments = sheetData.values[Number(sheetRow) - 1][7];
	let prevShares = sheetData.values[Number(sheetRow) - 1][8];
	let currentShares = sheetData.values[Number(sheetRow) - 1][9];
	let prevEngagement = sheetData.values[Number(sheetRow) - 1][10];
	let currentEngagement = sheetData.values[Number(sheetRow) - 1][11];
	let prevPosts = sheetData.values[Number(sheetRow) - 1][12];
	let currentPosts = sheetData.values[Number(sheetRow) - 1][13];
	let prevConnections = sheetData.values[Number(sheetRow) - 1][14];
	let currentConnections = sheetData.values[Number(sheetRow) - 1][15];
	let prevFollowers = sheetData.values[Number(sheetRow) - 1][16];
	let currentFollowers = sheetData.values[Number(sheetRow) - 1][17];
	let prevNewsSub = sheetData.values[Number(sheetRow) - 1][18];
	let currentNewsSub = sheetData.values[Number(sheetRow) - 1][19];
	let crossEngagementTotal = sheetData.values[Number(sheetRow) - 1][20];
	let crossEName1 = sheetData.values[Number(sheetRow) - 1][21];
	let crossEAmount1 = sheetData.values[Number(sheetRow) - 1][22];
	let crossEName2 = sheetData.values[Number(sheetRow) - 1][23];
	let crossEAmount2 = sheetData.values[Number(sheetRow) - 1][24];
	let crossEName3 = sheetData.values[Number(sheetRow) - 1][25];
	let crossEAmount3 = sheetData.values[Number(sheetRow) - 1][26];
	let crossEName4 = sheetData.values[Number(sheetRow) - 1][27];
	let crossEAmount4 = sheetData.values[Number(sheetRow) - 1][28];
	
	let viewsDiff = calcPercentage(prevViews, currentViews);
	let likesDiff = calcPercentage(prevLikes, currentLikes);
	let commentsDiff = calcPercentage(prevComments, currentComments);
	let sharesDiff = calcPercentage(prevShares, currentShares);
	let engageDiff = calcPercentage(prevEngagement, currentEngagement);
	let postsDiff = calcPercentage(prevPosts, currentPosts);
	let connectDiff = calcPercentage(prevConnections, currentConnections);
	let followersDiff = calcPercentage(prevFollowers, currentFollowers);
	let newsletterDiff = calcPercentage(prevNewsSub, currentNewsSub);


}


function calcPercentage(previous, current){
	return Math.round(((Number(current) - Number(previous))/previous) * 100);
}








