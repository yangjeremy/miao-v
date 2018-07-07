window.onload = function(){
    var numArr = [0,0,0,0,0];
    var priceArr = [12.5, 10.5, 8.5, 8, 14.5];
    var len = numArr.length;


    var addBtn = document.querySelectorAll('.add'); // 加号
    var numBox = document.querySelectorAll('.num'); // 购买个数
    var subBtn = document.querySelectorAll('.sub'); // 减号

    var singlePriceBox = document.querySelectorAll('.price'); //标价
    var singleTotalBox = document.querySelectorAll('.single-total'); //当前商品总价

    var totalNumBox = document.querySelector('.total-num'); //购买总数
    var totalPriceBox = document.querySelector('.total-price'); //购买总额
    var maxPriceBox = document.querySelector('.max-price'); //最高单价

    var totalNum = 0;
    var totalPrice = 0;
    var boughtPriceArr = [];
    var maxPrice = 0;

    for(var i = 0; i< len; i++){
        addBtn[i].index = i;
        subBtn[i].index = i;
        numBox[i].innerHTML = numArr[i]; // 初始化购买个数为0
        singlePriceBox[i].innerHTML = priceArr[i]; //


        // 加号点击事件
        addBtn[i].onclick = function(){
            numArr[this.index]++;

            //计算当前商品信息
            calculateCurr (this.index);
            // 商品总体信息
            calculateTotal();
            //找出最贵的单价
            findMostExpensive();


        };

        // 减号点击事件
        subBtn[i].onclick = function(){
            if(numArr[this.index]!=0){
                numArr[this.index]--;
                //计算当前商品信息
                calculateCurr (this.index);
                // 商品总体信息
                calculateTotal();
                //找出最贵的单价
                findMostExpensive();
            }
        };
    }


    //计算当前商品信息
    function calculateCurr (index){
        numBox[index].innerHTML = numArr[index];
        singleTotalBox[index].innerHTML = priceArr[index] * numArr[index];
    }

    // 商品总体信息
    function calculateTotal() {
        totalNum = 0;
        totalPrice = 0;
        for(var i = 0; i < len; i++) {
            totalNum += numArr[i]; // 1. 一共买了多少件
            totalPrice += numArr[i]*priceArr[i]; // 1. 价格一共是多少
        }
        totalNumBox.innerHTML = totalNum;
        totalPriceBox.innerHTML = totalPrice;
    }

    //找出最贵的单价
    function findMostExpensive() {
        boughtPriceArr = [];
        for(var i = 0; i< len; i++){
            if(numArr[i]==0){
                continue;
            }
            boughtPriceArr.push(priceArr[i]);
        }

        boughtPriceArr.sort(function (n,m) {
            return m-n;
        });

        maxPrice = boughtPriceArr[0];
        maxPriceBox.innerHTML = maxPrice;
    }
};