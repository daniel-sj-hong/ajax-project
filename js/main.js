var $jokeButton = document.querySelector('.joke-button');

$jokeButton.addEventListener('click', handleJoke);

function getJoke() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://official-joke-api.appspot.com/random_joke');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.joke = xhr.response.setup;
  });
  xhr.send();
}

function handleJoke(event) {

}
