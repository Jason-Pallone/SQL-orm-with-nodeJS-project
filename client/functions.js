// Functions for DRY coding

function showNotification(response) {
  notification.innerHTML = `${response.data}`
  notification.style.display = 'block'
  notification.classList.add('notification-animation')
}
 
 function resetNotification() {
  notification.style.display = 'none';
  notification.classList.remove('notification-animation')
}

 function clearInputValues() {
  movieTitle.value = ''
  movieRuntime.value = ''
  movieIsAvailableOnVhs.value = ''
  movieReleaseDate.value = ''
}

function generateHTML(res) {
  const movie = res.data;

  for (let i = 0; i<movie.length; i++) {
    const sections = document.createElement('section');
    sections.innerHTML = `
      <p class='id'>${movie[i].id}</p>
      <p id='title'>Title: ${movie[i].title}</p>
      <p>Runtime: ${movie[i].runtime}</p>
      <p>Release date: ${movie[i].releaseDate}</p>
      <button class="delete-btn">Delete</button>
      <button class="update-btn">Update</button>
    `
  divMovieList.appendChild(sections);
 }
}