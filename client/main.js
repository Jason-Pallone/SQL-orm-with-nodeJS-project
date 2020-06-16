// Input elements
const movieTitle = document.getElementById('title');
const movieRuntime = document.getElementById('runtime');
const movieIsAvailableOnVhs = document.getElementById('isAvailableOnVhs');
const movieReleaseDate = document.getElementById('release-date');
const movieID = document.getElementById('movieID');

// Button elements
const deleteBtn = document.getElementById('deleteBtn');
const createMovieBtn = document.getElementById('create-btn');
const updateBtn = document.getElementById('update-btn');

// Notification & error divs
const close = document.getElementById('close');
const notification = document.getElementById('notification');
const errorDiv = document.getElementById('error-div');



// Functions for DRY coding
function showNotification(response) {
  notification.innerHTML = `${response.data}`
  notification.style.display = 'block'
  notification.classList.add('created-notification-animation')
}
 
function resetNotification() {
  notification.style.display = 'none';
  notification.classList.remove('created-notification-animation')
}

function clearInputValues() {
  movieTitle.value = ''
  movieRuntime.value = ''
  movieIsAvailableOnVhs.value = ''
  movieReleaseDate.value = ''
}



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


// Update movie
updateBtn.addEventListener('click', async(e) => {
  e.preventDefault();

  // Reset the notification bar to be displayed again
  resetNotification();

  let movieToUpdateID = movieID.value;
  let title = movieTitle.value;
  let runtime = movieRuntime.value;
  let isAvailableOnVhs = movieIsAvailableOnVhs.value;
  let releaseDate = movieReleaseDate.value;

  await axios.put('http://localhost:5000/movies/update-movie', {
    movieToUpdateID,
    title,
    runtime,
    isAvailableOnVhs,
    releaseDate
  })
    .then(response => {
      showNotification(response);
      clearInputValues();
    })
    .catch(err => console.error(err));
});


// Delete movie
deleteBtn.addEventListener('click', async(e) => {
  e.preventDefault();

  // Reset the notification bar to be displayed again
  resetNotification();

  let movieToDeleteID = movieID.value;

  await axios.post('http://localhost:5000/movies/delete', {movieToDeleteID})
    .then( response => {
      showNotification(response);
      movieID.value = ''
    })
    .catch(err =>  console.error(err))
})