
init();

///////////////////函数////////////////////////////
function init(){
    //获取整个form
    window.form = document.querySelector('.form');

    //获取table
    window.table = document.querySelector('.table');

    //声明一个变量来保存已经向table里添加的行数
    window.num = 0;

    //声明一个变量来保存table中每一行checkbox选中的个数
    window.n = 0;

    //性别模拟框功能
    genderSelect(form);

    //获取添加按钮
    var addBtn = document.querySelector('.add');

    //添加按钮点击事件
    addBtn.onclick = function(){

        //如果通过验证，往table里添加信息
        if(validation(form)){
            //往table中添加一行form表单信息
            addInfo(form,table);
        }
    };

}

//性别模拟框功能
function genderSelect(form){
    //获取性别相关dom
    //性别label
    var genderLabel = form.querySelector('.gender-label');

    //性别模拟select框
    var genderSelect= form.querySelector('.gender-select');

    //性别模拟 options div
    var genderOptions = form.querySelector('.gender-options');

    // genderOptions.expend = false; //自定义属性 - 状态:是否展开
    // genderOptions.isClick = false; //自定义属性 - 开关: 是否点击

    //性别hidden,将用户选中的性别放入到hidden input的value中
    var genderHidden = form.querySelector('.gender-hidden');

    //性别具体的option值
    var options = genderOptions.querySelectorAll('span');

    //点击性别label和性别select框的事件
    genderLabel.onclick = genderSelect.onclick = function(){
        //防止用户多次点击
        if(genderOptions.isClick) return;
        genderOptions.isClick = true; //打开点击开关

        if(genderOptions.expend){ //如果options面板状态 - 展开
            genderFold();  //关闭options面板
        }else{//如果options面板状态 - 关闭
            genderExpend(); //展开options面板
        }
    };


    //展开性别options div
    function genderExpend(){
        MTween(genderOptions,30,200,'height','linear',function(){
            genderOptions.isClick = false; //关闭点击开关
        });
        genderOptions.expend = true; //设置状态 - 展开
    }

    //关闭性别option div
    function genderFold(){
        MTween(genderOptions,-30,200,'height','linear',function(){
            genderOptions.isClick = false; //关闭点击开关
        });
        genderOptions.expend = false; //设置状态 - 关闭
    }

    //点击每个性别option
    for(var i = 0; i < options.length; i++){
        options[i].onclick = function(){
            // 男, 女, 保密
            genderHidden.value = this.dataset.value; //将value值放到hidden的value中
            genderSelect.innerHTML = this.dataset.value; //在select框上显示选中的值
            genderFold(); //关闭option面板
        }
    }
}



//表单验证
function validation(form){
    var name = form.querySelector('#name').value;
    var age = form.querySelector('#age').value;
    var gender = form.querySelector('#gender').value;
    var nameError = form.querySelector('.name-error');
    var ageError = form.querySelector('.age-error');
    var genderError = form.querySelector('.gender-error');

    //重置error信息
    nameError.innerHTML = '';
    ageError.innerHTML = '';
    genderError.innerHTML = '';

    var pass = true;

    //姓名验证
    if(name.trim()===''){
        nameError.innerHTML = '姓名不能为空';
        pass = false;
    }

    //年龄验证
    if(age.trim()===''){
        ageError.innerHTML = '年龄不能为空';
        pass = false;
    }else if(!age.trim().match(/^\d{1,2}$/)){
        ageError.innerHTML = '年龄必须是1-2位数字';
        pass = false;
    }

    //性别验证
    if(gender.trim()===''){
        genderError.innerHTML = '性别不能为空';
        pass = false;
    }

    return pass;
}


//添加信息
function addInfo(form,table){
    var tbody = table.tBodies[0];
    var checkAll = table.querySelector('.all');

    var name = form.querySelector('#name');
    var age = form.querySelector('#age');
    var gender = form.querySelector('#gender');
    var genderSelect = form.querySelector('.gender-select');

    //创建新的一行添加到table的body中
    tbody.insertRow(num);

    //如果全选选中，取消选中
    if(checkAll.ischecked){
        checkAll.ischecked = false;
        checkAll.classList.remove('checked');
    }

    //创建第0个单元格放checkbox
    tbody.rows[num].insertCell(0);

    var span = document.createElement('span');
    span.className = 'checkbox';

    //给span添加点击事件
    span.onclick = function(){
        if(this.ischecked){ //取消选择
            this.ischecked = false;
            this.classList.remove('checked');
            n--;
        }else{//选择
            this.ischecked = true;
            this.classList.add('checked');
            n++;
        }

        if(n === tbody.rows.length){
            checkAll.ischecked = true;
            checkAll.classList.add('checked');
        }else{
            checkAll.ischecked = false;
            checkAll.classList.remove('checked');
        }
    };

    tbody.rows[num].cells[0].appendChild(span);

    //创建第1个单元格放ID
    tbody.rows[num].insertCell(1);
    tbody.rows[num].cells[1].innerHTML = num+1;

    //创建第2个单元格放name
    tbody.rows[num].insertCell(2);
    tbody.rows[num].cells[2].innerHTML = name.value;

    //创建第3个单元格放age
    tbody.rows[num].insertCell(3);
    tbody.rows[num].cells[3].innerHTML = age.value;

    //创建第4个单元格放gender
    tbody.rows[num].insertCell(4);
    tbody.rows[num].cells[4].innerHTML = gender.value;


    //创建操作fragment
    var fragment = document.createDocumentFragment();

    //创建上移按钮
    var up = document.createElement('input');
    up.type='button';
    up.value='^';

    //创建下移按钮
    var down = document.createElement('input');
    down.type='button';
    down.value='v';

    //创建删除按钮
    var del = document.createElement('input');
    del.type='button';
    del.value='x';

    //将上移，下移，删除按钮 append到fragment里
    fragment.appendChild(up);
    fragment.appendChild(down);
    fragment.appendChild(del);

    //创建第5个单元格放操作按钮
    tbody.rows[num].insertCell(5);
    tbody.rows[num].cells[5].className = 'operation';
    tbody.rows[num].cells[5].appendChild(fragment);


    //添加新的一行后重置form中输入框内容
    name.value = '';
    age.value = '';
    gender.value = '';
    genderSelect.innerHTML = '';

    //每一行的上移下移删除功能
    addOperation(tbody.rows[num]);

    //全选,选中功能
    addSelectEvent(table);

    //行数+1
    num++;
}


//每一行的 上移 下移 删除 操作
function addOperation(row){
    var tbody = table.tBodies[0];
    var up = row.querySelector('input[value="^"]');
    var down = row.querySelector('input[value="v"]');
    var del = row.querySelector('input[value="x"]');

    //上移
    up.onclick = function(){
        if(tbody.rows.length === 1) return; //如果只有一个tr,那么不用移动
        var thisTr = this.parentNode.parentNode; //拿到当前tr
        var previousSiblingTr = thisTr.previousElementSibling; //拿到下一个tr

        tbody.insertBefore(thisTr,previousSiblingTr);
        //将每一行id重新排序
        reOrder(tbody);
    };

    //下移
    down.onclick = function(){
        if(tbody.rows.length === 1) return; //如果只有一个tr,那么不用移动
        var thisTr = this.parentNode.parentNode; //拿到当前tr
        var nextSiblingTr = thisTr.nextElementSibling; //拿到下一个tr
        if(nextSiblingTr){
            tbody.insertBefore(nextSiblingTr,thisTr);
        }else{
            tbody.insertBefore(thisTr,tbody.firstElementChild);
        }
        //将每一行id重新排序
        reOrder(tbody);
    };

    //删除
    del.onclick = function(){
        var thisTr = this.parentNode.parentNode; //拿到当前tr
        tbody.removeChild(thisTr); //删除当前行

        num--; //行数-1

        //如果删除的当前行是选中状态，那么n-1
        if(thisTr.cells[0].ischecked){
            n--;
        }

        var checkAll = table.querySelector('.all'); //拿到全选框

        //如果n和row的行数相等，证明所有行的checkbox都选中了，那么全选
        if(n==tbody.rows.length){
            checkAll.ischecked = true;
            checkAll.classList.add('checked');
        }

        if(tbody.rows.length==0&&checkAll.ischecked){
            checkAll.ischecked = false;
            checkAll.classList.remove('checked');
        }
        //将每一行id重新排序
        reOrder(tbody);
    }

}

//每一行id序号重新排一下
function reOrder(tbody){
    var n = 0;
    var rows = tbody.rows;
    for(var i = 0; i < rows.length; i++){
        rows[i].cells[1].innerHTML = i + 1;
    }
}

// table的checkbox全选功能
function addSelectEvent(table){
    var tbody = table.tBodies[0];
    var checkAll = table.querySelector('.all');
    var rows = table.tBodies[0].rows;

    checkAll.ischecked = false;
    var checkboxs = tbody.querySelectorAll('.checkbox');

    checkAll.onclick = function(){
        if(checkAll.ischecked){ //取消全选
            checkAll.ischecked = false;
            checkAll.classList.remove('checked');
            for(var i = 0; i < checkboxs.length; i++){
                checkboxs[i].ischecked = false;
                checkboxs[i].classList.remove('checked');
                n = 0;
            }

        }else{//全选
            checkAll.ischecked = true;
            checkAll.classList.add('checked');
            for(var i = 0; i < rows.length; i++){
                checkboxs[i].ischecked = true;
                checkboxs[i].classList.add('checked');
                n = rows.length;
            }
        }
    };
}
