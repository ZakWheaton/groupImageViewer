/* 
Created by: Kenrick Beckett

Name: Chat Engine
*/

var instanse = false;
var state;
var mes;
var file;
var current;

function viewer () {
	this.getThumbs = getThumbnails;
	this.getCurrent = getCurrentImage;
}

function getThumbnails(){
	if(!instanse){
		 instanse = true;
		 $.ajax({
			   type: "POST",
			   url: "process.php",
			   data: {  
			   			'function': 'getThumbnails',
						'file': file
						},
			   dataType: "json",
			
			   success: function(data){
					instanse = false;
					$('.thumbBar').empty();
						for (var i = 0; i < data.thumbs.length; i++) {
                            $('.thumbBar').append('<img src="' +data.thumbs[i]+ '" class="thumbNail">');
                        }
			   },
			});
	}	 
}

function getCurrentImage(that, fromClick){
	if(fromClick === true) {
		thumbSrc = $(that).attr("src");
		if(!instanse) {
		 instanse = true;
		 $.ajax({
			   type: "POST",
			   url: "process.php",
			   data: {  
			   			'function': 'current',
						'set': true,
						'new': thumbSrc,
						'file': file
						},
			   dataType: "json",
			
			   success: function(data){
				   current = data.current;
				   	$('.currentContainer').empty();
					$('.currentContainer').append('<img src="' +thumbSrc+ '" class="current">');
				   instanse = false;
			   },
			});
		}
	}else if(!instanse){
		 instanse = true;
		 $.ajax({
			   type: "POST",
			   url: "process.php",
			   data: {  
			   			'function': 'current',
						'thumbs': $('.thumbNail').length,
						'get': true,
						'file': file
						},
			   dataType: "json",
			
			   success: function(data){
				   current = data.current;
					if(current != $('.current').attr('src')) {
						$('.currentContainer').empty();
						$('.currentContainer').append('<img src="' +current+ '" class="current">');
					}
				   instanse = false;
				   if(data.refreshThumbs == true) {
						viewer.getThumbs();
						console.log('test');
				   }
			   },
			});
	}	 
}