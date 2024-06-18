const myLibrary = [];

function Book(title, author, numOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  return;
}

// changing site theme functional
function setTheme(event) {
  const root = document.documentElement;
  const toggleBtn = event.target;
  const newTheme = root.className === 'dark' ? 'light' : 'dark';
  root.className = newTheme;

  toggleBtn.src = `./img/${newTheme === 'dark' ? 'light-theme.svg' : 'dark-theme.svg'}`;
}

document.querySelector('.js-theme-toggle').addEventListener('click', setTheme);
