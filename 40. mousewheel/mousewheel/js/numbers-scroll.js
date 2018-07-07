var imgArr = [
    'img/0.png',
    'img/1.png',
    'img/2.png',
    'img/3.png',
    'img/4.png',
    'img/5.png',
    'img/6.png',
    'img/7.png',
    'img/8.png',
    'img/9.png'
];

var imgBox = document.querySelector('.img-box');

var h = 110;

var num = 6;

var html = '';

var defaultNum = 0;

for(var i = 0; i < num; i++){
    html+=`<li>
             <div class="container">
                 <img src="${imgArr[defaultNum]}" alt="number" data-index="${defaultNum}" class="first">
                 <img src="${imgArr[defaultNum+1]}" alt="number" data-index="${defaultNum+1}" class="second">
             </div>
           </li>`;
}

imgBox.innerHTML = html;

var lis = imgBox.querySelectorAll('li');

for(let k = 0; k < lis.length; k++){
    lis[k].isScoll = false;
    scroll({
        obj:lis[k],
        up:function(){
            minus(lis[k]);
        },
        down:function(){
            add(lis[k]);
        },

    });
}





function add(obj){//往上滚动++
    if(obj.isScoll) return;
    obj.isScoll = true;
    var container = obj.querySelector('.container');
    var first = obj.querySelector('.first');
    var second = obj.querySelector('.second');

    first.style.top = 0;
    second.style.top = h+'px';

    MTween(container,-h,500,'top','linear',function(){
        exchange(container, first, second,'110px');
        obj.isScoll = false;
    });

}

function minus(obj){//往下滚动--
    if(obj.isScoll) return;
    obj.isScoll = true;
    var container = obj.querySelector('.container');
    var first = obj.querySelector('.first');
    var second = obj.querySelector('.second');

    first.style.top = 0;
    second.style.top = -h+'px';

    MTween(container,h,500,'top','linear',function(){
        exchange(container, first, second,'-110px');
        obj.isScoll = false;
    });
}

//交换img1和img2的位置，然后将container位置重置，并且重新赋值新的图片
function exchange(box, obj1, obj2,dis){
    box.style.top = '0';
    obj1.style.top = dis;
    obj2.style.top = '0';

    var tempClass = obj1.className;
    obj1.className = obj2.className;
    obj2.className = tempClass;

    obj1.dataset.index = Number(obj1.dataset.index) + 2;

    obj1.src = imgArr[obj1.dataset.index%10];

}


//---------------华丽丽的分割线----------------//

var input = document.querySelector('.right input');

scroll({
    obj:input,
    up:numAdd,
    down:numMinus
});

function numAdd(){
    if(!validation()) return;
    input.value = Number(input.value)+1;
    console.log(input.value);
}

function numMinus(){
    if(!validation()) return;
    input.value = Number(input.value)-1;
    console.log(input.value);
}

function validation(){
    if(input.value.trim()===''){
        alert("请输入数字!");
        input.value = '';
        return false;
    }

    if(isNaN(input.value.trim())){
        alert("请输入数字!");
        input.value = '';
        return false;
    }
}