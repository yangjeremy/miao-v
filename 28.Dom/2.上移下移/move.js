var ul = document.querySelector('.box');
var lis = document.querySelectorAll('li');

var isClick = false;

var len = lis.length;

for(var i = 0; i < len; i++){
    init(lis[i]);
   fn(lis[i]);
}


//初始化li的位置
function init(obj){
    var t = obj.offsetTop;

    setTimeout(function(){
        obj.style.position = 'absolute';
        obj.style.top = t + 'px';
    },100);
}

//li的上移下移方法
function fn(obj){

    var down = obj.querySelector('.down');
    var up = obj.querySelector('.up');

    //点击下移按钮
    down.onclick = function(){
        if(isClick) return;  //如果开关打开，return
        isClick = true; //打开开关

        //每次点击的时候都必须重新获取li
        // lis = document.querySelectorAll('li');

        //拿到当前点击元素父级li
        var thisLi = this.parentNode;

        //当前li的上边距
        var thisTop = getCss(thisLi,'top');

        //声明变量 nextLi
        var nextLi = null;

        //声明下一个li的top值
        var nextTop = 0;

        //声明top差值
        var dis = 0;

        //如果当前li是最后一个
        if(thisLi == ul.lastElementChild){

            nextLi = ul.firstElementChild; //下一个li就是第一个li
            nextTop = getCss(nextLi,'top'); //拿到第一个li的top值
            dis = nextTop - thisTop; //算出差值

            for (var i = 0; i < len-1; i++){
                MTween(lis[i],-dis/(len-1),500,'top','linear'); //将所有li下移
            }

            MTween(thisLi,dis,500,'top','linear',function(){//将最后一个li移到第一个
                ul.insertBefore(thisLi, ul.firstElementChild);  //相应DOM发生改变
                isClick = false; //关闭开关
            });

        }else{

            nextLi = thisLi.nextElementSibling; //如果当前li不是最后一个，拿到下一个li
            nextTop = getCss(nextLi,'top'); //获取到下一个li的top值
            dis = nextTop - thisTop; //计算出差值


            MTween(thisLi,dis,500,'top','linear'); //当前li下移
            MTween(nextLi,-dis,500,'top','linear',function(){ //下一个li上移
                ul.insertBefore( nextLi,thisLi); //相应DOM发生改变
                isClick = false; //关闭开关
            });
        }
    };


    //点击上移按钮
    up.onclick = function(){
        if(isClick) return; //如果开关打开，return
        isClick = true; //打开开关

        //每次点击的时候都必须重新获取li
        // lis = document.querySelectorAll('li');

        //拿到当前点击元素父级li
        var thisLi = this.parentNode;

        //声明变量 previousLi
        var previousLi = null;

        //当前li的上边距
        var thisTop = getCss(thisLi,'top');

        //声明上一个li的top值
        var previousTop = 0;

        //声明top差值
        var dis = 0;

        //如果当前li是第一个
        if(thisLi == ul.firstElementChild){
            previousLi = ul.lastElementChild; //下一个li就是最后一个li
            previousTop = getCss(previousLi,'top'); //拿到最后一个li的top值
            dis = previousTop - thisTop;//算出差值

            for (var i = 1; i < len; i++){ //将所有li上移
                MTween(lis[i],-dis/(len-1),500,'top','linear');
            }

            //将第一个li移到最后一个
            MTween(thisLi,dis,500,'top','linear',function(){
                ul.append(thisLi); //相应DOM变化
                isClick = false; //关闭开关
            });

        }else{

            previousLi = thisLi.previousElementSibling; //如果当前li不是第一个，拿到下一个li
            previousTop = getCss(previousLi,'top'); //获取到下一个li的top值
            dis = previousTop - thisTop; //计算出差值


            MTween(thisLi,dis,500,'top','linear'); //当前li上移
            MTween(previousLi,-dis,500,'top','linear',function(){ //下一个li下移
                ul.insertBefore(thisLi, previousLi);  //相应DOM发生改变
                isClick = false; //关闭开关
            });
        }
    }
}


function getCss(obj,attr){
    return parseFloat(getComputedStyle(obj)[attr]);
}