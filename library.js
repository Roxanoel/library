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
        addBookForm.elements["was-read"].value /*This might come out 
        as string instead of bool, to verify...*/
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

function Book(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${wasRead ? "read" : "not read yet"}`;
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

        const title = createElementWithClass("div", "title", myLibrary[i].title);
        const author = createElementWithClass("div", "author", myLibrary[i].author);
        const pages = createElementWithClass("div", "pages", `${myLibrary[i].pages.toString()} pages`);
        const wasRead = createElementWithClass("div", "was-read", 
        myLibrary[i].wasRead ? "Was read" : "Not read yet");

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(wasRead);
    }
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

//displayBooks();