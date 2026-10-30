import { createBook } from './modules/book.js';
import { displayBooks } from './modules/ui.js';
import { saveBooks, loadBooks } from './modules/storage.js';

const allbooks = loadBooks();
const titleError = document.getElementById('title-error');
const authorError = document.getElementById('author-error');
const yearError = document.getElementById('year-error');
const genreError = document.getElementById('genre-error');
const descriptionError = document.getElementById('description-error');
const title = document.getElementById('title');
const author = document.getElementById('author');
const year = document.getElementById('year');
const genre = document.getElementById('genre');
const description = document.getElementById('description');
const status = document.getElementById('status'); 
const nameregex=/^[a-zA-ZÀ-ÿ ]{2,}$/
const titleRegex = /^[a-zA-Z0-9À-ÿ \-':,!.+&]{2,}$/;
const yearregex=/^[0-9]{4}$/
const genreRegex = /^[a-zA-ZÀ-ÿ \-&]{3,}$/;
const cancelButton=document.getElementById('cancel-edit-btn')
const bookcounter=document.getElementById('book-count')

author.addEventListener('input',function(){
    if(author.value==""){
        authorError.textContent="";
        authorError.classList.add('hidden')
        return;
    }
 if(!nameregex.test(author.value)){
    authorError.textContent="Le titre doit contenir au moins 2 caractères (lettres uniquement)."
    authorError.classList.remove('hidden')
 }else{
   authorError.textContent="";
   authorError.classList.add('hidden')
 }
});
title.addEventListener('input',function(){
    if(title.value==""){
        titleError.textContent="";
        titleError.classList.add('hidden')
        return;
    }
 if(!titleRegex.test(title.value)){
    titleError.textContent="Le titre doit contenir au moins 2 caractères (lettres, chiffres et ponctuation de base uniquement)."
    titleError.classList.remove('hidden')
 }else{
   titleError.textContent="";
   titleError.classList.add('hidden')
 }
});
year.addEventListener('input',function(){
    if(year.value==""){
        yearError.textContent="";
        yearError.classList.add('hidden')
        return;
    }
 if(!yearregex.test(year.value)){
    yearError.textContent="L'année doit contenir exactement 4 chiffres (ex: 2026).";
    yearError.classList.remove('hidden')
 }else{
   yearError.textContent="";
   yearError.classList.add('hidden')
 }
});
genre.addEventListener('input',function(){
    if(genre.value==""){
        genreError.textContent="";
        genreError.classList.add('hidden')
        return;
    }
 if(!genreRegex.test(genre.value)){
    genreError.textContent="Le genre doit avoir au moins 4 character.";
    genreError.classList.remove('hidden')
 }else{
   genreError.textContent="";
   genreError.classList.add('hidden')
 }
});
description.addEventListener('input', function() {
    if(description.value === ""){
        descriptionError.textContent = "";
        descriptionError.classList.add('hidden');
        return; 
    }

    if(description.value.length < 30){
        descriptionError.textContent = "La description est trop courte (minimum 30 caractères).";
        descriptionError.classList.remove('hidden');
    } else {
        descriptionError.textContent = "";
        descriptionError.classList.add('hidden');
    }

});



const bookForm = document.getElementById('book-form');

bookForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const titleVal = title.value.trim();
    const authorVal = author.value.trim();
    const yearVal = year.value.trim();
    const genreVal = genre.value.trim();
    const descVal = description.value.trim();
    const statusVal = status.value; 
    const successMessage = document.getElementById('success-message');

    if (currentEditId !== null) {
        const index = allbooks.findIndex(b => b.id === currentEditId);
        if (index !== -1) {
            allbooks[index].title = titleVal;
            allbooks[index].author = authorVal;
            allbooks[index].year = yearVal;
            allbooks[index].genre = genreVal;
            allbooks[index].description = descVal;
            allbooks[index].status = statusVal;
        }
    
        currentEditId = null;
        document.getElementById('submit-btn').textContent = "Enregistrer le livre";
        successMessage.textContent=("Livre modifié avec succès !");
    } else {
        const newBook = createBook(titleVal, authorVal, yearVal, genreVal, descVal, statusVal);
        allbooks.push(newBook);
    }

    saveBooks(allbooks);
    bookForm.reset();
    cancelButton.classList.add('hidden');
    displayBooks(allbooks, deleteBook, editBook);

    successMessage.classList.remove('hidden');
    setTimeout(function() {
        successMessage.classList.add('hidden');
    }, 3000);
});
function deleteBook(bookId) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
        const index = allbooks.findIndex(book => book.id === bookId);
        if (index !== -1) {
            allbooks.splice(index, 1);
            saveBooks(allbooks);
            displayBooks(allbooks, deleteBook); 
        }
    }
}
bookForm.addEventListener('input', function() {
    cancelButton.classList.remove('hidden');
});

cancelButton.addEventListener('click', function() {
    bookForm.reset();
    cancelButton.classList.add('hidden');
    
});

const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

function updateDisplay() {
    const term = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;

    let filteredBooks = allbooks.filter(book => 
        book.title.toLowerCase().includes(term) || 
        book.author.toLowerCase().includes(term)
    );

    if (sortBy === 'title') {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'author') {
        filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === 'year') {
        filteredBooks.sort((a, b) => b.year - a.year); 
    }

    displayBooks(filteredBooks, deleteBook, editBook);
}

if (searchInput && sortSelect) {
    searchInput.addEventListener('input', updateDisplay);
    sortSelect.addEventListener('change', updateDisplay);
}

let currentEditId = null; 

function editBook(book) {
    title.value = book.title;
    author.value = book.author;
    year.value = book.year;
    genre.value = book.genre;
    description.value = book.description;
    status.value = book.status;


    currentEditId = book.id; 
    
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.textContent = "Modifier le livre";
    cancelButton.classList.remove('hidden'); 
}
cancelButton.addEventListener('click', function() {
    bookForm.reset();
    cancelButton.classList.add('hidden');
    document.getElementById('submit-btn').textContent = "Enregistrer le livre";
    currentEditId = null; 
});

displayBooks(allbooks, deleteBook, editBook);