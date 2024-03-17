function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  const count = Object.values(books).filter((book) =>
    book.borrows.some((borrow) => borrow.id === account.id)
  ).length;

  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountBooksExtended = books.reduce((acc, book) => {
    const { borrows } = book;
    const [firstBorrow] = borrows;
    if (firstBorrow.id === account.id && !borrows[0].returned) {
      const matchedAuthor = authors.find((author) => author.id === book.authorId);
      const bookWithAuthor = {
        ...book,
        author: matchedAuthor,
      };
      acc.push(bookWithAuthor);
    }
    return acc;
  }, []);
  
  return accountBooksExtended;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
