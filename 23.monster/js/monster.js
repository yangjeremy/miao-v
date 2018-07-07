window.onload = function(){

    var screen = document.querySelector('.screen');
    var stateBox = document.querySelector('.state');
    var startBtn = document.querySelector('.btn-box');
    var btn = document.querySelector('.btn');
    var monster = document.querySelector('.monster');
    monster.isclick = true; //设置小怪兽可点击状态

    var gain = document.querySelector('.gain span');
    var lose = document.querySelector('.lose span');

    var monsterName = ['lily','mike','emi','james','johnny','loser'];
    var len = monsterName.length;

    //已得分，已失分
    var gainScore = 0;
    var loseScore = 0;

    //点击开始按钮
    startBtn.onclick = function(){
        //如果显示game over, 清除game over
        screen.className = 'screen';

        gainScore = 0;
        loseScore = 0;

        lose.innerHTML = loseScore;
        gain.innerHTML = gainScore;

        MTween(stateBox,-120,300,'left','linear');
        MTween(startBtn,-80,300,'bottom','linear',function(){
            //产生一个小怪兽
            generateM();

        });
    };

    //击中小怪兽
    monster.onclick = function(){
        if(!monster.isclick)return;
        monster.isclick = false;
        monster.className = 'monster loser';
        shake(monster,'left',30,5,function(){
            generateM();
            monster.isclick = true;
        });

        gain.innerHTML = (++gainScore) + '分';
    };

    //产生一个新的小怪兽
    function generateM(){

        //随机产生一个小怪兽和名字,不产生小怪兽loser
        var num = Math.floor(Math.random()*(len-1));
        monster.className = 'monster '+ monsterName[num];


        //获得小怪兽可以向左的偏移量范围 [0,screen总宽度-小怪兽宽度]
        var width = parseFloat(getCss(screen,'width')) - parseFloat(getCss(monster,'width'));

        //在这个偏移量范围产生一个随机数
        var leftPos = Math.floor(Math.random()*width);

        monster.style.top = '0px';
        monster.style.left = leftPos+'px';
        monster.style.display = 'block';

        MTween(monster,460,4000,'top','linear',function(){
            //小怪兽复位
            shake(screen,'top',30,5,function(){
                lose.innerHTML = (++loseScore) + '分';

                if(loseScore == 3){
                    //如果失去3分，停止游戏
                    stopGame();

                }else{

                    //产生新的小怪兽
                    generateM();
                }
            });

        });

    }


    //停止游戏
    function stopGame(){

        MTween(stateBox,120,300,'left','linear');
        MTween(startBtn,80,300,'bottom','linear',function(){

            screen.className = 'screen game-over';
            btn.value = '重新开始';

        });

    }

};