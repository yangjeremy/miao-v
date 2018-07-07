window.onload = function () {
    var imgBox = document.querySelector('.img-box');
    var img = document.querySelector('#img');

    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var dotBox = document.querySelector('.dot-box');
    var dots = dotBox.getElementsByTagName('span'); //动态获取span.dot
    var thumbs = dotBox.getElementsByTagName('div');

    var imgArr = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg'];
    var thumbArr = ['img/thumbnail1.jpg','img/thumbnail2.jpg','img/thumbnail3.jpg','img/thumbnail4.jpg','img/thumbnail5.jpg'];

    var len = imgArr.length;
    var index = 0;
    var last = null; //上一个高亮小圆点

    // 根据图片数量动态加载点的数量
    for(var i = 0; i < len; i++) {
        dotBox.innerHTML += '<li><span class="dot"></span>'+
                            '<div class="thumb"><img src="'+thumbArr[i]+'" alt="thumbnail1"></div>';
    }


    //图片初始化
    img.src = imgArr[index];
    //第一个小圆点高亮
    dots[index].className = 'dot active';
    //当下一个小圆点高亮的时候，上一个高亮小圆点就是第一个
    last = dots[index];

    // prev onclick事件
    prev.onclick = function(){
        index--;
        if(index < 0) {
            index = len - 1;
        }
        changeImage();
        last = dots[index];
    };

    // next onclick事件
    next.onclick = function(){
        index++;
        if(index > len - 1) {
            index = 0;
        }
        changeImage();
        last = dots[index];
    };

    //批量加载
    for(var i = 0; i < len; i++){
        dots[i].index = i;
        //dot onclick事件
        dots[i].onclick = function(){
            index = this.index;
            changeImage();
            last = this;
        };

        // onmouseover事件
        dots[i].onmouseover = function(){
            thumbs[this.index].style.display = 'block';
        };

        //onmouseout事件
        dots[i].onmouseout = function(){
            thumbs[this.index].style.display = 'none';
        };
    }

    function changeImage(){
        img.src = imgArr[index];
        last.className = 'dot';//清洗上一个
        dots[index].className = 'dot active';
    }
};

