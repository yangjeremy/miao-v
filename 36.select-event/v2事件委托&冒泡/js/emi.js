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