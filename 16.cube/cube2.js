window.onload = function(){
    var container = document.querySelector('.container');
    var cube = document.querySelector('.cube');
    var uls = document.getElementsByTagName('ul');

    //定义每个方块的位置基数
    var index1 = [[0,0,0],[0,0,0],[0,0,0]];
    var index3 = [[-1,0,1],[0,0,0],[0,0,0]];
    var index9 = [[-1,0,1],[-1,0,1],[0,0,0]];
    var index27 = [[-1,0,1],[-1,0,1],[-1,0,1]];




    //创建27个方块
    createUl();
    rotate360(index1,'rotateY'); //页面一加载方块就开始旋转


    setTimeout(function(){
        changeTo3(index3);
    },4500);

    setTimeout(function(){
        autoPlay(index3,'rotateX',1);
    },4500);

    setTimeout(function(){
        changeTo9(index9);
    },12000);

    setTimeout(function(){
        rotateCube('rotateY(-180deg)');
    },15000);

    setTimeout(function(){
        collapse(index9);
    },17000);

    setTimeout(function(){
        rotateCube('rotateY(-90deg)');
    },21000);

    setTimeout(function(){
        changeTo27(index27);
    },23000);

    setTimeout(function(){
        rotateCube('rotateY(0deg)');
    },25000);


    function autoPlay(index,dir,time){
        var timer = null;
        var n = 0;
        clearInterval(timer);

        timer = setInterval(function(){
            rotate360(index,dir);
            n++;

            if(n==time){
                clearInterval(timer);
            }
        },3600);
    }


    function rotate360(index,dir) {
        var addDeg = 2;
        var s = 0;
        var timer = null;

        timer= setInterval(function () {
            init(index);
            s += addDeg;

            for (var i = 0; i < 27; i++) {

                uls[i].style.transform = uls[i].style.transform + dir + '(' + s + 'deg)';
            }

            if(s == 360){
                clearInterval(timer);
            }

        }, 20);
    }


    //////////////////////函数///////////////////////////////

    // 创建了27个方块，每个方块有6个面
    // 方块的位置是原点(0,0,0),旋转基点是中心点
    function createUl(){
        for(var m = 0; m < 27; m++){
            var ul = document.createElement('ul');
            cube.appendChild(ul);
            for(var n = 0; n < 6; n++){
                var li = document.createElement('li');
                ul.appendChild(li);
            }
        }
        cube.className = 'cube individual';
        init(index1);
    }

    // 初始化每个方块的坐标 （0，0，0）
    function init(arr){
        var n = 0;
        for (var i = 0; i < arr[0].length; i++){
            for (var j = 0; j < arr[1].length; j++){
                for (var k =0; k < arr[2].length; k++){
                    uls[n].style.transform = 'translate3d('+160*(arr[0][k])+'px,'+160*(arr[1][j])+'px,'+160*(arr[2][i])+'px)';
                    // uls[n].setAttribute('data-x', arr[0][k]);
                    // uls[n].setAttribute('data-y', arr[1][j]);
                    // uls[n].setAttribute('data-z', arr[2][i]);
                    n++;
                }
            }

        }

    }

    //将方块由1个变成3个
    function changeTo3(arr){
        var m = 0;
        for (i in arr[0]){
            for (j in arr[1]){
                for (k in arr[2]){
                    if(arr[0][k] == -1) {
                        uls[m].style.transition = '1s';
                        uls[m].style.transform = 'translate3d('+160*(arr[0][k])+'px,'+160*(arr[1][j])+'px,'+160*(arr[2][i])+'px)';
                    }
                    m++;
                }
            }
        }

        setTimeout(function(){
            var m = 0;
            for (i in arr[0]){
                for (j in arr[1]){
                    for (k in arr[2]){
                        if(arr[0][k] == 1) {
                            uls[m].style.transition = '1s';
                            uls[m].style.transform = 'translate3d('+160*(arr[0][k])+'px,'+160*(arr[1][j])+'px,'+160*(arr[2][i])+'px)';
                        }
                        m++;
                    }
                }
            }
        },1500);

        setTimeout(function(){
            setTransition0();
        },3000);

    }

    //将方块由3个变成9个
    function changeTo9(arr){
        var m = 0;

        for (i in arr[0]){
            for (j in arr[1]){
                for (k in arr[2]){
                    if(arr[1][j] == -1) {
                        uls[m].style.transition = '1s';
                        uls[m].style.transform = 'translate3d('+160*(arr[0][k])+'px,'+160*(arr[1][j])+'px,'+160*(arr[2][i])+'px)';
                    }
                    m++;
                }
            }
        }

        setTimeout(function(){
            var m = 0;
            for (i in arr[0]){
                for (j in arr[1]){
                    for (k in arr[2]){
                        if(arr[1][j] == 1) {
                            uls[m].style.transition = '1s';
                            uls[m].style.transform = 'translate3d('+160*(arr[0][k])+'px,'+160*(arr[1][j])+'px,'+160*(arr[2][i])+'px)';
                        }
                        m++;
                    }
                }
            }
        },1500);

        setTimeout(function(){
            setTransition0();
        },3000);

    }

    // 整体旋转魔方
    function rotateCube(dir){
        cube.style.transform = dir;
    }

    // 消除块与块之间的距离
    function collapse(arr){
        var m = 0;

        for (i in arr[0]){
            for (j in arr[1]){
                for (k in arr[2]){
                    if(arr[1][j] == -1) {
                        uls[m].style.transition = '1s';
                        uls[m].style.transform = 'translate3d('+80*(arr[0][k])+'px,'+80*(arr[1][j])+'px,'+80*(arr[2][i])+'px)';
                    }
                    m++;
                }
            }
        }



        setTimeout(function(){
            var m = 0;
            for (i in arr[0]){
                for (j in arr[1]){
                    for (k in arr[2]){
                        if(arr[1][j] == 0) {
                            uls[m].style.transition = '1s';
                            uls[m].style.transform = 'translate3d('+80*(arr[0][k])+'px,'+80*(arr[1][j])+'px,'+80*(arr[2][i])+'px)';
                        }
                        m++;
                    }
                }
            }
        },1500);

        setTimeout(function(){
            var m = 0;
            for (i in arr[0]){
                for (j in arr[1]){
                    for (k in arr[2]){
                        if(arr[1][j] == 1) {
                            uls[m].style.transition = '1s';
                            uls[m].style.transform = 'translate3d('+80*(arr[0][k])+'px,'+80*(arr[1][j])+'px,'+80*(arr[2][i])+'px)';
                        }
                        m++;
                    }
                }
            }
        },3000);

        setTimeout(function(){
            setTransition0();
        },4000);
    }

    //将方块由9个变成27个
    function changeTo27(arr){
        var m = 0;
        for (i in arr[0]){
            for (j in arr[1]){
                for (k in arr[2]){
                    if(arr[1][i] == 1) {
                        uls[m].style.transition = '1s';
                        uls[m].style.transform = 'translate3d('+80*(arr[0][k])+'px,'+80*(arr[1][j])+'px,'+80*(arr[2][i])+'px)';
                    }
                    m++;
                }
            }
        }

        setTimeout(function(){
            var m = 0;
            for (i in arr[0]){
                for (j in arr[1]){
                    for (k in arr[2]){
                        if(arr[1][i] == 0) {
                            uls[m].style.transition = '1s';
                            uls[m].style.transform = 'translate3d('+80*(arr[0][k])+'px,'+80*(arr[1][j])+'px,'+80*(arr[2][i])+'px)';
                        }
                        m++;
                    }
                }
            }
        },500);

        setTimeout(function(){
            var m = 0;
            for (i in arr[0]){
                for (j in arr[1]){
                    for (k in arr[2]){
                        if(arr[1][i] == -1) {
                            uls[m].style.transition = '1s';
                            uls[m].style.transform = 'translate3d('+80*(arr[0][k])+'px,'+80*(arr[1][j])+'px,'+80*(arr[2][i])+'px)';
                        }
                        m++;
                    }
                }
            }
        },1000);

        setTimeout(function(){
            setTransition0();
        },1500);

        // cube.className = 'cube set'; //只有表面才有颜色，内部为灰色
    }

    // 将每个方块的transition设置为0；
    function setTransition0(){
        for (var d = 0; d < uls.length; d++){
            uls[d].style.transition = '0s';
        }
    }
    /////////////////////////////////////////////////////////
};