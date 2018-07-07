window.onload = function() {
    /*
    *   思路
    *   1. 点击item，给panel添加.expend
    *   2. 点击panel每一项， 给每一项添加 .on
    * */


    var titles = document.querySelectorAll('.title');
    var panels = document.querySelectorAll('.panel');
    var len = titles.length;

    var lis = document.querySelectorAll(".item li");


    // 给 item 循环添加 点击事件
    for (var i = 0; i < len; i++) {
        titles[i].index = i;
        panels[i].style.display = 'none';
        titles[i].onclick = function(){
            if(panels[this.index].style.display == 'block') {
                panels[this.index].style.display = 'none'
                this.style.background = '';
                this.className = 'title';

            }else {
                panels[this.index].style.display = 'block';
                this.style.background = 'rgba(169,62,83,.8)';
                this.className = 'title expend';
            }

            for(var i = 0; i < len; i ++) {
                if(i==this.index){
                    continue;
                }
                panels[i].style.display = 'none';
                titles[i].style.background = '';
                titles[i].className = 'title';
            }
        };
    }

    // 给 item 下 每一个 li  循环添加 点击事件

    for ( var i = 0; i < lis.length; i++) {
        lis[i].red = false;
        lis[i].onmouseover = function(){
            if(this.red) return;
            this.style.background = '#5b5b5b';
        };
        lis[i].onmouseout = function(){
            if(this.red) return;
            this.style.background = '';
        };
        lis[i].onclick = function(){
            for (var i = 0; i < lis.length; i++){
                lis[i].style.background = '';
                lis[i].red = false;
            }
            this.style.background = 'rgba(169,62,83,.6)';
            this.red = true;
        }
    }
};