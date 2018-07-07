window.onload = function(){
    var lis = document.querySelectorAll('.list li');
    var checkboxs = document.querySelectorAll('.list input');
    var checkAll = document.querySelector('#selectAll');
    var len = lis.length;

    var num = 0; // checkbox选中数量

    /*
    * for循环里批量加载li事件
    * 1. onmouseover
    * 2. onmouseout
    * 3. onclick
    *
    * 批量加载checkbox事件
    * 1. onclick
    * */
    for (var i = 0; i < len; i++){
        // 隔行换色 - 粉白粉白
        // 添加自定义属性 oldColor
        if(i%2 == 0) {
            lis[i].className = 'white';
            lis[i].oldColor = 'white';
        }else{
            lis[i].className = 'pink';
            lis[i].oldColor = 'pink';
        }

        lis[i].index = i; //li添加自定义属性index

        lis[i].onmouseover = function(){ //鼠标移入li,整行变成红色
            this.className ='red';
        };

        lis[i].onmouseout = function(){ //鼠标移出li
            if(checkboxs[this.index].checked) return; //如果当前行的checkbox已选中，那么返回
            this.className = this.oldColor;
        };

        lis[i].onclick  = function(){ //鼠标点击li
            if(!checkboxs[this.index].checked){ //如果当前行li的checkbox没有选中
                checkboxs[this.index].checked = true; //那么选中checkbox
                num++; //checkbox选中数量++
            }else { //如果当前行li的checkbox选中
                checkboxs[this.index].checked = false; //取消checkbox
                num--; //checkbox选中数量--
                this.className = this.oldColor;
            }

            //判断num长度,决定全选是否选中
            if(num == len) {
                checkAll.checked = true;
            }else {
                checkAll.checked = false;
            }
        };


        //checkbox还有自己的点击事件，所以要阻止冒泡
        checkboxs[i].onclick  = function(ev){
            var ev = ev||event;
            if(this.checked){
                num++;
            }else {
                num--;
            }
            if(num == len) {
                checkAll.checked = true;
            }else {
                checkAll.checked = false;
            }
            console.log(num);
            ev.stopPropagation();
        };
    }

    checkAll.onclick = function(){
        if(num == len){
            for(var i = 0; i < len; i++){
                checkboxs[i].checked = false;
                lis[i].className = lis[i].oldColor;
                num = 0;
            }
        }else {
            for(var i = 0; i < len; i++){
                checkboxs[i].checked = true;
                lis[i].className = 'red';
                num = len;
            }
        }
    };
};