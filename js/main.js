var $jokeButton = document.querySelector('.joke-button');
var $jokeContainer = document.querySelector('.joke-container');
var $punchButton = document.querySelector('.punchline-button');
var $jokeTarget = document.querySelector('.joke-target');
var $targetColumn = document.querySelector('.target-column');
var $moreJokesButton = document.querySelector('.more-jokes-button');
var $laughingEmoji = document.querySelector('.laughing-emoji');
var $snoozeEmoji = document.querySelector('.snooze-emoji');
var $collectionButton = document.querySelector('.collection-button');
var $backToJokesButton = document.querySelector('.back-to-jokes-button');
var $bigLaughingEmoji = document.querySelector('.big-laughing-emoji');

$jokeButton.addEventListener('click', handleJoke);
$punchButton.addEventListener('click', handlePunch);
$moreJokesButton.addEventListener('click', handleMoreJokes);
$laughingEmoji.addEventListener('click', handleLaugh);
$snoozeEmoji.addEventListener('click', handleSnooze);
$collectionButton.addEventListener('click', handleCollection);
$backToJokesButton.addEventListener('click', handleBackToJokes);

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
  $collectionButton.className = 'hidden';

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
  $collectionButton.className = 'collection-button';

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
  $collectionButton.className = 'collection-button';

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

function handleCollection(event) {
  $backToJokesButton.className = 'back-to-jokes-button';
  $moreJokesButton.className = 'hidden';
  $collectionButton.className = 'hidden';
  $bigLaughingEmoji.className = 'big-laughing-emoji justify-center';
  destroy();
  for (var i = 0; i < data.saved.length; i++) {
    var $divRowOne = document.createElement('div');
    $divRowOne.setAttribute('class', 'row');
    $jokeTarget.appendChild($divRowOne);

    var $divColumnOne = document.createElement('div');
    $divColumnOne.setAttribute('class', 'col-half');
    $divRowOne.appendChild($divColumnOne);

    var $pOne = document.createElement('p');
    $pOne.setAttribute('class', 'gray-text-bubble');
    $pOne.textContent = data.saved[i].joke;
    $divColumnOne.appendChild($pOne);

    var $divRowTwo = document.createElement('div');
    $divRowTwo.setAttribute('class', 'row');
    $jokeTarget.appendChild($divRowTwo);

    var $divColumnTwo = document.createElement('div');
    $divColumnTwo.setAttribute('class', 'col-half');
    $divRowTwo.appendChild($divColumnTwo);

    var $pTwo = document.createElement('p');
    $pTwo.setAttribute('class', 'gray-text-bubble');
    $pTwo.textContent = data.saved[i].punchline;
    $divColumnTwo.appendChild($pTwo);
  }
}

function handleBackToJokes(event) {
  destroy();
  $backToJokesButton.className = 'hidden';
  $punchButton.className = 'punchline-button';
  $bigLaughingEmoji.className = 'hidden';
  getJoke();
}

function destroy(event) {
  while ($jokeTarget.lastChild) {
    $jokeTarget.removeChild($jokeTarget.lastChild);
  }
}
