//  Elements
const movieTitle = document.querySelector('#title');
const movieRuntime = document.querySelector('#runtime');
const movieRating = document.querySelector('#rating');
const movieReview = document.querySelector('#review');
const createMovieBtn = document.querySelector('#create-btn');
const closeBtn = document.querySelector('#close');
const notification = document.querySelector('#notification');
const errorDiv = document.querySelector('#error-div');


// Close notification on click
closeBtn.addEventListener('click', (e) => {;
  notification.style.display = 'none';
})


// Create movie
createMovieBtn.addEventListener('click', async(e) => {
  e.preventDefault()
  // Reset the notification bar to be displayed again
  resetNotification();

  let title = movieTitle.value;
  let runtime = movieRuntime.value;
  let rating = movieRating.value;
  let review = movieReview.value;

  const validMovieCreationHTML = validateHTML(title, runtime, rating, review, e);

  //Checks to see if HTML is valid to be posted.
  if(validMovieCreationHTML) {

    // Extract input values from the form element and send them as a post request
    // Use http://localhost:5000 for development
    await axios.post('https://reviewer-jp.herokuapp.com/movies/create', {
      title,
      runtime,
      rating,
      review
    })
    .then((response) => { 
    // Display movie created notification
    showNotification(response);
    clearInputValues();
    })
    .catch( err => errorDiv.innerHTML = err ); // Display error message
  }
});
