// 用户页面显示用户的js
let userArr = [];
$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {


        userArr = res
        render()
    },

})
function render() {
    let str = template('userTpl', { list: userArr });
    $('tbody').html(str);
}

// 用户添加功能
$('#addBtn').on('click', function () {
    $.ajax({
        type: 'post',
        url: '/users',
        data: $('#userForm').serialize(),
        success: function (res) {
            userArr.push(res)
            // console.log(res);
            render()
        }
    })
})

// 当用户选择文件是 change 事件
$('#avatar').on('change', function () {
    ///用户选择到的文件
    // this.files[0]
    let formData = new FormData();
    formData.append('avatar', this.files[0]);

    //发送ajax 请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉ajax 不要解析请求参数
        processData: false,
        // 告诉ajax不要设置请求参数类型
        contentType: false,
        success: function (res) {
            // console.log(res[0].avatar);
            // 头像已经保存下来 实现图片预览功能,让图片显示在页面中
            $('#preview').attr('src', res[0].avatar);
            // 将图片地址保存在隐藏域中
            $('#hiddenAvatar').val(res[0].avatar);
        }
    })
})

let userId
// 编辑用户功能 因为每一个用户里的遍历功能都是跟着数据一起后来生成的 所以这里使用事件委托,将点击事件绑定在父元素tbody身上
$('tbody').on('click', '.edit', function () {

    userId = $(this).parents().attr('data-id')
    // 获取到编辑按钮的父元素 tr
    let trObj = $(this).parents('tr');

    // 修改用户 将form 中的h2 的text 内容改成 修改用户
    $('#userForm > h2').text('修改用户');

    //获取图片的地址
    let imgSrc = trObj.children(1).children('img').attr('src');
    //console.log(imgSrc);

    // 将图片地址写到隐藏域
    $('#hiddenAvatar').val(imgSrc);
    // 如果imgSrc 有值我们就将它写到左边的图片src 中
    if (imgSrc) {
        $('#preview').attr('src', imgSrc);
    } else {
        $('#preview').attr('src', "../assets/img/default.png");
    }

    // 将trObj 里面的邮箱以及昵称值取到放到左边的表单中
    $('#email').val(trObj.children().eq(2).text());
    $('#nickName').val(trObj.children().eq(3).text());

    let status = trObj.children().eq(4).text();

    if (status == '激活') {
        $('#jh').prop('checked', true);
    } else {
        $('#wjh').prop('checked', true);
    }

    let role = trObj.children().eq(5).text();
    // console.log(role);
    if (role == '超级管理员') {
        $('#admin').prop('checked', true);
    } else {
        $('#normal').prop('checked', true);
    }

    $('#addBtn').hide();
    $("#modifyBtn").show();
})

// 当我们点击这个按钮是我们就可以拿到绑定在父元素身上的id了

$('#modifyBtn').on('click', function () {
    console.log($('#userForm').serialize());
    // console.log($('#userForm').serialize()); 拿到左边form表单更改后的数据
    //发送ajax 请求
    $.ajax({
        type: 'put',
        url: '/users/' + userId,
        data: $('#userForm').serialize(),
        success: function (res) {
            console.log(res);
            //  根据我们更改的这数据的id 更新数组userArr 中的这条数据 的index 
            let index = userArr.findIndex(item => item._id == res._id);
            //    console.log(index);

            // 根据这个元素找到这条数据 然后在数组中将它更新
            userArr[index] = res;
            // console.log(userArr);

            //重新渲染页面 将更新过后的数组传进去
            render()
            // 修改完成之后,将左边表单内容清空
            $('#userForm > h2').text('添加用户');
            $('#preview').attr('src','../assets/img/default.png');
            $('#email').val('');
            $('#nickName').val('');
            $("#wjh").attr('checked',false);
            $("#jh").attr('checked',false);
            $("#admin").attr('checked',false);
            $("#normal").attr('checked',false);
            $('#addBtn').show();
            $("#modifyBtn").hide();
        }
    })
})

$('tbody').on('click', '.del', function () {
    // 获取父元素身上的id
    if (confirm('您确定要删除吗?')) {
        let id = $(this).parents().attr('data-id');

        //发送ajax 请求
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success:function(res){
               let index =  userArr.findIndex(item=>item._id==res._id);
                userArr.splice(index,1);
                render(userArr);
            }
        })
    }


})

// 点击全选反选
$('#checkAll').on('click',function(){
    let checkStatus = $(this).prop('checked')
    // console.log(checkStatus);
    $('tbody').find('input').prop('checked',checkStatus);
    if(checkStatus){
        $('.btn-sm').show();
    }else{
        $('.btn-sm').hide();
    }
});

// 根据下面的状态来决定全选按钮要不要选中

$('tbody').on('click','input',function(){

    let checkBtn = $('tbody').find('input');

    if(checkBtn.length==checkBtn.filter(':checked').length){
        $('#checkAll').prop('checked',true);
    }else{
        $('#checkAll').prop('checked',false);
    }

    // 如果下面的复选框的个数大于1 就让批量删除按钮显示
    if(checkBtn.filter(':checked').length>1){
        $('.btn-sm').show();
    }else{
        $('.btn-sm').hide();
    }
});

//给批量删除按钮注册点击事件
$('.btn-sm').on('click',function(){
    //定义一个空数组
    let ids = [];

    // 获取选中的元素的id 属性值
    let checkedUser = $('tbody input:checked');

    // 遍历checkedUser
    checkedUser.each(function(index,ele){
        let id = ele.parentNode.parentNode.children[6].getAttribute('data-id');

        ids.push(id);
    });
    //发送ajax请求
    $.ajax({
        type: 'delete',
        url: '/users/' + ids.join('-'),
        success:function(res){
            res.forEach(element => {
                let index =  userArr.findIndex(item=>item._id==element._id);
                userArr.splice(index,1);
                render(userArr);
            });
        
        }
    })
}) 