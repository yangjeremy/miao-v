window.onload = function(){

    var text = document.querySelector('.form-controller');
    var btn = document.querySelector('.btn-validate');
    var msg = document.querySelector('.msg');

    btn.onclick = function(){
        msg.className = 'msg show';
        if(text.value.trim() == ''){
            msg.innerHTML = 'QQ号不能为空';
        }else if(isNaN(text.value)){
            msg.innerHTML = '请输入数字';
        }else if(text.value.charAt(0)=='0'){
            msg.innerHTML = '不能有0在前面';
        }else if(text.value.length<5 || text.value.length>10){
            msg.innerHTML = '输入的数字必须在5位以上, 10位以内';
        }else{
            msg.innerHTML = 'QQ通过';
        }
    }
};