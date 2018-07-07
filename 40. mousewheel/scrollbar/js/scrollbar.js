var box = document.querySelector('.box');
var scrollBar = document.querySelector('.scroll-bar');
var slider = document.querySelector('.slider');
var contentBox = document.querySelector('.content');
var content = document.querySelector('.content p');

var btnUp = document.querySelector('.up-btn');
var btnDown = document.querySelector('.down-btn');

//初始化scroll-bar的高度
scrollBar.style.height = contentBox.offsetHeight - btnUp.offsetHeight - btnDown.offsetHeight + 'px';
scrollBar.style.top = btnUp.offsetHeight + 'px';

//计算出比例
var ratio = contentBox.clientHeight/content.scrollHeight;


//根据比例计算出小滑块的高度
slider.style.height = ratio * scrollBar.clientHeight + 'px';

var maxScollH = scrollBar.clientHeight - slider.offsetHeight; //滚动条可滚动的最大距离

var maxContentH = content.scrollHeight - contentBox.clientHeight; //内容可滚动的最大距离

//初始化滚动速度
var speed = 10;


scroll({
    obj:box,
    up: movedown,
    down: moveup
});

function moveup(){
    var endPos = slider.offsetTop - speed;
    if(endPos < 0){
        endPos = 0;
    }
    slider.style.top =  endPos + 'px';

    var ratio = endPos/maxScollH;

    content.style.top = - ratio * maxContentH + 'px';
}

function movedown(){
    var endPos = slider.offsetTop + speed;
    if(endPos > maxScollH){
        endPos = maxScollH;
    }

    slider.style.top =  endPos + 'px';

    var ratio = endPos/maxScollH;

    content.style.top = - ratio * maxScollH + 'px';
}

//拖拽滑块
slider.onmousedown = function(ev){
    //拿到滑块距scrollbar顶部的距离
    var disY =   ev.clientY - this.offsetTop;
    document.onmousemove = function(ev){
        var t = ev.clientY - disY ;
        if(t < 0){
            t = 0;
        }else if(t > maxScollH){
            t = maxScollH;
        }

        slider.style.top = t+'px';
        content.style.top = - t/maxScollH * maxContentH + 'px'

    };

    document.onmouseup = function(){
        document.onmousemove = document.onmouseup = null;
    };

    return false;
};

btnUp.onclick = function(){
    moveup();
};


btnDown.onclick = function(){
    movedown();
};




