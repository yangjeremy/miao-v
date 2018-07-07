window.onload = function(){
    /*
    *   思路
    *   1. 点击item，给panel添加.expend
    *   2. 点击panel每一项， 给每一项添加 .on
    * */


    var items = document.querySelectorAll('.item');

    var lis = document.querySelectorAll('.panel li');

    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function () {

            if(this.className == 'item expend'){
                this.className = 'item';
                return;
            }

            for (var i = 0; i< items.length; i++){
                items[i].className = 'item';
            }

            this.className+=' expend';

        };
    }

    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function(ev){
            var ev = ev||event;
            for (var i = 0; i< lis.length; i++){
                lis[i].className = '';
            }

            this.className = 'on';
            ev.stopPropagation();
        }
    }
}