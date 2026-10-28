let counter=0;
export function createBook(title, author, year, genre, description, status) {
    counter++;
    return {
        id: counter,
        title: title,
        author: author,
        year: year,
        genre: genre,
        description: description,
        status: status
    };
}
