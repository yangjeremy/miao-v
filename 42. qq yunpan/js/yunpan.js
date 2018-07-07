//初始化页面信息

//全局defaultRoute: 页面加载默认的route信息
var defaultRoute = '1_0';

//全局globalRoute，存储当前页面渲染基于的route信息
var globalRoute = defaultRoute;

//全局checkedArr，用来存储选中状态的元素
var checkedArr = [];

//全局moveToRoute,要移动到的位置
var moveToRoute = '';

countHeight(); //计算页面内容高度

createAside(); //生成左侧菜单栏

createMain(defaultRoute); //根据defaltRoute初始化右侧内容

bindClickEvent(); //绑定文件和面包屑的点击事件（添加的新文件也会绑定改事件）

bindCheckAllEvent(); //绑定全选框的点击事件

drag(); //框选文件功能

toolbarAdd(); //顶部的"添加"功能

toolbarMoreEdit(); //选中文件后，顶部蓝色高亮，右侧->"更多"功能

rightClick(); //在文件上点击右键的功能

folderOperation(); //文件的操作 增加，删除，重命名

//页面大小变化的时候做的事情
window.onresize = calculate;

function calculate(){
    countHeight(); //计算页面内容高度
    centerPopup(); //始终居中弹出层
}

//计算内容高度
function countHeight(){
    //头部高度
    var headerH = document.querySelector('#header').offsetHeight;
    var bodyH = document.documentElement.clientHeight;


    //主体结构
    var layoutBody = document.querySelector('.layout-body');

    layoutBody.style.height = bodyH - headerH + 'px';

}

//生成侧栏结构
function createAside(){
    var aside = document.querySelector('.aside-body');

    var itemHtml = '';
    var subItemHtml = '';

    for(let item of data){
        itemHtml+=`<dl class="nav"><dt>${item.title}</dt>`;
        subItemHtml = '';
        for(let subItem of item.child){
            subItemHtml += `<dd data-route="${subItem.route}">
                            <a href="javascript:;">
                                <i class="icon icon-24 icon-${subItem.type}"></i>
                                <span>${subItem.title}</span>
                             </a>
                          </dd>`;
        }

        itemHtml += subItemHtml + `</dl>`;
    }

    aside.innerHTML = itemHtml;

    let dds = aside.querySelectorAll('dd');

    let oldCur = null;

    //侧栏每一项添加点击事件
    for(let dd of dds){

        dd.onclick = function(){
            if(oldCur){
                oldCur.classList.remove('cur');
            }

            this.classList.add('cur');

            createMain(this.dataset.route);

            oldCur = this;
        }
    }
}

//生成对应的主体内容
function createMain(route){

    globalRoute = route;

    var breadcrumbBox = document.querySelector('.breadcrumb'); //拿到面包屑box

    var dataList = document.querySelector('.data-list');

    var [breadcrumb,children] = findDataByRoute(route);

    breadcrumb = `<li class="item cur"><a href="javascript:;" data-route="1_0">微云</a></li>` + breadcrumb;

    var liHtml = '';

    for(let item of children){

        if(item.fileType==='folder'){
            liHtml += `<li class="item file ${item.fileType}" data-route="${item.route}">
                        <i class="icon icon-24 icon-check"></i>
                        <div class="inner">
                            <i class="icon icon-${item.fileType}"></i>
                            <span class="txt">${item.title}</span>
                        </div>
                    </li>`;
        }else{
            liHtml += `<li class="item file single-file">
                            <i class="icon icon-24 icon-check"></i>
                            <div class="figure-list-item-pic is-thumbnail">
                                <i class="icon icon-l icon-${item.fileType}-l"></i>
                            </div>
                            <a class="tit" href="javascript:;">
                                <i class="icon icon-s icon-${item.fileType}-s"></i>
                                <span class="${item.fileType}" title="${item.title}">${item.title}.${item.fileType}</span>
                            </a>
                        </li>`;
        }
    }


    dataList.innerHTML = liHtml;

    breadcrumbBox.innerHTML = breadcrumb;

    bindClickEvent();

}

//绑定文件和面包屑的点击事件（添加的新文件也会绑定改事件）
function bindClickEvent(newEle){

    var files;

    if(newEle){
        files = [newEle];
    }else{
        files = document.querySelectorAll('.data-list .item');
    }

    //获取全选checkbox
    var checkall = document.querySelector('.icon-checkall');

    var checkallParent = checkall.parentNode;

    //单个checkbox点击事件
    for(let item of files) {

        item.ischeck = false;

        item.onclick = function (ev) {
            //如果点击的是checkbox
            if (ev.target.classList.contains('icon-check')) {
                //一开始假设全选按钮是选中的
                checkallParent.classList.add('act');
                checkall.ischeck = true;

                if (this.ischeck) {
                    //如果是单个checkbox选中状态,取消勾选
                    this.classList.remove('act');
                    this.ischeck = false;

                    //取消选择的话，从checkedArr数组中删除掉当前取消的route
                    for (let i = 0; i < checkedArr.length; i++) {
                        if (checkedArr[i].dataset.route === this.dataset.route) {
                            checkedArr.splice(i, 1);
                            break;
                        }
                    }
                } else { //否则, 勾选上
                    this.classList.add('act');
                    this.ischeck = true;

                    //将勾选上的那一项的route添加到checkAll里面
                    checkedArr.push(this);
                }

                //遍历列表中所有的文件，如果有没选中的，那么取消全选
                for (let item of files) {
                    if (!item.ischeck) {
                        checkallParent.classList.remove('act');
                        checkall.ischeck = false;
                        break;
                    }
                }

                if (checkedArr.length === 0) {
                    hideEditMode();
                } else {
                    showEditMode();
                }

            }else {
                //如果点击的不是checkbox
                createMain(this.dataset.route);
            }

        };

        //阻止checkbox的冒泡,而不是阻止item的冒泡!! 否则在item上不能执行框选
        var checkbox = item.querySelector('.icon-check');
        checkbox.onmousedown = function(ev){
            ev.cancelBubble = true;
            ev.stopPropagation();
        }
    }



    //面包屑的点击事件
    var crumbs = document.querySelectorAll('.breadcrumb .item a');

    for(let item of crumbs){
        item.onclick = function(){
            createMain(this.dataset.route);
        };
        //阻止面包屑的冒泡
        item.onmousedown = function(ev){
            ev.cancelBubble = true;
            ev.stopPropagation();
        }
    }
}

//绑定全选框的点击事件
function bindCheckAllEvent(){

    var files = document.querySelectorAll('.data-list .item');

    //获取全选checkbox
    var checkall = document.querySelector('.icon-checkall');

    var checkallParent = checkall.parentNode;

    checkallParent.classList.remove('act');

    //全选checkbox点击事件
    checkall.onclick = function(ev){
        if(checkall.ischeck){
            checkallParent.classList.remove('act');
            checkall.ischeck = false;
            for(let item of files){
                item.classList.remove('act');
            }
            checkedArr = [];
            hideEditMode();

        }else{
            checkedArr = [];
            checkallParent.classList.add('act');
            checkall.ischeck = true;
            for(let item of files){
                item.classList.add('act');
                item.ischeck = checkall.ischeck;
                checkedArr.push(item);
            }

            showEditMode();
        }

    };

    checkall.onmousedown = function(ev){
        ev.cancelBubble = true;
        ev.stopPropagation();
    };

}

/*
        * 根据目标的route信息拿到它的child
        * route = ['1','0','3','1']
        *
        * data[1],
        * data[1].child[0]
        * data[1].child[0].child[3]
        * data[1].child[0].child[3].child[1]
        *
        *
        * data[1].child[0].child[3].child[1].child
        *
        * */


//★★★★★★★★★★ 最难理解的地方!!!!2017.09.25
//根据route拿到data里对应的数据
function findDataByRoute(route){

    route = route.split('_'); //route是形参，前面可以不加var

    var obj = null;

    var breadcrumbHtml = '';

    findData(data, 0);

    function findData(dataJson,index){
        //处理面包屑
        if(index > 1){
            breadcrumbHtml += `<li class="item">
                           <i class="icon icon-bread-next"></i>
                                <a data-route=${dataJson[route[index]].route} href="javascript:;">${dataJson[route[index]].title}</a>
                           </li>`;
        }

        if(index < route.length - 1){
            findData(dataJson[route[index]].child, index+1);
        }else{
            obj = dataJson[route[index]].child;
        }
    }

    // return {
    //     obj:obj,
    //     html:breadcrumbHtml
    // };

    return [breadcrumbHtml,obj];

}

//框选文件功能
function drag(){
    var dragBox = document.querySelector('.drag-box');
    var layoutMain = document.querySelector('.layout-main');
    var checkall = document.querySelector('.icon-checkall');

    var rightMenu = document.querySelector('.mod-bubble-menu');

    layoutMain.addEventListener('mousedown',function(ev){
        // 鼠标点击下去的todolist

        if(ev.button !== 0) return; //如果用户拖拽点击的不是鼠标左键，那么不做任何事情
        // 1. 显示drag-box
        dragBox.classList.remove('hidden');

        // 2. 获取列表中所有的文件
        var files = layoutMain.querySelectorAll('.data-list .item');

        // 3. 点击文档的任何位置(文件的checkbox位置除外，已阻止冒泡),将checkall和所有文件的checkbox重置
        // if(!ev.target.classList.contains('icon-check') && !ev.target.classList.contains('icon-checkall') ){
        reset(true);
        // }

        // 4. 拿到鼠标点下去的位置
        var startX = ev.clientX;
        var startY = ev.clientY;

        // 5.如果右键菜单有打开，关闭邮件菜单
        rightMenu.classList.add('hidden');

        var endX, endY, w, h, l, t= 0;

        //鼠标开始移动啦!!
        document.onmousemove = function(ev){
            // 鼠标移动的todolist

            //1. 拿到鼠标每时每刻移动的坐标
            endX = ev.clientX;
            endY = ev.clientY;

            //2. 算出鼠标每时每刻移动的坐标和开始的差值，取绝对值就是位置给dragBox的宽高
            w = Math.abs(endX - startX);
            h = Math.abs(endY - startY);

            //3. 根据开始点和结束点得出位置给dragBox的位置

            l = Math.min(startX, endX);

            t = Math.min(startY, endY);

            //将宽高，位置给dragBox
            dragBox.style.width = w + 'px';
            dragBox.style.height = h + 'px';

            dragBox.style.left = l + 'px';
            dragBox.style.top = t - 60 + 'px';


            //检查碰撞,遍历列表中所有的文件
            for(let item of files){
                //判断是否有碰撞
                if(collision(item,dragBox)){
                    //如果碰撞上, 假设法，全选选中
                    checkall.parentNode.classList.add('act');

                    if(!item.ischeck){
                        item.classList.add('act');
                        item.ischeck = true;
                        checkedArr.push(item);
                    }

                    //遍历列表中所有的文件，如果有没选中的，那么取消全选
                    for(let item of files){
                        if(!item.ischeck){
                            checkall.parentNode.classList.remove('act');
                            checkall.ischeck = false;
                            break;
                        }
                    }

                }else{
                    //如果没有碰撞上
                    if(item.ischeck){
                        checkall.parentNode.classList.remove('act');
                        checkall.ischeck = false;

                        item.classList.remove('act');
                        item.ischeck = false;
                    }

                }
            }

            console.log(checkedArr);

            return false;
        };

    },false);

    document.onmouseup = function(){
        document.onmousemove = null;
        document.onmouseup = null;
        dragBox.classList.add('hidden');

        dragBox.style.width = 0;
        dragBox.style.height = 0;

        showEditMode();

    }

}

//显示顶部蓝色高亮编辑
function showEditMode(){
    var num = checkedArr.length;

    if(num>0){
        var topBar = document.querySelector('.main-top');
        var count = topBar.querySelector('.j-edit-count-text');
        var cancelBtn = topBar.querySelector('.cancel-select-btn');

        topBar.classList.add('mod-edit');
        count.innerHTML = num;
        cancelBtn.onclick = function(){
            hideEditMode();
            reset(true);
        }
    }

}

//隐藏顶部蓝色高亮编辑
function hideEditMode(){
    var topBar = document.querySelector('.main-top');
    topBar.classList.remove('mod-edit');
}

//选中文件后，顶部蓝色高亮，右侧->"更多"功能
function toolbarMoreEdit(){
    var hasMore = document.querySelector('.mod-edit-bar .has-more');

    var editDropDown = document.querySelector('.mod-edit-bar .edit-bubble-dropdown');

    hasMore.onmouseover = function(){
        editDropDown.classList.remove('hidden');
    };

    hasMore.onmouseout = function(){
        editDropDown.classList.add('hidden');
    }
}

//顶部的"添加"功能
function toolbarAdd(){
    var uploadBtn = document.querySelector('.btn-upload');
    var uploadPanel = document.querySelector('.upload-bubble-dropdown');

    var timer = null;

    uploadBtn.onmouseover = function(){
        clearTimeout(timer);
        uploadPanel.classList.remove('hidden');
    };

    uploadBtn.onmouseout = function(){
        timer =  setTimeout(function(){
            uploadPanel.classList.add('hidden');
        },500);
    };

    uploadPanel.onmouseover = function(){
        clearTimeout(timer);
        uploadPanel.classList.remove('hidden');
    };

    uploadPanel.onmouseout = function(){
        timer =  setTimeout(function(){
            uploadPanel.classList.add('hidden');
        },200);
    };

    uploadPanel.onmousedown = function(ev){
        ev.cancelBubble = true;
        ev.stopPropagation();
    }

}

//重置状态: 深重置状态: 包括取消文件选中状态，清空checkedArr数组，取消顶部高亮状态，隐藏右键菜单
//         浅重置状态: 包括取消文件选中状态，清空checkedArr数组，取消顶部高亮状态
function reset(deeply){

    var files = document.querySelectorAll('.data-list .item');
    var checkall = document.querySelector('.icon-checkall');

    for(let item of files){
        item.classList.remove('act');
        item.ischeck = false;
    }

    checkall.parentNode.classList.remove('act');
    checkall.ischeck = false;

    checkedArr = [];
    hideEditMode();

    if(deeply){
        var rightMenu = document.querySelector('.mod-bubble-menu');
        rightMenu.classList.add('hidden');
    }

}

//文件的操作 增加，删除，重命名, 移动
function folderOperation(){

    var createBtns = document.querySelectorAll('.create-file');
    var deleteBtns = document.querySelectorAll('.delete-file');
    var renameBtns = document.querySelectorAll('.rename-file');
    var moveBtns = document.querySelectorAll('.move-file');

    for(let item of createBtns){
        item.onclick = function(){
            createFileDom();
        };
    }

    for(let item of deleteBtns){
        item.onclick = function(){
            var popup = document.querySelector('.alert-pop');
            showPopup(popup,removeFileDom);
        };

        item.onmousedown = function(ev){
            ev.stopPropagation();
            ev.cancelBubble = true;
        };
    }

    for(let item of renameBtns){
        item.onclick = function(){
            renameFileDom();
        };

        item.onmousedown = function(ev){
            ev.stopPropagation();
            ev.cancelBubble = true;
        };

    }

    for(let item of moveBtns){
        item.onclick = function(){
            var popup = document.querySelector('.move-file-pop');
            showPopup(popup,moveFileDom,function(){
                createDirTree(globalRoute);
            });
        };

        item.onmousedown = function(ev){
            ev.stopPropagation();
            ev.cancelBubble = true;
        };

    }


}

//1. 创建文件
function createFileDom(){
    var dataList = document.querySelector('.data-list');
    var li = document.createElement('li');
    li.className = 'item file folder';

    var newFolderHtml = `<i class="icon icon-24 icon-check"></i>
                            <div class="inner">
                                <i class="icon icon-folder"></i>
                                <input class="ui-input" type="text" value="">
                            </div>`;

    li.innerHTML = newFolderHtml;

    dataList.insertBefore(li,dataList.firstElementChild);

    var input = li.querySelector('input');

    input.focus();

    input.onkeydown = function(ev){
        if(ev.keyCode == 13){
            if(this.value.trim()==='') return;
            saveFile(li);
            createFileData(li);
        }

        input.onblur = null;
    };

    input.onblur = function(ev){
        if(this.value.trim()==='') {
            li.remove();
        }else{
            saveFile(li);
            createFileData(li);
        }

    };

    //给新添加的文件新加点击事件
    bindClickEvent(li);

}

function saveFile(newEle){
    var input = newEle.querySelector('input');
    var span = document.createElement('span');
    span.className = 'txt';
    span.innerHTML = input.value;
    input.parentNode.appendChild(span);
    input.remove();
}

function createFileData(newEle){

    var [,children] = findDataByRoute(globalRoute);

    var route = globalRoute.split('_');

    var files = document.querySelectorAll('.data-list .item');

    var title = findChildEle(newEle,'className','txt').innerHTML;

    for(let item of children){
        item.id = Number(item.id)+1;
        item.route = item.route.slice(0,-1) +(Number(item.route.slice(-1))+1)

    }

    children.unshift({
        "id":0,
        "route":globalRoute+"_0",
        "title":title,
        "type":"folder",
        "fileType":"folder",
        "child":[

        ]
    });

    for(var i = 0; i < files.length; i++){
        files[i].dataset.route = children[i].route;
    }
}


//删除文件
function removeFileDom(){

    if(checkedArr.length === 0) return;

    for(let item of checkedArr){
        item.remove();
    }

    removeFileData();

    reset(true);

}

function removeFileData(){

    var files = document.querySelectorAll('.data-list .item');

    var [,children] = findDataByRoute(globalRoute);

    var route = globalRoute.split('_');

    for(let i = 0; i < checkedArr.length; i++){
        for (let j = 0; j < children.length; j++){
            if(checkedArr[i].dataset.route === children[j].route){
                children.splice(j,1);
                break;
            }
        }
    }

    for(let i = 0; i < children.length; i++){
        children[i].id = i;
        children[i].route = globalRoute+'_'+i;
        files[i].dataset.route = children[i].route
    }

    console.log(data);
}


//重命名文件
function renameFileDom(){
    var dropdown = document.querySelector('.edit-bubble-dropdown');

    var layoutMain = document.querySelector('.layout-main');

    var renameArr = [];

    dropdown.classList.add('hidden');

    if(checkedArr.length === 0) return;

    for(let item of checkedArr){
        var span = findChildEle(item,'className','txt');
        var input = document.createElement('input');
        input.type = 'text';
        input.className = 'ui-input';
        input.value = span.innerHTML;
        span.parentNode.appendChild(input);
        span.remove();

        input.onmousedown = function(ev){
            ev.cancelBubble = true;
            ev.stopPropagation();
        };
        input.onclick = function(ev){
            ev.cancelBubble = true;
            ev.stopPropagation();
        };

        renameArr.push(item);
    }

    //默认选中的第一个文件的input内容全选
    renameArr[0].querySelector('input').select();

    layoutMain.addEventListener('mousedown', r1, false);

    function r1(){
        rename(renameArr);
    }

    function rename(arr){

        layoutMain.removeEventListener('mousedown', r1, false);

        for(let item of arr){
            saveFile(item);
        }

        renameFileData(arr);
    }

}

function renameFileData(arr){

    var files = document.querySelectorAll('.data-list .item');

    var [,children] = findDataByRoute(globalRoute);

    var route = globalRoute.split('_');

    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < children.length; j++){
            if(children[j].route === arr[i].dataset.route){
                children[j].title =  findChildEle(arr[i],'className','txt').innerHTML;
                break;
            }
        }
    }

}

//移动文件
function moveFileDom(){
    toMove(toRoute);
    modal.style.display = 'none';
    showContent(currList.content.child);
}

//点击右键
function rightClick(){

    var rightMenu = document.querySelector('.mod-bubble-menu');

    document.oncontextmenu = function(ev){

        var files = document.querySelectorAll('.data-list .item');

        if(hasParent(ev.target,'className','file')){

            rightMenu.classList.remove('hidden');
            rightMenu.style.left = ev.clientX + 'px';
            rightMenu.style.top = ev.clientY - 60 + 'px';

            var item = findParentEle(ev.target,'className','file');

            if(!item.ischeck){
                reset(false);
                item.ischeck = true;
                item.classList.add('act');
                checkedArr.push(item);
                showEditMode();
            }
        }

        ev.stopPropagation();
        ev.cancelBubble = true;

        return false;
    };

    rightMenu.onclick = function(){
        this.classList.add('hidden');
    }

}

//显示弹出层
function showPopup(obj,fn1,fn2){
    var ok = obj.querySelector('._ok');
    var close = obj.querySelectorAll('._x');
    var mask = document.querySelector('.ui-mask');


    ok.onclick = function(){
        obj.classList.add('hidden');
        mask.classList.add('hidden');

        fn1&&fn1();
    };

    ok.onmousedown = function(ev){
        ev.stopPropagation();
        ev.cancelBubble = true;
    };

    for(let x of close){
        x.onclick = function(){
            obj.classList.add('hidden');
            mask.classList.add('hidden');
        }
    }

    obj.classList.remove('hidden');

    mask.classList.remove('hidden');

    fn2&&fn2();

    centerPopup([obj]);
}


//移动到弹出层列表结构生成
function createDirTree(route,node){

    var dirRoot = document.querySelector('.root');

    if(!arguments[1]){
        node = dirRoot;
    }

    let [,children] = findDataByRoute(route);

    let subTree = document.createElement('ul');
    subTree.className = 'sub-tree';

    let dirTreeHtml = '';

    for(let item of children){
        dirTreeHtml+=`<li class="dir-item" data-route="${item.route}">
                        <a href="#" class="expand">
                            <span class="ui-text">
                                <i class="icon-welcome expander"></i>${item.title}
                            </span>
                        </a>
                    </li>`;
    }

    subTree.innerHTML = dirTreeHtml;

    node.appendChild(subTree);

    let dirItems = node.querySelectorAll('.dir-item');

    for(let item of dirItems){
        item.onclick = function(ev){
            let ul = item.querySelector('.sub-tree');
            let arrow = item.querySelector('a');
            if(!ul){
                createDirTree(this.dataset.route,this);
                toRoute = this.getAttribute('data-route');
                this.isclick = true;
            }else{
                if(this.isclick){
                    ul.classList.add('hidden');
                    arrow.classList.add('expand');
                    this.classList.add('active');
                    this.isclick = false;
                }else{
                    ul.classList.remove('hidden');
                    arrow.classList.remove('expand');
                    this.classList.remove('active');
                    this.isclick = true;
                }
            }

            ev.cancelBubble = true;
            ev.stopPropagation();
        };
    }

}