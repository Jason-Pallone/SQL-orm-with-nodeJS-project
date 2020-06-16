const getMoviesBtn = document.getElementById('get-movies-btn');
const divMovieList = document.getElementById('movie-list');
const notification = document.getElementById('notification');

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


// retrieve
getMoviesBtn.addEventListener('click', async(e) => {
  e.preventDefault();

  await axios.get('http://localhost:5000/movies/retrieve-movies')
    .then( res => {
      const movieList = res.data;

      for (let i = 0; i<movieList.length; i++) {
        const sections = document.createElement('section');
        sections.innerHTML = `
          <p class='id'> ${movieList[i].id} </p>
          <p> Title: ${movieList[i].title} </p>
          <p> Runtime: ${movieList[i].runtime} </p>
          <p> Release date: ${movieList[i].releaseDate} </p>
          <button class="delete-btn">Delete</button>
        `
        divMovieList.appendChild(sections);
      }
    });
  });

  // Delete movie
document.addEventListener('click', async(e) => {
  e.preventDefault();

  if(e.target && e.target.textContent === 'Delete') {
    resetNotification(); // Reset the notification bar to be displayed again

    let movieToDeleteID = document.querySelector('.id').innerHTML;

    await axios.post('http://localhost:5000/movies/delete', {movieToDeleteID})
      .then( response => showNotification(response) )
      .catch( err =>  console.error(err) );
      
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  };
});
