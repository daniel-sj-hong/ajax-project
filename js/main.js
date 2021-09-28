const $jokeButton = document.querySelector('.joke-button');
const $jokeContainer = document.querySelector('.joke-container');
const $punchButton = document.querySelector('.punchline-button');
const $jokeTarget = document.querySelector('.joke-target');
const $targetColumn = document.querySelector('.target-column');
const $moreJokesButton = document.querySelector('.more-jokes-button');
const $laughingEmoji = document.querySelector('.laughing-emoji');
const $snoozeEmoji = document.querySelector('.snooze-emoji');
const $collectionButton = document.querySelector('.collection-button');
const $backToJokesButton = document.querySelector('.back-to-jokes-button');
const $bigLaughingEmoji = document.querySelector('.big-laughing-emoji');
const $hourglass = document.querySelector('.lds-hourglass');
const $eventLog = document.querySelector('.event-log');

$jokeButton.addEventListener('click', handleJoke);
$punchButton.addEventListener('click', handlePunch);
$moreJokesButton.addEventListener('click', handleMoreJokes);
$laughingEmoji.addEventListener('click', handleLaugh);
$snoozeEmoji.addEventListener('click', handleSnooze);
$collectionButton.addEventListener('click', handleCollection);
$backToJokesButton.addEventListener('click', handleBackToJokes);

function getJoke() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://got-jokes-us.herokuapp.com/random_joke');
  xhr.responseType = 'json';
  $hourglass.className = 'lds-hourglass';
  xhr.onreadystatechange = () => {
    if (xhr.status === 404) {
      $eventLog.textContent = 'Sorry, server could not retrieve the requested data. Please try again later';
    }
  };
  xhr.addEventListener('error', err => {
    console.error(err);
    $eventLog.textContent = 'Sorry, there was an error connecting to the network! Please trying again later';
  });
  xhr.addEventListener('load', function () {
    data.joke = xhr.response.setup;
    data.punchline = xhr.response.punchline;

    const $divRow = document.createElement('div');
    $divRow.setAttribute('class', 'row');
    $jokeTarget.appendChild($divRow);

    const $divColumn = document.createElement('div');
    $divColumn.setAttribute('class', 'col-half');
    $divRow.appendChild($divColumn);

    const $p = document.createElement('p');
    $p.setAttribute('class', 'gray-text-bubble message-shadow');
    $p.textContent = data.joke;
    $divColumn.appendChild($p);
    $hourglass.className = 'hidden';
    scrollToBottom($jokeTarget);
  });
  xhr.send();
}

function handleJoke(event) {
  $jokeContainer.className = 'joke-container margin-top-30 negative-mb';
  $targetColumn.className = 'hidden';
  $punchButton.className = 'punchline-button message-shadow';
  getJoke();
}

function handlePunch(event) {
  $punchButton.className = 'hidden';
  $moreJokesButton.className = 'more-jokes-button message-shadow';
  $snoozeEmoji.className = 'snooze-emoji margin-right-20 message-shadow';
  $laughingEmoji.className = 'laughing-emoji margin-right-20 message-shadow';
  const $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $jokeTarget.appendChild($divRow);

  const $divColumn = document.createElement('div');
  $divColumn.setAttribute('class', 'col-half');
  $divRow.appendChild($divColumn);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'gray-text-bubble message-shadow');
  $p.textContent = data.punchline;
  $divColumn.appendChild($p);
  scrollToBottom($jokeTarget);
}

function handleMoreJokes(event) {
  getJoke();
  $moreJokesButton.className = 'hidden';
  $punchButton.className = 'punchline-button message-shadow';
  $laughingEmoji.className = 'hidden';
  $snoozeEmoji.className = 'hidden';
  $collectionButton.className = 'hidden';

  const $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $jokeTarget.appendChild($divRow);

  const $divColumn = document.createElement('div');
  $divColumn.setAttribute('class', 'col-full justify-end');
  $divRow.appendChild($divColumn);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'blue-text-bubble message-shadow');
  $p.textContent = 'More Jokes!';
  $divColumn.appendChild($p);
  scrollToBottom($jokeTarget);
}

function handleLaugh(event) {
  $laughingEmoji.className = 'hidden';
  $snoozeEmoji.className = 'hidden';
  $collectionButton.className = 'collection-button message-shadow';

  const $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $jokeTarget.appendChild($divRow);

  const $divColumn = document.createElement('div');
  $divColumn.setAttribute('class', 'col-full justify-end');
  $divRow.appendChild($divColumn);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'blue-text-bubble message-shadow');
  $p.textContent = '😂';
  $divColumn.appendChild($p);
  const savedJoke = {
    joke: data.joke,
    punchline: data.punchline
  };
  data.saved.push(savedJoke);
  scrollToBottom($jokeTarget);
}

function handleSnooze(event) {
  $laughingEmoji.className = 'hidden';
  $snoozeEmoji.className = 'hidden';
  $collectionButton.className = 'collection-button message-shadow';

  const $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $jokeTarget.appendChild($divRow);
  const $divColumn = document.createElement('div');
  $divColumn.setAttribute('class', 'col-full justify-end');
  $divRow.appendChild($divColumn);
  const $p = document.createElement('p');
  $p.setAttribute('class', 'blue-text-bubble message-shadow');
  $p.textContent = '😴';
  $divColumn.appendChild($p);
  scrollToBottom($jokeTarget);
}

function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

function handleCollection(event) {
  $backToJokesButton.className = 'back-to-jokes-button message-shadow';
  $moreJokesButton.className = 'hidden';
  $collectionButton.className = 'hidden';
  $bigLaughingEmoji.className = 'big-laughing-emoji justify-center';
  emptyElementContents($jokeTarget);
  for (let i = 0; i < data.saved.length; i++) {
    const $divRowOne = document.createElement('div');
    $divRowOne.setAttribute('class', 'row');
    $jokeTarget.appendChild($divRowOne);

    const $divColumnOne = document.createElement('div');
    $divColumnOne.setAttribute('class', 'col-half');
    $divRowOne.appendChild($divColumnOne);

    const $pOne = document.createElement('p');
    $pOne.setAttribute('class', 'gray-text-bubble message-shadow');
    $pOne.textContent = data.saved[i].joke;
    $divColumnOne.appendChild($pOne);

    const $divRowTwo = document.createElement('div');
    $divRowTwo.setAttribute('class', 'row');
    $jokeTarget.appendChild($divRowTwo);

    const $divColumnTwo = document.createElement('div');
    $divColumnTwo.setAttribute('class', 'col-half');
    $divRowTwo.appendChild($divColumnTwo);

    const $pTwo = document.createElement('p');
    $pTwo.setAttribute('class', 'gray-text-bubble message-shadow');
    $pTwo.textContent = data.saved[i].punchline;
    $divColumnTwo.appendChild($pTwo);
  }
}

function handleBackToJokes(event) {
  emptyElementContents($jokeTarget);
  $backToJokesButton.className = 'hidden';
  $punchButton.className = 'punchline-button message-shadow';
  $bigLaughingEmoji.className = 'hidden';
  getJoke();
}

function emptyElementContents(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}
