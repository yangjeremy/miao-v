window.onload = function(){

    var calendar = document.querySelector('.calendar'); // 日历元素，存放日期

    var monthBox = document.querySelector('.month'); //日历上面的文字: 2017.8

    var lis = document.getElementsByTagName('li'); //每一个日期元素

    var pre = document.querySelector('.pre'); //上个月按钮
    var next= document.querySelector('.next'); //下个月按钮

    var month = new Date().getMonth(); //获取到当前的月份


    getMonthDayNum(month); //日历上显示日期 1-31


    pre.onclick = function(){ //上个月按钮事件
        month--;

        getMonthDayNum(month);
    };

    next.onclick = function(){ //下个月按钮事件
        month++;

        getMonthDayNum(month);
    };




    //根据传进来的月份，年份重新填充日历
    function getMonthDayNum(month){
        var date = new Date(); //当前日期

        var week = 0;

        date.setMonth(month); // 设置为指定月份

        date.setMonth(date.getMonth() + 1); // 设置为下个月份

        date.setDate(0); // 设置为上个月的最后一天

        var dayNum = date.getDate(); //31


        calendar.innerHTML = '';


        //拿到1号对应星期几

        date.setDate(1);  //1

        week = date.getDay();

        for(var j = 0; j < week; j++){
            calendar.innerHTML += '<li></li>';
        }



        for(var i = 0 ; i< dayNum; i++){
            if((i+1)==new Date().getDate()){
                calendar.innerHTML += '<li class="active">'+Number(i+1)+'</li>';
            }else{
                calendar.innerHTML += '<li>'+Number(i+1)+'</li>';
            }
        }


        //将周末设置为红色
        for(var j = 0; j < lis.length; j++){
            if(j%7==0 || j%7==6){
                lis[j].className = 'red';
            }
        }

        monthBox.innerHTML = date.getFullYear()+'年'+(date.getMonth()+1)+'月';

    }

};