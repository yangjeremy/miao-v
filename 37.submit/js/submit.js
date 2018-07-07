var msgBoxs = document.querySelectorAll('.msg-box');

for(var i = 0; i < msgBoxs.length; i++){
    init(msgBoxs[i]);
}





function init(obj){
    var textarea = obj.querySelector('textarea');
    var content = obj.querySelector('.content');

    obj.addEventListener('click',function(ev){

        // console.log(1);

        var target = ev.target;
        var html = '';

        if(target.nodeName.toLowerCase()==='input'){
            if(textarea.value===''){
                alert('请输入内容');
            }else{
                html = `<li><span>${textarea.value}</span><a href="javascript:;">删除</a></li>`;
                content.innerHTML += html;
                textarea.value = '';
            }
        }


        if(target.nodeName.toLowerCase()==='a'){
            target.parentNode.remove();
        }

    });
}