let myLibrary = [];

function Book(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${wasRead ? "read" : "not read yet"}`;
    }
}

function addBookToLibrary (title, author, pages, wasRead) {
    const book = new Book(title, author, pages, wasRead);
    myLibrary.push(book);
}