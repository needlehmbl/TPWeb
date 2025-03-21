const API_key = "2935f617c98e4b41bcdca63ddd3d1036";
const url = "https://newsapi.org/v2/everything?q=";

async function fetchData(query) {
  const res = await fetch(`${url}${query} &apiKey=${API_key}`);
  const data = await res.json();
  return data;
}

fetchData("all").then((data) => renderMain(data.articles));

let mobileMenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

function Hide() {
  mobileMenu.classList.toggle("hidden");
}

function renderMain(arr) {
  let mainHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].urlToImage) {
      mainHTML += `
        <div class="card">
        <a href=${arr[i].url}>
        <img
          src=${arr[i].urlToImage}
          lazy="loading"
        />
        <h4>${arr[i].title}</h4>
        <div class="publishbyDate">
          <p>${arr[i].source.name}</p>
          <span>•</span>
          <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
        </div>
        <div class="description">
          ${arr[i].description}
        </div>
        </a>
        </div>
        `;
    }
  }
  document.querySelector("main").innerHTML = mainHTML;
}

const searchBtn = document.getElementById("searchForm");
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInput = document.getElementById("searchInput");
const searchInputMobile = document.getElementById("searchInputMobile");
const iconBtn = document.getElementById("searchBtn")
const iconBtnMobile = document.getElementById("searchBtnMobile")

searchBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(searchInput.value);
  const data = await fetchData(searchInput.value);
  console.log(data);

  renderMain(data.articles);
});

searchBtnMobile.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(searchInputMobile.value);
  const data = await fetchData(searchInputMobile.value);
  console.log(data);
  renderMain(data.articles);
});

async function Search(query) {
  const data = await fetchData(query);
  console.log(data);
  renderMain(data.articles);
}

iconBtn.addEventListener("click", () =>{
    Search(searchInput.value )
})

iconBtnMobile.addEventListener("click", () =>{
    Search(searchInputMobile.value )
    Hide()
})
