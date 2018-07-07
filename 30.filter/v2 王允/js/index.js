
//获取到box
var ul = document.querySelector('.box');

var filterBox = document.querySelector('.filter');

var shopListBox = document.querySelector(".shop-list");

shopListBox.innerHTML = '<pre>'+JSON.stringify(shopsList,null,3)+'</pre>';

//定义内容数据
var crumbData = [
    {
        "title": "品牌",
        "data": [ "苹果","小米","锤子","魅族","华为","三星","OPPO","vivo","乐视"]
    },
    {
        "title": "尺寸",
        "data": ["4.0-4.5英寸","4.6-4.9英寸","5.0-5.5英寸","6.0英寸以上"]
    },
    {
        "title": "系统",
        "data": ["android","ios","window phone","无","其他"]
    },
    {
        "title": "网络",
        "data": ["联通3G","双卡单4G","双卡双4G","联通4G"]
    }
];

//定义过滤数据
var filterJson = {};

//定义商品筛选的信息
var filterchoose = ['name','size','system','www'];

var filter = {};


init();



/////////////////函数//////////////////////
function init(){
    //根据dataJson 往页面ul#box里添加内容
    generateDom(crumbData,ul);
}

//根据dataJson 往页面ul#box里添加内容
function generateDom(data,node){
    var li = null;
    var title = null;
    var a = null;


    for(var i = 0; i < data.length; i++){

        li = document.createElement('li');

        //★★★★★ 自定义属性，用来保存每一行上一次点击的元素
        li.prev = null;

        //★★★★★ 自定义属性，用来筛选数据使用
        li.index = i;

        title = document.createElement('span');

        title.innerHTML = data[i].title + ': ';

        li.appendChild(title);


        for(var j = 0; j < data[i].data.length; j++){

            a = document.createElement('a');
            a.innerText = data[i].data[j];
            a.href='javascript:;';
            a.onclick = function(){
                //★★★★★
                //点击后高亮显示
                select(this);
                //添加筛选标签
                addFilter(this);
                //过滤数据
                filterData(shopsList,filterJson);
            };

            li.appendChild(a);
        }

        ul.appendChild(li);
    }

}


//★★★★★ 没有用大清洗，而是找到每一行的上一个元素重置，然后把当前元素赋给上一个元素
function select(obj){

    var parent = obj.parentNode; //li

    if(parent.prev){ // li.prev
        parent.prev.classList.remove('active');
    }

    obj.classList.add('active');

    parent.prev = obj; //li.prev = obj
}


function addFilter(obj){
    /******* 添加数据到filterJson *******/

    filterJson[obj.parentNode.index] = obj.innerHTML; //通过下标将a标签的内容添加到filterJson中

    console.log(filterJson);

    /******** 在页面上显示 **********/
    showFilter(filterBox,filterJson);

}

function showFilter(box,json){

    var html = '';

    var lis = ul.querySelectorAll('li');

    for(var i = 0; i < lis.length; i++){
        if(json[i]){
            html+=`<div>${json[i]}<span data-index="${i}">x</span></div>`;
        }
    }

    box.innerHTML = html;

    var allSpan = box.querySelectorAll('span');

    for(var j = 0; j < allSpan.length; j++){
        allSpan[j].onclick = function(){
            this.parentNode.remove();
            //★★★★★ 直接删掉Json对象里对应的值
            delete json[this.dataset.index];

            //★★★★★ 直接取消掉选项中li里对应的高亮
            lis[this.dataset.index].prev.classList.remove('active');

            filterData(shopsList,json);

        }
    }

}

function filterData(data,f){
    //每次将filter清空一下
    filter = {};

    for(var key in f){
        filter[filterchoose[key]] = f[key];
    }

    filterHandle(shopListBox,filter);
}



//筛选数据
function filterHandle(obj,f){
    var filterArr = shopsList; // 等于原始数组
    for(var attr in f){
        // 做一个过滤★★★★★★★★★★
        filterArr = filterArr.filter(function(o){
            console.log(attr);
            return o[attr] === f[attr];
        })
    }

    obj.innerHTML = '<pre>'+JSON.stringify(filterArr,null,3)+'</pre>';
}