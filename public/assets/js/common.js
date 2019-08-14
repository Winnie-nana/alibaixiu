// 退出登录信息
$('#logout').on('click',function(){
    let isConfirm= confirm('您确定要退出登录吗?');
    if(isConfirm){
      $.ajax({
        url:'/logout',
        type:'post',
        success:function(){
          console.log('退出成功');    
        },
        error:function(){
          console.log('退出失败');    
        }
      })
    }
})

//格式化日期函数
function dataFormat(date){
    // 将日期格式字符串转化日期对象
    date = new Date(date);
    return date.getFullYear()+ '-' +(date.getMonth()+1).toString().padStart(2,0)+ '-' + date.Date().toString().padStart(2,0)
}

// 发送ajax 请求 索要用户信息
$.ajax({
    type:'get',
    url:'/users/'+ userId,
    success:function(res){
        // console.log(res);
        $('.profile .avatar').attr('src',res.avatar);
        $('.name').text(res.nickName);
    }
})