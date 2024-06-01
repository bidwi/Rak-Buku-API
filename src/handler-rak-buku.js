const { nanoid } = require('nanoid');
const books = require('./rak-buku');

const getAllBukuDwi = (request, h) => {
  const { name, reading, finished } = request.query;

  let bukuParameterKueri = [...books];

  if (name) {
    const nameHurufKecil = name.toLowerCase();
    bukuParameterKueri = bukuParameterKueri.filter((satuBuku) => satuBuku.name
      .toLowerCase().includes(nameHurufKecil));
  }

  if (reading !== undefined) {
    const isReading = reading === '1';
    bukuParameterKueri = bukuParameterKueri.filter(
      (satuBuku) => satuBuku.reading === isReading,
    );
  }

  if (finished !== undefined) {
    const isFinished = finished === '1';
    bukuParameterKueri = bukuParameterKueri.filter(
      (satuBuku) => satuBuku.finished === isFinished,
    );
  }

  const balasan = h.response({
    status: 'success',
    data: {
      books: bukuParameterKueri.map((satuBuku) => ({
        id: satuBuku.id,
        name: satuBuku.name,
        publisher: satuBuku.publisher,
      })),
    },
  });
  balasan.code(200);
  return balasan;
};

const deleteBukuDwiDariBookId = (request, h) => {
  const { bookId } = request.params;

  const penanda = books.findIndex((satuBuku) => satuBuku.id === bookId);

  if (penanda !== -1) {
    books.splice(penanda, 1);
    const balasan = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    balasan.code(200);
    return balasan;
  }

  const balasan = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  balasan.code(404);
  return balasan;
};
const postBukuDwi = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const balasan = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    balasan.code(400);
    return balasan;
  }

  if (readPage > pageCount) {
    const balasan = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    balasan.code(400);
    return balasan;
  }

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const finished = pageCount === readPage;

  const newBuku = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt: createdAt,
    updatedAt,
  };

  books.push(newBuku);

  const isSuccess = books.filter((satuBuku) => satuBuku.id === id).length > 0;

  if (isSuccess) {
    const balasan = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    balasan.code(201);
    return balasan;
  }

  const balasan = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  balasan.code(500);
  return balasan;
};

const getBukuDwiDariBookId = (request, h) => {
  const { bookId } = request.params;

  const selectedBook = books.find((satuBuku) => satuBuku.id === bookId);

  if (selectedBook) {
    const {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    } = selectedBook;

    return {
      status: 'success',
      data: {
        book: {
          id,
          name,
          year,
          author,
          summary,
          publisher,
          pageCount,
          readPage,
          finished,
          reading,
          insertedAt,
          updatedAt,
        },
      },
    };
  }

  const balasan = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  balasan.code(404);
  return balasan;
};

const putBukuDwiDariId = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const balasan = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    balasan.code(400);
    return balasan;
  }

  if (readPage > pageCount) {
    const balasan = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    balasan.code(400);
    return balasan;
  }

  const penanda = books.findIndex((satuBuku) => satuBuku.id === bookId);

  if (penanda === -1) {
    const balasan = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    balasan.code(404);
    return balasan;
  }

  const updatedAt = new Date().toISOString();
  books[penanda] = {
    ...books[penanda],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };

  const balasan = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  balasan.code(200);
  return balasan;
};

module.exports = {
  postBukuDwi,
  deleteBukuDwiDariBookId,
  getAllBukuDwi,
  putBukuDwiDariId,
  getBukuDwiDariBookId,
};
