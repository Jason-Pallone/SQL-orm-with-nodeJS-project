const getAllMoviesBtn = document.querySelector('#display-all-movies-btn');
const getMovieByNameBtn = document.querySelector('#get-movie-by-name-btn')
const movieListDiv = document.querySelector('#movie-list');
const noReviewsMessage = document.querySelector('#no-reviews-message');

// Retrieve all movies
getAllMoviesBtn.addEventListener('click', async(e) => {
  e.preventDefault();
  clearContainer();

  // Use http://localhost:5000 for development
  await axios.get('https://reviewer-jp.herokuapp.com/movies/retrieve-movies')
    .then( res =>  generateHTML(res) )
    .catch( err => console.log(err) );
});


// Retrieve movie by title
getMovieByNameBtn.addEventListener('click', async(e) => {
  e.preventDefault();
  clearContainer();
  
  const movieTitleToSearchInput = document.querySelector('#movie-title-to-search-input');
  const movieTitle = movieTitleToSearchInput.value;

  // Use http://localhost:5000 for development
  await axios.post('https://reviewer-jp.herokuapp.com/movies/search-for-movie', {movieTitle})
    .then( res =>{ 
      if (res.data.length === 0){
        noReviewsMessage.innerHTML = `<h4>There are no reviews for this title. Please create one above!</h4>`
      }
      generateHTML(res) 
    })
    .catch( err => console.error(err) );
});


/* Delete & update movie, I had to use document.addEventListener because the delete and update buttons are 
   not created until the movies are retrieved */
document.addEventListener('click', async(e) => {
  e.preventDefault();
  resetNotification(); // Reset the notification bar to be displayed again

  // ==== DELETE MOVIE ==== check to see if btn textContent = delete
  if(e.target && e.target.textContent === 'Delete') {
  
    const movieToDeleteID = getMovieID(e);

    // Use http://localhost:5000 for development
    await axios.post('https://reviewer-jp.herokuapp.com/movies/delete', {movieToDeleteID})
      .then( response => showNotification(response) )
      .catch( err =>  console.error(err) );
    // Removes the section element after data is deleted
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
    
    //===== UPDATE MOVIE ===== check to see if btn textContent = update
  } else if(e.target && e.target.textContent === 'Update') {
      e.target.textContent = 'Save';
      // Replace all P elements with input elements within the parent 'Section' element.
      replaceElements(e, 'p', 'input');

  } else if(e.target && e.target.textContent ==='Save'){

      // Movie values to be updated in the database
      const movieToUpdateID = getMovieID(e);
      const title = e.target.parentNode.parentNode.querySelector('.title').value;
      const runtime = e.target.parentNode.parentNode.querySelector('.runtime').value;
      const rating = e.target.parentNode.parentNode.querySelector('.rating').value;
      const review = e.target.parentNode.parentNode.querySelector('.review').value;

      const validateUpdatedMovieHTML = validateHTML(title, runtime, rating, review, e);

      if (validateUpdatedMovieHTML) {
        e.target.textContent = 'Update'

        // Use http://localhost:5000 for development
        await axios.put('https://reviewer-jp.herokuapp.com/movies/update-movie', {
          movieToUpdateID,
          title,
          runtime,
          rating,
          review
        })
         .then( response => showNotification(response))
         .catch( err => console.error(err));
        // Replace all input elements with P elements within the parent 'Section' element.
        replaceElements(e, 'input', 'p');
     }
  }
});

















