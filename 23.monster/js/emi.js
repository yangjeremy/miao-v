//获取元素属性
function getCss(obj,attr){
    return parseFloat(getComputedStyle(obj)[attr]);
}


//数组去重
// 返回元素在数组中得位置，数组中没有这个元素，返回-1
function arrIndexOf(arr,n){
    for(var i = 0; i < arr.length; i++){
        if(arr[i]==n)
            return n;
    }
    return -1;
}

//抖动函数
function shake(obj,attr,s,d,fn){
    //初始位置
    var currSite = getCss(obj,attr);
    var arr = [];
    while(s-d>=0){

        arr.push(s);
        arr.push(-s);

        //s的衰退
        s = s-d;

    }

    arr.push(0);

    var m = 0;
    clearInterval(obj.timer);

    obj.timer = setInterval(function(){
        m++;
        obj.style[attr] = currSite+arr[m]+'px';

        if(m==arr.length-1){
            clearInterval(obj.timer);
            fn&&fn();
        }
    },30)
}