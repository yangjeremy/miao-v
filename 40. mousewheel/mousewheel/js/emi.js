//获取元素属性
function getCss(obj,attr){
    return parseFloat(getComputedStyle(obj)[attr]);
}


// 返回元素在数组中得位置，数组中没有这个元素，返回-1
function arrIndexOf(arr,n){
    for(var i = 0; i < arr.length; i++){
        if(arr[i]===n)
            return n;
    }
    return -1;
}


//数组去重
//找到x-y中n个不重复的随机数,返回数组
function RandomArray(x,y,n){
    var arr = [];
    var num = 0;
    while(arr.length < n){
        num = Math.round(Math.random()*(y-x)+x);
        if(!arrIndexOf(arr,num)){
            arr.push(num);
        }
    }

    return arr;
}



/**
 * 从数组中移除特定的元素
 * @param arr
 * @param obj
 */
function remove(arr,obj){
    for(var i = 0; i < arr.length; i++){
        if(arr[i] === obj){
            arr.splice(i,1);
        }
    }
}

//补零函数
function preZero(num){
    return num<10?'0'+num:num;
}



////////////////// DOM ///////////////////

/**
 * 拿到obj的所有子元素(非子元素的子节点（#text,#comment）排除)
 * @param obj
 * @returns {Array}
 */
function getChildElements(obj){
    //获取一堆子节点
    var child = obj.childNodes;
    var childElements = [];
    for(var i=0;i<child.length;i++){
        //判断是元素节点类型的才push
        if(child[i].nodeType===1){
            childElements.push(child[i]);
        }
    }
    return childElements;
}


/**
 * 拿到obj的所有合适元素
 * @param obj
 * @param nName
 * @returns {Array}
 */


function getChildElements(obj,nName){
    //获取一堆子节点
    var child = obj.childNodes;
    var childElements = [];
    for(var i=0;i<child.length;i++){
        //判断是元素节点类型的才push
        if(nName){
            if(child[i].nodeType===1&&child[i].nodeName.toLowerCase()===nName.toLowerCase()){
                childElements.push(child[i]);
            }
        }else{
            if(child[i].nodeType===1){
                childElements.push(child[i]);
            }
        }

    }
    return childElements;
}


/**
 *将url后面的查询键值对转换为json
 * @returns {{}}
 */
function getQueryStringArgs(){
    //取得查询字符串并去掉开头的问号
    var qs = (location.search.length > 0) ? location.search.substring(1):'',
        //保存数据的对象
        args = {},
        //取得每一项
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        //在for循环中使用
        i = 0,
        len = items.length;

    //逐个将每一项添加到args对象中
    for( i = 0; i < len; i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if(name.length){
            args[name] = value;
        }
    }

    return args;
}



/*
cookie : 存储数据，当用户访问了某个网站（网页）的时候，我们就可以通过cookie来像访问者电脑上存储数据
	1.不同的浏览器存放的cookie位置不一样，也是不能通用的
	2.cookie的存储是以域名形式进行区分的
	3.cookie的数据可以设置名字的
	4.一个域名下存放的cookie的个数是有限制的，不同的浏览器存放的个数不一样
	5.每个cookie存放的内容大小也是有限制的，不同的浏览器存放大小不一样

	我们通过document.cookie来获取当前网站下的cookie的时候，得到的字符串形式的值，他包含了当前网站下所有的cookie。他会把所有的cookie通过一个分号+空格的形式串联起来

	如果我们想长时间存放一个cookie。需要在设置这个cookie的时候同时给他设置一个过期的时间
	cookie默认是临时存储的，当浏览器关闭进程的时候自动销毁
*/

//document.cookie = '名字=值';

/*document.cookie = 'username=leo';
document.cookie = 'age=32';*/

//document.cookie = '名称=值;expires=' + 字符串格式的时间;

var oDate = new Date();

oDate.setDate( oDate.getDate() + 5 );

//alert(typeof oDate)
//alert(typeof oDate.toGMTString());

//内容最好编码存放,encodeURI

//alert( encodeURI('你好') );
//alert( decodeURI('%E4%BD%A0%E5%A5%BD') )

/*document.cookie = 'username='+ encodeURI('leo\n你好') +';expires=' + oDate.toGMTString();
document.cookie = 'age=32';*/

//document.cookie
//alert(decodeURI(document.cookie));	//username=leo; age=32

/*document.cookie = 'username=leo;expires=' + oDate.toGMTString();
document.cookie = 'age=32';*/

function setCookie(key, value, t) {
    var oDate = new Date();
    oDate.setDate( oDate.getDate() + t );
    document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}

function getCookie(key) {
    var arr1 = document.cookie.split('; ');
    for (var i=0; i<arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if ( arr2[0] == key ) {
            return decodeURI(arr2[1]);
        }
    }
}

function removeCookie(key) {
    setCookie(key, '', -1);
}


//drag函数封装 浏览器兼容器处理+全局捕获

// drag(oImg);
//
// drag(oDiv);

function drag(obj) {

    obj.onmousedown = function(ev) {
        var ev = ev || event;

        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;

        if ( obj.setCapture ) {
            obj.setCapture();
        }

        document.onmousemove = function(ev) {
            var ev = ev || event;

            var L = ev.clientX - disX;
            var T = ev.clientY - disY;

            if ( L < 100 ) {
                L = 0;
            } else if ( L > document.documentElement.clientWidth - obj.offsetWidth ) {
                L = document.documentElement.clientWidth - obj.offsetWidth;
            }

            if ( T < 0 ) {
                T = 0;
            } else if ( T > document.documentElement.clientHeight - obj.offsetHeight ) {
                T = document.documentElement.clientHeight - obj.offsetHeight;
            }

            obj.style.left = L + 'px';
            obj.style.top = T + 'px';

        };

        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            if ( obj.releaseCapture ) {
                obj.releaseCapture();
            }
        };

        return false;

    }

}




/*
ie：obj.attachEvent(事件名称，事件函数);
	1.没有捕获
	2.事件名称有on
	3.事件函数执行的顺序：标准ie-》正序   非标准ie-》倒序
	4.this指向window,使用call()方法指向触发该事件的对象

标准：obj.addEventListener(事件名称，事件函数，是否捕获);
	1.有捕获
	2.事件名称没有on
	3.事件执行的顺序是正序
	4.this触发该事件的对象
*/


//是否捕获 : 默认是false    false:冒泡 true：捕获


function bind(obj, evname, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evname, fn, false);
    } else {
        obj.attachEvent('on' + evname, function() {
            fn.call(obj);
        });
    }
}


// 碰撞检测函数

function getRect(obj){
    return obj.getBoundingClientRect();
}

function collision(obj1,obj2){
    var obj1Rect = 	getRect(obj1);
    var obj2Rect = 	getRect(obj2);

    //如果obj1碰上了obj2返回true，否则放回false
    var obj1Left = obj1Rect.left;
    var obj1Right = obj1Rect.right;
    var obj1Top = obj1Rect.top;
    var obj1Bottom = obj1Rect.bottom;

    var obj2Left = obj2Rect.left;
    var obj2Right = obj2Rect.right;
    var obj2Top = obj2Rect.top;
    var obj2Bottom = obj2Rect.bottom;

    if( obj1Right < obj2Left || obj1Left > obj2Right || obj1Bottom < obj2Top || obj1Top > obj2Bottom ){
        return false; //两个obj没有碰上
    }else{
        return true; //两个obj碰上了
    }
}


//鼠标滚轮事件
function scroll(obj, downScroll, upScroll){
    obj.onmousewheel = function(ev){
        if(ev.wheelDelta > 0){ //向上运动
            upScroll&&upScroll();
        }

        if(ev.wheelDelta < 0){ //向下运动
            downScroll&&downScroll();
        }
    };

    obj.addEventListener('DOMMouseScroll',function(ev){
        if(ev.detail < 0){ //向上运动
            upScroll&&upScroll();
        }

        if(ev.detail > 0){ //向下运动
            downScroll&&downScroll();
        }
    },false);
}


//鼠标滚轮事件2
//    option:{
//        obj: null,//遥操作的元素
//        down: null, //鼠标滚轮向下滚
//        up: null //鼠标滚轮向上滚
//    }

function scroll(option){
    option.obj.onmousewheel = function(ev){
        if(ev.wheelDelta > 0){ //向上运动
            if(option.up){
                option.up(ev);
            }
        }

        if(ev.wheelDelta < 0){ //向下运动
            if(option.down){
                option.down(ev);
            }
        }
        //阻止滚动条默认行为
        return false;
    };

    option.obj.addEventListener('DOMMouseScroll',function(ev){
        if(ev.detail < 0){ //向上运动
            if(option.up){
                option.up(ev);
            }
        }

        if(ev.detail > 0){ //向下运动
            if(option.down){
                option.down(ev);
            }
        }
        //阻止滚动条默认行为
        ev.preventDefault();

    },false);
}