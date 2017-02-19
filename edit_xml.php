<?php

$id = $_GET['id'];
$text = $_GET['text'];
$done = $_GET['done'];
$show = $_GET['show'];

if (isset($_GET['action'])){
	switch ($_GET['action']){
		case 'insert':
			$fname = 'data/todos.xml';
			if (file_exists($fname)) {
				$xml = simplexml_load_file($fname);
				$maxid = 0;

				foreach ($xml as $todo) {
					if(intval($todo->id) > $maxid){
						$maxid = $todo->id;
					}
				}

				$id = $maxid + 1;
			 
				$entry = $xml->addChild('todo');
				$entry->addChild('id', $id);
				$entry->addChild('text', $text);
				$entry->addChild('done', $done);
				$entry->addChild('show', $show);
			 
				$xml->asXML($fname);
			}
			break;
		case 'update':
			$todos = simplexml_load_file('data/todos.xml');
		
			foreach ($todos as $todo) {
				if($todo->id == $id){
					if($done == 'null'){
						$todo->text = $text;
					}else{
						$todo->done = $done;
					}
				}
			}

			$todos->asXML('data/todos.xml');
			break;
		case 'delete':
			$todos = simplexml_load_file('data/todos.xml');
		
			foreach ($todos as $todo) {
				if($todo->id == $id){
					unset($todo->{0});
				}
			}

			$todos->asXML('data/todos.xml');
			break;
	}
}

?>