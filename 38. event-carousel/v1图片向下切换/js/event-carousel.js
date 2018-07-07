var imgsData = [
    {
        "url":"img/1.jpg",
        "alt":"1.jpg"
    },
    {
        "url":"img/2.jpg",
        "alt":"2.jpg"
    },
    {
        "url":"img/3.jpg",
        "alt":"3.jpg"
    },
    {
        "url":"img/4.jpg",
        "alt":"4.jpg"
    },
    {
        "url":"img/5.jpg",
        "alt":"5.jpg"
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
        moveImg('left',-w);
        ev.preventDefault();
    }
    //键盘上键
    if(ev.keyCode === 38){
        moveImg('top',-h);
        ev.preventDefault();
    }
    //键盘右键
    if(ev.keyCode === 39){
        moveImg('left',w);
        ev.preventDefault();
    }
    //键盘下键
    if(ev.keyCode === 40){
        moveImg('top',h);
        ev.preventDefault();
    }
});




//------------------- 鼠标拖拽事件 ---------------------//

    // carousel.onmousedown = function(ev){

    carousel.addEventListener('mousedown',function(ev){
        //在图片上点击后获取鼠标的x,y坐标
        var startX = ev.clientX;
        var startY = ev.clientY;

        //鼠标抬起后获取鼠标的x,y 与之前的x,y坐标的差值
        // document.onmouseup = function(ev){
        document.addEventListener('mouseup',function(ev){
            var endX = ev.clientX;
            var endY = ev.clientY;

            var disX = ( endX - startX);
            var disY = ( endY - startY);

            console.log('startX: '+startX);
            console.log('endX: '+endX);

            console.log('startY: '+startY);
            console.log('endY: '+endY);

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
        });

        ev.preventDefault();
    });






function moveImg(dir,dis){
    //阻止多次触发img移动
    if(isclick) return;
    isclick = true;

    //首先拿到z-index最大的那一张图片
    var maxIndexImg = getMaxIndexImg(imgs);

    //将这张图片按给定的距离和方向移动
    MTween(maxIndexImg,dis,1000,dir,'linear',function(){
        //移动完之后

        //重新设定所有img的z-index值
        next(maxIndexImg,imgs);

        //将当前图片的位置重置一下
        resetPosition(maxIndexImg);

        //释放状态
        isclick = false;
    });

}




//在一堆图片中拿到index最大的那一张图片
function getMaxIndexImg(arr){
    var indexArr = [];

    for(var i = 0; i < arr.length; i++){
        indexArr.push(arr[i]);
    }

    indexArr.sort(function (m,n) {
        var index1 = getCss(m,'z-index');
        var index2 = getCss(n,'z-index');
        return index2 - index1;
    });

    return indexArr[0];
}


//向下切换: 在一堆图片中,将z-index最大的那一张图片的z-index设置为1,其他的图片的z-index + 1
function next(max,arr){
    max.style.zIndex = 1;

    for(var i = 0; i < arr.length; i++){
        if(max === arr[i]) continue;
        arr[i].style.zIndex = Number(arr[i].style.zIndex) + 1;
    }
}


//将图片为的位置还原到(0,0)
function resetPosition(img){
    img.style.top = 0;
    img.style.left = 0;
}


//生成img dom结构
function generateImgs(obj){

    var html = '';

    for(var i = 0,len = imgsData.length; i < len; i++){
        html+=`<img src="${imgsData[i].url}" alt="${imgsData[i].alt}" style="z-index: ${len-i};">`;
    }

    obj.innerHTML = html;
}