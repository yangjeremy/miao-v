
var crumbData = ['html+css','html5+css3','javascript','angular','react','vue','jquery','nodejs'];


var dropdown = document.querySelector('.dropdown');
var select = document.querySelector('input[type=text]');
var box = document.querySelector('.box');

var pre = null;

init();

function init(){
    generateDropdown(dropdown,crumbData);


    //select onfocus, onblur事件，显示隐藏dropdown
    select.addEventListener('focus',function(){
        box.classList.add('expand');
    });

    select.addEventListener('blur',function(){
       setTimeout(function(){
           box.classList.remove('expand');
       },100);
    });

}

function generateDropdown(obj, data){
    var li = null;
    for(var i = 0; i < data.length; i++){
        li = document.createElement('li');
        li.innerText = data[i];

        li.addEventListener('click',function(){

            if(pre){
                pre.className = '';
            }
            this.className = 'active';
            select.value = this.innerText;

            pre = this;
        });


        obj.appendChild(li);
    }

}



