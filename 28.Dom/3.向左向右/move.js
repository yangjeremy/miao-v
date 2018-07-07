var leftArr = ['小程序','jQuery','Ajax','js基础','移动端实践'];
var rightArr = ['Node','Angular','vue','React','面向对象'];

var left = document.querySelector('.left');
var right = document.querySelector('.right');

var leftLis = left.getElementsByTagName('li');
var rightLis = right.getElementsByTagName('li');


var lis = document.getElementsByTagName('li');

var leftBtn = document.querySelector('.left-btn');
var rightBtn = document.querySelector('.right-btn');

var activeArr = [];

//初始化Dom 将数组里地内容分别填充到左右列表中
generateDom(left,leftArr);
generateDom(right,rightArr);

//初始化li的事件: onclick, onmouseover, onmouseout
for(var i = 0; i < lis.length; i++){
    init(lis[i]);
}

//点击向左按钮
leftBtn.onclick = function(){
    //将右侧选中的item放入到activeArr数组中
    for(var i = 0; i < rightLis.length; i++ ){
        if(rightLis[i].isclick){
            //如果右侧1，2，3，4选中,让如数组的顺序是[4,3,2,1]
            activeArr.unshift(rightLis[i]);
        }
    }

    //如果数组长度为0，表示右侧没有选中，提示用户
    if(activeArr.length == 0){
        alert('请选中右侧项目再移动');

    }else{ //如果右侧有选中项目，将右侧项目从上至下放入左侧
        for(var j = 0; j < activeArr.length; j++){
            activeArr[j].classList.remove('active');
            activeArr[j].isclick = false;
            //将[4,3,2,1]插入到左侧，顺序为
            left.insertBefore(activeArr[j],left.firstElementChild);
        }
    }

    activeArr = [];

};


//点击向右按钮
rightBtn.onclick = function(){

        for(var i = 0; i< leftLis.length; i++ ){
            if(leftLis[i].isclick){
                activeArr.unshift(leftLis[i]);
            }
        }

        if(activeArr.length == 0){
            alert('请选中左侧项目再移动');

        }else{
            for(var j = 0; j < activeArr.length; j++){
                activeArr[j].classList.remove('active');
                activeArr[j].isclick = false;
                right.insertBefore(activeArr[j],right.firstElementChild);
            }
        }

        activeArr = [];

};

function generateDom(parentNode,arr){
    for (var  i = 0; i <  arr.length; i++){
        var li = document.createElement('li');
        li.innerHTML = arr[i];
        parentNode.appendChild(li);
    }
}


function init(obj){ //obj 的 onclick, onmouseover, onmouseout方法
    obj.isclick = false;

    if(obj.parentNode.className === 'left'){
        obj.side = 'left';
    }else if(obj.parentNode.className === 'right'){
        obj.side = 'right';
    }

    obj.onclick = function(){
        if(this.isclick){
            this.classList.remove('active');
            this.isclick = false;

        }else{
            this.classList.add('active');
            this.isclick = true;
        }
    };

    obj.onmouseover = function(){
        this.classList.add('active');
    };

    obj.onmouseout = function(){
        if(obj.isclick) return;
        this.classList.remove('active');
    };
}


// function remove(arr,obj){
//     for(var i = 0; i < arr.length; i++){
//         if(arr[i] === obj){
//             arr.splice(i,1);
//         }
//     }
// }

// function sameSide(arr,dir){
//     for(var i = 0; i < arr.length; i++){
//         if(arr[i].side != dir){
//             break;
//             return false;
//         }
//         return true;
//     }
// }


