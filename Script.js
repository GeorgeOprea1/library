const addBtn = document.querySelector("#addBtn");
const deleteBtn = document.getElementById("delete");

deleteBtn.addEventListener("click", function () {
  myLibrary = [];
  setData();
  render();
});

addBtn.addEventListener("click", addBookToLibrary);

const newBookBtn = document.querySelector("#newBookBtn");
newBookBtn.addEventListener("click", () => (popUpForm.style.display = "block"));

const popUpForm = document.getElementById("popUp");
const closePopUp = document.getElementsByTagName("span")[0];
closePopUp.addEventListener("click", () => (popUpForm.style.display = "none"));

class Book {
  constructor(title, author, pages, read) {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value + "pg";
    this.read = form.read.checked;
  }
}

let myLibrary = [];
let newBook;

function addBookToLibrary() {
  event.preventDefault();
  popUpForm.style.display = "none";

  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  setData(); //saves updated array in local storage
  render();
  form.reset();
}

function render() {
  const display = document.getElementById("Library-container");
  const books = document.querySelectorAll(".book");
  books.forEach((book) => display.removeChild(book));

  for (let i = 0; i < myLibrary.length; i++) {
    createBook(myLibrary[i]);
  }
}

function createBook(item) {
  const library = document.querySelector("#Library-container");
  const bookDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const authDiv = document.createElement("div");
  const pageDiv = document.createElement("div");
  const removeBtn = document.createElement("button");
  const readBtn = document.createElement("button");

  bookDiv.classList.add("book");
  bookDiv.setAttribute("id", myLibrary.indexOf(item));

  titleDiv.textContent =
    item.title.charAt(0).toUpperCase() + item.title.slice(1);
  titleDiv.classList.add("title");
  bookDiv.appendChild(titleDiv);

  authDiv.textContent =
    item.author.charAt(0).toUpperCase() + item.author.slice(1);
  authDiv.classList.add("author");
  bookDiv.appendChild(authDiv);

  pageDiv.textContent = item.pages;
  pageDiv.classList.add("pages");
  bookDiv.appendChild(pageDiv);

  readBtn.classList.add("readBtn");
  bookDiv.appendChild(readBtn);
  if (item.read === false) {
    readBtn.textContent = "Not Read";
    readBtn.style.backgroundColor = "#0086ff";
  } else {
    readBtn.textContent = "Read";
    readBtn.style.backgroundColor = "#54e714";
  }

  removeBtn.textContent = "Remove";
  removeBtn.setAttribute("id", "removeBtn");
  bookDiv.appendChild(removeBtn);

  library.appendChild(bookDiv);

  removeBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(item), 1);
    setData();
    render();
  });

  //toggle between read and not read
  readBtn.addEventListener("click", () => {
    item.read = !item.read;
    setData();
    render();
  });
}

// Local storage
function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
  if (!localStorage.myLibrary) {
    render();
  } else {
    let objects = localStorage.getItem("myLibrary");
    objects = JSON.parse(objects);
    myLibrary = objects;
    render();
  }
}

restore();
