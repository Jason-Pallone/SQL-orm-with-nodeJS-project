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
    <div class='id'>ID: ${movie[i].id}</div>
    <ul>
     <li> Title: <p class='title'>${movie[i].title}</p> </li>
     <li> Runtime: <p class='runtime'>${movie[i].runtime}</p> </li>
     <li> Release date: <p class='release-date'> ${movie[i].releaseDate}</p> </li>
    </ul>
    <button class="delete-btn">Delete</button>
    <button class="update-btn">Update</button>
    `
  divMovieList.appendChild(sections);
 }
}