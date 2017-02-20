import {isEnabled, isShow} from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');

    el.innerHTML = renderApp(
        renderTop(),
        renderInput(),
        renderTodos(todoItems),
        renderFilter()
    );
}

function renderApp(top, input, todoList, filter) {
    if(isEnabled('filter') == false) {
        filter = '';
    }

    if(isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(top, input, todoList, filter);
    } else {
        return renderAddTodoAtTop(top, input, todoList, filter);
    }
}

function renderAddTodoAtTop(top, input, todoList, filter) {
    return `<div id="app" class="center">
        ${top}
        ${input}
        ${todoList}
        ${filter}
    </div>`;
}

function renderAddTodoAtBottom(top, input, todoList, filter) {
    if(isEnabled('filter') && isEnabled('renderBottom') && isEnabled('filterTop')) {
        return `<div id="app" class="center">
            ${top}
            ${filter}
            ${todoList}
            ${input}
            </div>`;
    }else{
        return `<div id="app" class="center">
            ${top}
            ${todoList}
            ${input}
            ${filter}
            </div>`;
    }    
}

function renderInput() {
    return `<div class="todo__input center"><input type="text" id="todoInput" placeholder="To Do" maxlength="20"><button id="addTodo">+</button></div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo center">${todoItems}</ul>`;
}

function renderTodoItem(todo) {    
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass} ${todo.show ? 'ok' : 'hidden'}" data-id="${todo.id}">
        <div class="content-item">
        <input class="js_toggle_todo" type="checkbox" id="checkbox_todo_${todo.id}" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        <label for="checkbox_todo_${todo.id}">&nbsp <input type="text" class="inputEditTodo" value="${todo.text}" maxlength="20" disabled></label>
        </div>
        <div class="pull-right">
        <button class="itemOption updateOption" data-id="${todo.id}"><i class="fa fa-pencil" aria-hidden="true" data-id="${todo.id}"></i></button>
        <button class="itemOption deleteOption" data-id="${todo.id}"><i class="fa fa-trash-o" aria-hidden="true" data-id="${todo.id}"></i></button>
        </div>
    </li>`;
}

function renderFilter(){
    var retorno = isShow();
    switch (retorno){
        case 'radio_todos':
            return `<div id="filter" class="center">
                <input id="radio_todos" type="radio" name="filterOption" value="todos" checked><label for="radio_todos">&nbsp Mostrar Todos</label><br>
                <input id="radio_abertos" type="radio" name="filterOption" value="abertos"><label for="radio_abertos">&nbsp Somente Abertos</label><br>
                <input id="radio_fechados" type="radio" name="filterOption" value="fechados"><label for="radio_fechados">&nbsp Somente Fechados</label><br>
                </div>`;
        case 'radio_abertos':
            return `<div id="filter" class="center">
                <input id="radio_todos" type="radio" name="filterOption" value="todos"><label for="radio_todos">&nbsp Mostrar Todos</label><br>
                <input id="radio_abertos" type="radio" name="filterOption" value="abertos" checked><label for="radio_abertos">&nbsp Somente Abertos</label><br>
                <input id="radio_fechados" type="radio" name="filterOption" value="fechados"><label for="radio_fechados">&nbsp Somente Fechados</label><br>
                </div>`;
        case 'radio_fechados':
            return `<div id="filter" class="center">
                <input id="radio_todos" type="radio" name="filterOption" value="todos"><label for="radio_todos">&nbsp Mostrar Todos</label><br>
                <input id="radio_abertos" type="radio" name="filterOption" value="abertos"><label for="radio_abertos">&nbsp Somente Abertos</label><br>
                <input id="radio_fechados" type="radio" name="filterOption" value="fechados" checked><label for="radio_fechados">&nbsp Somente Fechados</label><br>
                </div>`;
        default:
            return `<div id="filter" class="center">
                <input id="radio_todos" type="radio" name="filterOption" value="todos" checked><label for="radio_todos">&nbsp Mostrar Todos</label><br>
                <input id="radio_abertos" type="radio" name="filterOption" value="abertos"><label for="radio_abertos">&nbsp Somente Abertos</label><br>
                <input id="radio_fechados" type="radio" name="filterOption" value="fechados"><label for="radio_fechados">&nbsp Somente Fechados</label><br>
                </div>`
    }
}

function renderTop(){
    return `<div id="top" class="center">
        <img src="./img/logo.fw.png">
        </div>`;
}