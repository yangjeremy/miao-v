//获取元素属性
function getCss(obj,attr){
    return parseFloat(getComputedStyle(obj)[attr]);
}


// 返回元素在数组中得位置，数组中没有这个元素，返回-1
function arrIndexOf(arr,n){
    for(var i = 0; i < arr.length; i++){
        if(arr[i]==n)
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

//补零函数
function preZero(num){
    return num<10?'0'+num:num;
}