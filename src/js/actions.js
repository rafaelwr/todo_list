
export function toggleTodoState(id) {
    return {
        type: 'TODO_TOGGLE_DONE',
        id
    };
}

export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        text
    }
}

export function updateTodo(id, text) {
    return {
        type: 'UPDATE_TODO',
        id,
        text
    }
}

export function deleteTodo(id) {
    return {
        type: 'DELETE_TODO',
        id
    }
}

export function showTodo(status) {
    switch (status){
    	case 'todos':
    		return {
    			type: 'SHOW_TODO_ALL'
    		}
    	case 'abertos':
    		return {
    			type: 'SHOW_TODO_OPEN'
    		}
    	case 'fechados':
    		return {
    			type: 'SHOW_TODO_CLOSE'
    		}
    }
}