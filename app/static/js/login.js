//js
$(document).ready(function(){
	
	var enterChatRoom = function(){
		
	}

	var validateInput = function(){
		$("#nameinput").val();
	}
	
	$(".join-btn").click(function(){	
		console.log("clicked");	
	});
	
	//If Enter Key is placed 
	$(document).keypress(function(e) {
		if(e.which == 13) {
			enterChatRoom();
		}
	});
});






