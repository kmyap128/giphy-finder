window.onload = (e) => {
    document.querySelector("#search").onclick = searchButtonClicked;
}

let displayTerm = "";

function searchButtonClicked() {
    console.log("searchButtonClicked() called");

    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

    const GIPHY_KEY = "5PuWjWVnwpHUQPZK866vd7wQ2qeCeqg7";

    let url = GIPHY_URL + "api_key=" + GIPHY_KEY;
    console.log(url);

    let term = document.querySelector("#searchterm").value;
    displayTerm = term;

    term = term.trim();
    console.log(term);

    term = encodeURIComponent(term);

    console.log("Encoded", term)

    if(term.length < 1) return;

    url += "&q=" + term;
    console.log("Term URL:", url);

    url += "&limit=" + document.querySelector("#limit").value;
    console.log("URL w/Limit:", url);

    document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    getData(url);
}


function getData(url) {
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;
    xhr.onerror = dataError;

    xhr.open("GET",url);
    xhr.send();
}

function dataLoaded(e) {
    console.log("DATA LOADED:", e);
    let xhr = e.target;
    console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);
    console.log("DATA:", obj);

    if(!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No results for '" + displayTerm + "'</b>";
        return;
    }

    let results = obj.data
    console.log("results.length = " + results.length);
    let bigString = 
    "";

    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let imageUrl = result.images.fixed_width_downsampled.url;
		if(!imageUrl) imageUrl = "images/no-image-found.png";

        let url = result.url;

        let rating = result.rating ? result.rating.toUpperCase() : "N/A";

        let line = `<div class="result">`;
        line += `<img src="${imageUrl}" alt="" />`;
        line += `<span><a href="${url}">View on Giphy</a>`;
        
        line += `<p data-rating="${rating}">Rating: ${rating}</p></span>`;
        line += `</div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;
    document.querySelector("#status").innerHTML = "<b>Success!<b><p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";
}

function dataError(e) {
    console.log("An error occured")
}