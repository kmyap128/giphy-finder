// TODO: 
// add view more button to vview more results (limit to 10-15 per page maybe)
// change image to be clickable link to giphy
// fix copy link
// change button color
// add favorites bar



window.onload = (e) => {
    document.querySelector("#search").onclick = searchButtonClicked;
}

let displayTerm = "";



function searchButtonClicked() {
    console.log("searchButtonClicked() called");

    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

    const GIPHY_KEY = "1EecLZC0Kv2XAQDx4fmAWZRik0zE6wc2";

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
        line += `<a href="${url}"><img src="${imageUrl}" alt="" /></a>`;
        line += `<span><button data-url="${url}" onclick="copyLink">Copy Link</button>`;
        line += `<p data-rating="${rating}">Rating: ${rating}</p></span>`
        line += `</div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;
    document.querySelector("#status").innerHTML = "<b>Success!<b><p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";
    document.querySelector(".result button").addEventListener('click', copyLink);
}

let copyLink = (e) => { 
    console.log("Copy Link clicked");
    e.target.innerHTML = "Copied link!";
    let url = e.target.getAttribute('data-url');
    navigator.clipboard.writeText(url);
    // change text back after 3 seconds
    setTimeout(() => {
        e.target.innerHTML = "Copy Link";
    }, 3000);
}

function dataError(e) {
    console.log("An error occured")
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the checkbox input element
    const checkbox = document.querySelector('.switch input');

    // Add event listener for 'change' event on the checkbox
    checkbox.addEventListener('change', function() {
        // Get the body element
        const body = document.body;
        const wrapper = document.getElementById("wrapper")
        const toggle = document.getElementById("toggle")

        // Check if the checkbox is checked
        if (checkbox.checked) {
            // Set body background color to dark
            body.style.backgroundColor = '#21323f';
            wrapper.style.backgroundColor = '#a9a9a9'
            toggle.style.color = "#ffffff"
        } else {
            // Set body background color to light
            body.style.backgroundColor = '#91d4dd'
            wrapper.style.backgroundColor = '#ebebeb';
            toggle.style.color = '#000000'
        }
    });
});