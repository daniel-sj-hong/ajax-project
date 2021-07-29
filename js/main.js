var $jokeButton = document.querySelector('.joke-button');
var $jokeContainer = document.querySelector('.joke-container');
var $punchButton = document.querySelector('.punchline-button');
var $ajaxTarget = document.querySelector('.ajax-target');
var $targetColumn = document.querySelector('.target-column');
var $moreJokesButton = document.querySelector('.more-jokes-button');

$jokeButton.addEventListener('click', handleJoke);
$punchButton.addEventListener('click', handlePunch);
$moreJokesButton.addEventListener('click', handleMoreJokes);

function getJoke() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://official-joke-api.appspot.com/random_joke');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.joke = xhr.response.setup;
    data.punchline = xhr.response.punchline;
    var $div = document.createElement('div');
    $div.setAttribute('class', 'test1');
    $ajaxTarget.appendChild($div);
    var $p = document.createElement('p');
    $p.setAttribute('class', 'text-bubble');
    $p.textContent = data.joke;
    $div.appendChild($p);
  });
  xhr.send();
}

function handleJoke(event) {
  $jokeContainer.className = 'joke-container margin-top-30';
  $targetColumn.className = 'hidden';
  $punchButton.className = 'punchline-button';
  getJoke();
}

function handlePunch(event) {
  if (data.punchline !== '') {
    var $div = document.createElement('div');
    $ajaxTarget.appendChild($div);
    var $p = document.createElement('p');
    $p.setAttribute('class', 'text-bubble');
    $p.textContent = data.punchline;
    $div.appendChild($p);
  }
}
