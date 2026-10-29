export function displayBooks(booksArray,deleteBook) {
    const container = document.getElementById('books-container');
    const emptyState = document.getElementById('empty-state');

    container.replaceChildren(); 

    if (booksArray.length === 0) {
        emptyState.classList.remove('hidden');
        return; 
    } else {
        emptyState.classList.add('hidden'); 
    }

    booksArray.forEach(function(book) {
        const card = document.createElement('div');
        card.className = "bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col";

        const title = document.createElement('h3');
        title.className = "text-xl font-bold text-slate-800 mb-2";
        title.textContent = book.title;

        const author = document.createElement('p');
        author.className = "text-slate-600 mb-1";
        author.textContent = `Auteur : ${book.author}`;

        const year = document.createElement('p');
        year.className = "text-slate-600 mb-1";
        year.textContent = `Année : ${book.year}`;

        const genre = document.createElement('p');
        genre.className = "text-slate-600 mb-1";
        genre.textContent = `Genre : ${book.genre}`;

        const description = document.createElement('p');
        description.className = "text-slate-500 mt-4 text-sm flex-grow";
        description.textContent = book.description;

        const statusDiv = document.createElement('div');
        statusDiv.className = "mt-4 pt-4 border-t border-slate-100";
        
        const statusSpan = document.createElement('span');
        statusSpan.className = "inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold";
        statusSpan.textContent = book.status;

        const deleteButton = document.createElement('button');
        deleteButton.className="w-full bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-md text-sm font-medium transition-colors mt-4";
        deleteButton.textContent="Supprimer";
        deleteButton.addEventListener('click', function() {
        deleteBook(book.id); 
        });
        
        statusDiv.appendChild(statusSpan);

        card.append(title, author, year, genre, description, statusDiv,deleteButton);
        
        container.appendChild(card);
    });
}