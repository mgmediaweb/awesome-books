const form = document.getElementById('addBookForm');
const alert = document.querySelector('.alert');
const section = document.querySelectorAll('section');

class BooksClass {
  constructor() {
    return null;
  }

  add(title = null, author = null) {
    if (title && author) {
      const bookInfo = {
        title,
        author,
      };

      const bookMem = this.constructor.get();
      bookMem.push(bookInfo);
      this.constructor.set(bookMem);
      this.show();
      goto('booklist');
    }
  }

  del(id) {
    const books = this.constructor.get();

    const newBooks = books.filter((item, key) => {
      if (key !== id) return true;
      return null;
    });

    this.constructor.set(newBooks);
    this.show();
  }

  static get() {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books) return books;
    return [];
  }

  static set(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  show() {
    const books = this.constructor.get();
    const tableBook = document.getElementById('bookList').getElementsByTagName('tbody')[0];
    tableBook.innerHTML = '';

    if (books && books.length) {
      books.forEach((item, key) => {
        const newRow = tableBook.insertRow(key);
        const newCellTitle = newRow.insertCell(0);
        const newCellAuthor = newRow.insertCell(1);
        const newCellButton = newRow.insertCell(2);

        newCellButton.setAttribute('class', 'cellBtn text-center');

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
      newCell.setAttribute('class', 'text-center');
      newCell.appendChild(text);
    }

    return true;
  }
}

const books = new BooksClass();

const hideAlert = () => {
  alert.style.display = 'none';
};

const delBooks = (id = null) => {
  if (id != null) books.del(id);
};

const goto = (page) => {
  section.forEach(elem => {
    let idnum = elem.getAttribute('id');

    if(idnum !== page) {
      document.getElementById(idnum).style.display = 'none';
      document.getElementById(`nav-${idnum}`).removeAttribute('class');
    }
  });

  document.getElementById(page).style.display = 'block';
  document.getElementById(`nav-${page}`).setAttribute('class','active');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const bookTitle = document.getElementById('book-title');
  const bookAuthor = document.getElementById('book-author');

  if ((bookTitle.value.trim() !== '') && (bookAuthor.value.trim() !== '')) {
    books.add(bookTitle.value, bookAuthor.value);
    bookTitle.value = '';
    bookAuthor.value = '';
  } else {
    alert.style.display = 'block';
  }
});

books.show();
hideAlert();
delBooks();
goto('booklist');