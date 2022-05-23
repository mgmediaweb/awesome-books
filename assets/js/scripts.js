const addBooks = () => {
  /*
  const bookInfo = {
      first_name: document.getElementById('first_name').value,
  };

  localStorage.setItem('books', JSON.stringify(bookInfo));
  */
};

const getBooks = () => {
  const books = JSON.parse(localStorage.getItem('books'));

  if (books) {
    /*
      document.getElementById('first_name').value = formData.first_name;
      */
  }
};

addBooks();
getBooks();