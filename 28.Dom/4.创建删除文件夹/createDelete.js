var box = document.querySelector('.box');

var createBtn = document.querySelector('.create');
var removeBtn = document.querySelector('.remove');

//待删除数组
var checkedSmile = [];
var num = 0;


//创建笑脸点击事件
createBtn.onclick = function(){
    num++;
    var li = document.createElement('li');
    li.className = 'smile';

    //创建一个checkbox
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'checkbox';

    //创建一个img
    var img = document.createElement('img');
    img.src = 'img/smile-face.jpg';
    img.alt = 'smile face';

    //创建一个span
    var span = document.createElement('span');
    span.innerHTML = num+'. Smile Face!';

    //创建一个文档片段
    var fragment = document.createDocumentFragment();

    //将checkbox,img,span append到文档片段中
    fragment.appendChild(input);
    fragment.appendChild(img);
    fragment.appendChild(span);

    //将文档片段append到li中
    li.appendChild(fragment);

    //将li append到box中
    box.appendChild(li);

    // 给li添加事件
    addEvent(li);

};

//创建笑脸点击事件
removeBtn.onclick = function(){

    for(var i = 0; i < checkedSmile.length; i++){
        box.removeChild(checkedSmile[i]);
    }

    checkedSmile = [];
};

//添加事件
function addEvent(obj){

    var checkbox = obj.querySelector('.checkbox');

    checkbox.onclick = function(ev){
        var ev = ev||event;
        if(checkbox.checked){
            //如果勾选上，则将该笑脸放入待删除数组
            checkedSmile.push(obj);
            console.log(checkedSmile);
        }else{
            //如果取消勾选，则将笑脸从待删除数组中移除
            remove(checkedSmile,obj);
            console.log(checkedSmile);
        }

        ev.stopPropagation();
    };

    //点击笑脸，也可以自动勾选上选框
    obj.onclick = function(){
        if(checkbox.checked){ //如果选框勾选，点击笑脸，取消选框

            checkbox.checked = false;
            remove(checkedSmile,obj);
            console.log(checkedSmile);

        }else{ //如果选框未勾选，点击笑脸，勾选选框

            checkbox.checked = true;
            //如果取消勾选，则将笑脸从待删除数组中移除
            checkedSmile.push(obj);
            console.log(checkedSmile);
        }
    };

    obj.onmouseover = function(){
        this.classList.add('active');
    };

    obj.onmouseout = function(){
        if(checkbox.checked) return;
        this.classList.remove('active');
    };
}


//从数组中移除特定的元素
function remove(arr,obj){
    for(var i = 0; i < arr.length; i++){
        if(arr[i] === obj){
            arr.splice(i,1);
        }
    }
}
