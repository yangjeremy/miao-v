window.onload = function(){

    /*
    * 思路
    * 1. 做好常规的左右切换效果 #prev, #next
    * 2. 下面的小圆点随之切换
    * 3. 小圆点点击事件
    * 4. 自动播放
    * 5. 加上特效 (无缝滚动，透明切换)
    * */

    var carousel = document.querySelector('.carousel'); //轮播图框架
    var imgBox = document.querySelector('.img-box'); // 图片box
    var imgs = document.querySelectorAll('.img-box img'); //图片集合
    var prev = document.querySelector('.prev'); //上一张按钮
    var next = document.querySelector('.next'); //下一张按钮
    var dots = document.querySelectorAll('.dot-box span'); //小圆点集合

    var len = imgs.length; //图片个数
    var index = 1; //默认图片从第一张开始 [0,1(start),2,3,4,5(end),6,7]
    var start = 1; //图片真实开始下标
    var end = len - 2; //图片真实结束下标
    var timer; //设置定时器变量
    var offset = 200; //每张图片的偏移量基数
    var isTransition = true; //transition特效是否开启

    //页面加载后的初始化工作
    //计算图片box的总宽度
    imgBox.style.width = 960 + (200 * len) + 'px';
    //第一个小圆点高亮
    dots[0].className = 'active';
    //设置所有图片的左偏移量
    for(var i = 0; i < len; i++) {
        imgs[i].style.left = offset*i + 'px';
    }


    //上一张 下一张 按钮事件
    prev.onclick = function(){
        if(!isTransition){ //如果当前没有transition特效
            turnTransitionOn();
        }
        imgs[index].style.opacity = 0;
        index--;
        if(index == start - 1) { //点击后如果是第一张
            animate(index); //障眼法，走到最后一张
            setTimeout(function(){
                fastMoveTo(end);
                turnTransitionOff(); ////1s后迅速跳到最后一张，关闭特效
            },1000);
        }else{
            animate(index);
        }
    };

    next.onclick = function(){
        if(!isTransition){
            turnTransitionOn();
        }
        imgs[index].style.opacity = 0;
        index++;
        if(index == end + 1) { //点击后如果是最后一张
            animate(index); //障眼法，走到最后一张
            setTimeout(function(){
                fastMoveTo(start);
                turnTransitionOff(); //1s后迅速跳到第一张，关闭特效
                },1000);
        } else {
            animate(index);
        }
    };

    function fastMoveTo(dest){
        imgs[index].style.opacity = 0;
        index = dest;
        imgBox.style.left = -index*offset + 'px';
        imgs[index].style.opacity = 1;
    }

    function turnTransitionOn(){
        imgBox.style.transition = '1s';
        imgs[index].style.transition = '1s';
        isTransition = true;
    }

    function turnTransitionOff(){
        imgBox.style.transition = '0s';
        imgs[index].style.transition = '0s';
        isTransition = false;
    }

    //小圆点 按钮事件
    for (var i = 0; i < end; i++){
        dots[i].onclick = function (){
            if(this.className == 'active') return; //优化
            if(!isTransition){ //如果当前没有transition特效
                turnTransitionOn();
            }
            var currentIndex = this.getAttribute('data-index');
            imgs[index].style.opacity = 0;
            index = parseInt(currentIndex) + 1;
            animate (index);
        }
    }

    //定义imgbox移动
    function animate(index){
        imgBox.style.left = '-' + index * 200 + 'px';
        imgs[index].style.opacity = 1;
        blink(index);
    }

    //定义小圆点高亮
    function blink(index){
        for(var i = 0; i < end; i++){
            if(dots[i].className == 'active'){
                dots[i].className = '';
                break;
            }
        }
        if(index < start){
            dots[end-1].className = 'active';
        } else if(index > end){
            dots[start-1].className = 'active';
        } else {
            dots[index-1].className = 'active';
        }

    }

    //自动播放功能
    carousel.onmouseover = stop;
    carousel.onmouseout = autoPlay;

    //自动播放
    function autoPlay () {
        timer = setInterval(function(){
            next.onclick();
            },4000
        );
    }

    //停止播放
    function stop () {
        clearInterval(timer);
    }

    //页面加载时默认自动播放，当鼠标移上轮播图再停止播放
    autoPlay();
};