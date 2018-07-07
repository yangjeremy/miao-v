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

//
// function $(v){
//     if(v)
// }
