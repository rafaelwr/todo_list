import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState, showTodo} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        
        if(todoInput.value != ''){
        	todos.dispatch(addTodo(todoInput.value));
        	document.getElementById('todoInput').focus();
        	event.stopPropagation();
    	}else{
    		todoInput.placeholder = '* Campo Obrigatório';
    		todoInput.className = 'error-input';
    	}
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));

        const option = document.getElementsByName('filterOption');
        var optionValue;

        for(var i = 0; i < option.length; i++){
    		if(option[i].checked){
        		optionValue = option[i].id;
    		}
		}

    	switch (optionValue){
    		case 'radio_todos':
    			todos.dispatch(showTodo('todos'));
    			$('#radio_todos').attr('checked', 'checked');
    			break;
    		case 'radio_abertos':
    			todos.dispatch(showTodo('abertos'));
    			$('#radio_abertos').attr('checked', 'checked');
    			break;
    		case 'radio_fechados':
    			todos.dispatch(showTodo('fechados'));
    			$('#radio_fechados').attr('checked', 'checked');
    			break;
    	}
    });

    listen('keypress', '#todoInput', event => {
        if (event.key == 'Enter'){
        	const todoInput = document.getElementById('todoInput');

        	if(todoInput.value != ''){
        		todos.dispatch(addTodo(todoInput.value));
    	    	document.getElementById('todoInput').focus();
	        	event.stopPropagation();
    		}else{
    			todoInput.placeholder = '* Campo Obrigatório';
    			todoInput.className = 'error-input';
    		}
        }
    });

    listen('click', '#filter input', event => {
    	const value = event.target.getAttribute('value');

    	switch (value){
    		case 'todos':
    			todos.dispatch(showTodo('todos'));
    			$('#radio_todos').attr('checked', 'checked');
    			break;
    		case 'abertos':
    			todos.dispatch(showTodo('abertos'));  
    			$('#radio_abertos').attr('checked', 'checked');
    			break;
    		case 'fechados':
    			todos.dispatch(showTodo('fechados'));
    			$('#radio_fechados').attr('checked', 'checked');
    			break;
    	}        
    });
}
