
function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let count = 0;
  for (let book of books) {
    const { borrows } = book;
    if (borrows[0].returned === false) {
      count++;
    }
  }
  return count;
}

// helper function
function resultToFive(input) {
  return input.slice(0, 5)
}

function getMostCommonGenres(books) {
  let result = [];
  for (let book of books) {
    const genre = book.genre;
    const existingGenre = result.find(item => item.name === genre);
    if (existingGenre) {
      existingGenre.count++;
    } else {
      result.push({ name: genre, count: 1 });
    }
  }
  result.sort((a, b) => b.count - a.count);
  return resultToFive(result);
}

function getMostPopularBooks(books) {
  let result = [];
  for (let book of books) {
    const borrowAmount = book.borrows.length;
    const name = book.title;
    const count = borrowAmount;
    result.push({ name, count });
  }
  result.sort((a, b) => b.count - a.count);
  return resultToFive(result);
}

let findAuthorById = require("./books");

function getMostPopularAuthors(books, authors) {
  let result = [];
  for (let book of books) {
    const borrowAmount = book.borrows.length;
    const existingAuthor = result.find((author) => author.id === book.authorId);
    if (existingAuthor) {
      existingAuthor.count += borrowAmount;
    } else {
      const author = authors.find((author) => author.id === book.authorId);
      result.push({ name: `${author.name.first} ${author.name.last}`, count: borrowAmount });
    }
  }
  result.sort((a, b) => b.count - a.count);
  return resultToFive(result);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
