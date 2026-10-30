export function saveBooks(booksArray) {
    localStorage.setItem('myLibrary', JSON.stringify(booksArray));
}

export function loadBooks() {
    const storedBooks = localStorage.getItem('myLibrary');
    return storedBooks ? JSON.parse(storedBooks) : [];
}