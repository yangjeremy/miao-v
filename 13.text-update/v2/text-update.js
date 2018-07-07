window.onload = function(){

    var items = document.querySelectorAll('.item');

    for(var i = 0; i< items.length; i++){
        fn(items[i]);
    }

    function fn(obj){
        var contentDiv = obj.querySelectorAll('.content');
        var text = obj.querySelectorAll('.text');
        var modifyBtn = obj.querySelectorAll('.modify-btn');

        var modifyDiv = obj.querySelectorAll('.modify');
        var textBox = obj.querySelectorAll('.text-box');
        var okBtn = obj.querySelectorAll('.ok');
        var cancelBtn = obj.querySelectorAll('.cancel');

        //批量添加点击事件
        for(var i = 0; i < modifyBtn.length; i++){
            (function(index){
                modifyBtn[index].onclick = function(){
                    modify(index);
                };

                okBtn[index].onclick = function(){
                    ok(index);
                };

                cancelBtn[index].onclick = function(){
                    cancel(index);
                }
            })(i);
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

    }

};