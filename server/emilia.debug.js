const http = require("http");
const fs = require("fs");
const port = 4000;

let todos = [];

fs.readFile("./todos.json", "utf-8", (err, data) => {
  if (err) throw err;
  const json = data;
  const parsedData = JSON.parse(json);
  todos = parsedData;
});

const app = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PATCH, DELETE, OPTIONS, POST, PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  console.log(`Received request to ${req.url} with method ${req.method}`);

  const tasks = req.url.split("/");

  //******Options******/
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    console.log("hej från OPTIONS");
    res.end();
  }

  //********* GET **********/
  if (req.method === "GET" && tasks[1] === "todos" && tasks.length === 2) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    console.log(todos);
    res.end(JSON.stringify(todos));
  }

  //******** GET BY ID **********/
  if (req.method === "GET" && tasks[1] === "todos" && tasks.length === 3) {
    const requestedId = parseInt(tasks[2]);
    const foundId = todos.find(({ id }) => id === requestedId);
    if (foundId) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(foundId));
    } else {
      res.statusCode = 404;
      res.end();
    }
  }
  console.log(tasks);
  //*********** POST ***********/
  if (req.method === "POST" && tasks[1] === "todos" && tasks.length === 2) {
    res.statusCode = 200;
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      console.log(data);
      todos.push(data);
      fs.writeFile("todos.json", JSON.stringify(todos, null, "\t"), (err) => {
        if (err) throw err;
      });
      console.log("En ny todo är gjord");
      res.end();
    });
  }

  // ********** DELETE ********
  //Funkar ju att skicka men den verkar inte hitta ID? -
  // Nu skickar den  //received request to /todos/[object%20Object] with method DELETE - WHYYYYY

  if (req.method === "DELETE" && tasks[1] === "todos") {
    console.log("DELETE");
    res.statusCode = 200;
    const requestedId = parseInt(tasks[2]);
    console.log(requestedId);
    todos = todos.filter((todo) => todo.id !== requestedId);
    const stringTodos = JSON.stringify(todos);
    fs.writeFile("./todos.json", stringTodos, (err) => {
      if (err) throw err;
    });

    console.log("hej, todo ska vara raderad");
    res.end();
  }

  function handleDelete() {
    const id = data.id;
    removeItem(id);
  }

  // ************* PUT ***********
  // funkar fintfint
  if (req.method === "PUT" && tasks[1] === "todos" && tasks.length === 3) {
    res.statusCode = 200;
    const requestedId = parseInt(tasks[2]);
    const foundId = todos.findIndex(({ id }) => id === requestedId);

    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      todos[foundId] = data;
      const stringTodos = JSON.stringify(todos);
      fs.writeFile("./todos.json", stringTodos, (err) => {
        if (err) throw err;
      });
    });
    res.end();
  }

  // ************* PATCH ***********
  if (req.method === "PATCH" && tasks[1] === "todos") {
    console.log("PATCH");
    res.statusCode = 200;
    const requestedId = parseInt(tasks[2]);
    console.log(requestedId);
    const foundId = todos.findIndex(({ id }) => id === requestedId);

    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      todos[foundId].completed = data.completed;

      console.log(todos, "hej från patch");
      const stringTodos = JSON.stringify(todos);
      fs.writeFile("./todos.json", stringTodos, (err) => {
        if (err) throw err;
      });
    });
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port 122 ${port}`);
});
