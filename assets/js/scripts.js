const form = document.getElementById('addBookForm');

const setBooks = (books) => {
  localStorage.setItem('books', JSON.stringify(books));
};

const showBooks = (books) => {
  const tableBook = document.getElementById('bookList');

  books.forEach((item, key) => {
    const newRow = tableBook.insertRow(key);
    const newCellTitle = newRow.insertCell(0);
    const newCellAuthor = newRow.insertCell(1);
    const newCellButton = newRow.insertCell(2);

    const newBook = document.createTextNode(item.title);
    const newAuthor = document.createTextNode(item.author);

    newCellTitle.appendChild(newBook);
    newCellAuthor.appendChild(newAuthor);
    newCellButton.innerHTML = `<button type="button" onClick="delBooks(${key})">Remove</button>`;
  });

  return true;
};

const getBooks = (opc) => {
  const books = JSON.parse(localStorage.getItem('books'));

  if (books) {
    if (opc === 'get') {
      return books;
    }
    showBooks(books);
  }

  return [];
};

const delBooks = (id = null) => {
  if (id != null) {
    const books = getBooks('get');

    const newBooks = books.filter((item, key) => {
      /* add code here */
    });

    setBooks(newBooks);
    showBooks(newBooks);
  }
};

const addBooks = (title = null, author = null) => {
  if (title && author) {
    const bookInfo = {
      title,
      author,
    };

    const bookMem = getBooks('get');
    bookMem.push(bookInfo);
    setBooks(bookMem);
  }

  getBooks('show');
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const bookTitle = document.getElementById('book-title');
  const bookAuthor = document.getElementById('book-author');

  if ((bookTitle.value.trim() !== '') && (bookAuthor.value.trim() !== '')) {
    addBooks(bookTitle.value, bookAuthor.value);
    bookTitle.value = '';
    bookAuthor.value = '';
  }
});

delBooks();
getBooks('show');