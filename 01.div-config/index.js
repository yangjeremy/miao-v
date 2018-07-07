/**
 * Created by ewan on 7/15/17.
 */
window.onload = function (){
    var box = document.getElementById("box");
    var congigBtn = document.getElementById("config-btn");
    var mask = document.getElementById("mask");
    var red = document.getElementById("red");
    var yellow = document.getElementById("yellow");
    var blue = document.getElementById("blue");
    var w200 = document.getElementById("w200");
    var w300 = document.getElementById("w300");
    var w400 = document.getElementById("w400");
    var h200 = document.getElementById("h200");
    var h300 = document.getElementById("h300");
    var h400 = document.getElementById("h400");
    var reset = document.getElementById("reset");
    var ok = document.getElementById("ok");

    congigBtn.onclick = function () {
        mask.style.display = "flex";
    };

    red.onclick = function () {
        box.style.background = "#ff6705";
    };

    yellow.onclick = function () {
        box.style.background = "#ffc300";
    };

    blue.onclick = function () {
        box.style.background = "#00a1d6";
    };

    w200.onclick = function () {
        box.style.width = "200px";
    };

    w300.onclick = function () {
        box.style.width = "300px";
    };

    w400.onclick = function () {
        box.style.width = "400px";
    };

    h200.onclick = function () {
        box.style.height = "200px";
    };

    h300.onclick = function () {
        box.style.height = "300px";
    };

    h400.onclick = function () {
        box.style.height = "400px";
    };

    reset.onclick = function(){
        box.style = "";
    };

    ok.onclick = function () {
        mask.style.display = "none";
    };
};