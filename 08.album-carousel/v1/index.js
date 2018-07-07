window.onload = function () {
    var imgBox = document.querySelector('.img-box');
    var imgs = document.querySelectorAll('.img-box img');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var dots = document.querySelectorAll('.dot');
    var thumbs = document.querySelectorAll('.thumb');

    var len = imgs.length;
    var index = 0;


    //初始化:第一张图片显示，第一个小圆点高亮
    imgs[index].style.opacity = '1';
    dots[index].style.backgroundColor = 'orange';

    // imgBox onmouseover事件
    // imgBox onmouseout事件

    imgBox.onmouseover = function(){
        prev.style.opacity = '.3';
        next.style.opacity = '.3';
    };

    imgBox.onmouseout = function(){
        prev.style.opacity = '0';
        next.style.opacity = '0';
    };

    // prev onmouseover事件
    // prev onmouseout事件
    // prev onclick事件

    prev.onclick = function() {
        index--;
        if(index < 0){
            index = len - 1;
        }
        animate(index);
    };

    prev.onmouseover = function(){
        this.style.opacity = '.8';
        next.style.opacity = '.3';
    };

    prev.onmouseout = function(){
        this.style.opacity = '.3';
    };

    // next onclick事件
    // next onmouseover事件
    // next onmouseout事件
    next.onclick = function(){
        index++;
        if(index > len - 1){
            index = 0;
        }
        animate(index);
    };

    next.onmouseover = function(){
        this.style.opacity = '.8';
        prev.style.opacity = '.3';
    };

    next.onmouseout = function(){
        this.style.opacity = '.3';
    };

    // 小圆点 onclick事件, 小圆点 onmouseover, onmouseout 事件
    for (var i = 0; i < len; i++) {
        dots[i].index = i;
        dots[i].onclick = function(){ //大清除
            for(var i = 0; i < len; i++){
                dots[i].style.backgroundColor = '';
            }
            index = this.index;
            this.style.backgroundColor = 'orange';
            animate(index);
        }
        dots[i].onmouseover = function(){
            thumbs[this.index].style.display='block';
        }
        dots[i].onmouseout = function(){
            thumbs[this.index].style.display='none';
        }
    }

    function animate(num){
        for(var i = 0; i< len; i++){ //大清除
            dots[i].style.backgroundColor = '';
            imgs[i].style.opacity = '0';
        }
        dots[num].style.backgroundColor = 'orange';
        imgs[num].style.opacity = '1';
    }
};