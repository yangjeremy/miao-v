var hireBox = document.querySelector('.hire-box');

init();

function init(){
    var tab = 'society';

    //拿到url的search键值对转换为json对象
    var param = getQueryStringArgs();

    //如果url?后面有type值，那么根据type值现实对应的信息
    if(param.type){
        tab = param.type;
    }

    var item = parseInt(window.location.hash.slice(1))-1; //url上hash值从1开始,#1,#2....但是数据下标从0开始，所以要-1

    //如果没有item,那么默认显示第一条信息
    if(!item){
        item = 0;
    }

    showDetails(hireBox,tab,item);
}

function showDetails(obj, tab, item){
    var toolbar = obj.querySelector('.toolbar');
    var resume = obj.querySelector('.resume');

    var h3 = obj.querySelector('.heading');
    var intro = obj.querySelector('.intro');
    var publishDate = obj.querySelector('.publish-date');

    var require = obj.querySelector('.requirement');
    var response = obj.querySelector('.responsibility');


    h3.innerHTML = data[tab][item].title;

    intro.innerHTML = data[tab][item].content.pay + ' / '+
                        data[tab][item].content.address + ' / '+
                        data[tab][item].content.expert + ' / '+
                        data[tab][item].content.education + ' / '+
                        data[tab][item].content.num;

    publishDate.innerHTML = data[tab][item].time;


    for(var i = 0; i < data[tab][item].content.requirement.length; i++){
        require.innerHTML += '<li>'+data[tab][item].content.requirement[i]+'</li>';
    }

    for(var j = 0; j < data[tab][item].content.responsibility.length; j++){
        response.innerHTML += '<li>'+data[tab][item].content.responsibility[j]+'</li>';
    }

    //返回列表<a>标签
    var returnLink = document.createElement('a');
    returnLink.innerHTML = '&lt返回招聘列表';
    returnLink.href = 'hire.html?'+'type='+tab;
    toolbar.insertBefore(returnLink,resume);

}