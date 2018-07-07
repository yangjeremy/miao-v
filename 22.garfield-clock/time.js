window.onload = function(){

    var scale = document.querySelector('.scale');
    var ticks = document.getElementsByTagName('li');

    var hourHand = document.querySelector('.hour');
    var minHand = document.querySelector('.minute');
    var secHand = document.querySelector('.second');




    initTick();
    showTime();



    function initTick(){
        for(var i = 0; i < 60; i++){
            if(i%5==0){
                scale.innerHTML += '<li class="tick-mark big">'+
                                    '<span class="number" style="transform: rotate('+(-30*i/5)+'deg)">'+i/5+'</span>'+
                                    '</li>'; //逢整点显示数字
            }else{
                scale.innerHTML += '<li class="tick-mark"></li>';
            }
            ticks[i].style.transform = 'rotate('+6*i+'deg)'; //一共60个点，一共360°，每个点6°
        }
    }

    function showTime(){
        setInterval(function(){
            timeRotate();
        },1000);
    }


    function timeRotate(){
        var date = new Date(); //获取当前日期对象
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();



        console.log(h,m,s);

        hourHand.style.transform = 'rotate('+h*30+'deg)';
        minHand.style.transform = 'rotate('+m*6+'deg)';
        secHand.style.transform = 'rotate('+s*6+'deg)';
    }
};