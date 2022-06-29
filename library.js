let myLibrary = [];

const booksContainer = document.querySelector("#books-container");
const addBookBtn = document.querySelector("#add-btn");
const addBookModal = document.querySelector("#add-book");
const formCloseBtn = document.querySelector("form .close-button");
const addBookForm = document.querySelector("#add-book form");

addBookBtn.addEventListener("click", openModal);
formCloseBtn.addEventListener("click", closeModal);
addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary(
        addBookForm.elements["title"].value,
        addBookForm.elements["author"].value,
        addBookForm.elements["pages"].value,
        (addBookForm.elements["was-read"].value === "true") ? true : false
    )
    displayBooks();
    closeModal();
})

function openModal() {
    addBookModal.classList.add("modal-open");
}

function closeModal() {
    addBookModal.classList.remove("modal-open");
}

/* function Book(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${wasRead ? "read" : "not read yet"}`;
    }
} */

class Book {
    #title;
    #author;
    #pages;
    #wasRead;

    constructor(title, author, pages, wasRead) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#wasRead = wasRead;
    }

    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get pages() {
        return this.#pages;
    }

    get wasRead() {
        return this.#wasRead;
    }
}

function addBookToLibrary(title, author, pages, wasRead) {
    const book = new Book(title, author, pages, wasRead);
    myLibrary.push(book);
}

function displayBooks() {
    clearLibraryDisplay();
    
    for(let i = 0; i < myLibrary.length; i++) {
        const card = createElementWithClass("div", "card", "");
        card.setAttribute("data-index", i);
        booksContainer.appendChild(card);

        const removeButton = createElementWithClass("div", "close-button", "");
        const title = createElementWithClass("div", "title", myLibrary[i].title);
        const author = createElementWithClass("div", "author", myLibrary[i].author);
        const pages = createElementWithClass("div", "pages", `${myLibrary[i].pages.toString()} pages`);
        const wasRead = createElementWithClass("button", "was-read", 
        myLibrary[i].wasRead ? "Was read" : "Not read yet");
        wasRead.classList.add(myLibrary[i].wasRead.toString());
        wasRead.addEventListener("click", toggleReadStatus)

        card.appendChild(removeButton);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(wasRead);

        removeButton.addEventListener("click", deleteBook); 
    }
}

function toggleReadStatus(event) {
    const index = event.target.parentElement.dataset.index;
    // Removes previous style
    event.target.classList.remove(myLibrary[index].wasRead.toString())
    // "Reverses" the value of the bool
    myLibrary[index].wasRead = !(myLibrary[index].wasRead);
    // Updates class list to match
    event.target.classList.add(myLibrary[index].wasRead.toString())
    // Updates message
    event.target.textContent = myLibrary[index].wasRead ? "Was read" : "Not read yet";
}

function deleteBook(event) {
    // Gets index from the card
    const index = event.target.parentElement.dataset.index;
    // Removes the corresponding object from the array
    myLibrary.splice(index, 1);
    // Re-generates the display
    displayBooks();
}

function clearLibraryDisplay() {
    while (booksContainer.lastChild) {
        booksContainer.lastChild.remove();
    }
}

/* Shorthand for creating an element with one selector */
function createElementWithClass(tag, className, content) {
    const element = document.createElement(tag);
    element.classList.add(className);
    element.textContent = content;
    return element;
}

displayBooks();