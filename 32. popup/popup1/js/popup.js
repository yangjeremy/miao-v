var box =document.querySelector('.box');
var submitBtn = document.querySelector('.btn');

//
// <div class="popup">
//     <span class="checkmark"></span>
//     <h3>恭喜你, 提交成功!</h3>
// <span class="text">已扣除10微币</span>
//     <input type="button" value="关闭" class="close-btn">
//     <span class="close-x"></span>
// </div>

//点击提交按钮，生成以上DOM结构
submitBtn.onclick = function(){
    var popup = document.querySelector('.popup');
    if(popup) return; //如果存在popup,不执行下面代码

    //生成以上DOM结构
    var popup = document.createElement('div');
    popup.className = 'popup';

    popup.innerHTML = '<span class="checkmark"></span>'+
                        '<h3>恭喜你, 提交成功!</h3>'+
                        '<span class="text">已扣除10微币</span>'+
                        '<input type="button" value="关闭" class="close-btn">'+
                        '<span class="close-x"></span>';

    box.appendChild(popup);

    //给closeBtn和closeX添加点击事件
    var closeBtn = document.querySelector('.close-btn');
    var closeX = document.querySelector('.close-x');

    closeBtn.onclick = closeX.onclick = function(){
        box.removeChild(popup);
    };

    //计算popup位置
    reCalculate(popup);

};


//window onresize事件，重新计算弹出层位置
window.onresize = function(){
    reCalculate();
};


//重新计算弹出层位置
function reCalculate(obj){

    //如果不存在弹出层，return，不用计算
    if(!obj){
        obj = document.querySelector('.popup');
        if(!obj) return;
    }


    var popupH = obj.offsetHeight;
    var popupW = obj.offsetWidth;

    var windowH = window.innerHeight;
    var windowW = window.innerWidth;

    var left = (windowW - popupW) / 2;
    var top = (windowH - popupH) / 2;

    obj.style.left = left + 'px';
    obj.style.top = top + 'px';

    var scrollX = box.offsetWidth - window.innerWidth;

    window.scrollTo(scrollX/2,0);
}

