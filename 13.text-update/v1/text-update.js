window.onload = function(){

    var contentDiv = document.querySelectorAll('.content');
    var text = document.querySelectorAll('.text');
    var modifyBtn = document.querySelectorAll('.modify-btn');
    var modifyDiv = document.querySelectorAll('.modify');
    var textBox = document.querySelectorAll('.text-box');
    var okBtn = document.querySelectorAll('.ok');
    var cancelBtn = document.querySelectorAll('.cancel');

    //批量添加点击事件
    for(var i = 0; i < modifyBtn.length; i++){
        modifyBtn[i].index = i;
        okBtn[i].index = i;
        cancelBtn[i].index = i;

        modifyBtn[i].onclick = function(){
            modify(this.index);
        };

        okBtn[i].onclick = function(){
           ok(this.index);
        };

        cancelBtn[i].onclick = function(){
            cancel(this.index);
        }
    }

    function modify(index){
        contentDiv[index].className = 'hidden';
        modifyDiv[index].className = 'display';
        textBox[index].value = text[index].innerHTML;
    }

    function ok(index){
        if(textBox[index].value.trim()==''){
            alert("请输入内容");
            return;
        }
        text[index].innerHTML = textBox[index].value;
        contentDiv[index].className = 'display';
        modifyDiv[index].className = 'hidden';
    }

    function cancel(index){
        contentDiv[index].className = 'display';
        modifyDiv[index].className = 'hidden';
    }
};