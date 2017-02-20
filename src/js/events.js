import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, updateTodo, deleteTodo, toggleTodoState, showTodo} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        addTodoInput();
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

        event.stopPropagation();
    });

    listen('keypress', '#todoInput', event => {  
        if (event.key == 'Enter'){
            addTodoInput();
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

        event.stopPropagation();   
    });

    listen('click', '.updateOption, .updateOption i', event => {
        var id = event.target.getAttribute('data-id');
        var element = $("[data-id='" + id + "']").find('.inputEditTodo');

        if (element.prop('disabled')){
            element.prop('disabled', false);
            element.focus();
            $("[data-id='" + id + "']").find('.updateOption').html('<i class="fa fa-check" aria-hidden="true" data-id="' + id + '"></i>');
        }else{
            var text = element.val();

            todos.dispatch(updateTodo(id, text));
            $("[data-id='" + id + "']").find('.inputEditTodo').val(text);
            $("[data-id='" + id + "']").find('.updateOption').html('<i class="fa fa-pencil" aria-hidden="true" data-id="' + id + '"></i>');
            element.prop('disabled', true);
            event.stopPropagation();
        }
    });

    listen('click', '.deleteOption i', event => {
        var id = event.target.getAttribute('data-id');

        todos.dispatch(deleteTodo(id));
        $('.todo').find("[data-id='" + id + "']").remove();
        event.stopPropagation();
    });
}

function addTodoInput(){
    const todoInput = document.getElementById('todoInput');
        
    if(todoInput.value != ''){
        todos.dispatch(addTodo(todoInput.value));
        document.getElementById('todoInput').focus();
    }else{
        todoInput.placeholder = '* Campo Obrigatório';
        todoInput.className = 'error-input';
    }

    event.stopPropagation();
};