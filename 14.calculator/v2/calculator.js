window.onload = function(){
    var screen = document.querySelector('.screen');

    var c = document.querySelector('.clear');
    var del = document.querySelector('.del');
    var dot = document.querySelector('.dot');
    var percentage = document.querySelector('.percentage');

    var equal = document.querySelector('.equal'); // =

    var num = document.querySelectorAll('.num'); // 0-9

    var oper = document.querySelectorAll('.oper'); // 加减乘除


    var operation = '';
    var numArr = [];
    var numStart = true;


    c.onclick = function(){ //清除所有按钮
        screen.value = '0';
    };

    del.onclick = function(){ //删除按钮
        screen.value = screen.value.slice(0,screen.value.length-1);
        if(screen.value == ''){
            screen.value = '0';
        }
    };

    dot.onclick = function(){ // 点 按钮
        if(screen.value.indexOf('.')==-1){
            screen.value+='.';
            numStart = false;
        }

    };

    percentage.onclick = function(){ //百分号按钮
        if(screen.value.indexOf('%')==-1){
            screen.value+='%';
        }
    };


    for(var i = 0; i < 10; i++){
        num[i].onclick = function(){
            setNum(this.value);
        }
    }


    for (var j = 0; j < oper.length; j++){
        oper[j].onclick = function () {
            if(this.value=='+'){
                setOper('+');
            }else if(this.value=='-'){
                setOper('-');
            }else if(this.value=='*'){
                setOper('*');
            }else if(this.value=='/'){
                setOper('/');
            }
        };
    }


    equal.onclick = function(){
        numArr.push(screen.value);
        screen.value = cal();
        numArr = [];
    };


    /************ 函数开始 ****************/
    function setNum(num){
        if(numStart){
            screen.value='0';
        }
        if(screen.value == '0'){
            screen.value = num;
        }else{
            screen.value+=num;
        }
        numStart = false;
    }

    function setOper(oper){
        numArr.push(screen.value);
        if(screen.value.indexOf(oper)==-1){
            if((oper=='-' && screen.value=='0')||(oper=='+' && screen.value=='0')){
                screen.value = oper;
            }
            operation = oper;
        }
        numStart = true;
    }

    function cal(){
        //处理百分号
        for(var i = 0; i < numArr.length; i++){
            if(numArr[i].charAt(numArr.length-1)=='%'){
                numArr[i] = Number(numArr[i].charAt(0, numArr.length-1))/100;
            }
        }

        var x = Number(numArr[0]);
        var y = Number(numArr[1]);


        if(operation == '+'){
            return x+y;
        }

        if(operation == '-'){
            return x-y;
        }

        if(operation == '*'){
            return x*y;
        }

        if(operation == '/'){
            return x/y;
        }

    }


    /*********** 函数结束 **************/

};