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

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  let book = createBook();
  document.querySelector(".newBookForm").reset();
  bookList.push(book);
  addBook(book);
  dialog.close();
});

function createBook() {
  let book = new Book(document.querySelector("#name").value,
                      document.querySelector("#author").value,
                      document.querySelector("#pages").value,
                      document.querySelector("input[name='read-notread']:checked").value)
  return book;
}

function addBook (book) {
  let newBook = document.createElement('div');
  let delButton = document.createElement('button');
  let statusButton = document.createElement('button');
  newBook.classList.add("book");
  newBook.setAttribute("id", `book-${bookCount}`);
  newBook.setAttribute("name", `${book.name}`)
  newBook.textContent = `${book.name} by ${book.author}, ${book.page} pages, ${book.read}.`;
  delButton.classList.add("delete-book");
  delButton.textContent = "Delete";
  statusButton.classList.add("status-book");
  statusButton.textContent = "Change status";
  newBook.appendChild(delButton);
  newBook.appendChild(statusButton);
  bookContainer.appendChild(newBook);
  bookCount += 1;
}

function displayBooks () {

}

// Remove the book
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-book")) {
    event.target.parentElement.remove();
  }
  if (event.target.classList.contains("status-book")) {
    let book = event.target.parentElement
    console.log("clicked on status change")
    console.log(book.getAttribute("name"))
    bookList.forEach( function (bookI) {
      console.log(bookI)
      console.log(bookI.name)
      if (bookI.name === book.getAttribute("name")) {
        switch (bookI.read) {
          case 'read':
            bookI.read = "not-read";
            break;
          default:
            bookI.read = "read";
        }
        book.innerHTML = `${bookI.name} by ${bookI.author}, ${bookI.page} pages, ${bookI.read}.`;
      }
    })
  }
});
