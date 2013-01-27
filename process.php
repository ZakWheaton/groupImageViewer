<?php

    $function = $_POST['function'];
    $_textfile = "current.txt";
	$_imagedir = "files";
    $log = array();
    
    switch($function) {
    
		case('current'):
			if(isset($_POST['get'])) {
			
				$current = file_get_contents($_textfile);
				
				if($_POST['thumbs'] != count(getThumbs($_imagedir))) {
					$log['refreshThumbs'] = true;
				} else {
					$log['refreshThumbs'] = false;
				}
				$log['current'] = $current;
			
			} elseif(isset($_POST['set'])) {
			
				$current = file_get_contents($_textfile);
				$new = $_POST['new'];
				
					if($current != $new) {
						file_put_contents($_textfile, $new);
					}
			}
		break;
		
		case('getThumbnails'):
				$log['thumbs'] = getThumbs($_imagedir);
		break;
    }
	
	function getThumbs($_imagedir) {
		$photos = scandir($_imagedir);
			$photos = array_slice($photos, 2);
			$thumbs = array();
			foreach($photos as $thumb) {
				$thumbs[] = $_imagedir."/".$thumb;
			}
			return $thumbs;
	}
    
    echo json_encode($log);

?>