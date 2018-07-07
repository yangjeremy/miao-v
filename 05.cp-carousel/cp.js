/**
 * Created by ewan on 7/26/17.
 */

window.onload = function(){

    // 定义图片数组
    var rArr = ['img/reba/reba1.jpg','img/reba/reba2.jpg','img/reba/reba3.jpg','img/reba/reba4.jpg'];
    var lArr = ['img/luhan/luhan1.jpg','img/luhan/luhan2.jpg','img/luhan/luhan3.jpg'];

    // 确定图片数量
    var rLen = rArr.length;
    var lLen = lArr.length;

    //找到图片元素
    var reba = document.getElementById('reba');
    var luhan = document.getElementById('luhan');

    //分别定义图片顺序
    var rIndex = 0;
    var lIndex = 0;

    //获取图片顺序元素
    var rOrder = document.getElementById('r-index');
    var lOrder = document.getElementById('l-index');

    //初始化
    rOrder.innerHTML = rIndex+1 + '/' + rLen;
    lOrder.innerHTML = lIndex+1 + '/' + lLen;

    //获取"上一张" "下一张" 按钮
    var pre = document.getElementById("pre");
    var next = document.getElementById("next");

    function setContent(){
        reba.src = rArr[rIndex];
        luhan.src = lArr[lIndex];
        rOrder.innerHTML = rIndex+1 + '/' + rLen;
        lOrder.innerHTML = lIndex+1 + '/' + lLen;
    }

    //按钮添加事件
    pre.onclick = function(){
        rIndex--;
        lIndex--;
        if(rIndex < 0){
            rIndex = rLen - 1;
        }

        if(lIndex < 0){
            lIndex = lLen - 1;
        }

        setContent();
    }
    next.onclick = function(){
        rIndex++;
        lIndex++;
        if(rIndex > rLen-1){
            rIndex = 0;
        }

        if(lIndex > lLen-1){
            lIndex = 0;
        }

        setContent();
    }

    //图片添加事件
    reba.onclick = function (){
        rIndex++;
        if(rIndex > rLen-1) {
            rIndex = 0;
        }
        reba.src = rArr[rIndex];
        rOrder.innerHTML = rIndex+1 + '/' + rLen;
    }

    luhan.onclick = function (){
        lIndex++;
        if(lIndex > lLen-1) {
            lIndex = 0;
        }
        luhan.src = lArr[lIndex];
        lOrder.innerHTML = lIndex+1 + '/' + lLen;
    }
}
