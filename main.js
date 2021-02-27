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


// The search form .
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
     
    const searchTerm = search.value;
    if (searchTerm) {
        searchProfile(apiUrl + searchTerm);
        search.value = "";
    }
});
// Fteching Data from the Api.
function searchProfile(url){
    fetch(url)
    .then(res => res.json())
    .then(function(data){
        
        
// Appending those Elements to the main Element.
            main.appendChild(img);
            main.appendChild(h3);
            main.appendChild(h2);
            main.appendChild(p);
            
            img.src = `${data.avatar_url}`
            // Putting the Api data on the elements.
            h3.innerHTML = ` Login : <a href="${data.html_url}" target="_blank">${data.login}</a>`
            h2.innerHTML = ` Name : ${data.name}`
            p.innerHTML = `Bio : ${data.bio}`
        });
    }
    searchInstagram();
    document.querySelector('.search-input').addEventListener('keyup', function(e) {
        //if(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 97 && e.keyCode <= 122 || e.keyCode == 8)
        searchInstagram();
    })
    
    function searchInstagram() {
        //Search Instagram Accounts
        fetch(`https://www.instagram.com/web/search/topsearch/?&query=${document.querySelector('.search-input').value}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            document.querySelector('.results .ig').innerHTML = "";
            for(let i in data.users){
                let userData = data.users[i].user;
    
                let user = `<div class="user">
                    <div class="image-holder">
                        <img src="${userData.profile_pic_url}" />
                    </div>
                    <div class="user-account-info">
                        <div class="user-display-name">${userData.full_name}</div>
                        <div class="user-name">@${userData.username}</div>
                    </div>
                    <abbr title="Open @${userData.username}'s account" class="fas fa-external-link-alt" onclick="window.open('https://instagram.com/${userData.username}')"></abbr>
                </div>`;
    
                document.querySelector('.results .ig').innerHTML += user;
            }
        })
    }
    
    function changeTab(e) {
        document.querySelectorAll('.tabs div').forEach(item => {
            item.classList.remove('selected');
        })
        document.querySelectorAll('.results div').forEach(item => {
            item.classList.remove('open');
        })
        e.classList.add('selected');
    }