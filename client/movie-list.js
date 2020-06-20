const getAllMoviesBtn = document.getElementById('get-all-movies-btn');
const getMovieByNameBtn = document.getElementById('get-movie-by-name-btn')
const divMovieList = document.getElementById('movie-list');
const notification = document.getElementById('notification');

// retrieve all movies
getAllMoviesBtn.addEventListener('click', async(e) => {
  e.preventDefault();

  await axios.get('http://localhost:5000/movies/retrieve-movies')
    .then( res =>  generateHTML(res) )
    .catch( err => console.error(err) );
});


// retrieve movie by title
getMovieByNameBtn.addEventListener('click', async(e) => {
  e.preventDefault();
  
  const movieTitleToSearchInput = document.getElementById('movie-title-to-search-input');
  const movieTitle = movieTitleToSearchInput.value;

  await axios.post('http://localhost:5000/movies/search-for-movie', {movieTitle})
    .then( res => generateHTML(res) )
    .catch( err => console.error(err) );
});


// Delete & update movie
document.addEventListener('click', async(e) => {
  e.preventDefault();
  resetNotification(); // Reset the notification bar to be displayed again

  if(e.target && e.target.textContent === 'Delete') {
   
    let movieToDeleteID = document.querySelector('.id').innerHTML;

    await axios.post('http://localhost:5000/movies/delete', {movieToDeleteID})
      .then( response => showNotification(response) )
      .catch( err =>  console.error(err) );
      
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  } 
  else if(e.target && e.target.textContent === 'Update') {
    const section = e.target.parentNode;
    const title = section.firstElementChild;
    const titleValue = title.innerHTML;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = titleValue;
    section.insertBefore(input, title);
    section.removeChild(title)
  }
});



/*
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
*/