"use strict"
const apiUrl = 'https://api.github.com/users/';
const main = document.querySelector('main');
const search = document.querySelector('#search');
const form = document.querySelector('form');
// Creating Elements.
const img = document.createElement('img');
const h3 = document.createElement('h3');
const h2 = document.createElement('h2');
const p = document.createElement('p');
const p1 = document.createElement('p1');

// The search form .
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
     
    const searchTerm = search.value;
    if (searchTerm) {
        searchProfile(apiUrl + searchTerm);
        
    }
});
// Fteching Data from the Api.
function searchProfile(url){
    fetch(url)
    .then(res => res.json())
    .then(data =>{
    
        
// Appending those Elements to the main Element.
            main.appendChild(img);
            main.appendChild(h3);
            main.appendChild(h2);
            main.appendChild(p);
            main.appendChild(p1);
            img.src = `${data.avatar_url}`;
            // Putting the Api data on the elements.
            h3.innerHTML = ` Login : <a href="${data.html_url}" target="_blank">${data.login}</a>`;
            h2.innerHTML = ` Name : ${data.name}`;
            p.innerHTML = `Bio : ${data.bio}`
        });
}
