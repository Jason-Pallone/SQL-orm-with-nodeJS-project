// Input elements
const movieTitle = document.getElementById('title');
const movieRuntime = document.getElementById('runtime');
const movieIsAvailableOnVhs = document.getElementById('isAvailableOnVhs');
const movieReleaseDate = document.getElementById('release-date');
const movieID = document.getElementById('movieID');

// Button elements
const createMovieBtn = document.getElementById('create-btn');

// Notification & error divs
const close = document.getElementById('close');
const notification = document.getElementById('notification');
const errorDiv = document.getElementById('error-div');


// Close notification on click
close.addEventListener('click', (e) => {;
  notification.style.display = 'none';
})


// Create movie
createMovieBtn.addEventListener('click', async(e) => {
  e.preventDefault()

  // Reset the notification bar to be displayed again
  resetNotification();

  let title = movieTitle.value;
  let runtime = movieRuntime.value;
  let isAvailableOnVhs = movieIsAvailableOnVhs.value;
  let releaseDate = movieReleaseDate.value;

  // Extract input values from the form element and send them as a post request
  await axios.post('http://localhost:5000/movies/create', {
    title,
    runtime,
    isAvailableOnVhs,
    releaseDate
  } )
  .then((response) => { 
    // Display movie created notification
    showNotification(response);
    clearInputValues();
  })
  .catch( err => console.error(err));
});
