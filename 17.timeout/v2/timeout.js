window.onload = function(){

    var imgBox = document.querySelector('.img-box');
    var descs = document.querySelectorAll('.desc');
    var len = descs.length;

    var num = 0;

    imgBox.style.width = 960 * len + 'px';

    animationP();


    function animationP(){
        var descPos = parseFloat(getCss(descs[num],'bottom')); //拿到图片描述位置的初始值
        var disPerTime = 2; //每一次走的距离
        var dis = 0; //一共走的距离
        var timer = 0;

        timer = setInterval(function(){
            dis += disPerTime;
            if(dis>=60){
                dis = 60;
                clearInterval(timer);
                if(num < len - 1){
                    setTimeout(function(){
                        timer = setInterval(function(){
                            dis -= disPerTime;
                            if(dis<=0){
                                dis = 0;
                                clearInterval(timer);
                                animationImage();
                            }
                            descs[num].style.bottom = descPos + dis + 'px';
                        },30);
                    },800);
                }
            }
            descs[num].style.bottom = descPos + dis + 'px';
        },30);

    }

    function animationImage(){
        var imgBoxPos = parseFloat(getCss(imgBox,'marginLeft'));
        var disPerTime = 10;
        var dis = 0;
        var timer = 0;

        timer = setInterval(function(){
            dis-=disPerTime;
            if(dis <= -960){
                num++;
                clearInterval(timer);
                animationP();
            }
            imgBox.style.marginLeft = imgBoxPos + dis + 'px';
        },10);
    }



    function getCss(obj,attr){
        return getComputedStyle(obj)[attr];
    }
};
