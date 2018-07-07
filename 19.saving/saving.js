window.onload = function(){

    var coins = document.querySelectorAll('.c-list .item');
    var pigs = document.querySelectorAll('.p-list .item');
    var nums = document.querySelectorAll('.num');
    var len = pigs.length;

    //初始化硬币的位置
    for(var i = 0; i < len; i++){
        coins[i].style.left = getCss(coins[i],'left') + 310*i + 'px';
        //初始化硬币的动画默认值（自定义属性）
        coins[i].top = 0;
        coins[i].opacity = 0;
        coins[i].num = 0;
        pigs[i].isClick = true;

        (function(index){
            pigs[index].onclick = function(){
                if(!pigs[index].isClick) {
                    // alert('too fast');
                    return;
                }
                pigs[index].isClick = false;

                // MTween(coins[index],300,1000,'top','linear');
                clearInterval(coins[index].timer); //先清除再执行

                coins[index].timer = setInterval(function(){
                    coins[index].top +=30;
                    coins[index].opacity +=10;

                    if(coins[index].top >= 480){
                            coins[index].top = 0;
                            coins[index].opacity = 0;
                            clearInterval(coins[index].timer);

                            coins[index].num++;
                            nums[index].innerHTML = '+'+ coins[index].num;

                            MTween(nums[index],26,500,'fontSize','easeInStrong',function(){
                                MTween(nums[index],-26,500,'fontSize','easeOutStrong');
                                pigs[index].isClick = true;
                            });

                    }

                    coins[index].style.top = coins[index].top + 'px';
                    coins[index].style.opacity = coins[index].opacity/100;


                    // if(coins[index].top >= 480){
                    //     coins[index].top = 0;
                    //     pigs[index].isClick = true;
                    // }

                },30);



            }
        })(i);
    }


};