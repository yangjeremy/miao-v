var imgsData = [
    {
        "url":"img/5.jpg",
        "alt":"5.jpg"
    },
    {
        "url":"img/4.jpg",
        "alt":"4.jpg"
    },
    {
        "url":"img/3.jpg",
        "alt":"3.jpg"
    },
    {
        "url":"img/2.jpg",
        "alt":"2.jpg"
    },
    {
        "url":"img/1.jpg",
        "alt":"1.jpg"
    }
];

//----根据data生成图片---//
var carousel = document.querySelector('.carousel');

generateImgs(carousel);

//----------------------//


//全局获取所有的图片
var imgs = carousel.querySelectorAll('img');

//声明一个变量来保存事件状态
var isclick = false;

//获取左右按钮
var preBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');

//每张图片向左向右移动的距离
var w = carousel.clientWidth;

//每张图片向上向下移动的距离
var h = carousel.clientHeight;


//当前是第几张图片
var index = imgs.length-1;


//------------------- 按钮事件 ---------------------//
//点击向左按钮,图片向左移动
preBtn.addEventListener('click',function(ev){

    moveImg('left',-w);

});


//点击向右按钮,图片向右移动
nextBtn.addEventListener('click',function(ev){

    moveImg('left',w);

});



//------------------- 键盘事件 ---------------------//

document.addEventListener('keydown',function(ev){

    //键盘左键
    if(ev.keyCode === 37){
        moveImg('left',-w,'pre');
        ev.preventDefault();
    }

    //键盘上键
    if(ev.keyCode === 38){
        moveImg('top',-h,'pre');
        ev.preventDefault();
    }

    //键盘右键
    if(ev.keyCode === 39){
        moveImg('left',w,'next');
        ev.preventDefault();
    }

    //键盘下键
    if(ev.keyCode === 40){
        moveImg('top',h,'next');
        ev.preventDefault();
    }
});




//------------------- 鼠标拖拽事件 ---------------------//

    carousel.onmousedown = function(ev){
        //在图片上点击后获取鼠标的x,y坐标
        var startX = ev.clientX;
        var startY = ev.clientY;

        //鼠标抬起后获取鼠标的x,y 与之前的x,y坐标的差值
        document.onmouseup = function(ev){
            var endX = ev.clientX;
            var endY = ev.clientY;

            var disX = ( endX - startX);
            var disY = ( endY - startY);

            // console.log('startX: '+startX);
            // console.log('endX: '+endX);
            //
            // console.log('startY: '+startY);
            // console.log('endY: '+endY);

            if(disX===0 && disY===0) return;

            if(Math.abs(disX) > Math.abs(disY)){ //横向运动
                if(disX > 0){ //向右运动 = 右键
                    moveImg('left',w);
                }else{ //向左运动 = 左键
                    moveImg('left',-w);
                }
            }

            if(Math.abs(disY) > Math.abs(disX)){ //纵向运动
                if(disY > 0){ //向下运动 = 下键
                    moveImg('top', h);
                }else{ //向上运动 = 上键
                    moveImg('top', -h);
                }
            }
        };

        carousel.onmousemove = function(){
            return false;//清除move的默认行为
        };

    };





function moveImg(dir,dis){
    //阻止多次触发img移动
    if(isclick) return;
    isclick = true;



    //将这张图片按给定的距离和方向移动
    MTween(imgs[index],dis,1000,dir,'linear',function(){

        //将当前图片放在最下面
        imgs[index].style.zIndex = -1;

        //将当前图片的位置重置一下
        imgs[index].style.left = 0;
        imgs[index].style.top = 0;

        //重新设定所有img的z-index值
        index--;
        if(index<0){
            index = imgs.length - 1;
            for(var i = 0; i < imgs.length; i++){
                imgs[i].style.zIndex = 0;
            }
        }

        //释放状态
        isclick = false;
    });
}

//生成img dom结构
function generateImgs(obj){

    var html = '';

    for(var i = 0,len = imgsData.length; i < len; i++){
        html+=`<img src="${imgsData[i].url}" alt="${imgsData[i].alt}">`;
    }

    obj.innerHTML = html;
}