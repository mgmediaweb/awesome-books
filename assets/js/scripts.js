const form = document.getElementById('addBookForm');

const setBooks = (books) => {
  localStorage.setItem('books', JSON.stringify(books));
};

const getBooks = () => {
  const books = JSON.parse(localStorage.getItem('books'));
  if (books) return books;
  return [];
};

const showBooks = () => {
  const books = getBooks();
  const tableBook = document.getElementById('bookList');
  tableBook.innerHTML = '';

  if (books && books.length) {
    books.forEach((item, key) => {
      const newRow = tableBook.insertRow(key);
      const newCellTitle = newRow.insertCell(0);
      const newCellAuthor = newRow.insertCell(1);
      const newCellButton = newRow.insertCell(2);

      newCellButton.setAttribute('width', 50);

      const newBook = document.createTextNode(item.title);
      const newAuthor = document.createTextNode(item.author);

      newCellTitle.appendChild(newBook);
      newCellAuthor.appendChild(newAuthor);
      newCellButton.innerHTML = `<button type="button" onClick="delBooks(${key})">Remove</button>`;
    });
  } else {
    const newRow = tableBook.insertRow(0);
    const newCell = newRow.insertCell(0);
    const text = document.createTextNode('No books availables');

    newCell.setAttribute('colspan', 3);
    newCell.setAttribute('align', 'center');
    newCell.appendChild(text);
  }

  return true;
};

const delBooks = (id = null) => {
  if (id != null) {
    const books = getBooks();

    const newBooks = books.filter((item, key) => {
      if (key !== id) return true;
      return null;
    });

    setBooks(newBooks);
    showBooks();
  }
};

const addBooks = (title = null, author = null) => {
  if (title && author) {
    const bookInfo = {
      title,
      author,
    };

    const bookMem = getBooks();
    bookMem.push(bookInfo);
    setBooks(bookMem);
    showBooks();
  }
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
showBooks();
