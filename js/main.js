var $jokeButton = document.querySelector('.joke-button');
var $jokeContainer = document.querySelector('.joke-container');
var $punchButton = document.querySelector('.punchline-button');
var $jokeTarget = document.querySelector('.joke-target');
var $targetColumn = document.querySelector('.target-column');
var $moreJokesButton = document.querySelector('.more-jokes-button');
var $laughingEmoji = document.querySelector('.laughing-emoji');
var $snoozeEmoji = document.querySelector('.snooze-emoji');

$jokeButton.addEventListener('click', handleJoke);
$punchButton.addEventListener('click', handlePunch);
$moreJokesButton.addEventListener('click', handleMoreJokes);
$laughingEmoji.addEventListener('click', handleLaugh);
$snoozeEmoji.addEventListener('click', handleSnooze);

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
    scrollToBottom($jokeTarget);
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
  $punchButton.className = 'hidden';
  $moreJokesButton.className = 'more-jokes-button';
  $snoozeEmoji.className = 'snooze-emoji margin-right-20';
  $laughingEmoji.className = 'laughing-emoji margin-right-20';
  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $jokeTarget.appendChild($divRow);

  var $divColumn = document.createElement('div');
  $divColumn.setAttribute('class', 'col-half');
  $divRow.appendChild($divColumn);

  var $p = document.createElement('p');
  $p.setAttribute('class', 'gray-text-bubble');
  $p.textContent = data.punchline;
  $divColumn.appendChild($p);
  scrollToBottom($jokeTarget);
}

function handleMoreJokes(event) {
  getJoke();
  $moreJokesButton.className = 'hidden';
  $punchButton.className = 'punchline-button';
  $laughingEmoji.className = 'hidden';
  $snoozeEmoji.className = 'hidden';
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
  scrollToBottom($jokeTarget);
}

function handleLaugh(event) {
  $laughingEmoji.className = 'hidden';
  $snoozeEmoji.className = 'hidden';

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $jokeTarget.appendChild($divRow);

  var $divColumn = document.createElement('div');
  $divColumn.setAttribute('class', 'col-full justify-end');
  $divRow.appendChild($divColumn);

  var $p = document.createElement('p');
  $p.setAttribute('class', 'blue-text-bubble');
  $p.textContent = '😂';
  $divColumn.appendChild($p);
  var savedJoke = {
    joke: data.joke,
    punchline: data.punchline
  };
  data.saved.push(savedJoke);
  scrollToBottom($jokeTarget);
}

function handleSnooze(event) {
  $laughingEmoji.className = 'hidden';
  $snoozeEmoji.className = 'hidden';

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $jokeTarget.appendChild($divRow);
  var $divColumn = document.createElement('div');
  $divColumn.setAttribute('class', 'col-full justify-end');
  $divRow.appendChild($divColumn);
  var $p = document.createElement('p');
  $p.setAttribute('class', 'blue-text-bubble');
  $p.textContent = '😴';
  $divColumn.appendChild($p);
  scrollToBottom($jokeTarget);
}

function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}
