//js

$(document).ready(function(){
	
	//Get current IST time to display it below message
	var getTime = function(){
		var currentTime = new Date();
		var currentOffset = currentTime.getTimezoneOffset();
		var ISTOffset = 330;   // IST offset UTC +5:30
		var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
		// ISTTime now represents the time in IST coordinates
		var hoursIST = ISTTime.getHours()
		var minutesIST = ISTTime.getMinutes()
		return(hoursIST + ":" + minutesIST);
	};
	
	//Function to send message in the group
	var sendMessage = function(){
		var time = getTime();
		var text = $(".msg-text").val();
		if(!(text) == ""){
			$(".chat").append("<li class='self'><div class='avatar'><img src='http://i.imgur.com/HYcn9xO.png' draggable='false'/></div><div class='msg'><p>"+text+"</p><time>"+time+"</time></div></li>");
			$(document).scrollTop($(document).height());
			$(".msg-text").val("");
		}
	};
	
	$(".send-chat").click(function(){
		console.log("clicked");
		sendMessage();
	});
	
	//If Enter Key is placed 
	$(document).keypress(function(e) {
    if(e.which == 13) {
    	sendMessage();
    }
});
});






