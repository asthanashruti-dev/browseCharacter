# browseCharacter
Superhero Hunter JS
This project is a Superhero Hunter web application that allows users to search for superheroes using the Marvel API and add their favorite superheroes to a favorites list. It is built using vanilla JavaScript and utilizes the Marvel API for retrieving superhero data.

Features
Home Page: Displays a list of superheroes with a search bar for filtering superheroes based on the search query.
Superhero Page: Shows detailed information about a selected superhero, including their name, photo, bio, and other data retrieved from the Marvel API.
Favorites Page: Displays a list of favorite superheroes that have been added by the user.
Persistent Favorites: The list of favorite superheroes is stored in the browser's local storage, ensuring that the favorites remain even after closing the browser.

Usage
Obtain your Marvel API public and private keys by registering on the Marvel Developer Portal.

Create a file named config.js in the project root directory.

In the config.js file, add the following code and replace <PUBLIC_KEY> and <PRIVATE_KEY> with your Marvel API keys:

javascript

const API_PUBLIC_KEY = '<PUBLIC_KEY>';
const API_PRIVATE_KEY = '<PRIVATE_KEY>';

Open the index.html file in a web browser to access the Superhero Hunter application.

Dependencies
This project does not rely on any external libraries or frameworks. It is built using pure HTML, CSS, and JavaScript.

