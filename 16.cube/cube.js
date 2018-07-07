window.onload = function(){
    var container = document.querySelector('.container');
    var cube = document.querySelector('.cube');
    var indexs = [-1,0,1]; //定义每个方块的位置基数
    var uls = document.getElementsByTagName('ul');



    // 创建了1个方格，每个方格有6个面
    // 一个正方体朝着Y轴旋转
    for (var m = 0; m < 27; m++){
        var ul = document.createElement('ul');

        ul.style.transform = 'translate3d(0,0,0)';
        ul.style.transformOrigin = 'center center -40px';

        cube.appendChild(ul);

        for(var n = 0; n < 6; n++){
            var li = document.createElement('li');
            ul.appendChild(li);
        }
    }

    cube.className = 'cube individual';

    console.log(uls);

    // for (var i = 0; i < 27; i++) {
    //     uls[i].style.transform = 'translateX('+160*(indexs[i%indexs.length])+'px) translateY(0) translateZ(0)';
    //     uls[i].setAttribute('data-x',indexs[i%indexs.length]);
    // }

    // var num = 0;
    // for(var i = 0; i < indexs.length; i++){
    //     for(var j = 0; j < indexs.length; j++){
    //         for (var k = 0; k < indexs.length; k++){
    //             //创建27个方块(ul)，根据位置基数依次排列成 3*3*3的魔方
    //
    //             uls[num].style.transform = 'translateX('+100*indexs[j]+'px) translateY('+100*indexs[i]+'px) translateZ('+100*indexs[k]+'px)';
    //
    //             // 定义每个小方块的坐标(x,y,z)
    //             uls[num].setAttribute('data-x', indexs[j]);
    //             uls[num].setAttribute('data-y', indexs[i]);
    //             uls[num].setAttribute('data-z', indexs[k]);
    //             num++;
    //         }
    //     }
    // }

};