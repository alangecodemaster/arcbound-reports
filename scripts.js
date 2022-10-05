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





//global vars
const months = [{'Jan': 31, 'Feb': 28, 'Mar': 31, 'Apr': 30, 'May': 31, 'Jun': 30, 'Jul': 31, 'Aug': 31, 'Sep': 30, 'Oct': 31, 'Nov': 30, 'Dec': 31}];
const prevMonth = [
	{
		"Jan": "Dec",
		"Feb": "Jan",
		"Mar": "Feb",
		"Apr": "Mar",
		"May": "Apr",
		"Jun": "May",
		"Jul": "Jun",
		"Aug": "Jul",
		"Sep": "Aug",
		"Oct": "Sep",
		"Nov": "Oct",
		"Dec": "Nov"
	}
];
const longMonth = [
	{
		"Jan": "January",
		"Feb": "February",
		"Mar": "March",
		"Apr": "April",
		"May": "May",
		"Jun": "June",
		"Jul": "July",
		"Aug": "August",
		"Sep": "September",
		"Oct": "October",
		"Nov": "November",
		"Dec": "December"
	}
];
// when button is clicked to run report, this function fires and triggers all other functions
// functional programming is used to prevent bugs
function submitReport(){
	const formData = getFormData();
	if(!displayReport(formData)){
		return;
	}

	// get the linkedin client URL structure and make the request
	const clientNameRequestURL = parseGoolgeSheet(formData, formData.client_name);
	makeFetchRequest(clientNameRequestURL, "name", formData.sheetRow);

	// checks social data
	socialDataChecked(formData);

	//checks if we need to make a request
	if(formData.instagram){
		const clientNameRequestURL = parseGoolgeSheet(formData, "Instagram");
		if(formData.instaSheetRow){
			makeFetchRequest(clientNameRequestURL, "insta", formData.instaSheetRow);
		}
	}
	if(formData.facebook){
		const clientNameRequestURL = parseGoolgeSheet(formData, "Facebook");
		if(formData.fbSheetRow){
			makeFetchRequest(clientNameRequestURL, "fb", formData.fbSheetRow);
		}
	}
	if(formData.twitter){
		const clientNameRequestURL = parseGoolgeSheet(formData, "Twitter");
		if(formData.twSheetRow){
			makeFetchRequest(clientNameRequestURL, "tw", formData.twSheetRow);
		}
	}
	if(formData.newsletter){
		const clientNameRequestURL = parseGoolgeSheet(formData, "Newsletter");
		if(formData.nlSheetRow){
			makeFetchRequest(clientNameRequestURL, "nl", formData.nlSheetRow);
		}
	}

}



// helps determine which social channels should be displayed
function socialDataChecked(formData){
	let counter = 0;
	formData.instagram ? counter++ : document.querySelector(".social-pages .insta-page").classList.add('hidden');
	formData.facebook ? counter++ : document.querySelector(".social-pages .fb-page").classList.add('hidden');
	formData.twitter ? counter++ : document.querySelector(".social-pages .twitter-page").classList.add('hidden');
	formData.newsletter ? counter++ : document.querySelector(".social-pages .newsletter-page").classList.add('hidden');
	if(counter == 0){
		document.querySelector(".social-pages").classList.add("hidden");
	}else if(counter <=2){
		document.querySelector(".social-pages").classList.add('half');
	}
}







//plays a funny saying
function playCoolSaying(){
	let coolPhraseArray = ["Yahoo!", "Here we go!", "Let's do this!", "Let's make like a killer and slaughter this!", "Watch out! Cool report stuff ahead!", "You thirsty? 'Cause you're about to drink in some stats!", "There are two types of reports: this one, and all the other boring ones.", "Money money money. Must be funny. In a rich man's report!", "What time is it!? REPORT TIME!", "When I say monthly, you say report! Monthly...", "They're always after me lucky reports.", "Oh yeah!", "Da da da da dum, I'm loving it!", "A diamond is girl's best friend but this report is forever.", "There are some things money just can't buy. For everything else, there's this report.", "Save time, save money!", "Protect yourself from mahem with a report like me.", "This report is money. What's in your wallet!?", "Snap, crackle, REPORT!", "This resport is finger-lickin' good.", "Can you hear me now!? Good.", "If America runs on Dunkin, then Dunkin must run on this report!", "You ain't never had a friend like this report!", "Better report than never.", "Arby's has the meats. Arcbound has the reports.", "Got report?", "Like a good neighbor, reports are here!", "Don't you know? This report will give you wings.", "This is the report that smiles back.", "Put on a happy face!", "Gotta catch 'em all (those stats, I mean!)", "Give me a break. Give me a break. Break my off a piece of that re-port-ing!", "Hey Tony! I like the things you do. Hey Tony! If I could I would be you. The one and only tiger, the one and only taste. You know how to take a report and make it... GGGRRREEAAT!"]
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
		"newsletter": document.querySelector("#nl").checked ? true : false,
		"instaSheetRow": document.querySelector("#instaRow").value,
		"fbSheetRow": document.querySelector("#fbRow").value,
		"twSheetRow": document.querySelector("#twRow").value,
		"nlSheetRow": document.querySelector("#nlRow").value
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

//gets the JSON URL from google sheet
function parseGoolgeSheet(formData, sheetName){
	// https://docs.google.com/spreadsheets/d/1UYcbZ8LSAwQXThat30vRa2GVtknxPcrXSyJq8-sxHQw/edit#gid=0
	let sheetKey = formData.googleSheet.split("/d/")[1].split("/edit")[0];
	
	return `https://sheets.googleapis.com/v4/spreadsheets/${sheetKey}/values/${sheetName}?alt=json&key=AIzaSyDhuWkJewik0MgaTUOSbNsDcT9mpEuMTeU`;
}

//
function makeFetchRequest(url, reportType, sheetRow){
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
				generateViewsAndFollowersGraph(data, sheetRow);
			}else{
				console.log(data, sheetRow, reportType);
				replaceSocialInfo(data, sheetRow, reportType);
				generateSocialGraph(data, sheetRow, reportType);
			}
		})
		.catch((e)=>{
			alert("Error! Error! Oh no, something screwed up! Try it again...");
			console.log(e);
		})
		
}


function replaceNameLinkedinInfo(sheetData, sheetRow){
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

	document.querySelector("#reportMonth").innerHTML = longMonth[0][reportMonth] + " " + new Date().getFullYear();
	document.querySelector("#clientName").innerHTML = clientName;
	document.querySelector("#prevViews").innerHTML = prevViews;
	document.querySelector("#currentViews").innerHTML = currentViews;
	document.querySelector("#prevLikes").innerHTML = prevLikes;
	document.querySelector("#currentLikes").innerHTML = currentLikes;
	document.querySelector("#prevComments").innerHTML = prevComments;
	document.querySelector("#currentComments").innerHTML = currentComments;
	document.querySelector("#prevShares").innerHTML = prevShares;
	document.querySelector("#currentShares").innerHTML = currentShares;
	document.querySelector("#prevEngagement").innerHTML = prevEngagement;
	document.querySelector("#currentEngagement").innerHTML = currentEngagement;
	document.querySelector("#prevPosts").innerHTML = prevPosts;
	document.querySelector("#currentPosts").innerHTML = currentPosts;
	document.querySelector("#prevConnections").innerHTML = prevConnections;
	document.querySelector("#currentConnections").innerHTML = currentConnections;
	document.querySelector("#prevFollowers").innerHTML = prevFollowers;
	document.querySelector("#currentFollowers").innerHTML = currentFollowers;
	document.querySelector("#prevNewsSub").innerHTML = prevNewsSub;
	document.querySelector("#currentNewsSub").innerHTML = currentNewsSub;
	document.querySelector("#crossEngagementTotal").innerHTML = crossEngagementTotal;
	document.querySelector("#crossEName1").innerHTML = crossEName1;
	document.querySelector("#crossEAmount1").innerHTML = crossEAmount1;
	document.querySelector("#crossEName2").innerHTML = crossEName2;
	document.querySelector("#crossEAmount2").innerHTML = crossEAmount2;
	document.querySelector("#crossEName3").innerHTML = crossEName3;
	document.querySelector("#crossEAmount3").innerHTML = crossEAmount3;
	document.querySelector("#crossEName4").innerHTML = crossEName4;
	document.querySelector("#crossEAmount4").innerHTML = crossEAmount4;

	document.querySelectorAll(".current .date").forEach(date=>{
		date.innerHTML = `${reportMonth} 1 - ${reportMonth} ${months[0][reportMonth]}`;
	});
	document.querySelectorAll(".last-month .date").forEach(date=>{
		date.innerHTML = `${prevMonth[0][reportMonth]} 1 - ${months[0][prevMonth[0][reportMonth]]}`;
	});

	if(viewsDiff >= 0){
		document.querySelector("#viewsDiff").innerHTML = `+${viewsDiff}%`;
	}else{
		document.querySelector("#viewsDiff").classList.add("negative");
		document.querySelector("#viewsDiff").innerHTML = viewsDiff + "%";
	}
	if(likesDiff >= 0){
		document.querySelector("#likesDiff").innerHTML = `+${likesDiff}%`;
	}else{
		document.querySelector("#likesDiff").classList.add("negative");
		document.querySelector("#likesDiff").innerHTML = likesDiff + "%";
	}
	if(commentsDiff >= 0){
		document.querySelector("#commentsDiff").innerHTML = `+${commentsDiff}%`;
	}else{
		document.querySelector("#commentsDiff").classList.add("negative");
		document.querySelector("#commentsDiff").innerHTML = commentsDiff + "%";
	}
	if(sharesDiff >= 0){
		document.querySelector("#sharesDiff").innerHTML = `+${sharesDiff}%`;
	}else{
		document.querySelector("#sharesDiff").classList.add("negative");
		document.querySelector("#sharesDiff").innerHTML = sharesDiff + "%";
	}
	if(engageDiff >= 0){
		document.querySelector("#engageDiff").innerHTML = `+${engageDiff}%`;
	}else{
		document.querySelector("#engageDiff").classList.add("negative");
		document.querySelector("#engageDiff").innerHTML = engageDiff + "%";
	}
	if(postsDiff >= 0){
		document.querySelector("#postsDiff").innerHTML = `+${postsDiff}%`;
	}else{
		document.querySelector("#postsDiff").classList.add("negative");
		document.querySelector("#postsDiff").innerHTML = postsDiff + "%";
	}
	if(connectDiff >= 0){
		document.querySelector("#connectDiff").innerHTML = `+${connectDiff}%`;
	}else{
		document.querySelector("#connectDiff").classList.add("negative");
		document.querySelector("#connectDiff").innerHTML = connectDiff + "%";
	}
	if(followersDiff >= 0){
		document.querySelector("#followersDiff").innerHTML = `+${followersDiff}%`;
	}else{
		document.querySelector("#followersDiff").classList.add("negative");
		document.querySelector("#followersDiff").innerHTML = followersDiff + "%";
	}
	if(newsletterDiff >= 0){
		document.querySelector("#newsletterDiff").innerHTML = `+${newsletterDiff}%`;
	}else{
		document.querySelector("#newsletterDiff").classList.add("negative");
		document.querySelector("#newsletterDiff").innerHTML = newsletterDiff + "%";
	}
}


function generateViewsAndFollowersGraph(sheetData, sheetRow){
	let counter = 0;
	let numberOfDataPoints;
	let sheetStartingPoint = 1
	if(Number(sheetRow) - 1 < 12){
		numberOfDataPoints = Number(sheetRow) - 1;
	}else{
		numberOfDataPoints = 12;
		sheetStartingPoint = Number(sheetRow) - 12;
	}
	let numOfViewsPerMonth = [];
	let numOfFollowersPerMonth = [];
	let theMonths = [];

	while(counter < numberOfDataPoints){
		let views = sheetData.values[sheetStartingPoint + counter][3];
		let followers = sheetData.values[sheetStartingPoint + counter][17];
		let month = sheetData.values[sheetStartingPoint + counter][0];
		numOfViewsPerMonth.push(views);
		numOfFollowersPerMonth.push(followers);
		theMonths.push(month);
		counter++;
	}

	graphGenerate(numOfViewsPerMonth, theMonths, '#views-chart', 308, 130);
	graphGenerate(numOfFollowersPerMonth, theMonths, '#followers-chart', 308, 130);

}


function graphGenerate(dataset, months, id, width, height){
		const padding = 25;
		const yScaled = (height - padding)/(Math.max(...dataset)*1.2);
		const graph = document.querySelector(id);


		//creates bars
		dataset.forEach((data,index)=>{
			let newDiv = document.createElement("div");
			newDiv.setAttribute("style",`height: ${data*yScaled}px; width: ${Math.floor(((width - padding+ 10) / dataset.length))}px; margin:0 1.5px`);

			let dataNum;
			if(data >=1000000000){
				dataNum = (data/1000000000).toFixed(1) + "B";
			}else if(data >=1000000){
				dataNum = (data/1000000).toFixed(1) + "M";
			}else if(data >= 1000){
				dataNum = (data/1000).toFixed(1) + "K";
			}
			newDiv.innerHTML = `<span class="data">${dataNum}</span><span class="month">${months[index]}</span>`;
			graph.appendChild(newDiv);
		});


		// creates yAxis
		let yAxis = document.createElement("div");
		yAxis.classList.add("yAxis");
		yAxis.setAttribute("style", `height: ${height - padding*2}px; bottom: ${padding}px; left: ${padding - 5}px; width:1px;`);
		graph.appendChild(yAxis);
		const paddingBottom = 25;

		let values2 = 1;
		let largestVal2 = Math.ceil((d3.max(dataset)*1.2)/100)*100;
		let interval2 = (height - padding*2)/values2;
		let distance2 = 0 + paddingBottom;
		let startAmount2 = 0

		for(let j = 0; j <= values2; j++){
			d3.select(graph)
			.append("p")
			.text(()=>{
				let returnVal;
				if(j == 0){
					returnVal = 0;
				}else if(j == values2){
					returnVal = Math.floor(largestVal2);
				}else{
					startAmount2 += Math.floor(largestVal2 / 4);
					returnVal = startAmount2;
				}
				return returnVal;
			})
			.style('bottom', `${distance2}px`)
			.attr('class', 'y-val');

			distance2 += interval2;
		}


		// creates xAxis
		let xAxis = document.createElement("div");
		xAxis.classList.add("xAxis");
		xAxis.setAttribute("style", `bottom: 25px; height:1px; left: ${padding - 5}px; width: ${width - padding - 10}px`);
		graph.appendChild(xAxis);

}


function replaceSocialInfo(sheetData, sheetRow, reportType){
	if(reportType == "insta"){

	}
}


function generateSocialGraph(sheetData, sheetRow, reportType){
	
}


function calcPercentage(previous, current){
	return (((Number(current) - Number(previous))/previous) * 100).toFixed(1);
}


