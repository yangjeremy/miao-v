window.onload = function(){

    var imgBox = document.querySelector('.img-box');
    var descs = document.querySelectorAll('.desc');
    var len = descs.length;

    //第几张图片
    var num = 0;

    // imgBox宽度
    imgBox.style.width = 960 * len + 'px';

    //声明定时器
    var timer = null;

    //一开始显示第一张图片的描述
    animationP();



    //循环播放图文
    timer = setInterval(function(){
        num++;
        if(num > len-1){
            clearInterval(timer);
            return;
        }
        animationImg();
        setTimeout(function(){
            animationP();
        },1000);

    },4000);


    // animationP();
    //
    // animationImg();


    // 图片切换的动画
    function animationImg(){
        var timer = null;
        var currPos = parseFloat(getCss(imgBox,'marginLeft'));

        timer = setInterval(function(){
            currPos -= 30;
            if(currPos%960 == 0){
                clearInterval(timer);
            }
            imgBox.style.marginLeft = currPos + 'px';
        },30);
    }


    // 图片描述的动画
    function animationP(){
        var currPos = parseFloat(getCss(descs[num],'bottom'));
        var timer = null;

        timer = setInterval(
            function(){
                currPos += 2;
                descs[num].style.bottom = currPos + 'px';

                if(currPos >= 0 ){
                    clearInterval(timer);
                    setTimeout(function(){
                        timer = setInterval(function(){
                            currPos -= 2;
                            if(currPos <= -60){
                                clearInterval(timer);
                            }
                            descs[num].style.bottom = currPos + 'px';
                        },30);
                    },1000);
                }
                console.log(currPos);
            },30
        );

    }


    function getCss(obj,attr){
        return getComputedStyle(obj)[attr];
    }
};
