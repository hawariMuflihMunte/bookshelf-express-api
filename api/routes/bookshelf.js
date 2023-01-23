
const {nanoid} = require('nanoid');
const express = require('express');
const router = express.Router();
const books = require('../data/books');

// Get all books
router.get('/', (request, response, next) => {
	const {query} = request;
	const {name, reading, finished} = query;

	if (name !== undefined) {
		const bookName = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));

		return response.status(200).json({
			status: 'success',
			data: {
				books: bookName.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
	} else if (reading !== undefined) {
		const bookReading = books.filter(book => Number(book.reading) === Number(reading));

		return response.status(200).json({
			status: 'success',
			data: {
				books: bookReading.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
	} else if (finished !== undefined) {
		const bookFinished = books.filter(book => Number(book.finished) === reading);

		return response.status(200).json({
			status: 'success',
			data: {
				books: bookFinished.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
	} else {
		return response.status(200).json({
			status: 'success',
			data: {
				books: books.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
	}
});

// Get book by ID
router.get('/:id', (request, response, next) => {
	const {id} = request.params;
	const book = books.filter(b => b.id === id)[0];

	if (book) {
		return response.status(200).json({
			status: 'success',
			data: {
				book,
			},
		});
	}

	return response.status(404).json({
		status: 'fail',
		message: 'Buku tidak ditemukan',
	});
});

// Add book
router.post('/', (request, response, next) => {
	const data = request.body;

	if (data.name === null || data.name === undefined) {
		return response.status(400).json({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',
		});
	}

	const {name} = data;
	const {year} = data;
	const {author} = data;
	const {summary} = data;
	const {publisher} = data;
	const {pageCount} = data;
	const {readPage} = data;
	const {reading} = data;

	const id = nanoid(28);
	let finished = false;

	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	if (name === '') {
		return response.status(400).json({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',
		});
	}

	if (readPage > pageCount) {
		return response.status(400).json({
			status: 'fail',
			message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
		});
	}

	if (readPage === pageCount) {
		finished = true;
	}

	const book = {
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
	};

	books.push(book);

	const isSuccess = books.filter(b => b.id === id).length > 0;

	if (isSuccess) {
		return response.status(201).json({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			},
		});
	}

	return response.status(500).json({
		status: 'fail',
		message: 'Buku gagal ditambahkan',
	});
});

// Edit book
router.put('/:id', (request, response, next) => {
	const {id} = request.params;

	const data = request.body;

	if (data.name === null || data.name === undefined) {
		return response.status(400).json({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		});
	}

	const index = books.findIndex(book => book.id === id);

	if (index === -1) {
		return response.status(404).json({
			status: 'fail',
			message: 'Gagal memperbarui buku. Id tidak ditemukan',
		});
	}

	const {name} = data;
	const {year} = data;
	const {author} = data;
	const {summary} = data;
	const {publisher} = data;
	const {pageCount} = data;
	const {readPage} = data;
	const {reading} = data;

	let finished = false;

	const updatedAt = new Date().toISOString();

	if (name === '') {
		return response.status(400).json({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		});
	}

	if (readPage > pageCount) {
		return response.status(400).json({
			status: 'fail',
			message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
		});
	}

	if (readPage === pageCount) {
		finished = true;
	}

	if (index !== -1) {
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			finished,
			reading,
			updatedAt,
		};

		return response.status(200).json({
			status: 'success',
			message: 'Buku berhasil diperbarui',
			data: {
				bookId: id,
			},
		});
	}
});

// Delete book
router.delete('/:id', (request, response, next) => {
	const {id} = request.params;

	const index = books.findIndex(book => book.id === id);

	if (index !== -1) {
		books.splice(index, 1);

		return response.status(200).json({
			status: 'success',
			message: 'Buku berhasil dihapus',
		});
	}

	return response.status(404).json({
		status: 'fail',
		message: 'Buku gagal dihapus. Id tidak ditemukan',
	});
});

module.exports = router;
