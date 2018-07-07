window.onload = function(){
    var carousel = document.querySelector('.carousel');
    var box = document.querySelector('.box');
    var lis = document.querySelectorAll('.box li');
    var dots = document.querySelectorAll('.dot-group li');

    console.log(dots);
    var len = lis.length;

    var num = 1; //默认图片从第一张开始 [0,1(start),2,3,4,5(end),6]
    var start = 1; //图片真实开始下标
    var end = len - 2; //图片真实结束下标


    var prevBtn = document.querySelector('.prev');
    var nextBtn = document.querySelector('.next');

    var timer = null;


    //初始化box宽度
    box.style.width = 960 * len + 'px';
    box.style.marginLeft = -960 + 'px';

    //初始化第一个点高亮
    dotActive(num);

    prevBtn.isClick = true;
    nextBtn.isClick = true;

    //自动播放图片
    autoPlay();

    //鼠标移上carousel,停止自动播放
    carousel.onmouseover = function(){
        stopPlay();
    };

    //鼠标移出carousel,开始自动播放
    carousel.onmouseout = function(){
        autoPlay();
    };


    prevBtn.onclick = function(){
        if(!this.isClick) return;
        this.isClick = false;

        num--;
        dotActive(num);

        MTween(box,960,1000,'marginLeft','linear',function(){
            prevBtn.isClick = true;
            if( num == start - 1 ){
                num = end;
                box.style.marginLeft = -960 * end + 'px';
            }
        });

    };

    nextBtn.onclick = function(){
        if(!this.isClick) return;
        this.isClick = false;

        num++;
        dotActive(num);

        MTween(box,-960,1000,'marginLeft','linear',function(){
            nextBtn.isClick = true;
            if(num == end + 1){
                num = start;
                box.style.marginLeft = -960 * start + 'px';
            }

        });



    };

    function dotActive(index){
        for(var i = 0; i < end; i++){
            dots[i].style.height = '';
        }

        if(index < start){
            MTween(dots[end-1],20,400,'height','linear');
        } else if(index > end){
            MTween(dots[start-1],20,400,'height','linear');
        } else {
            MTween(dots[index-1],20,400,'height','linear');
        }
    }

    function autoPlay(){
        timer = setInterval(function(){
            nextBtn.onclick();
        },2000);
    }

    function stopPlay(){
        clearInterval(timer);
    }
};