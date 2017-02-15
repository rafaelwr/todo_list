export function isEnabled(name) {
    return window.location.hash.split('#').includes(name);
}

export function isShow() {
	const option = document.getElementsByName('filterOption');
	for(var i = 0; i < option.length; i++){
    	if(option[i].checked){
        	return option[i].id;
    	}
	}
}