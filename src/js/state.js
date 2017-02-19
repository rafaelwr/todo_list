import {createStore} from './lib/state';

var initialState = {
    todos: []
};

var todos_xml = [];

$.ajax({
    type: "GET",
    url: "./data/todos.xml",
    dataType: "xml",
    async: false,
    success: function (xml) {
        todos_xml = [];

        $(xml).find('todo').each(function (i) {
            var id = $(this).find('id').text();
            var text = $(this).find('text').text();
            var done = $(this).find('done').text();
            var show = $(this).find('show').text();

            if (done == 'true'){
                done = true;
            }else{
                done = false;
            }

            if (show == 'true'){
                show = true;
            }else{
                show = false;
            }

            todos_xml.push({'id':id, 'text':text, 'done': done, 'show': show});
        });

        for (var i = 0; i < todos_xml.length; i++) {
            var done = false;

            if (todos_xml[i].done == true){
                done = true;
            }

            var show = false;

            if (todos_xml[i].show == true){
                show = true;
            }  

            initialState.todos.push({'id':todos_xml[i].id, 'text':todos_xml[i].text, 'done': done, 'show': show});
        }
    }
});

function editXml(action, id, text, done, show){
    $.ajax({
        type: "GET",
        url: "edit_xml.php?action=" + action + "&id=" + id + "&text=" + text + "&done=" + done + "&show=" + show,
        dataType: "text",
        async: false,
        success: function (xml) {
        }
    });
}

function todoChangeHandler(state, change) {
    switch(change.type) {
        case 'ADD_TODO':
            var filter = $('#filter input:checked');
            var filter_val = filter.val();
            var filter_id = filter.attr('id');

            editXml('insert', state.todos.length, change.text, false, true);

            if (filter_val == 'fechados'){
                state.todos.push({
                    id: state.todos.length,
                    text: change.text,
                    done: false,
                    show: false
                });
            }else{
                state.todos.push({
                    id: state.todos.length,
                    text: change.text,
                    done: false,
                    show: true
                });
            }

            $('#' + filter_id).attr('checked', 'checked');

            break;
        case 'UPDATE_TODO':
            editXml('update', change.id, change.text, null, null);
            break;
        case 'DELETE_TODO':
            editXml('delete', change.id, null, null, null);
            break;
        case 'TODO_TOGGLE_DONE':
            for(let todo of state.todos) {
                if(todo.id == change.id) {
                    editXml('update', todo.id, todo.text, !todo.done, null);
                    todo.done = !todo.done;
                    break;
                }
            }
            break;
        case 'SHOW_TODO_ALL':
            for(let todo of state.todos) {            
                todo.show = true;
            }
            break;
        case 'SHOW_TODO_OPEN':
            for(let todo of state.todos) {
                todo.show = false;
                if(todo.done == false) {
                    todo.show = true;
                }
            }
            break;
        case 'SHOW_TODO_CLOSE':
            for(let todo of state.todos) {
                todo.show = false;
                if(todo.done == true) {
                    todo.show = true;
                }
            }
            break;
    }
}

export var todos = createStore(todoChangeHandler, initialState);
