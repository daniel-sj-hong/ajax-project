var $jokeButton = document.querySelector('.joke-button');
var $jokeContainer = document.querySelector('.joke-container');
var $punchButton = document.querySelector('.punchline-button');
var $jokeTarget = document.querySelector('.joke-target');
var $targetColumn = document.querySelector('.target-column');
var $moreJokesButton = document.querySelector('.more-jokes-button');
var $reactionTarget = document.querySelector('.reaction-target');

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
    var $divRow = document.createElement('div');
    $divRow.setAttribute('class', 'row');
    $jokeTarget.appendChild($divRow);
    var $divColumn = document.createElement('div');
    $divColumn.setAttribute('class', 'col-half');
    $divRow.appendChild($divColumn);
    var $p = document.createElement('p');
    $p.setAttribute('class', 'gray-text-bubble');
    $p.textContent = data.joke;
    $divColumn.appendChild($p);
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
  var $div = document.createElement('div');
  $jokeTarget.appendChild($div);
  var $p = document.createElement('p');
  $p.setAttribute('class', 'gray-text-bubble');
  $p.textContent = data.punchline;
  $div.appendChild($p);
  $punchButton.className = 'hidden';
  $moreJokesButton.className = 'more-jokes-button';
}

function handleMoreJokes(event) {
  getJoke();
  $moreJokesButton.className = 'hidden';
  $punchButton.className = 'punchline-button';
  // var $div = document.createElement('div');
  // $reactionTarget.appendChild($div);
  // var $p = document.createElement('p');
  // $p.setAttribute('class', 'blue-text-bubble');
  // $p.setAttribute('class', 'justify-end');
  // $p.textContent = 'More Jokes!';
  // $jokeTarget.appendChild($p);
  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $jokeTarget.appendChild($divRow);
  var $divColumn = document.createElement('div');
  $divColumn.setAttribute('class', 'col-full justify-end');
  $divRow.appendChild($divColumn);
  var $p = document.createElement('p');
  $p.setAttribute('class', 'blue-text-bubble');
  $p.textContent = 'More Jokes!';
  $divColumn.appendChild($p);
}
