import { createBook } from './modules/book.js';

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
const allbooks = [];

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
    genreError.textContent="L'année doit contenir exactement 4 chiffres (ex: 2026).";
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

    const newBook = createBook(titleVal, authorVal, yearVal, genreVal, descVal, statusVal);

    allbooks.push(newBook);

    bookForm.reset();
    const successMessage = document.getElementById('success-message');
    successMessage.classList.remove('hidden');

setTimeout(function() {
    successMessage.classList.add('hidden');
}, 3000);
});