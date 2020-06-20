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
  movieRating.value = ''
  movieReview.value = ''
}

// Generate HTML for section elements holding movie data.
function generateHTML(res) {
  const movie = res.data;

  for (let i = 0; i<movie.length; i++) {
    const sections = document.createElement('section');
    sections.innerHTML = `
    <div class='id'>ID: ${movie[i].id}</div>
    <ul>
     <li> Title: <p class='title'>${movie[i].title}</p> </li>
     <li> Runtime: <p class='runtime'>${movie[i].runtime}</p> </li>
     <li> Rating: <p class='rating'>${movie[i].rating}</p> </li>
     <li> Review: <p class='review'>${movie[i].review}</p> </li>
    </ul>
    <button class="delete-btn">Delete</button>
    <button class="update-btn">Update</button>
    `
  divMovieList.appendChild(sections);
 }
}

// Replace all selected elements, with newly created elements, for the parent section element
function replaceElements(e, elementToReplace, elementToCreate){
  const section = e.target.parentNode;
  const elementsToReplace = section.querySelectorAll(elementToReplace);
  for(let i = 0; i<elementsToReplace.length; i++){
    const li = section.querySelectorAll('li');
    const name = elementsToReplace[i].className;
    const elementsToCreate = document.createElement(elementToCreate);
    elementsToCreate.className = name;
    if( elementsToCreate.nodeName === 'INPUT' ) {
      elementsToCreate.value = elementsToReplace[i].textContent
      elementsToCreate.type = 'text'
    } else {
    elementsToCreate.textContent = elementsToReplace[i].value;
    }
    li[i].replaceChild(elementsToCreate, elementsToReplace[i]);
  }
}

//Get the innerHTML and remove anything that isn't a number.
function getMovieID(e) {
  let movieIDstring = e.target.parentNode.querySelector('.id').innerHTML;
  return movieIDstring.replace(/\D/g, "");
}