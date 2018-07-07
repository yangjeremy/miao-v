

var popup = document.querySelector('.popup');

// popup.style.minWidth = popup.offsetWidth + 'px';

var closeX = document.querySelector('.close');

closeX.onclick = function(){
    popup.style.display = 'none';
};

reCalculate(popup);


window.onresize = function(){
    reCalculate();
};

function reCalculate(obj){

    if(!obj){
        obj = document.querySelector('.popup');
        if(obj.style.display==='none') return;
    }

    //★★★★★
    //获取到window可视高宽
    var windowH = window.innerHeight;
    var windowW = window.innerWidth;

    //获取到元素的高宽
    var popupH = obj.offsetHeight;
    var popupW = obj.offsetWidth;



    // (window可视高宽-元素的高宽) /2
    var left = (windowW - popupW) / 2;
    var top = (windowH - popupH) / 2;

    obj.style.left = left + 'px';
    obj.style.top = top + 'px';
}

