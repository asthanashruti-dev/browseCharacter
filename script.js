const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// API key and URL
const publicKey = '14d128909c905cb31595c8d600f6051d';
const privateKey = '9fd0c2b19738ff013498a243773feed23d75f5c8';
const timestamp = new Date().getTime();
//var MD5 = require("crypto-js/md5");
console.log(CryptoJS.MD5("text to hash").toString());
const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

const favoritesButton = document.getElementById('favoritesButton');
const favorites = getFavorites();

favoritesButton.addEventListener('click', displayFavorites(favorites));

function displayFavorites(favorites) {
    favoritesContainer.innerHTML = '';
  
    favorites.forEach(favorite => {
      const favoriteDiv = document.createElement('div');
      favoriteDiv.classList.add('favorite');
      favoriteDiv.innerHTML = `
        <img src="${favorite.thumbnail.path}.${favorite.thumbnail.extension}" alt="${favorite.name}">
        <h2>${favorite.name}</h2>
        <button class="remove-button">Remove from Favorites</button>
      `;
  
      const removeButton = favoriteDiv.querySelector('.remove-button');
      removeButton.addEventListener('click', () => {
        removeFromFavorites(favorite);
        displayFavorites(getFavorites());
      });
  
      favoritesContainer.appendChild(favoriteDiv);
    });
  }
  
  function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }
  
  function addToFavorites(superhero) {
    const favorites = getFavorites();
    const existingFavorite = favorites.find(favorite => favorite.id === superhero.id);
  
    if (!existingFavorite) {
      favorites.push(superhero);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      displayFavorites(favorites);
    }
  }
  
  function removeFromFavorites(favorite) {
    let favorites = getFavorites();
    favorites = favorites.filter(item => item.id !== favorite.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  
// Fetch superhero data from the Marvel API
function fetchSuperheroes(searchTerm) {
    if (searchTerm.trim() === '') {
      searchResults.innerHTML = '';
      return; // Exit the function if the search term is empty
    }
  
    fetch(apiUrl + `&nameStartsWith=${searchTerm}`)
      .then(response => {
        if (response.status === 409) {
          throw new Error('Invalid search term');
        }
        return response.json();
      })
      .then(data => displaySuperheroes(data.data.results))
      .catch(error => {
        console.log(error);
        searchResults.innerHTML = '';
      });
  }

// Display superhero data in the search results
function displaySuperheroes(superheroes) {
  searchResults.innerHTML = '';

  superheroes.forEach(superhero => {
    const superheroDiv = document.createElement('div');
    superheroDiv.classList.add('superhero');
    superheroDiv.innerHTML = `
      <img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" alt="${superhero.name}">
      <h2>${superhero.name}</h2>
      <button class="favorite-button" id="favoritebutton">Favorite</button>
    `;

    const favoriteButton = superheroDiv.querySelector('.favorite-button'); 
 
const favoritesPopup = document.getElementById('favoritesPopup');

favoriteButton.addEventListener('click', () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favoritesPopup.classList.add('active');
  setTimeout(() => {
    favoritesPopup.classList.remove('active');
  }, 2000);
});
    favoriteButton.addEventListener('click', () => addToFavorites(superhero));

    searchResults.appendChild(superheroDiv);
  });
}

// Add a superhero to the favorites list
function addToFavorites(superhero) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(superhero);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Initialize the app
function initApp() {
  searchInput.addEventListener('input', () => fetchSuperheroes(searchInput.value));
}

initApp();
