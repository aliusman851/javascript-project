"use strict"
// Global variabler av Github Api and other api:er
const apiUrl = 'https://api.github.com/users/';
const main = document.querySelector('main');
const search = document.querySelector('#search');
const form = document.querySelector('form');

// Creating Elements.
const img = document.createElement('img');
const h3 = document.createElement('h3');
const h2 = document.createElement('h4');
const p = document.createElement('p');

// Get elementbyID 
const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

//Movie Api+imagepath+searchapi
const movieapiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const maincontent = document.getElementById("maincontent");
const movieform = document.getElementById("movieform");
const moviesearch = document.getElementById("moviesearch");





try {
  // The search form .
  form.addEventListener("submit", () => {
  main.innerHTML = '';
    let searchTerm;
    if (search != null) {
      searchTerm = search.value;
      searchProfile(apiUrl + searchTerm);
    } else {
      return null;
    }
    /*const searchTerm = search.value;
    if(searchTerm == null){
      alert("invalid value");
    }
    else{
      searchProfile(apiUrl + searchTerm);
    }
     */
  });
} catch (error) {
  console.log(error);
}

// Fteching Data from the Github Api.
function searchProfile(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {

      // Appending those Elements to the main Element.
      main.appendChild(img);
      main.appendChild(h3);
      main.appendChild(h2);
      main.appendChild(p);

      // Putting the Api data on the elements.
      img.src = `${data.avatar_url}`
      h3.innerHTML = ` Login : <a href="${data.html_url}" target="_blank">${data.login}</a>`
      h2.innerHTML = ` Name : ${data.name}`
      p.innerHTML = `Bio : ${data.bio}`
    });

}


// Random meal Api
//ClickButtonevent to get the random food 
try {
  get_meal_btn.addEventListener('click', async () => {
    const serverresponse = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const result = await serverresponse.json();
    //.then(res => result.json())
    //.then(res => {
    createMeal(result.meals[0]);

  });

} catch {
  p.innerHTML = `Error:${"something went wrong"}`
}

//creaTeMeal Function
const createMeal = (meal) => {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else {
      //Stop if no more ingredients
      break;
    }
  }

  // Uaing DOM to add and to show api data 
  const newInnerHTML = `
       <div class="row">
         <div class="columns five">
           <img class="img-fluid
           " src="${meal.strMealThumb}" alt="Meal Image">
           ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
           ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
           ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
           <h5>Ingredients:</h5>
           ${ingredients.map(ingredient => `${ingredient}`).join('')}
           </div>
          
         <div class="columns seven">
           <h4>${meal.strMeal}</h4>
           <p>${meal.strInstructions}</p>
         </div>
       </div>

       ${meal.strYoutube ? `
       <div class="row">
         <h5>Video Recipe</h5>
         <div class="videoWrapper">
           <iframe width="420" height="315"
           src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
           </iframe>
         </div>
       </div>` : ''}
     `;
  meal_container.innerHTML = newInnerHTML;
}

// Form submit event to search the required movie
try {
  form.addEventListener("submit", () => {
    main.innerHTML = '';
    let searchmovie;
    if (moviesearch != null) {
      searchmovie = moviesearch.value;
      showMovies(SEARCHAPI + searchmovie);
    } else {
      return null;
    }
    //const searchmovie = moviesearch.value;

    /*if (searchmovie == 0) {
      alert("invalid value")
    }
    else {
      showMovies(SEARCHAPI + searchmovie);
      
    }
    */
  });
} catch (error) {
  console.log(error);
}
//ShowMovies Function
showMovies(movieapiUrl);
function showMovies(url) {
  fetch(url).then(res => res.json())
    .then(function (data) {


      data.results.forEach(element => {
        const el = document.createElement('div');
        const img = document.createElement('img');
        const text = document.createElement('h2');
        text.innerHTML = `${element.title}`;
        img.src = IMGPATH + element.poster_path;
        el.appendChild(img);
        el.appendChild(text);
        maincontent.appendChild(el);
      });

    });

}
