window.onload = (e) => {
    document.querySelector("#search").onclick = searchButtonClicked;
    document.querySelector("#searchterm").addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            searchButtonClicked();
        }
    })
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

    api_url = GIPHY_URL + "api_key=" + GIPHY_KEY;

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
        line += `<button id="link${i}" data-url="${url}">Copy Link</button>`;
        line += `<span><p data-rating="${rating}" style="background-color: ${rcolor};">Rating: ${rating}</p></span>`;
        line += `</div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;
    document.querySelector("#status").innerHTML = "<p><i>Showing " + results.length + " results for '" + displayTerm + "'</i></p>";
    document.querySelector("#footer").innerHTML = "<button id='left'> <- </button> <button id='right'> -> </button>";

    document.querySelector("#right").onclick = loadNextPage;
    document.querySelector("#left").onclick = loadPreviousPage;

    for (let i = 0; i < results.length; i++) {
        document.querySelector(`#link${i}`).onclick = () => copyLink(i);
    }


}

function copyLink(index) { 
    console.log("Copy Link clicked");


    let item = document.querySelector(`#link${index}`);
    let url = item.getAttribute("data-url");

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
            body.style.backgroundColor = '#a5e3eb'
            wrapper.style.backgroundColor = '#ffffff';
            toggle.style.color = '#000000'
        }
    });
});