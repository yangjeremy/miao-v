/**
 * Created by ewan on 7/25/17.
 */
window.onload = function(){

    /**
     * 思路
     * 1. 文字初始化
     *  1.1 定义按钮文字描述
     *  1.2 获取按钮描述 #btn-desc
     *  1.3 定义图片路径 数组
     *  1.4 定义图片路径，获取图片长度
     *  1.5 定义num, 表示当前图片在数组里地下标位置, 获取显示当前图片顺序元素
     *  1.6 获取当前图片描述
     *  1.7 定义开关为true
     *  1.8 警告框弹出 所有按钮失效 - 设置一个警告框弹出开关
     *
     * 2. 循环按钮切换功能
     *  2.1 获取 循环 和 切换 按钮 #loop, #order， 获取按钮文字描述 #btn-desc
     *  2.2 给按钮添加事件
     *   2.2.1 点击按钮，添加active class
     *   2.2.2 替换按钮描述文字
     *   2.2.3 设置toggle
     *
     *
     *   3. 图片切换功能
     *    3.1 循环模式下：上一张 和 下一张 按钮 事件
     *    3.2 顺序模式下： 上一张 和 下一张 按钮 事件
     *
     */

    //1. 文字初始化
    //1.1 定义按钮文字描述
    var btnDesc1 = '图片可以从最后一张跳转到第一张循环切换';
    var btnDesc2 = '图片只能到最后一张或只能到第一张切换';

    //1.2 获取按钮描述 #btn-desc
    var btnDesc = document.getElementById('btn-desc');

    //1.3 定义图片描述
    var imgDescArr = ['图片描述一', '图片描述二' , '图片描述三', '图片描述四'];

    //1.4 定义图片路径，获取图片长度
    var imgDirArr = ['img/album/airplane.jpg','img/album/motobycle.jpg', 'img/album/robot.jpg', 'img/album/big-car.jpg'];
    var imgLength = imgDirArr.length;

    //1.5 定义num, 表示当前图片在数组里地下标位置, 获取显示当前图片顺序元素
    var num = 0;
    var current = document.getElementById('current');

    //1.6 获取当前图片描述
    var img = document.getElementById('img');
    var imgDesc = document.getElementById('img-desc');


    //1.7 定义开关为true
    var toggle = true; //默认循环切换

    //1.8 警告框弹出 所有按钮失效 - 设置一个警告框弹出开关
    var pop = false; //默认警告框隐藏


    //初始化页面内容
    btnDesc.innerHTML = btnDesc1;
    setContent();

    //2. 循环按钮切换功能
    //2.1 获取 循环 和 切换 按钮 #loop, #order， 获取按钮文字描述 #btn-desc

    var loopBtn = document.getElementById('loop');
    var orderBtn = document.getElementById('order');

    //2.2 给按钮添加事件
    loopBtn.onclick = function(){
        if(pop) return;
        // 2.2.1 点击按钮，添加active class
        this.className = 'active btn left';
        orderBtn.className = 'btn right';
        // 2.2.2 替换按钮描述文字
        btnDesc.innerHTML = btnDesc1;
        // 2.2.3 设置toggle
        toggle = true;
    };
    orderBtn.onclick = function(){
        if(pop) return;
        this.className = 'active btn right';
        loopBtn.className = 'btn left';
        btnDesc.innerHTML = btnDesc2;
        toggle = false;
    };

    //3. 图片切换功能
    var preBtn = document.getElementById("pre"); //获取上一张按钮
    var nextBtn = document.getElementById("next"); //获取下一张按钮
    var popup = document.getElementById("popup"); //获取警告框
    var ok = document.getElementById("ok"); //获取警告框 确定按钮
    var close = document.getElementById("close"); //获取警告框右上角关闭
    var popupText = document.getElementById("popup-text"); //获取警告框文字


    //3.1 上一张按钮 添加事件
    preBtn.onclick = function(){
        if(pop) return;
        num--;
        if(num < 0){
            if(toggle){ //循环按钮
                num = imgLength - 1;
            }else { //顺序按钮
                popup.style.display = 'block';
                popupText.innerHTML = '已经到第一张啦~~';
                pop = true;
                num = 0;
            }
        }
        setContent();
    };
    //3.1 下一张按钮 添加事件
    nextBtn.onclick = function(){
        if(pop) return;
        num++;
        if(num > imgLength-1) {
            if(toggle){ //循环按钮
                num = 0;
            }else { //顺序按钮
                popup.style.display = 'block';
                popupText.innerHTML = '已经到最后一张啦~~';
                pop = true;
                num = imgLength-1;
            }
        }
        setContent();
    };

    //警告框按钮事件
    close.onclick = ok.onclick = function(){
        popup.style.display = 'none';
        pop = false;
    };


    function setContent(){
        img.src= imgDirArr[num];
        img.title = imgDescArr[num];
        imgDesc.innerHTML = img.title;
        current.innerHTML = (num+1) + '/'+ imgLength;
    }
};