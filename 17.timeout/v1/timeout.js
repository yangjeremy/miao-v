window.onload = function(){
  var imgBox = document.querySelector('.img-box');
  var imgs = document.querySelectorAll('img');
  var descs = document.querySelectorAll('.desc');
  var carousel = document.querySelector('.carousel');
  var len = imgs.length;

  console.log(imgs);

  // 初始化imgBox宽度
    imgBox.style.width = 960*imgs.length + 'px';


    var timer = 0;
    var num = 0;

    //执行一次，在setInterval之前执行
    setTimeout(function(){
        descs[0].style.bottom = 0;
    },1000);

    setTimeout(function(){
        descs[0].style.bottom = -50+'px';
    },2500);

    function autoplay(){
        setInterval(function(){
            num++;
            if(num >= imgs.length){
                num = 1;
                imgBox.style.transition = '0s';
                imgBox.style.marginLeft = '0px';
            }

            setTimeout(function(){
                imgBox.style.transition = '1s';
                imgBox.style.marginLeft = -960*num + 'px';
            },10);


            imgBox.style.transition = '1s';
            imgBox.style.marginLeft = -parseFloat(getCss(carousel,'width'))*num + 'px';


            setTimeout(function(){
                descs[num].style.bottom = 0;
            },1000);

            setTimeout(function(){
                descs[num].style.bottom = -50+'px';
            },2500);

console.log(num);

        },3000);
    }

    function getCss(obj, attr){
        return getComputedStyle(obj)[attr];
    }

    autoplay();
};