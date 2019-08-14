// 给添加 图片绑定change 事件
$('#logo').on('change',function(){
    // 获取到管理员选择到的图片
    let file = this.files[0];

    // 利用formData 实现文件二进制
    let formData = new FormData();

    // 将管理员选择到的文件添加到 formdata 对象中
    formData.append('logo',file);
    //发送ajax 请求 实现文件上传
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(res){
       // 将获得的数据保存在隐藏域中
            $('#site_logo').val(res[0].logo);
            // 将图片路径给到图片的src 实现图片预览功能
            $('#preview').attr('src',res[0].logo);
        }
    })
})

//注册保存设置点击事件
$('#addBtn').on('click',function(){
    //发送ajax 请求
    $.ajax({
        type:'post',
        url:'/settings',
        data:$('.form-horizontal').serialize(),
        success:function(res){
            // console.log(res);
            alert('网站设置成功')
        }
    })
});

// 显示网站设置
$.ajax({
    type:'get',
    url:'/settings',
    success:function(res){
        // console.log(res);
        // 将logo 的地址存放都隐藏域中
        $('#site_logo').val(res.logo);
        // 将logo显示在页面中
        $('#preview').attr('src',res.logo);
        // 将网站标题显示在页面中
        $('#site_name').val(res.title);
        //站点描述
        $('#site_description').val(res.description);
        //站点关键字
        $('#site_keywords').val(res.keywords);
        // 开启评论功能
        $('#comment_status').prop('checked',res.comment);
        // 开启人工审核
        $('#comment_reviewed').prop('checked',res.review);
        
        
    }
})
