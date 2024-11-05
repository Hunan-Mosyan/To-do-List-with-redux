// Initial state
const initialState = {
    todos: []
};

// Action types
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

// Action creators
const addTodo = (todo) => ({
    type: ADD_TODO,
    payload: todo
});

const removeTodo = (index) => ({
    type: REMOVE_TODO,
    payload: index
});

// Reducer
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter((_, idx) => idx !== action.payload)
            };
        default:
            return state;
    }
};

// Create Redux store
const store = Redux.createStore(todoReducer);

// Function to render the To-Do list
const renderTodos = () => {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // Clear the existing list
    const todos = store.getState().todos;

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => {
            store.dispatch(removeTodo(index));
            renderTodos(); // Re-render the list after removing
        };
        li.appendChild(removeButton);
        todoList.appendChild(li);
    });
};

// Event listener for adding a new To-Do
document.getElementById('addTodoButton').addEventListener('click', () => {
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
    if (todoText) {
        store.dispatch(addTodo(todoText));
        input.value = ''; // Clear the input field
        renderTodos(); // Re-render the list
    }
});

// Initial render
renderTodos();