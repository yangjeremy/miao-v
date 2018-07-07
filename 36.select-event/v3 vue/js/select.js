
var crumbData = ['html+css','html5+css3','javascript','angular','react','vue','jquery','nodejs'];


var dropdown = document.querySelector('.dropdown');
var select = document.querySelector('input[type=text]');
var box = document.querySelector('.box');

var pre = null;

init();

function init(){
    generateDropdown(dropdown,crumbData);


   document.addEventListener('click',function(ev){
       var target  = ev.target;
       if(target.tagName.toLowerCase() === 'li'){
           if(pre){
               pre.className = '';
           }
           target.className = 'active';
           select.value = target.innerText;

           pre = target;

           box.classList.remove('expand');
       } else if(target.tagName.toLowerCase() === 'input'){
           box.classList.add('expand');
       } else{
           box.classList.remove('expand');
       }
   });

}

function generateDropdown(obj, data){
    var li = null;
    for(var i = 0; i < data.length; i++){
        li = document.createElement('li');
        li.innerText = data[i];

        obj.appendChild(li);
    }

}



