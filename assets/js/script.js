const gifContainer = document.querySelector("#gifContainer");

const gigglesContainer = document.querySelector("#gigglesContainer");

const dropdownButton= document.querySelector('#submitButton');

const initModal = document.querySelector("#intModal");

const dropdownList=document.querySelector('.dropdown');

const modal = document.querySelector(".modal");

let gifyKeyR='fNQfgqsi1G5OnBPBlie4e1lN3wVCBTTk'

const gifyKey='9tWD3JSotxpdhYNXTURQMtKldzGKZt2t'

dropdownButton.addEventListener('click', function(event){ //fx for submit button in modal

  event.preventDefault();

  event.stopPropagation();

  let category=dropdownList.value

  console.log(category)

  fetchData(category) //calls fetchdata fx and passes on the category input


})

document.querySelector('.button')

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {

      $el.classList.add('is-active');

    }
  
    function closeModal($el) {

      $el.classList.remove('is-active');

    }
  
    function closeAllModals() {

      (document.querySelectorAll('.modal') || []).forEach(($modal) => {

        closeModal($modal);

      });

    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {

      const modal = $trigger.dataset.target;

      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {

        openModal($target);

      });

    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {

      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {

        closeModal($target);

      });

    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {

      if(event.key === "Escape") {

        closeAllModals();

      }

    });

  });





async function fetchData(category) { ///fetches api data and stores it in local
    try {
        

        let jokeUrl=`https://v2.jokeapi.dev/joke/${category}?format=json?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`
        
        let gifyUrl= `https://api.giphy.com/v1/gifs/search?api_key=${gifyKeyR}&q=${category}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`


        const jokeResponse = await fetch(jokeUrl); // Fetching data from the joke API

        const jokeData = await jokeResponse.json();

        localStorage.setItem("joke", JSON.stringify(jokeData));

        console.log("--------- joke request --------");

        console.log(jokeData);

        const gifResponse = await fetch(gifyUrl); // Fetching data from the GIF API

        const gifData = await gifResponse.json();

        localStorage.setItem("gif", JSON.stringify(gifData));

        console.log("--------- gif request --------");

        console.log(gifData);

    } catch (error) {

        console.error("Error fetching data:", error);
        
    }  jokeSetup();




}
    function jokeSetup(){

        const jokeContainer = document.createElement("div");

        const jokeSetup = document.createElement("p");

        const jokeDelivery = document.createElement("p");
    
        const jokeInfo = JSON.parse(localStorage.getItem("joke"));

        if(jokeInfo.type === "twopart"){

        jokeSetup.textContent = jokeInfo.setup;

        jokeDelivery.textContent = jokeInfo.delivery;

        jokeContainer.appendChild(jokeSetup);

        jokeContainer.appendChild(jokeDelivery);

    }else {

        jokeSetup.textContent = jokeInfo.joke;

        jokeContainer.appendChild(jokeSetup);

    }

    gigglesContainer.appendChild(jokeContainer);

    gifSetup();
}

    function gifSetup(){//fx to get a random gif from the associated category

        let count = Math.floor(Math.random() * 25);

        const gifSetup = document.createElement("img");

        const gifInfo = JSON.parse(localStorage.getItem("gif"));

        gifSetup.src = gifInfo.data[count].images.original.url;

        gifContainer.appendChild(gifSetup);

    }

    initModal.addEventListener("click", function(event){

        event.preventDefault();

        modal.classList.add('is-active');
        
    })
    //joke/ setup &delivery
    // request input from user for a categorie(obrigatory)
    // .category: "Programming", "Misc", "Pun", "Spooky" and "Christmas"
    ///initialize modal 
    //receive information from form select
    //add event listener for the submit button
    // add input to the category variable
