
    //获取到canvas画布
    var canvas = document.querySelector('#canvas');

    //创建2d绘图环境
    var gc = canvas.getContext('2d');

    var data = map(12,12);

    render(data,gc);

    var arr = mold();
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[i].length; j++){
            data[i][j] = arr[i][j];
        }
    }

    console.log(data);
    render(data,gc);

    function map(r,c){

        //数组中的0代表着地图上的方块
        //数组中的1代表着移动的方块

        // [0,0,0,0,......], r代表多少行，c代表多少列
        // [0,0,0,0,......],
        // [0,0,0,0,......]
        // ....
        // [0,0,0,0,......]


        var data = [];

        for(var i = 0; i < r; i++){
            data.push([]);

            for(var j = 0; j < c; j++){
                data[i].push(0);
            }
        }

        //绘制画布大小
        canvas.width = c*40+10;
        canvas.height = r*40+10;

        return data;

    }

    function render(data,gc){
        var rLen = data.length;
        var cLen = data[0].length;

        for(var i = 0; i < rLen; i++){
            for (var j = 0; j < cLen ; j++){
                //根据data值填充颜色
                gc.fillStyle=data[i][j]==0?'#ea1680':'yellow';
                //根据坐标x,y 和 长度宽度绘图
                gc.fillRect(i*40+10,j*40+10,30,30);
            }
        }
    }

    function mold(){
        var num = Math.floor(Math.random()*7);
        var arr = [
                    [1,1,1,1], //s
                    [[0,1,0],[1,1,1]], //t
                    [[1,1,0],[0,1,1]], //z
                    [[0,1,1],[1,1,0]], //z1
                    [[1,0,0],[1,1,1]], //l
                    [[0,0,1],[1,1,1]], //l1
                    [[1,1],[1,1]] //b
                ];

        console.log(arr[num]);

        return arr[num];
    }