/**
 * Created by ewan on 7/25/17.
 */
/*
*  思路
*  1. 点击头像按钮，切换头像
*   1.1 获取元素#user: 头像img
*   1.2 设置开关toggle, 添加点击事件
*   1.3 点击改变user (改变img src)
*
*  2. 输入内容后发送，屏幕上显示当前头像，当前内容，根据头像来控制文字左右
*   2.1 获取元素: 输入框 #chat, 发送按钮#send, 聊天窗口#chat-window
*   2.2 发送按钮添加点击事件
*     2.2.1 获取输入框的值
*     2.2.2 将 img 和 输入框的值 放到聊天窗口中
*     2.2.3 根据toggle 来决定 文字内容是左浮还是右浮动
*
*   3. 完成enter和组合键的信息发送
* */

window.onload= function () {
    //1. 点击头像按钮，切换头像
    //1.1 获取元素#user: 头像img
    var user = document.getElementById('user');

    //1.2 设置开关, 添加点击事件
    var toggle = true;
    user.onclick = function(){

        //1.3 点击改变user (改变img src)
        if(toggle) {
            user.src = 'img/lico.png';
            toggle = false;
        }else {
            user.src = 'img/rico.png';
            toggle = true;
        }
    };

    //2. 输入内容后发送，屏幕上显示当前头像，当前内容，根据头像来控制文字左右
    //2.1 获取元素: 输入框 #chat, 发送按钮#send, 聊天窗口#chat-window
    var chat = document.getElementById('chat');
    var send = document.getElementById('send');
    var chatWindow = document.getElementById('chat-window');

    send.onclick = sendMsg;

    function sendMsg(){
        if(chat.value === '') {
            return;
        }
        var liClassName = '';
        var floatClassName = '';

        if(toggle) {
            liClassName = 'lico';
            floatClassName = 'fl';
        }else {
            liClassName = 'rico';
            floatClassName = 'fr';
        }

        chatWindow.innerHTML = '<li class="'+ liClassName +' clearfix">'+
            '<div class="'+ floatClassName +'"><img src='+user.src+'>'+
            '</div><span class="bubble">'+chat.value+'</span></div></li>' +
            chatWindow.innerHTML;

        chat.value = '';
    }

    //3. 完成enter和组合键的信息发送
    //★★★★★★★★★

    var option = document.querySelector('#option');

    document.onkeyup = function(ev){

        //enter键
        if(ev.keyCode===13&&!event.shiftKey&&!event.ctrlKey&&option.value==='enter'){
            sendMsg();
        }

        //shift键+enter键
        else if(ev.keyCode===13&&event.shiftKey&&option.value==='senter'){
            sendMsg();
        }

        //ctrl键+enter键
        else if(ev.keyCode===13&&event.ctrlKey&&option.value==='center'){
            sendMsg();
        }
    }

};