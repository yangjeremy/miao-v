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
    // ,
    // {
    //     "url":"img/6.jpg",
    //     "alt":"6.jpg"
    // }
];

//----根据data生成图片---//
var carousel = document.querySelector('.carousel');

//全局变量，用来存放每张图片的顺序
var orderArr = [];

generateImgs(carousel);

//----------------------//


//上一次事件可能走的是上一张'pre'，也可能是下一张'next'
//设置默认的上一次事件是'next' 下一张
var preDir = 'next';


//全局获取所有的图片
var imgs = carousel.querySelectorAll('img');
var len = imgs.length;

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

    moveImg('left',-w, 'pre');

});


//点击向右按钮,图片向右移动
nextBtn.addEventListener('click',function(ev){

    moveImg('left',w, 'next');

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
    };

    return false;

};




function moveImg(attr,dis,dir){
    //阻止多次触发img移动
    if(isclick) return;
    isclick = true;

    //如果当前dir和上一次不一样，重置一下图片z-index顺序
    if(dir !== preDir){

        resetIndex();

    }

    //将这次的方向赋值给preDir
    preDir = dir;

    //首先拿到z-index最大的那一张图片★★★★★
    var maxIndexImg = imgs[orderArr.indexOf(Math.max.apply(Math, orderArr))];

    //将这张图片按给定的距离和方向移动
    MTween(maxIndexImg,dis,500,attr,'linear',function(){

        //移动完之后
        //重新设定所有img的z-index值

        reOrderIndex();

        // orderArr.unshift(orderArr.pop());

        //将当前图片的位置重置一下
        resetPosition(maxIndexImg);

        //释放状态
        isclick = false;

    });

}


//orderArr数组发生变化，同时将变化赋值给每个img的z-index [5,4,3,2,1]->[1,5,4,3,2] ......
function reOrderIndex(){
    for(var i = 0; i < orderArr.length; i++) {
        orderArr[i] = orderArr[i] + 1;
        if (orderArr[i] > imgs.length) orderArr[i] = 1;

        imgs[i].style.zIndex = orderArr[i];
    }
    console.log(orderArr);
}


//重新排序: 因为next和pre的图片层级是不一样的，所以要充值到相应的层级
// example: pre -> next [5,1,2,3,4] -> [5,4,3,2,1] ...
function resetIndex(){
    var temp = [];
    var dis = 0;

    for(var i = 0; i < len; i++){
        dis = len - orderArr[i];
        if(dis === 0) dis = len;
        temp.push(dis);

        imgs[i].style.zIndex = temp[i];
    }

    orderArr = temp;

    console.log(orderArr);
}


//将图片位置还原到(0,0)
function resetPosition(img){
    img.style.top = 0;
    img.style.left = 0;
}


//生成img dom结构
function generateImgs(obj){

    var html = '';

    for(var i = 0,len = imgsData.length; i < len; i++){
        html+=`<img src="${imgsData[i].url}" alt="${imgsData[i].alt}" style="z-index: ${len-i};">`;
        orderArr.push(len-i);
    }

    obj.innerHTML = html;
}