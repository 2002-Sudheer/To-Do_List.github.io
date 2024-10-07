// Array to store todo items
let todoList = [];

// Function to add a new todo
function addTodo() {
    const todoInput = document.getElementById("new-todo");
    const todoText = todoInput.value.trim();
    
    if (todoText !== "") {
        const newTodo = {
            id: Date.now(), // unique id for each todo
            text: todoText,
            isCompleted: false
        };
        
        todoList.push(newTodo); // Add new todo to the list
        renderTodos();          // Render the updated list
        todoInput.value = "";   // Clear the input field
    }
}

// Function to render todo list
function renderTodos() {
    const todoListElement = document.getElementById("todo-list");
    todoListElement.innerHTML = ""; // Clear previous list

    todoList.forEach(todo => {
        const listItem = document.createElement("li");
        listItem.classList.add("todo-item");
        if (todo.isCompleted) {
            listItem.classList.add("completed");
        }

        // Todo text
        const todoText = document.createElement("span");
        todoText.classList.add("todo-text");
        todoText.textContent = todo.text;

        // Action buttons
        const actions = document.createElement("div");
        actions.classList.add("actions");

        // Done (strike-through) button
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.onclick = () => toggleDone(todo.id);
        actions.appendChild(doneBtn);

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = () => editTodo(todo.id);
        actions.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTodo(todo.id);
        actions.appendChild(deleteBtn);

        listItem.appendChild(todoText);
        listItem.appendChild(actions);

        todoListElement.appendChild(listItem);
    });
}

// Function to mark todo as done
function toggleDone(id) {
    const todoIndex = todoList.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todoList[todoIndex].isCompleted = !todoList[todoIndex].isCompleted;
        renderTodos();
    }
}

// Function to edit a todo
function editTodo(id) {
    const newText = prompt("Edit your todo:");
    const todoIndex = todoList.findIndex(todo => todo.id === id);
    if (newText && todoIndex !== -1) {
        todoList[todoIndex].text = newText;
        renderTodos();
    }
}

// Function to delete a todo
function deleteTodo(id) {
    todoList = todoList.filter(todo => todo.id !== id);
    renderTodos();
}
