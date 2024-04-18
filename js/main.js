// TODO: 
// add view more button to vview more results (limit to 10-15 per page maybe)
// fix copy link
// add favorites bar



window.onload = (e) => {
    document.querySelector("#search").onclick = searchButtonClicked;
    document.querySelector("#happy").onclick = happyButtonClicked;
    document.querySelector("#sad").onclick = sadButtonClicked;
    document.querySelector("#excited").onclick = excitedButtonClicked;
    document.querySelector("#bored").onclick = boredButtonClicked;
    document.querySelector("#angry").onclick = angryButtonClicked;
}

let displayTerm = "";

function searchButtonClicked() {
    let term = document.querySelector("#searchterm").value;
    search(term);
}

function happyButtonClicked() {
    search("happy");
}

function sadButtonClicked() {
    search("sad");
}

function excitedButtonClicked() {
    search("excited");
}

function boredButtonClicked() {
    search("bored");
}

function angryButtonClicked() {
    search("angry");
}

// have function for each nav button that calls search button

const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

const GIPHY_KEY = "1EecLZC0Kv2XAQDx4fmAWZRik0zE6wc2";

let api_url = GIPHY_URL + "api_key=" + GIPHY_KEY;
console.log(api_url);

let offset = 0;

function search(term) {
    console.log("search() called");

    displayTerm = term;

    term = term.trim();
    console.log(term);

    term = encodeURIComponent(term);

    console.log("Encoded", term)

    if(term.length < 1) return;

    api_url += "&q=" + term;
    console.log("Term URL:", api_url);

    api_url += "&limit=" + document.querySelector("#limit").value;
    console.log("URL w/Limit:", api_url);

    document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    getData(api_url, offset);
}

function getData(url, offset) {
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;
    xhr.onerror = dataError;

    xhr.open("GET", `${url}&offset=${offset}`);
    xhr.send();
}

function loadNextPage() {
    offset += 10;
    getData(api_url, offset);
}

function loadPreviousPage() {
    if (offset >= 10) {
        offset -= 10; // Decrement offset to load previous page
        getData(api_url, offset);
    }
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
    let bigString = "";

    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let imageUrl = result.images.fixed_width_downsampled.url;
		if(!imageUrl) imageUrl = "images/no-image-found.png";

        let url = result.url;

        let rating = result.rating ? result.rating.toUpperCase() : "N/A";
        let rcolor = `#008000`;
        if ( rating == 'G') {
            rcolor = `#008000`;
        }
        if ( rating == 'PG') {
            rcolor = `#008000`;
        }
        if ( rating == 'PG-13') {
            rcolor = `#ffff00`;
        }


        let line = `<div class="result">`;
        line += `<a href="${url}"><img src="${imageUrl}" alt="" /></a>`;
        line += `<span><button id="link${i}" data-url="${url}">Copy Link</button>`;
        line += `<p data-rating="${rating}" style="background-color: ${rcolor};">Rating: ${rating}</p></span>`;
        line += `</div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;
    document.querySelector("#status").innerHTML = "<p><i>Showing " + results.length + " results for '" + displayTerm + "'</i></p>";
    document.querySelector("#footer").innerHTML = "<button id='left'> <- </button> <button id='right'> -> </button>";

    document.querySelector("#right").onclick = loadNextPage;
    document.querySelector("#left").onclick = loadPreviousPage;

    document.querySelector("#link0").onclick = copy0;
    document.querySelector("#link1").onclick = copy1;
    document.querySelector("#link2").onclick = copy2;
    document.querySelector("#link3").onclick = copy3;
    document.querySelector("#link4").onclick = copy4;
    document.querySelector("#link5").onclick = copy5;
    document.querySelector("#link6").onclick = copy6;
    document.querySelector("#link7").onclick = copy7;
    document.querySelector("#link8").onclick = copy8;
    document.querySelector("#link9").onclick = copy9;
}


function copy0() {
    let url = document.querySelector("#link0").getAttribute("data-url");
    copyLink(url, "#link0");
}

function copy1() {
    let url = document.querySelector("#link1").getAttribute("data-url");
    copyLink(url, "#link1");
}

function copy2() {
    let url = document.querySelector("#link2").getAttribute("data-url");
    copyLink(url, "#link2");
}

function copy3() {
    let url = document.querySelector("#link3").getAttribute("data-url");
    copyLink(url, "#link3");
}

function copy4() {
    let url = document.querySelector("#link4").getAttribute("data-url");
    copyLink(url, "#link4");
}

function copy5() {
    let url = document.querySelector("#link5").getAttribute("data-url");
    copyLink(url, "#link5");
}

function copy6() {
    let url = document.querySelector("#link6").getAttribute("data-url");
    copyLink(url, "#link6");
}

function copy7() {
    let url = document.querySelector("#link7").getAttribute("data-url");
    copyLink(url, "#link7");
}

function copy8() {
    let url = document.querySelector("#link8").getAttribute("data-url");
    copyLink(url, "#link8");
}

function copy9() {
    let url = document.querySelector("#link9").getAttribute("data-url");
    copyLink(url, "#link9");
}

// make sure to change target, find way to pass specific button into function
function copyLink(url, button) { 
    console.log("Copy Link clicked");

    let item = document.querySelector(button);

    item.innerHTML = "Copied link!";
    navigator.clipboard.writeText(url);
    // change text back after 3 seconds
    setTimeout(() => {
        item.innerHTML = "Copy Link";
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
            body.style.backgroundColor = '#cbf9ff'
            wrapper.style.backgroundColor = '#ffffff';
            toggle.style.color = '#000000'
        }
    });
});