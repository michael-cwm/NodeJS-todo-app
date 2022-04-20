const express = require("express");
const exphbs = require("express-handlebars");
const todos = require("./data/todos.js");



function getNewId(list) {
  let maxId = 0;
  for (const item of list) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }
  return maxId + 1;
}


const app = express();


app.engine("hbs", exphbs.engine({ 
    defaultLayout: "main",
    extname: ".hbs" 
}));

app.set("view engine", "hbs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

////// INCOMES ///////

app.get("/", (req, res) => {
    res.render("home", {todos});
})

app.get("/todo/ny", (req, res) => {
    res.render("todo-create");
})

app.post("/todo/ny", (req, res) => {
    const id = getNewId(todos);
    const newTodo = {
        id: id,
        created: new Date().toLocaleString(),
        description: req.body.description,
        done: false,        
    }

    todos.push(newTodo);

    res.redirect("/");
})

app.get("/todo/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(i => (i.id === id));
    // todo.done = Boolean(req.body.done);

    res.render("todo-single", todo);
})

app.get("/todo/:id/ta-bort", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(i => (i.id === id));

    res.render("todo-delete", todo);
})

app.post("/todo/:id/ta-bort", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.findIndex(i => (i.id === id));

    todos.splice(todo, 1);

    res.redirect("/")
})


app.get("/todo/:id/redigera", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(i => (i.id === id));

    res.render("todo-update", todo);
})

app.post("/todo/:id/redigera", (req, res) => {
    const id = parseInt(req.params.id);

    const newTodo = {
        id: id,
        created: new Date().toLocaleString(),
        description: req.body.description,
        done: false
    }

    const todo = todos.findIndex(i => (i.id) === id);

    todos[todo] = newTodo;

    todos[todo].done = Boolean(req.body.done);

    res.redirect("/");
})

app.post("/todo/:id", (req, res) => {
    const _id = parseInt(req.params.id);
  
    const todo = todos.find((todo) => todo.id === _id);
  
    todo.done = Boolean(req.body.done);
  
    res.redirect("/");
  });

///// !INCOMES //////

//// EXPENSES //////

// app.get("/utgifter", (req, res) => {
//     res.render("expenses-list", { expenses });
// })

// app.get("/utgifter/ny", (req, res) => {
//     res.render("expenses-create");
// })

// app.post("/utgifter/ny", (req, res) => {
//     const id = getNewId(expenses);
//     const newExpense = {
//         id: id,
//         title: req.body.title,
//         value: parseInt(req.body.value),
//     }

//     expenses.push(newExpense);

//     res.redirect("/utgifter");
// })

// app.get("/utgifter/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const expense = expenses.find(e => (e.id === id));

//     // expenses.push(expense);

//     res.render("expenses-single", expense);
// });

// app.get("/utgifter/:id/redigera", (req, res) => {
//     const id = parseInt(req.params.id);
//     const expense = expenses.find(i => (i.id === id));

//     res.render("expenses-update", expense);
// })

// app.post("/utgifter/:id/redigera", (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = expenses.findIndex(i => (i.id === id));

//     expenses[index].title = req.body.title;
//     expenses[index].value = parseInt(req.body.value);

//     res.redirect("/utgifter");

// });


// app.get("/utgifter/:id/ta-bort", (req, res) => {
//     const id = parseInt(req.params.id);
//     const expense = expenses.find(e => (e.id === id));

//     res.render("expenses-delete", expense)
// });

// app.post("/utgifter/:id/ta-bort", (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = expenses.findIndex(i => (i.id === id));

//     expenses.splice(index, 1);

//     res.redirect("/utgifter");
// });

// app.get("/", (req, res) => {
//     let sumOfExpenses = 0;
//     for (const expense of expenses){
//         sumOfExpenses += expense.value;
//     }

//     let sumOfIncomes = 0;
//     for (const income of incomes) {
//         sumOfIncomes += income.value;
//     }

//     const result = sumOfIncomes - sumOfExpenses;

//     console.log(result)

//     res.render("home", {sumOfExpenses, sumOfIncomes, result});

// })

app.listen(3000, () => {
  console.log("http://localhost:3000/");
}); 

