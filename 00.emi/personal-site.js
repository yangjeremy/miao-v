window.onload = function(){
    var cube = document.querySelector('.cube'); //获取魔方
    var sides = cube.getElementsByTagName('li'); //获取魔方每个面

    var len = 54; //魔方一共有54个小方格

    var cubeArr = []; //这是一个二维数组，定义每个面的小方格坐标[[0,1],[0,2],[0,3],.......]

    var timer;
    var num = 1;

    for(var i = 0; i < 6; i++){
        cube.innerHTML+='<li class="side clearfix"></li>';
    }

    for(var i = 0; i < 6; i++){
        for(var j = 0; j < 9; j++){
            sides[i].innerHTML+='<div class="item"></div>';
            cubeArr.push([i,j]);
        }
    }

    cube.style.transform = 'rotateX(90deg) rotateY(90deg)';

    rotateStart();


    function rotateStart() {
        timer = setInterval(function(){
            num++;
            cube.style.transform = 'rotateX('+num*90+'deg) rotateY('+num*90+'deg)';
            },4000
        );

    }

    //停止播放
    function rotateStop() {
        clearInterval(timer);
    }

    cube.onmouseover = function(){
        rotateStop();
        console.log(cube.style.transform);
    };

    cube.onmouseout = function(){
        rotateStart();
    };

    var proj = {
        name:[
            'emi',
            'Div控制面板',
            'QQ聊天模拟',
            '简单相册',
            'cp相册',
            '蘑菇街轮播图',
            'QQ好友',
            'miaov轮播图',
            '小星星 - 五星好评',
            '百度音乐',
            '价格计算器'
        ],
        date:[
            '',
            '2017.7.24',
            '2017.7.25',
            '2017.7.26',
            '2017.7.27',
            '2017.7.28',
            '2017.7.31',
            '2017.8.1',
            '2017.8.2',
            '2018.8.3',
            '2018.8.4'

        ],
        image:[
            'image/proj/0.png',
            'image/proj/1.png',
            'image/proj/2.png',
            'image/proj/3.png',
            'image/proj/4.png',
            'image/proj/5.png',
            'image/proj/6.png',
            'image/proj/7.png',
            'image/proj/8.png',
            'image/proj/9.png',
            'image/proj/10.png'

        ],
        description:[
            '前端开发工程师',
            '项目描述: 可以控制Div的颜色，宽度和高度。',
            '项目描述: 模拟QQ聊天，可以选择不同的人物，发送不同样式的信息。',
            '项目描述: 简单相册，可以选择不同的循环模式，进行上一张、下一张操作。',
            '项目描述: CP相册，点击上一张、下一张可以同时切换两张图片;点击图片，图片自己切换。',
            '项目描述: 完整轮播图。',
            '项目描述: 模拟QQ好友，点击列表，对应好友列表会展开，其他列表会收起来。',
            '项目描述: 轮播图，可以上一张、下一张切换，点击小圆点也可以切换。',
            '项目描述: 鼠标悬停在小星星上会有不同的效果,点击小星星, 撤销点击。',
            '项目描述: 隔行变色，悬停整行内容会变色，离开整行颜色恢复到之前的颜色。全选，取消去选功能。',
            '项目描述: 轮播图',
            '项目描述: 可以计算每一类商品购买的个数、总价，以及所有商品的个数、总价，以及最贵的单价'
        ],
        point:[
            '手机: 18682262095<br>微信:emicats<br>邮箱:wanyin940@126.com',
            '知识点: 声明变量, 字符串拼接，属性操作',
            '知识点: innerHTML属性，字符串的拼接，开关的应用',
            '知识点: for循环，if语句过界处理，数组的运用个，自定义属性，索引值的使用',
            '知识点: 自定义属性，索引值使用，for循环，数组的使用',
            '知识点: JS第一周总结: 条件判断 if else, for循环, 自定义属性',
            '知识点: 点击onclick，开关的使用，for循环',
            '知识点: 条件判断 if else, for循环, 自定义属性',
            '知识点: 隔行变色取模%，input的checked，for循环配合if语句判断是否全选',
            '知识点: for循环，函数传参，input的value属性值得获取和设置',
            '知识点: 判断最大值，函数传参，parseInt，parseFloat'

        ],
        url:[
            'https://github.com/wanyin940',
            '../1.div-config/index.html',
            '../2.QQchat/qqchat.html',
            '../3.album/album.html',
            '../5.cp-carousel/cp.html',
            '../6.carousel/carousel.html',
            '../7.QQfriends/v2/QQfriends.html',
            '../8.album-carousel/v2/index.html',
            '../9.five-star/five-star.html',
            '../10.BaiduMusic/baiduMusic.html',
            '../12.calculator/calculator.html'
        ]
    };

    //产生项目随机数(哪一个面上的哪一个方块)
    var randomArr = [40];
    var randomNum = 0;

    while(randomArr.length < proj.name.length){
        randomNum = Math.floor(Math.random() * len);
        for(var j = 0; j < randomArr.length; j++){
            if(randomNum == randomArr[j]) continue; // 如果是已经找到过的位置，跳过
        }
        randomArr.push(randomNum); //将随机数放到randomArr里面去
    }
    // console.log(randomArr);

    var itemArr = [];

    //根据随机数将项目标记到魔方上, 并将对应的魔方元素放到itemArr数组里
    for (var i = 0; i < randomArr.length; i++){
        // console.log('sides[i] '+ parseInt(randomArr[i]/9));
        var item = sides[parseInt(randomArr[i]/9)].getElementsByTagName('div')[randomArr[i]%9];
        item.innerHTML= '<a href="javascript:;"><img src="image/proj/thumbnail/'+i+'.png" alt="'+proj.name[i]+'"></a>';
        item.className += ' active';
        itemArr.push(item);
    }


    //在页面上拿到Info相关元素
    var info =  document.querySelector('.info');
    var date = document.querySelector('.date');
    var title = document.querySelector('.title');
    var image = document.querySelector('.image');
    var imageLink = document.querySelector('.image-link');
    var desc = document.querySelector('.desc');
    var point = document.querySelector('.point');
    var url = document.querySelector('.url');

    //for循环给项目添加点击事件
    for( var i = 0; i < itemArr.length; i++){
        info.className = 'info fr hidden';
        itemArr[i].index = i;
        itemArr[i].onclick = function(){
            info.className = 'info fr show';
            title.innerHTML = proj.name[this.index];
            title.href = proj.url[this.index];
            date.innerHTML = proj.date[this.index];
            desc.innerHTML = proj.description[this.index];
            point.innerHTML = proj.point[this.index];
            image.src = proj.image[this.index];
            imageLink.href = proj.url[this.index];
        }
    }
};
