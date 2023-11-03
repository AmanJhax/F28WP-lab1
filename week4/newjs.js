// Initialize a variable to keep track of which page of data we're on.
var pageCounter = 1;

// Get the element with ID "city-info" from the DOM. This is where we'll display our city data.
var cityContainer = document.getElementById("city-info");

// Get the button element with ID "btn" from the DOM. We'll use this to trigger loading new data.
var btn = document.getElementById("btn");

// Add a click event listener to our button. When the button is clicked, the anonymous function will be executed.
btn.addEventListener("click", function() {

  // Create a new XMLHttpRequest object to interact with servers. It allows us to retrieve data from a URL without having to do a full page refresh.
  var ourRequest = new XMLHttpRequest();

  // Configure the GET request with the URL of our data. We're using the pageCounter to load different pages of data.
  ourRequest.open('GET', 'https://salma-s-hw.github.io/F28WP-lab/cities' + pageCounter + '.json');

  // Set up a function to run when the request is successfully completed.
  ourRequest.onload = function() {

    // Check if the request was successful (status codes between 200 and 399 indicate success).
    if (ourRequest.status >= 200 && ourRequest.status < 400) {

      // The request was successful. Parse the JSON data from the response text.
      var ourData = JSON.parse(ourRequest.responseText);

      // Call the renderHTML function to add the JSON data to the DOM.
      renderHTML(ourData);

    } else {
      // The server returned an error. Maybe the page wasn't found, or the server was down. Log the error to the console.
      console.log("We connected to the server, but it returned an error.");
    }
  };

  // Set up a function to run if there was an error making the request (e.g., if the user is offline).
  ourRequest.onerror = function() {
    console.log("Connection error");
  };

  // Send the request to the server.
  ourRequest.send();

  // Increment the page counter. The next time the button is clicked, the next page of data will be loaded.
  pageCounter++;

  // If we've loaded all our pages (in this case, we're assuming there are only two pages), hide the button from the user.
  if (pageCounter > 2) {
    btn.classList.add("hide-me");
  }
});

// Define the function that will add our data to the DOM.
function renderHTML(data) {

  // Initialize a variable to build our HTML string.
  var htmlString = "";

  // Loop through each item in our data.
  for (i = 0; i < data.length; i++) {

    // Add city data to our HTML string. This will display the city name, country, and indoor places to visit.
    htmlString += "<p>" + data[i].name + " is a city in " + data[i].country + ". <br> You can visit indoor places like: ";

    // Loop through the indoor places of the current city.
    for (ii = 0; ii < data[i].places.indoor.length; ii++) {

      // If this is the first place, don't add an "and" before it.
      if (ii == 0) {
        htmlString += data[i].places.indoor[ii];
      } else {
        // For subsequent places, add an "and" before the place name.
        htmlString += " and " + data[i].places.indoor[ii];
      }
    }

    // Add a separator and introduce the outdoor places section.
    htmlString += '. </br> And enjoy outdoor places like: ';

    // Loop through the outdoor places of the current city.
    for (ii = 0; ii < data[i].places.outdoor.length; ii++) {
      // Similar logic to indoor places for formatting our list.
      if (ii == 0) {
        htmlString += data[i].places.outdoor[ii];
      } else {
        htmlString += " and " + data[i].places.outdoor[ii];
      }
    }

    // Close the paragraph tag.
    htmlString += '.</hr></p>';
  }

  // Insert the HTML into our cityContainer element, just before the end of its content.
  cityContainer.insertAdjacentHTML('beforeend', htmlString);
}
