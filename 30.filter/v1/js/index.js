
//获取到box
var ul = document.querySelector('.box');

var filterBox = document.querySelector('.filter');

//定义内容数据
var dataJson = {
    "title":{"brand":"品牌","size":"尺寸","os":"操作系统","network":"网络"},
    "brand":["苹果","小米","锤子","魅族","华为","三星","OPPO","vivo","乐视","360","中兴","索尼"],
    "size":["3.0英寸以下","3.0-3.9英寸","4.0-4.5英寸","5.0-5.5英寸","6.0英寸"],
    "os":["安卓(Android)","苹果(IOS)","微软(WindowsPhone)","无","其他"],
    "network":["联通3G","双卡双4G","联通4G","电信4G","移动4G"]
};

//定义过滤数据
var filterJson = {
    "brand":"",
    "size":"",
    "os":"",
    "network":""
};


init();



/////////////////函数//////////////////////
function init(){
    //根据dataJson 往页面ul#box里添加内容
    generateDom(dataJson,ul);
}

//根据dataJson 往页面ul#box里添加内容
function generateDom(data,node){

    for(var key in data){

        if(key === 'title') continue; //title用来存放每一行标题信息，不用单独给title创建一行li

        var li = document.createElement('li');

        var title = document.createElement('span');

        title.innerHTML = data.title[key] + ': ';

        li.setAttribute('data-filter',key);

        li.appendChild(title);


        for(var i = 0; i < data[key].length; i++){

            var a = document.createElement('a');
            a.innerHTML = data[key][i];
            a.href='';
            a.onclick = function(){
                select(this);
                addFilter(this);

                return false;
            };

            li.appendChild(a);
        }

        ul.appendChild(li);
    }

}

function select(obj){
    var allA = obj.parentNode.getElementsByTagName('a');

    //大清洗
    for(var i = 0; i < allA.length; i++){
        allA[i].classList.remove('active');
    }

    obj.classList.add('active');
}


function addFilter(obj){
    /******* 添加数据到filterJson *******/
    var filter = obj.parentNode.dataset.filter; //获取到当前点击的a标签对应的filter名称(brand,size,os,network)

    filterJson[filter] = obj.innerHTML.trim(); //将a标签的内容添加到filterJson中对应的filter属性中

    console.log(filterJson);

    /******** 在页面上显示 **********/
    showFilter(filterBox,filterJson);

}

function showFilter(box,json){

    box.innerHTML = '';

    for(var key in json){

        if(json[key].trim()!==''){
            var div = document.createElement('div');

            div.innerHTML = json[key];

            var span = document.createElement('span');

            span.innerHTML = 'x';

            span.onclick = function(){

                var name = this.parentNode.childNodes[0].nodeValue;

                console.log('2'+key,json);

                // var name = json[key];

                //从filterJson中移除当前filter
                for(var key1 in json){

                    if(json[key1] === name){
                        json[key1] = '';
                        break;
                    }
                }

                showFilter(box,json);


                //如果filter为空，那么ul对应的a标签取消高亮
                var allA = ul.getElementsByTagName('a');
                for(var i = 0; i < allA.length; i++){
                    if(allA[i].innerHTML === name){
                        allA[i].classList.remove('active');
                    }
                }

            };

            div.appendChild(span);

            filterBox.appendChild(div);
        }
    }
}