
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bookshelf = require('./api/routes/bookshelf');

app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', '*');
	response.header('Content-Type', 'application/json');
	response.header('X-Powered-By', 'NodeJS');

	if (request.method === 'OPTIONS') {
		response.header('Access-Control-Allow-Methods',
			'GET, POST, DELETE, PUT');
	}

	next();
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/books', bookshelf);

app.use((request, response, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, request, response, next) => {
	response.status(error.status || 500);
	response.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
