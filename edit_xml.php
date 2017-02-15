<?php

$id = $_GET['id'];
$text = $_GET['text'];
$done = $_GET['done'];
$show = $_GET['show'];

if (isset($_GET['action'])){
	if ($_GET['action'] == 'insert'){
		$fname = 'data/todos.xml';
		if (file_exists($fname)) {
			$xml = simplexml_load_file($fname);
		 
			$entry = $xml->addChild('todo');
			$entry->addChild('id', $id);
			$entry->addChild('text', $text);
			$entry->addChild('done', $done);
			$entry->addChild('show', $show);
		 
			$xml->asXML($fname);
		}
	}

	if ($_GET['action'] == 'update'){
		$todos = simplexml_load_file('data/todos.xml');
		
		foreach ($todos as $todo) {
			if($todo->id == $id){
				$todo->done = $done;
			}
		}

		$todos->asXML('data/todos.xml');
	}
}

?>