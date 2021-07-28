var $jokeButton = document.querySelector('.joke-button');
var $jokeContainer = document.querySelector('.joke-container');
var $textBubble = document.querySelector('.text-bubble');
var $punchButton = document.querySelector('.punchline-button');

$jokeButton.addEventListener('click', handleJoke);

function getJoke() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://official-joke-api.appspot.com/random_joke');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.joke = xhr.response.setup;
    var $p = document.createElement('p');
    $p.textContent = data.joke;
    $textBubble.appendChild($p);
  });
  xhr.send();
}

function handleJoke(event) {
  $jokeContainer.className = 'joke-container';
  $jokeButton.className = 'hidden';
  $punchButton.className = 'punchline-button';
  getJoke();
}
