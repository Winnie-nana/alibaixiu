
// 获取文章分类数据
$.ajax({
    url:'/categories',
    type:'get',
    success:function(res){
        let html = template('categoriesTpl',{list:res})
        $('#category').html(html);
    }
})

// 当管理员选择文件时,触发事件
$('#feature').on('change',function(){
    //创建formData 对象 实现二进制文件上传 ajax 本身不支持二进制文件的上传
    let formData = new FormData();
    //将上传的文件追加到formData 对象中
    formData.append('cover',this.files[0]);
    // console.log(formData);
 
    // 发送ajax 请求
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
        processData:false,
        contentType:false,
        success:function(res){
            // console.log(res);

            // 将地址放到src 中 实现图片预加载效果
            $('.thumbnail').attr('src',res[0].cover).show();
            $('#thumbnail').val(res[0].cover);
        }
    })
})

// 给提交表单注册点击事件
$('#pAdd').on('click',function(){
    // console.log($('#pForm').serialize());  
    //发送ajax 请求
    $.ajax({
        url:'/posts',
        type:'post',
        data:$('#pForm').serialize(),
        success:function(res){
            console.log(res);
            
            // 添加文章成功后跳转文章列表页面
			location.href = '/admin/posts.html'
        }
    })

})