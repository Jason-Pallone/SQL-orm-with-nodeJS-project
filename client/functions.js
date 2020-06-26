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

function clearContainer() {
  if (movieListDiv != null) {
    movieListDiv.innerHTML = ''
  };
}

// Generate HTML for section elements holding movie data.
function generateHTML(res) {
  const movie = res.data;

  for (let i = 0; i<movie.length; i++) {
    const sections = document.createElement('section');
    sections.innerHTML = `
    <div class='id'>${movie[i].id}</div>
    <div id="section-error-div"></div>
    <ul>
     <li> Title: <p class='title'>${movie[i].title}</p> </li>
     <li> Runtime: <p class='runtime'>${movie[i].runtime}</p> minutes</li>
     <li> Rating: <p class='rating'>${movie[i].rating}</p>/10 </li>
     <li> Review: <p class='review'>${movie[i].review}</p> </li>
    </ul>
    <div class="delete-and-update-btn-div">
      <button class="delete-btn">Delete</button>
      <button class="update-btn">Update</button>
    </div>
    `
  movieListDiv.appendChild(sections);
 }
}

// Replace all selected elements, with newly created elements, within the parent 'Section' element.
function replaceElements(e, elementToReplace, elementToCreate){
  const section = e.target.parentNode.parentNode;
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

//Get the innerHTML of the movie ID element and remove anything that isn't a number.
function getMovieID(e) {
  return e.target.parentNode.parentNode.querySelector('.id').innerHTML;
}


/* I'm using this HTML validation workaround I created, because the express JSON response won't send
   with the error status response. So for now i'm using this workaround, while I work on fixing the
   express response issue. */
function validateHTML(title, runtime, rating, review, e) {

  let errorMessage = '';

  if(e.target.textContent === 'Save') {
    errorMessage = e.target.parentNode.parentNode.querySelector('#section-error-div');
  } else {
    errorMessage = errorDiv;
  }

  if(title === '' ) {
    errorMessage.innerHTML = `<h3 class='error-msg'>Title field cannot be empty</h3>`;
    return false;
                                             // Checks to see if the runtime value is a number only
  } else if ( runtime === '' || runtime < 1 || /^\d+$/.test(runtime) != true) {
      errorMessage.innerHTML =`<h3 class='error-msg'>Please enter value greater than 0 for runtime</h3>`;
      return false;
                                                        // Checks to see if the rating value is a number only
  } else if ( rating === '' || rating < 1 || rating > 10 || /^\d+$/.test(rating) != true) {
      errorMessage.innerHTML = `<h3 class='error-msg'>Please enter a value between 1 and 10 for movie rating</h3>`;
      return false;

  } else if ( review === '' ) {
      errorMessage.innerHTML = `<h3 class='error-msg'>Review field cannot be empty</h3>`;
      return false;
  } else {
    errorMessage.innerHTML = ''
    return true;
  }
}