var emailArr = [
    {
        "id":"0",
        "title": "妙味课堂1",
        "content": "JS拖拽的进一步学习,移动与拖拽拉伸JS拖拽的进一步练习",
        "date": "2015-12-30"
    },
    {
        "id":"1",
        "title": "妙味课堂2",
        "content": "JS拖拽的进一步学习,移动与拖拽拉伸JS拖拽的进一步练习",
        "date": "2015-12-30"
    },
    {
        "id":"2",
        "title": "妙味课堂3",
        "content": "JS拖拽的进一步学习,移动与拖拽拉伸JS拖拽的进一步练习",
        "date": "2015-12-30"
    },
    {
        "id":"3",
        "title": "妙味课堂4",
        "content": "JS拖拽的进一步学习,移动与拖拽拉伸JS拖拽的进一步练习",
        "date": "2015-12-30"
    },
    {
        "id":"4",
        "title": "妙味课堂5",
        "content": "JS拖拽的进一步学习,移动与拖拽拉伸JS拖拽的进一步练习",
        "date": "2015-12-30"
    }
];


var ul = document.querySelector('.email-list');

var list = ul.parentNode;

//数组的一个方法: map
var html = emailArr.map(function(item){
    return `<li class="clearfix">
            <input type="checkbox" class="pull-left" data-checkbox-id=${item.id}><h4 class="pull-left">${item.title}</h4>
            <span class="pull-right">${item.date}</span>
            <p class="pull-left clearboth">${item.content}</p>
            </li>`;
}).join('');


ul.innerHTML = html;


//获取每一个单选框
var checkboxs = ul.querySelectorAll('input');

//获取全选框
var selectAll = document.querySelector('.select-all');

//获取左侧栏的删除选项
var deleteBtnLeft = document.querySelector('.del');

//获取上面的删除按钮
var deleteBtnTop = document.querySelector('.del-btn');

// 勾选checkbox会出现的'已选中'小提示
var tooltip = document.querySelector('.tooltip');


//单选功能
for(let i = 0; i < checkboxs.length; i++){

    checkboxs[i].onclick  = function(ev){
        //
        // if(!this.checked){
        //     selectAll.checked = false;
        //     this.parentNode.classList.remove('active');
        //     num--;
        // }else{
        //     num++;
        //
        //     if(num === checkboxs.length){
        //         selectAll.checked = true;
        //     }
        //     this.parentNode.classList.add('active');
        // }


        /// 假设法，逆向思维 simple!!!!
        selectAll.checked = true;

        for(var j = 0; j < checkboxs.length; j++){
            if(checkboxs[j].checked === false){
                selectAll.checked = false;
                break;
            }
        }

        //根据点击状态修改背景色
        if(this.checked){
            this.parentNode.classList.add('active');
        }else{
            this.parentNode.classList.remove('active');
        }

        //阻止checkbox点击事件冒泡
        ev.stopPropagation();
    };
}

//全选功能
selectAll.onclick = function(){

    // simple!!!!
    for(var i = 0; i < checkboxs.length; i++){
       checkboxs[i].checked = selectAll.checked;
        if(this.checked){
            checkboxs[i].parentNode.classList.add('active');
        }else{
            checkboxs[i].parentNode.classList.remove('active');
        }
    }

};


ul.onmousedown = function(ev) {

    var num = 0;

    for(var i = 0; i < checkboxs.length; i++){
        if(checkboxs[i].checked) num++;
    }

    //找到li父级
    var li = find(ev.target,'li');


    //找到当前这一行的checkbox
    var  checkbox = li == null ? null : li.querySelector('input');


    if(checkbox == null||!checkbox.checked) return;



    document.onmousemove = function (ev) {
        if(ev.target === deleteBtnLeft){
            ev.target.classList.add('active');
        }

        tooltip.classList.remove('hidden');
        tooltip.innerText = `选中${num}封邮件`;
        tooltip.style.left = ev.clientX - list.offsetLeft + window.pageXOffset + 5 + 'px';
        tooltip.style.top = ev.clientY - list.offsetTop + window.pageYOffset + 5 + 'px';
        return false;
    };

    return false;

};

document.onmouseup = function(ev){
    document.onmousemove = null;
    tooltip.classList.add('hidden');
    if(ev.target === deleteBtnLeft){
        deleteEmail();
        ev.target.classList.remove('active');
    }
};

deleteBtnTop.onclick = function(){
    deleteEmail();
};



function deleteEmail(){

    var selectedArr = getSelectItems();

    for(var i = 0; i < selectedArr.length; i++){

        selectedArr[i].parentNode.remove();

        // delete emailArr[checkboxs[i].dataset.checkboxId]; // 用这个方法会出现undefined


        //在emailArr中将对应的数据删除
        for(var j = 0; j < emailArr.length; j++){
            if(emailArr[j].id === selectedArr[i].dataset.checkboxId){
                emailArr.splice(j,1);
            }
        }
    }

    selectAll.checked = false;

    //★★★★★★★★★★
    // checkbox重新获取最新数据，因为数量已经改变
    checkboxs = ul.querySelectorAll('input');
}


function getSelectItems(){

    var arr = [];
    for(var i = 0; i < checkboxs.length; i++){
        if(checkboxs[i].checked){
            arr.push(checkboxs[i]);
        }
    }

    return arr;
}
