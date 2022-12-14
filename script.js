//You can edit ALL of the code here
// initial variables
const rootElem = document.getElementById("root");
const searchFunctionEl = document.getElementById("search-functions");
const episodesList = document.getElementById("episodes");
const episodeDropdown = document.getElementById("episodeDropdown");
let allEpisodes;
let seasonNumber;
let episodeNumber;
let url = "https://api.tvmaze.com/shows/82/episodes";

const showSearchFunctionEl = document.getElementById("show-search-function");
const showSearchEl = document.getElementById("shows-search");
const showsdiv = document.getElementById("shows");
const showsDropdown = document.getElementById("showDropdown");
let showsUrl = "https://api.tvmaze.com/shows";
let allShows = getAllShows();



// fetching episodes data
fetch(url)
	.then((response) => response.json()) //necessary to get json response
	.then((data) => {
      allEpisodes = data;
    })
  .catch (function(error) {
	console.error(error);
  })

  // initial functions
function setup() {
	makePageForShows(allShows);
	// makePageForEpisodes(allEpisodes);
	// dropDownMenu2(allShows);

}

//  fetching show data
fetch(showsUrl)
		.then((response) => response.json())
		.then((data) => {
			allShows = data;
			console.log(data);
			getAllShows();
		});


// initial functions
//Functions for shows

// sort shows
function compare(a, b) {
	let aShow = a.name.toLowerCase();
	let bShow = b.name.toLowerCase();
	return aShow < bShow ? -1 : 1;
}

// create cards to display shows
function makePageForShows(showList) {
	rootElem.textContent = `${showList.length} shows`;

	showList.sort((a, b) => {
		let aShow = a.name.toLowerCase();
		let bShow = b.name.toLowerCase();
		return aShow < bShow ? -1 : 1;
	});

	showList.forEach((show) => {
		
		let aEl = document.createElement("a");
		let cardEl = document.createElement("div");
		let imageEl = document.createElement("img");
		let titleEl = document.createElement("h2");
		let showEl = document.createElement("div");
		let summaryEl = document.createElement("p")

		let genreEl = document.createElement("h3");
		let ratingEl = document.createElement("h3");
		let runtimeEl = document.createElement("h3");

		cardEl.className = "show-card";
		titleEl.className = "title";
		imageEl.className = "img";
		showEl.className = "show-details";
		summaryEl.className = "summary-details";

		genreEl.innerHTML = `Genre: ${show.genres}`;
		ratingEl.innerHTML = `Show rating: ${show.rating.average}`;
		runtimeEl.innerHTML = `Episode Runtime: ${show.runtime} minutes`;
		summaryEl.innerHTML = `${show.summary.substring(0, 200)}...`

		cardEl.id = show.id;
		cardEl.value = show.id;

		cardEl.addEventListener("click", function (e) {
	
			let selectedShow = show.id;
			console.log(selectedShow);
		
			fetch(`https://api.tvmaze.com/shows/${selectedShow}/episodes`)
			.then((response) => response.json()) //necessary to get json response
			.then((data) => {
			  allEpisodes = data;
			  makePageForEpisodes(allEpisodes);
			  dropDownMenu(allEpisodes);
			})
			  .catch (function(error) {
				console.error(error);
			  })
			console.log(allEpisodes);
			const episodeResults = document.getElementById("episodeDropdown");
			episodeResults.innerHTML = "";
			const results = document.getElementById("shows");
			results.innerHTML = "";
					 
				
		});
		
		
		titleEl.innerText = `${show.name}`;
		imageEl.setAttribute("src", show.image.medium);

		showEl.append(titleEl, genreEl, ratingEl, runtimeEl)
		cardEl.append(imageEl, showEl, summaryEl);
		aEl.append(cardEl);
		showsdiv.append(aEl);

		let optionEl = document.createElement("option");
		optionEl.innerHTML = `${show.name} `;
		optionEl.value = `${show.id}`;
		
		showsDropdown.append(optionEl);

		
	});
}


// working- adding event listener to search box
showSearchEl.addEventListener("keyup", searchShows2);

// working- creating search function
function searchShows2() {
	let search = document.getElementById("shows-search").value;
	const filteredShows = allShows.filter((show) => {
		return (
			show.name.toLowerCase().includes(search.toLowerCase()) 
		);
	});
	const results = document.getElementById("shows");
	results.innerHTML = "";
	makePageForShows(filteredShows);
	
}

showsDropdown.addEventListener("change", function (e) {
	
	let selectedShow = e.target.value;
	console.log(selectedShow);

	fetch(`https://api.tvmaze.com/shows/${selectedShow}/episodes`)
	.then((response) => response.json()) //necessary to get json response
	.then((data) => {
      allEpisodes = data;
	  makePageForEpisodes(allEpisodes);
	  dropDownMenu(allEpisodes);
    })
  	.catch (function(error) {
		console.error(error);
  	})
	console.log(allEpisodes);
	const episodeResults = document.getElementById("episodeDropdown");
	episodeResults.innerHTML = "";
	// why is it not showing episodes? showing in conols
	const results = document.getElementById("shows");
	results.innerHTML = "";
			 
		
});



// Functions for episodes

// working- creating the initial cards for episodes
function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById("root");
	rootElem.textContent = ` ${episodeList.length} episode(s)`;
	episodeList.forEach((episode) => {
		let cardEl = document.createElement("div");
		let imageEl = document.createElement("img");
		let titleEl = document.createElement("h2");
		let seasonEl = document.createElement("h3");
		let summaryEl = document.createElement("div");
		//adding 0 to episode and season numbers
		if (episode.season < 10) {
			seasonNumber = `0${episode.season}`;
		} else {
			seasonNumber = episode.season;
		}
		if (episode.number < 10) {
			episodeNumber = `0${episode.number}`;
		} else {
			episodeNumber = episode.number;
		}
		cardEl.className = "card";
		titleEl.className = "title";
		seasonEl.className = "season";
		imageEl.className = "img";
		summaryEl.className = "summary";
		titleEl.innerText = `${episode.name}`;
		seasonEl.innerText = `S${seasonNumber}E${episodeNumber}`;
		imageEl.setAttribute("src", episode.image.original);
		summaryEl.innerHTML = episode.summary;
		//appending the cards to the the container
		cardEl.append(imageEl, titleEl, seasonEl, summaryEl);
		episodesList.append(cardEl);
	});
	// creating the episode list dropdown menu by calling the function
	dropDownMenu(episodeList);
	
}

// working- adding event listener to search box
search.addEventListener("keyup", searchShows);

// working- creating search function
function searchShows() {
	let search = document.getElementById("search").value;
	const filteredEpisodes = allEpisodes.filter((episode) => {
		return (
			episode.name.toLowerCase().includes(search.toLowerCase()) ||
			episode.summary.toLowerCase().includes(search.toLowerCase())
		);
	});
	const results = document.getElementById("episodes");
	results.innerHTML = "";
	makePageForEpisodes(filteredEpisodes);
}

// working- creating dropdown
function dropDownMenu(episodeList) {
	episodeList.forEach((episode) => {
		let optionEl = document.createElement("option");
		//adding 0 to episode and season numbers
		if (episode.season < 10) {
			seasonNumber = `0${episode.season}`;
		} else {
			seasonNumber = episode.season;
		}
		if (episode.number < 10) {
			episodeNumber = `0${episode.number}`;
		} else {
			episodeNumber = episode.number;
		}
		optionEl.innerHTML = `${episode.name} S${seasonNumber}E${episodeNumber} `;
		optionEl.value = `E${episode.season}S${episode.number}`;
		episodeDropdown.append(optionEl);
	});
}

// working- adding event listener to the dropdown
episodeDropdown.addEventListener("change", function (e) {
	let selectedEpisode = e.target.value;
	let matchedEpisode = allEpisodes.filter((episode) => {
		return selectedEpisode == `E${episode.season}S${episode.number}`;
	});
	const results = document.getElementById("episodes");
	results.innerHTML = "";
	makePageForEpisodes(matchedEpisode);
});

window.onload = setup;
