const movieTitle = document.getElementById('title');
const movieRuntime = document.getElementById('runtime');
const movieIsAvailableOnVhs = document.getElementById('isAvailableOnVhs');
const movieReleaseDate = document.getElementById('release-date')
const movieID = document.getElementById('movieID');
const deleteBtn = document.getElementById('deleteBtn');
const createMovieBtn = document.getElementById('create-btn');
const getMoviesBtn = document.getElementById('get-movies');
const updateBtn = document.getElementById('update-btn');
const divMovieList = document.getElementById('movie-list');

//create
createMovieBtn.addEventListener('click', async(e) => {
  e.preventDefault()
  let title = movieTitle.value;
  let runtime = movieRuntime.value;
  let isAvailableOnVhs = movieIsAvailableOnVhs.value;
  let releaseDate = movieReleaseDate.value;
  await axios.post('http://localhost:5000/movies/create', {
    title,
    runtime,
    isAvailableOnVhs,
    releaseDate
  })
  .then(res => { 
    section.innerHTML = ` <p> ${res.data} </p> `
  });
});


// retrieve
getMoviesBtn.addEventListener('click', async(e) => {
  e.preventDefault();
  await axios.get('http://localhost:5000/movies/retrieve-movies')
    .then( res => {
      console.log(res.data)
      const movieList = res.data
      for (let i = 0; i<movieList.length; i++) {
      const sections = document.createElement('section')
      sections.innerHTML = `
      <p> id: ${movieList[i].id} </p>
      <p> Title: ${movieList[i].title} </p>
      <p> Runtime: ${movieList[i].runtime} </p>
      <p> Release date: ${movieList[i].releaseDate} </p>
      `
      divMovieList.appendChild(sections);
      }
    });
});


//update
updateBtn.addEventListener('click', async(e) => {
  e.preventDefault();
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
    .then(res => console.log(res.data));
})


// delete
deleteBtn.addEventListener('click', async(e) => {
  e.preventDefault();
  let movieToDeleteID = movieID.value;
  await axios.post('http://localhost:5000/movies/delete', {movieToDeleteID})
    .then( res => console.log(res.data))
})