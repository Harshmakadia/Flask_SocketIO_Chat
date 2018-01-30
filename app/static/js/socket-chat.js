    /**
     * Created by root on 30/12/16.
     */
$(document).ready(function() {
    var color_list = ['Red', 'Green','Blue','Orange','brown','turquoise','teal','darkred','orangered','magenta','lawngreen','maroon'];
    var _user_id = $("#user_id").text();
    var _user_color = color_list[Math.floor(Math.random() * color_list.length)];

    var getTime = function () {
        var currentTime = new Date();
        var currentOffset = currentTime.getTimezoneOffset();
        var ISTOffset = 330;   // IST offset UTC +5:30
        var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
        // ISTTime now represents the time in IST coordinates
        var timePostfix  = "AM";
        var hoursIST = ISTTime.getHours()
        if (hoursIST >= 12) {
            hoursIST = hoursIST-12;
            timePostfix = "PM";
        }
        var minutesIST = ISTTime.getMinutes()
        return (hoursIST + ":" + minutesIST + " " + timePostfix);
    };

    var getInitialLetter = function(name){
        letter = name.charAt(0);
        return letter.toUpperCase();
    };

    //Function to send message in the group
    var sendMessage = function (data) {
        var isSelf;
        var time = getTime();
        var text = data.msg;
        var name = data.name;
        var user_id = data.user_id;
        var _user_color = color_list[Math.floor(Math.random() * color_list.length)];
        var letter = getInitialLetter(name);
        if (!(text) == "") {
            //to display text on left and right side in chart room
            if(user_id == _user_id){
                isSelf = "self";
            }
            else{
                isSelf = "other";
            }
            //$(".chat").append("<li class="+isSelf+"><div class='avatar '><img src='http://i.imgur.com/HYcn9xO.png' draggable='false'/></div><div class='msg'><p class='user_name' style='color:"+_user_color+"'>"+name+"</p><p>" + text + "</p><time>" + time + "</time></div></li>");
            //$(document).scrollTop($(document).height());
            //$("."+user_id).val("");

            $(".chat").append("<li class="+isSelf+"><div class='avatar customized' style='background:linear-gradient("+_user_color+",silver)'>"+letter+"</div><div class='msg'><p class='user_name' style='color:"+_user_color+"'>"+name+"</p><p>" + text + "</p><time>" + time + "</time></div></li>");
            $(document).scrollTop($(document).height());
            $("."+user_id).val("");
        }
    };

    var joinedRoom = function(name){
        $(".chat").append('<div class="day">'+name+'</div>');
        $(document).scrollTop($(document).height());
    };

    var leftRoom = function(name){
        $(".chat").append('<div class="day">'+name+'</div>');
        $(document).scrollTop($(document).height());
    };

    var socket;
    socket = io.connect('http://' + document.domain + ':' + location.port + '/chat');
    socket.on('connect', function () {
        socket.emit('joined', {});
    });
    socket.on('status', function (data) {
        joinedRoom(data.msg);
    });

    socket.on('message', function (data) {
        sendMessage(data);
        console.log("HERE");
    });

    socket.on('left', function (data) {
        leftRoom(data.msg);
    });

    $(document).keypress(function(e) {
        if(e.which == 13) {
            console.log("HERE ENYTER");
            text = $('.msg-text').val();
            $('.msg-text').val('');
            socket.emit('text', {msg: text});
        }
    });

    $(".send-chat").click(function(){
        text = $('.msg-text').val();
        $('.msg-text').val('');
        socket.emit('text', {msg: text});
    });

    $("#leaveRoom").click(function () {
        socket.emit('left', {}, function () {
            socket.disconnect();
        });
        window.location.href='/';
    });
});