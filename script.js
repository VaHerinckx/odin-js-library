function Book(name, author, page, read) {
  this.name = name;
  this.author = author;
  this.page = page;
  this.read = read;
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
let showLibraryButton = document.querySelector("#showLibrary");
let bookContainer = document.querySelector(".books");
let bookList = [];
let bookCount = 0;

// Open dialog window when user clicks on "Add book"
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// When user closes dialog window:
  // 1) Create new book object with user input
  // 2) Reset the form for next use
  // 3) Add it to array
  // 4) Display all books
closeButton.addEventListener("click", () => {
  const nameInput = document.querySelector("#name").value;
  const authorInput = document.querySelector("#author").value;
  const pagesInput = document.querySelector("#pages").value;

  // Check if any of the required fields are empty
  if (!nameInput || !authorInput || !pagesInput) {
    alert("Please fill in all required fields before adding the book.");
  } else {
    let book = createBook();
    bookCount += 1;
    document.querySelector(".newBookForm").reset();
    bookList.push(book);
    displayBooks();
    dialog.close();
  }
});

// Trigger the delete & change status events
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-book")) {
    let book = event.target.parentElement;
    removeBook(book);
  }
  if (event.target.classList.contains("status-book")) {
    let book = event.target.parentElement;
    changeBookStatus(book);
    displayBooks();
  }
});

// Create a new book instance based on user input
function createBook() {
  let book = new Book(document.querySelector("#name").value,
                      document.querySelector("#author").value,
                      document.querySelector("#pages").value,
                      document.querySelector("input[name='read-notread']:checked").value)
  return book;
}

// Create the DOM elements to display the book objects
function displayBooks () {
  resetDisplay();
  bookList.forEach( function (book) {
    let newBook = document.createElement('div');
    let bookText = document.createElement('span')
    let delButton = document.createElement('button');
    let statusButton = document.createElement('button');
    newBook.classList.add("book");
    newBook.setAttribute("id", `book-${bookCount}`);
    newBook.setAttribute("name", `${book.name}`)
    bookText.textContent = `${book.name} by ${book.author}, ${book.page} pages, ${book.read}.`;
    delButton.classList.add("delete-book");
    delButton.textContent = "Delete";
    statusButton.classList.add("status-book");
    statusButton.textContent = "Change status";
    newBook.appendChild(bookText);
    newBook.appendChild(delButton);
    newBook.appendChild(statusButton);
    bookContainer.appendChild(newBook);
})
}
// Change the status of the book
function changeBookStatus (book) {
  bookList.forEach( function (bookI) {
    if (bookI.name === book.getAttribute("name")) {
      switch (bookI.read) {
        case 'read':
          bookI.read = "not-read";
          break;
        default:
          bookI.read = "read";
      }
    }
  })
}
// Remove the book from the display and from the Array
function removeBook (book) {
  bookList.forEach( function (bookI) {
    if (bookI.name === book.getAttribute("name")) {
      bookList.splice(bookList.indexOf(bookI));
    }
  })
  book.remove()
}

// Removes all display to prevent adding the same books multiple times
function resetDisplay () {
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.firstChild);
  }
}
