
const inputTodo = document.getElementById('inputTodo');
const btnAdd = document.querySelector('.btn-add');
const tableTodo = document.getElementById('tableTodo');
const tbody = tableTodo.querySelector('tbody');
const todoList = [];
let lastTodoId = 0;

// Agregar TODO a la lista
btnAdd.addEventListener('click', event => {
    const todo = inputTodo.value.trim();

    // Validar que el input no esté vacío
    if ( todo.length === 0 ) {
        alert('Debes ingresar una tarea!');
        return;
    }

    // Generar objeto
    const todoObj = {
        id: ++lastTodoId,
        dataId: todo.length,
        name: todo,
        completed: false
    } 

    // Agregar tarea a array
    todoList.push(todoObj);
    // Pintar en HTML
    tbody.innerHTML += generateTemplateTodo(todoObj);
    // Limpiar input
    inputTodo.value = '';
    // Actualizar contadores
    updateDetails();

});

// Listener para eliminar y marcar como completada
tbody.addEventListener('click', (event) => {
    const trTodo = event.target.closest('tr');
    const btnRemove = event.target.closest('.btn-remove');
    const checkboxCompleted = event.target.closest('.todo-completed');

    // Comprobar boton eliminar
    if (btnRemove) return deleteTodo(trTodo);

    // Comprobar checkbox
    if ( checkboxCompleted )
        return completedTodo(trTodo, checkboxCompleted.checked);

});

// Plantilla para todos
const generateTemplateTodo = (todo) => {
    return `
        <tr data-id="${todo.id}">
            <td>${todo.id}</td>
            <td>${todo.name}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="form-check me-3">
                        <input class="form-check-input todo-completed" type="checkbox" id="task${todo.id}">
                    </div>
                    <button class="btn btn-remove">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

const generateAllTodos = () => {
    tbody.innerHTML = '';
    todoList.forEach( todo => tbody.innerHTML += generateTemplateTodo(todo) );
}

const deleteTodo = (tr) => {
    const todoID = parseInt(tr.dataset.id);
    // Busca el indice del todo si existe segun todoID
    const todoIndex = todoList.findIndex( todo => todo.id === todoID );
    if (todoIndex !== -1) { // -1 indica que no encontro el indice
        todoList.splice(todoIndex, 1);
        tr.remove();
        generateAllTodos();
        updateDetails();
    }
}

const completedTodo = (tr, checkCompleted) => {
    const todoID = parseInt(tr.dataset.id);
    // Busca el indice del todo si existe segun todoID
    const todoIndex = todoList.findIndex( todo => todo.id === todoID );
    if (todoIndex !== -1) { // -1 indica que no encontro el indice
        const tdNameTodo = tr.querySelector('td:nth-child(2)');
        todoList[todoIndex].completed = checkCompleted;
        tdNameTodo.classList.toggle('completed');
        updateDetails();
    }
}

const updateDetails = () => {
    const totalTodosSpan = document.getElementById('totalTodos');
    const completedTodosSpan = document.getElementById('completedTodos');

    totalTodosSpan.innerHTML = todoList.length;
    completedTodosSpan.innerHTML = todoList.filter( todo => todo.completed ).length;
}