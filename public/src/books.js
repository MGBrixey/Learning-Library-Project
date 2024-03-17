function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedArray = [];
  let returnedArray = [];
  
  books.forEach((book) => {
    const { borrows } = book;
    const lastTransaction = borrows[0];
    
    if (lastTransaction.returned === false) {
      borrowedArray.push(book);
    } else {
      returnedArray.push(book);
    }
  });
  
  return [borrowedArray, returnedArray];
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const result = borrows
    .slice(0, 10)
    .map((borrow) => {
      const account = accounts.find((acc) => acc.id === borrow.id);
      return { ...account, returned: borrow.returned };
    });
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
