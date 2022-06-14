# Library API

## General guidelines
1. URL: http://localhost:4000
2. For Authorization see Section C.
3. Content-type: JSON

## A) Routes
### Books
    /books                  GET  
    /books                  POST (Section B.1a)
    /books/global           GET  (Section B.1d)
    /books/:id              GET, DELETE
    /books/:id              PUT   (Section B.1a)   
    /books/:id              PATCH (Section B.1c)   

### Auth
    /auth/register          POST  (Section B.2a)
    /auth/login             POST  (Section B.2b)

### Users
    /users                  GET     
    /users/:username        GET                    AUTH

### Lent books
    /lend                   POST  (Section B.1a)   AUTH 
    /lend/return            POST  (Section B.1b)   AUTH 
    /lend/returned          GET                    AUTH
    /lend/returned/filter   GET   (Section B.1f)   AUTH

### User books and info
    /me/:username/books     GET   (Section B.1e)   AUTH
    /me/:username/all       GET                    AUTH

## B) Object Structure and Datatypes
### Books/Lend/Me
#### 1a) Books/Lend - POST, PUT:
		{	"title": String, 
			"authors": String,
			"pages": Number,
			"published": String,
			"image": String,
			"username": String,
			"activationCode": String,
			"rating": Number,
			"review": String,
			"completed": Number 
            (0 = uncompleted, 1 = completed)  }
           
        Example:
		{	"title": "Title", 
			"authors": "Author",
			"pages": 1337,
			"published": "2022-06-14",
			"image": "http://books.google.com/books",
			"username": "Osuka",
			"activationCode": "1337",
			"rating": 5,
			"review": "Very gut",
			"completed": 1  }

#### 1b. Lend - Add book from returned books, POST:
		{	"id": String
            "title": String, 
			"authors": String,
			"pages": Number,
			"published": String,
			"image": String,
			"username": String,
			"activationCode": String,
			"rating": Number,
			"review": String,
			"completed": Number 
            (0 = uncompleted, 1 = completed)  }

#### 1c. Books - PATCH (0 = uncompleted, 1 = completed):
    	    { "completed": 1 }

#### 1d. Books - GET, global books:
            var options = {
            method: 'GET',
            url: 'http://localhost:4000/books/global',
            params: {volumeSearch: 'Title, Type etc', authorSearch: 'Authors name'},
            headers: {'Content-Type': 'application/json'}
            }

            Example URL: http://localhost:4000/books/global?volumeSearch=${siddharta}&authorSearch=${herman}

#### 1f. Lend - Returned books, filter by Rating
            *Rating QUERYcan either be ASC or DESC
            var options = {
            method: 'GET',
            url: 'http://localhost:4000/returned/filter',
            params: {rating: 'ASC'},
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer <token>' }

            Example URL: http://localhost:4000/lend/returned/filter?rating=desc

#### 1e. Me/Books - My books, filter by Completion and/or Rating
            * Rating query can either be ASC or DESC.
            * Completed query can either be true or false.
            var options = {
            method: 'GET',
            url: 'http://localhost:4000/username/books',
            params: {completed: 'true', rating: 'desc'},
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Authorization: 'Bearer <token>'}

            Example URL: http://localhost:4000/username/books?completed=true&rating=desc


### Auth
#### 2a. Auth - Register - POST:
		   {"username": "String",
		    "email": "String",
		    "password": "String",
		    "activationCode": "String" 
            }
            *Server will respond with your Token for Auth. Routes.

#### 2b. Auth - Login - POST:
		    {"username": String,
            "password": String,
            }
            *Server will respond with your Token for Auth. Routes.

## C) Authorization
#### When executing POST Request: B.2a - Register, B.2b - Login, the server will respond with a Token. 
#### This Token need to be added in all Request Headers to access Routes with Authorization requirements (see Routes Section A). 
            headers: {
            Authorization: `Bearer ${token}`}
