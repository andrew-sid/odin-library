const myLibrary = [
  {
    title: 'Crime and Punishment',
    author: 'F.M. Dostoevsky',
    numOfPages: 489,
    isRead: false,
  },

  {
    title: 'The Lord Of The Rings: The Fellowship of Ring',
    author: 'J.R.R. Tolkien',
    numOfPages: 475,
    isRead: true,
  },
];

function Book(title, author, numOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.isRead = isRead;
}

function createBook({ title, author, numOfPages, isRead }) {
  const isReadSymbol = isRead ? '&#9989;' : '&#10060;';
  const bookElem = document.createElement('li');
  bookElem.classList.add('book');
  bookElem.innerHTML = `
    <h3 class="book__title">${title}</h3>
    <p class="book__author">${author}</p>
    <p><span class="book__numOfPages">${numOfPages}</span> pages</p>
    <button class="book__isRead">Read? ${isReadSymbol}</button>
  `;
  return bookElem;
}

function addBookToLibrary() {
  let title = document.querySelector('.dialog-title').value;
  let author = document.querySelector('.dialog-author').value;
  let numbersOfPage = document.querySelector('.dialog-page-number').value;
  let isRead = document.querySelector('.dialog-is-read').checked ? true : false;

  let book = new Book(title, author, numbersOfPage, isRead);
  myLibrary.push(book);

  title = '';
  author = '';
  numbersOfPage = '';
  isRead = '';

  renderLibrary();
}

function renderLibrary() {
  const books = document.querySelector('.books');
  books.innerHTML = '';
  for (let book of myLibrary) {
    let newBook = createBook(book);
    books.appendChild(newBook);
  }
}

renderLibrary();

//dialog functional
(function dialog() {
  const bookDialog = document.querySelector('.js-add-book-dialog');
  const addBookBtn = document.querySelector('.js-add-book-btn');
  const dialogAddBtn = document.querySelector('.js-dialog-add');
  const dialogCancelBtn = document.querySelector('.js-dialog-cancel');

  addBookBtn.addEventListener('click', function () {
    bookDialog.showModal();
  });

  dialogCancelBtn.addEventListener('click', function () {
    bookDialog.close();
  });

  dialogAddBtn.addEventListener('click', () => {
    addBookToLibrary();
    bookDialog.close();
  });
}());

// changing site theme functional
function setTheme(event) {
  const root = document.documentElement;
  const toggleBtn = event.target;
  const newTheme = root.className === 'dark' ? 'light' : 'dark';
  root.className = newTheme;

  toggleBtn.src = `./img/${newTheme === 'dark' ? 'light-theme.svg' : 'dark-theme.svg'}`;
}

document.querySelector('.js-theme-toggle').addEventListener('click', setTheme);
