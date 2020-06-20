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
    //Get the innerHTML and remove anything that isn't a number.
    let movieToDeleteIDstring = document.querySelector('.id').innerHTML;
    let movieToDeleteID = movieToDeleteIDstring.replace(/\D/g, "");

    await axios.post('http://localhost:5000/movies/delete', {movieToDeleteID})
      .then( response => showNotification(response) )
      .catch( err =>  console.error(err) );
      
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    // Replace all P elements with input elements for this secton
  } else if(e.target && e.target.textContent === 'Update') {
      e.target.textContent = 'Save'
      const section = e.target.parentNode;
      const paragraphs = section.querySelectorAll('p');
      for(let i = 0; i<paragraphs.length; i++){
        const li = section.querySelectorAll('li');
        const name = paragraphs[i].className;
        const input = document.createElement('input');
        input.id = name;
        input.type = 'text';
        input.value = paragraphs[i].textContent;
        li[i].replaceChild(input, paragraphs[i]);
    }
  } else if(e.target && e.target.textContent ==='Save'){
      e.target.textContent = 'Update'
      const section = e.target.parentNode;
      const input = section.querySelectorAll('input');

      const updatedMovieIDstring = document.querySelector('.id').innerHTML;
      const movieToUpdateID = updatedMovieIDstring.replace(/\D/g, "");
      const title = document.getElementById('title').value;
      const runtime = document.getElementById('runtime').value;
      const releaseDate = document.getElementById('release-date').value;

      await axios.put('http://localhost:5000/movies/update-movie', {
        movieToUpdateID,
        title,
        runtime,
        releaseDate
      })
        .then( response => showNotification(response))
        .catch( err => console.error(err));
      // Replace all input elements with P elements for this section.
      for(let i = 0; i<input.length; i++){
        const li = section.querySelectorAll('li');
        const name = input[i].id;
        const paragraphs = document.createElement('p');
        paragraphs.className = name;
        paragraphs.textContent = input[i].value;
        li[i].replaceChild(paragraphs, input[i]);
      } 
   }
});


