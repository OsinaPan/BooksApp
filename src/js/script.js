{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.books-list .book__image',
    },
  };
  
  const classFav = {
    favorite: 'favorite',
  };
  

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const render = function () {
    for (const book of dataSource.books) {
      const generatedHTML = templates.books(book);
      const generateDOMElement = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.containerOf.booksList);
      booksContainer.appendChild(generateDOMElement);
    }
  };

  const favoriteBooks = [];
  const filters = [];

  function initActions() {
    const booksList = document.querySelector(select.containerOf.booksList);
    const filtersSection = document.querySelector(select.containerOf.filters);

    booksList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const clickOnBook = event.target;
      if (clickOnBook.offsetParent.classList.contains('book__image')) {
        const bookId = clickOnBook.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.includes(bookId)) {
          clickOnBook.offsetParent.classList.add(classFav.favorite);
          favoriteBooks.push(bookId);
        } else {
          clickOnBook.offsetParent.classList.remove(classFav.favorite);
          const bookIndex = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(bookIndex, 1);
        }
      }
    });

    filtersSection.addEventListener('change', function(event) {
      const elem = event.target;
      const filterName = elem.value;
      if(filters.includes(filterName)) {
        const index = filters.indexOf(filterName);
        filters.splice(index, 1);
      } else {
        filters.push(filterName);
      }
      console.log('filters:', filters);
      filterBooks();
    });
  }

  function filterBooks() {
    for (const book of dataSource.books) {
      let shouldBeHidden = false;
      const selectImage = document.querySelector(
        '.book__image[data-id="' + book.id + '"]'
      );
      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        selectImage.classList.add('hidden');
      } else {
        selectImage.classList.remove('hidden');
      }
      console.log(selectImage);
    }
  }
  
  render();
  initActions();
}