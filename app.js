class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.displayBooks();
    }

    displayBooks() {
        const container = document.getElementById("library");
        container.innerHTML = "";

        this.books.forEach((book, index) => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book-element");
            bookElement.setAttribute("data-index", index);

            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p>Status: ${book.read ? "Read" : "Not Read"}</p>
                <button class="toggle-read">Toggle Read Status</button>
                <button class="remove-book">Remove</button>
            `;

            const toggleReadBtn = bookElement.querySelector(".toggle-read");
            toggleReadBtn.addEventListener("click", () => {
                book.toggleRead();
                this.displayBooks();
            });

            const removeBtn = bookElement.querySelector(".remove-book");
            removeBtn.addEventListener("click", () => {
                this.books.splice(index, 1);
                this.displayBooks();
            });

            container.appendChild(bookElement);
        });
    }
}

const myLibrary = new Library();

const newBookBtn = document.getElementById("newBookBtn");
const newBookModal = document.getElementById("newBookModal");
const overlay = document.getElementById("overlay");
const closeModal = document.getElementById("closeModal");

newBookBtn.addEventListener("click", () => {
    newBookModal.classList.add("show");
    overlay.classList.add("show");
});

closeModal.addEventListener("click", () => {
    newBookModal.classList.remove("show");
    overlay.classList.remove("show");
});

overlay.addEventListener("click", () => {
    newBookModal.classList.remove("show");
    overlay.classList.remove("show");
});

const newBookForm = document.getElementById("newBookForm");
newBookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    const newBook = new Book(title, author, parseInt(pages), read);
    myLibrary.addBook(newBook);

    newBookForm.reset();
    newBookModal.classList.remove("show");
    overlay.classList.remove("show");
});

myLibrary.displayBooks();
