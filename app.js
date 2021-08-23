var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// var indexRouter = require('./app/routes/index');
// var usersRouter = require('./app/routes/users');
var pessoasRouter = require('./app/routes/pessoas');
var conexoesRouter = require('./app/routes/conexoes');

var app = express();

const expressSwagger = require('express-swagger-generator')(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/v1/pessoas', pessoasRouter);
app.use('/api/v1/conexoes', conexoesRouter);

let options = {
    swaggerDefinition: {
        info: {
            title: 'Desafio Luizalabs',
            description: '',
            version: '1.0.0',
        },
        basePath: '/api/v1/',
        produces: [
            "application/json"
        ]
    },
    basedir: __dirname, //app absolute path
    files: ['./app/routes/*.js'] //Path to the API handle folder
};
expressSwagger(options)

module.exports = app;
