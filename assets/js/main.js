
const inputTodo = document.getElementById('inputTodo');
const btnAdd = document.querySelector('.btn-add');
const tableTodo = document.getElementById('tableTodo');
const tbody = tableTodo.querySelector('tbody');
const todoList = [];

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
        id: todoList.length,
        name: todo,
        completed: false
    } 

    // Agregar tarea a array
    todoList.push(todoObj);
    // Pintar en HTML
    tbody.innerHTML += generateTemplateTodo(todoObj);
    // Limpiar input
    inputTodo.value = '';

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
            <td>${todo.id + 1}</td>
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

const deleteTodo = (tr) => {
    todoID = tr.dataset.id;

    console.log(todoID);
}

const completedTodo = (tr, checkCompleted) => {
    todoID = parseInt(tr.dataset.id);
    const tdNameTodo = tr.querySelector('td:nth-child(2)');
    todoList[todoID].completed = checkCompleted;
    tdNameTodo.classList.toggle('completed');
}
