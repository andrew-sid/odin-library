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
    <p><span class="book__num-of-pages">${numOfPages}</span> pages</p>
    <button class="book__is-read js-book__is-read">Read? ${isReadSymbol}</button>
    <button class=js-book__delete-btn>🗑️</button>
  `;
  return bookElem;
}

function addBookToLibrary(event) {
  event.preventDefault();
  let title = document.querySelector('.dialog-title');
  let author = document.querySelector('.dialog-author');
  let numbersOfPage = document.querySelector('.dialog-page-number');
  let isRead = document.querySelector('.dialog-is-read');
  let isReadStatus = isRead.checked ? 'true' : 'false';

  if (title.value && author.value && numbersOfPage.value) {
    myLibrary.push(new Book(title.value, author.value, numbersOfPage.value, isReadStatus));
    renderLibrary();

    //clear inputs
    title.value = '';
    author.value = '';
    numbersOfPage.value = '';
    isRead.checked = false;

    return true;
  } else {
    alert('Please, enter a data!');
    return false;
  }
}

function renderLibrary() {
  const books = document.querySelector('.books');
  books.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    let newBook = createBook(myLibrary[i]);

    // assign an id by which an element is deleted from the array and the page is re-rendered.
    newBook.dataset.id = i;
    newBook.querySelector('.js-book__delete-btn').addEventListener('click', () => {
      myLibrary.splice(i, 1);
      renderLibrary();
    });

    newBook.querySelector('.js-book__is-read').addEventListener('click', () => {
      myLibrary[i].isRead = myLibrary[i].isRead  ?  false : true;
      renderLibrary();
    });

    books.appendChild(newBook);
  }
}

//dialog functional
function dialog() {
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

  dialogAddBtn.addEventListener('click', (event) => {
    addBookToLibrary(event) ? bookDialog.close() : null;
  });
};

// changing site theme functional
function setTheme(event) {
  const root = document.documentElement;
  const toggleBtn = event.target;
  const newTheme = root.className === 'dark' ? 'light' : 'dark';
  root.className = newTheme;

  toggleBtn.src = `./img/${newTheme === 'dark' ? 'light-theme.svg' : 'dark-theme.svg'}`;
}

document.querySelector('.js-theme-toggle').addEventListener('click', setTheme);

//render current library and dialog listeners when page is load
renderLibrary();
dialog();
