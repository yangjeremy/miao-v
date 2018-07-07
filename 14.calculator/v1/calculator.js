window.onload = function(){
    var screen = document.querySelector('.screen');

    var c = document.querySelector('.clear');
    var del = document.querySelector('.del');
    var dot = document.querySelector('.dot');
    var percentage = document.querySelector('.percentage');

    var equal = document.querySelector('.equal'); // =

    var num = document.querySelectorAll('.num'); // 0-9

    var oper = document.querySelectorAll('.oper'); // 加减乘除

    // var add = document.querySelector('.add');
    // var minus = document.querySelector('.minus');
    // var multiple = document.querySelector('.multiple');
    // var divide = document.querySelector('.divide');

    var operation = '';
    var numArr = [];


    c.onclick = function(){
        screen.value = '0';
    };

    del.onclick = function(){
        screen.value = screen.value.slice(0,screen.value.length-1);
        if(screen.value == ''){
            screen.value = '0';
        }
    };

    dot.onclick = function(){
        if(screen.value.indexOf('.')==-1){
            setNum('.');
        }
    };

    percentage.onclick = function(){
        screen.value = screen.value + '%';
    };


    for(var i = 0; i < 10; i++){
        num[i].onclick = function(){
            setNum(this.value);
        }
    }


    // num1.onclick = function(){
    //     setNum(1);
    // };
    //
    // num2.onclick = function(){
    //     setNum(2);
    // };
    //
    // num3.onclick = function(){
    //     setNum(3);
    // };
    //
    // num4.onclick = function(){
    //     setNum(4);
    // };
    //
    // num5.onclick = function(){
    //     setNum(5);
    // };
    //
    // num6.onclick = function(){
    //     setNum(6);
    // };
    //
    // num7.onclick = function(){
    //     setNum(7);
    // };
    //
    // num8.onclick = function(){
    //     setNum(8);
    // };
    //
    // num9.onclick = function(){
    //     setNum(9);
    // };
    //
    // num0.onclick = function(){
    //     setNum(0);
    // };


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

    // add.onclick = function () {
    //     if(screen.value.indexOf('+')==-1){
    //         screen.value+='+';
    //         operation = '+';
    //     }
    // };
    //
    // minus.onclick = function () {
    //     if(screen.value.indexOf('-')==-1){
    //         screen.value+='-';
    //         operation = '-';
    //     }
    // };
    //
    // multiple.onclick = function () {
    //     if(screen.value.indexOf('*')==-1){
    //         screen.value+='*';
    //         operation = '*';
    //     }
    // };
    //
    // divide.onclick = function () {
    //     if(screen.value.indexOf('/')==-1){
    //         screen.value+='/';
    //         operation = '/';
    //     }
    // };

    equal.onclick = function(){
        screen.value = cal();
    };

    function setNum(num){
        if(screen.value == '0'){
            screen.value = num;
        }else{
            screen.value+=num;
        }
    }

    function setOper(oper){
        if(screen.value.indexOf(oper)==-1){
            if(oper=='-'){
                screen.value=oper;
            }else{
                screen.value+=oper;
            }
            operation = oper;
        }
    }

    function cal(){
        numArr = [];
        numArr = screen.value.split(operation);
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


    /****************************/

};