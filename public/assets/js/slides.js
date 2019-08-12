
let sArr = [];
// 给图片上传的文件域绑定change 事件
$('#file').on('change', function () {
    // 获取到的是用户选择到的文件
    let file = this.files[0];
    // console.log(file);

    // 创建formdata 对象 实现二进制文件上传 
    let formData = new FormData();
    //将用户添加的文件 添加到formData 中
    formData.append('image', file);
    // 发送ajax 请求 实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            // console.log(res);
            $('#image').val(res[0].image)
            $('.thumbnail').show().attr('src', res[0].image)
        }
    })
})

// 提交表单注册事件slidesForm
$('#sildesBtn').on('click', function () {
    // let formData = $('#slidesForm').serialize();
    // console.log(formData);

    // 发送ajax 请求
    $.ajax({
        type: 'post',
        url: '/slides',
        data: $('#slidesForm').serialize(),
        success: function (res) {
            console.log(res);
            sArr = res;
            render(sArr)
        }
    })
});

function render(data) {
    let html = template('sildesTpl', { list: data });
    console.log(html);
    
    $('tbody').html(html)
}