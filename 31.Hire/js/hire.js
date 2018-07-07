
var hireBox = document.querySelector('.hire-box');

init();


//初始化方法
function init(){

    //如果没有data，直接return出去
    if(!data) return;

    //默认tab为society
    var tab = 'society';

    //拿到url的search键值对转换为json对象
    var param = getQueryStringArgs();

    //如果url?后面有type值，那么根据type值拿到对应的信息
    if(param.type){
        tab = param.type;
    }

    //拿到hash值，如果没有hash值（页面刚刚加载，用户没有点击分页）,那么hash=1
    var hash = window.location.hash.slice(1);

    if(!hash) hash = 1;

    //每一页显示几条信息
    var numPerPage = 3;

    //生成侧栏信息
    generateSide(hireBox, data, tab);

    //生成主体信息
    generateInfo(hireBox, data, tab, numPerPage,hash);

    //生成分页信息
    generatePagination(hireBox, data, tab, numPerPage,hash);

}


//生成侧栏信息
function generateSide(obj, data, tab){

    var typeBox = obj.querySelector('.type'); //侧栏box

    var typeData = data.list; //侧栏数据


    //<a href="?type=sociology#1">社会招聘</a>
    // <a href="?type=sociology#2">校园招聘</a>

    var html = '';
    var className = '';

    //当前侧栏项为红色
    for(var i = 0; i < typeData.length; i++){
        if(typeData[i].type === tab){
            className = 'active';
        }else{
            className = '';
        }

        html += '<li class="'+className+'">'+
                '<a href="?type='+typeData[i].type+'">'+typeData[i].name+'</a>'+
                '<span>'+typeData[i].type+'</span>'+
                '</li>';
    }

    typeBox.innerHTML = html;
}


//生成主体信息
function generateInfo(obj,data,tab,numPerPage,hash){

    //通过hash和numPerPage将内容切割为每一页显示的部分信息
    var dataPerPage = data[tab].slice((hash-1)*numPerPage, hash*numPerPage);


    var infoBox = obj.querySelector('.info'); //主体box

    var html = '';

    for(var i = 0 ; i < dataPerPage.length; i++){
        html += '<li class="clearfix">'+
                '<div class="num fl">'+preZero(dataPerPage[i]["id"])+'</div>'+
                '<div class="brief fl">'+
                '<div>职位需求: '+dataPerPage[i]["title"]+' 需求人数: '+dataPerPage[i].content["num"]+'</div>'+
                '<div>岗位需求: '+dataPerPage[i].content["requirement"]+'</div></div>'+
                '<div class="detail fl"><span>'+dataPerPage[i]["time"]+'<a href="detail.html?type='+tab+'#'+((hash-1)*numPerPage+(i+1))+'">查看详情 &raquo;</a></span></div>'+
                '</li>';
    }

    infoBox.innerHTML = html;

}

function generatePagination(obj,data,tab,numPerPage,hash){

    //获取分页box
    var pageBox = obj.querySelector('.pagination');

    //根据numPerPage得到一共有多少页
    var pageNum = Math.ceil(data[tab].length / numPerPage);


    //生成页码
    for(var i = 0 ; i < pageNum; i++){
        var a = document.createElement('a');
        a.href='?type=' + tab + '&random=' + Math.round(Math.random()*1000)+'#'+(i+1); //生成随机数清除缓存
        a.innerHTML = (i+1);
        if(hash==i+1){
            a.className = 'active';
        }
        pageBox.appendChild(a);
    }

    //生成上一页
    if(hash > 1){ //如果hash > 第一页 才会显示pre按钮
        var prev = document.createElement('a');
        prev.href='';
        prev.innerHTML = '&lt;';
        prev.onclick = function(){

            hash--;

            if(hash < 1){
                this.style.display = 'none';
            }else{
                this.style.display = 'block';
            }

            var newPrevUrl = window.location.href.split('&random=')[0]+'&random='+Math.round(Math.random()*1000)+'#'+hash;

            window.location.href = newPrevUrl;

            return false;

        };

        pageBox.insertBefore(prev,pageBox.firstElementChild);
    }


    //生成下一页
    if(hash < pageNum){ //如果hash < 最后一页 才会显示next按钮
        var next = document.createElement('a');
        next.href='';
        next.innerHTML = '&gt;';
        next.onclick = function(){

            hash++;

            if(hash > pageNum){
                this.style.display = 'none';
            }else{
                this.style.display = 'block';
            }

            var newNextUrl = window.location.href.split('&random=')[0]+'&random='+Math.round(Math.random()*1000)+'#'+hash;

            window.location.href = newNextUrl;

            return false;
        };

        pageBox.appendChild(next);
    }

}

