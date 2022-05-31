// defined variables
const primaryDiv = () => document.getElementById("primary");
const randomGeneratorLink = () => document.getElementById("random-generator");
const homePage = () => document.getElementById("home");
const beers = () => document.getElementById("all-beers")
let likedBeers = [];

// event listeners
function returnToHome() {
    homePage().addEventListener("click", renderHomePage);
}

function randomBeerClickEvent() {
    randomGeneratorLink().addEventListener("click", fetchRandomBeer);
}

function allBeersPage() {
    beers().addEventListener("click", renderAllBeers);
}

// Event Handlers
function renderHomePage() {
    // create the html elements for the home page
    resetPrimaryDiv();

    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const img = document.createElement("img");

    h3.innerText = "Random Beer Generator"
    p.innerText = "Are you a beer enthusiast looking at expanding your pallet? Join us as we on embark on our random beer generator journey, where this application can provide you with some of the most unique beers you have never heard of! If a particular beer sounds tasty to you, let us know and we will save it to your favorites page!"
    img.src = "https://images.punkapi.com/v2/192.png"

    primaryDiv().appendChild(h3);
    primaryDiv().appendChild(p);
    primaryDiv().appendChild(img);
}

function renderBeerPage(beer) {
    console.log(beer)
    resetPrimaryDiv();

    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const img = document.createElement("img")
    const p3 = document.createElement("p")
    const btn = document.createElement("button")
    
    h3.innerText = "Random Beer"
    p.innerText = `Beer Name: ${beer.name}`
    p1.innerText = `Description: ${beer.description}`
    p2.innerText = `ABV: ${beer.abv}`
    img.src = (beer.image_url)
    p3.innerText = " "

    btn.innerText = "Sounds Tasty!"
    btn.classList.add("btn")

    btn.addEventListener("click", () => tastyBeer(beer)); 
  
    primaryDiv().appendChild(h3);
    primaryDiv().appendChild(p);
    primaryDiv().appendChild(p1);
    primaryDiv().appendChild(p2);
    primaryDiv().appendChild(img);
    primaryDiv().appendChild(p3);
    primaryDiv().appendChild(btn);
}

function renderAllBeers() {
    resetPrimaryDiv();

    const h3 = document.createElement("h3");
    const h5 = document.createElement("h5"); 

    h3.innerText = "Favorite Beers"
    h5.innerText = "Here is a list of all your favorite Beers!"

   
    primaryDiv().appendChild(h3);
    primaryDiv().appendChild(h5);
    
    renderBeer()
}

// Render and iterate over the liked beers
const renderBeer = () => {
    const ul = document.createElement("ul");
    likedBeers.forEach(beer => newRenderBeer(beer, ul))
    primaryDiv().appendChild(ul);
}

const newRenderBeer = (beer, ul) => {
    const li = document.createElement("li");
    li.innerText = beer.beer
    ul.appendChild(li);
}

// Beer API Calls
const fetchRandomBeer = () => {
    fetch("https://api.punkapi.com/v2/beers/random")
        .then(resp => resp.json())
        .then(data => {
           renderBeerPage(data[0])
        })
}

const fetchLikedBeer = () => {
    fetch("http://localhost:3000/liked")
    .then(resp => resp.json())
    .then(data => likedBeers = data);
}

const tastyBeer = beer => {
    fetch ("http://localhost:3000/liked", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({beer: beer.name})
    })
    .then(resp =>resp.json())
    .then(data => {
        likedBeers.push(data);
        renderAllBeers();

    })
}

// Extra
function resetPrimaryDiv() {
    primaryDiv().innerHTML = ""
}

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    renderHomePage();
    fetchLikedBeer();
    randomBeerClickEvent();
    returnToHome();
    allBeersPage();
    
})