
// 获取文章分类数据
$.ajax({
    url: '/categories',
    type: 'get',
    success: function (res) {
        let html = template('categoriesTpl', { list: res })
        $('#category').html(html);
    }
})

// 当管理员选择文件时,触发事件
$('#feature').on('change', function () {
    //创建formData 对象 实现二进制文件上传 ajax 本身不支持二进制文件的上传
    let formData = new FormData();
    //将上传的文件追加到formData 对象中
    formData.append('cover', this.files[0]);
    // console.log(formData);

    // 发送ajax 请求
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            // console.log(res);

            // 将地址放到src 中 实现图片预加载效果
            $('.thumbnail').attr('src', res[0].cover).show();
            $('#thumbnail').val(res[0].cover);
        }
    })
})

// 给提交表单注册点击事件
$('#pAdd').on('click', function () {
    // console.log($('#pForm').serialize());  
    //发送ajax 请求
    $.ajax({
        url: '/posts',
        type: 'post',
        data: $('#pForm').serialize(),
        success: function (res) {
            console.log(res);

            // 添加文章成功后跳转文章列表页面
            location.href = '/admin/posts.html'
        }
    })

})

// 获取浏览器地址栏中的id参数
let id = getUrlParams("id");

// 当点击修改文章按钮时 页面会发生跳转 并传递id值过来  我们判断这个id 值存不存在 因为我们是要在一个页面做两个操作 如果有id 那么我们就操作修改文章的ajax 请求
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (res) {
            // console.log(res);

            // 将修改按钮显示 将添加按钮隐藏
            $('#modifyAdd').show();
            $('#pAdd').hide();
            $('#title').val(res.title);
            $('#content').val(res.content);
            $('#created').val(res.createAt && res.createAt.substr(0, 16));
            let coption = $('#category>option');
            // console.log(coption);
            coption.each(function (index, item) {
                // console.log(item);
                // 这里的item 拿到的是dom元素
                if ($(item).val() == res.category) {
                    $(item).prop('selected', true);
                }
            })
            let soption = $('#status>option');
            // console.log(coption);
            soption.each(function (index, item) {
                // console.log(item);
                // 这里的item 拿到的是dom元素
                if ($(item).val() == res.state) {
                    $(item).prop('selected', true);
                }
            })

            $('#thumbnail').val(res.thumbnail);
            $('.thumbnail').show().attr('src', res.thumbnail);

        }
    })
}

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    // 将地址栏中传递过来的数组从?后面截取 并且以&符分割  得到的是一个数组
    let paramsAry = location.search.substr(1).split('&');
    // console.log(paramsAry);

    // 循环这个数组
    for (var i = 0; i < paramsAry.length; i++) {
        let temp = paramsAry[i].split('=');
        if (temp[0] == name) {
            return temp[1];
        }
    }
    return -1;
}

// 当用户点击提交修改按钮
$('#modifyAdd').on('click', function () {
    // alert('1111')
    // 获取表单内容
    let formData = $('#pForm').serialize();
    // console.log(formData);
    // return;
    //发送请求
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function (res) {
            location.href = '/admin/posts.html';
        }
    })
})