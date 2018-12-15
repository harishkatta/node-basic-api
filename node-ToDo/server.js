var express = require('express');
var bodyParser = require('body-parser');

var app=express();

var port=3000;

    var todos=[
        {
            id:1,
            description:'Meet Me for lunch',
            completed:false
        },
        {
            id:2,
            description:'Meet Me for lunch',
            completed:false
        },
        {
            id:3,
            description:'Meet Me for lunch',
            completed:true
        }
    ];

let finalTodoId=todos[todos.length-1].id;

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('Hello Todo app');
});


//GET /todos
app.get('/todos',(req,res)=>{
    //res.send(todos)
    res.json(todos);
});

//GET todos/:id
app.get('/todos/:id',(req,res) => {

    let todoId=parseInt(req.params.id);

    let matchedTodo=todos.filter((todo) =>{
        return todo.id === todoId;
    });
    if(matchedTodo.length > 0){
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
});

//POST /todos

app.post('/todos', (req,res) =>{

    var body = req.body;
    body.id = finalTodoId+1;
    todos.push(body);
    res.json(body);
});

//Delete

app.delete('/todos/:id', (req, res) => {
    let deletedId = parseInt(req.params.id);
    let index=todos.findIndex((todo) => todo.id === deletedId);
    if(index !== -1){
        todos.splice(index,1);
        res.json(todos);
    } else {
        res.status(404).json({"Error:":"no Todo found with that Id"});
    }
});

app.listen(3000,()=> console.log(`app listen to ${port}`));