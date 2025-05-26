
const inputTodo = document.getElementById('inputTodo');
const btnAdd = document.querySelector('.btn-add');
const tableTodo = document.getElementById('tableTodo');
const tbody = tableTodo.querySelector('tbody');
// Asignar ID's correlativos en orden
let lastCorrelativeID = 3;
// Listado de TODOS iniciales
const todoList = [
    {
        id: 1,
        dataId: Date.now() + 1,
        name: 'Revisar que el codigo compile',
        completed: false
    },
    {
        id: 2,
        dataId: Date.now() + 2,
        name: 'Terminar los desafios',
        completed: false
    },
    {
        id: 3,
        dataId: Date.now() + 3,
        name: 'Corregir los bugs',
        completed: false
    }
];


/*--- GENERADORES ---*/

// Plantilla para todos
const generateTemplateTodo = (todo) => {
    return `
        <tr data-id="${todo.dataId}">
            <td>${todo.id}</td>
            <td class="${todo.completed ? 'completed' : ''}">${todo.name}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="form-check me-3">
                        <input
                            id="task${todo.id}"
                            class="form-check-input todo-completed"
                            type="checkbox"
                            ${todo.completed ? 'checked' : ''}
                        />
                    </div>
                    <button class="btn btn-remove">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

/*-- METODOS PRINCIPALES --*/

// Actualizar contadores
const updateDetails = () => {
    const totalTodosSpan = document.getElementById('totalTodos');
    const completedTodosSpan = document.getElementById('completedTodos');

    totalTodosSpan.innerHTML = todoList.length;
    completedTodosSpan.innerHTML = todoList.filter( todo => todo.completed ).length;
}

// Generar todos los Todos
const generateAllTodos = () => {
    tbody.innerHTML = '';
    todoList.forEach( todo => tbody.innerHTML += generateTemplateTodo(todo) );
    updateDetails();
}

// Ejecutar primer render
generateAllTodos();

console.log(todoList)


/*--- METODOS DE EJECUCION ---*/

// Metodo Agregar
const addTodo = (todo) => {

    // Generar objeto
    const todoObj = {
        id: ++lastCorrelativeID,
        dataId: Date.now(),
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

}

// Metodo Eliminar
const deleteTodo = (tr) => {
    const todoID = parseInt(tr.dataset.id);
    const todoIndex = todoList.findIndex( todo => todo.dataId === todoID );
    
    // Verificamos si existe el todo
    if (todoIndex === -1) { // -1 indica que no encontro el indice
        alert('No se encontró el TODO a eliminar');
        return;
    }

    // Eliminar del array
    todoList.splice(todoIndex, 1);
    tr.remove();
    generateAllTodos();
    updateDetails();

}

// Metodo Completar
const completedTodo = (tr, checkCompleted) => {
    const todoID = parseInt(tr.dataset.id);
    // Busca el indice del todo si existe segun todoID
    const todoIndex = todoList.findIndex( todo => todo.dataId === todoID );

    // Verificamos si existe el todo
    if (todoIndex === -1) { // -1 indica que no encontro el indice
        alert('No se encontró el TODO a eliminar');
        return;
    }

    const tdNameTodo = tr.querySelector('td:nth-child(2)'); // td:nth-child(2) accedemos al segundo td
    todoList[todoIndex].completed = checkCompleted;
    tdNameTodo.classList.toggle('completed');
    updateDetails();

}

/*--- Listeners ---*/

// Agregar TODO a la lista
btnAdd.addEventListener('click', event => {
    const todo = inputTodo.value.trim();

    // Validar que el input no esté vacío
    if ( todo.length === 0 ) {
        alert('Debes ingresar una tarea!');
        return;
    }

    return addTodo(todo);

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
