
// 创建评论ajax
// $.ajax({
//     type:'post',
//     url:'/comments',
//     data:{
//         author:'5d4d4f4ae2822f23d8f3db91',
//         content:'nice',
//         post:'5d4eb19a8ab28e0fd4f4f042',
//     },
//     success:function(res){
//         // console.log(res);
//         // location.reload();
//     }
// })

// 获取评论列表 发送ajax
$.ajax({
    type:'get',
    url:'/comments',
    success:function(res){
        // console.log(res);
        let html = template('commentsTpl',res);
        $('tbody').html(html);
        var pageHTML = template('pageTpl', res);
		$('#pageBox').html(pageHTML)
    }
})

// 实现分页
function changePage (page) {
	$.ajax({
		type: 'get',
		url: '/comments',
		data: {
			page: page
		},
		success: function (response) {
			console.log(response)
			var html = template('commentsTpl', response);
			$('#commentsBox').html(html);
			var pageHTML = template('pageTpl', response);
			$('#pageBox').html(pageHTML)
		}
	})
}

// 审核按钮注册点击事件
$('tbody').on('click','.status',function(){
    // 获取当前评论的状态
    let state = $(this).attr('data-status');
    // 获取当前要修改的评论的id 
    let id = $(this).parents().attr('data-id');
    // 发送ajax 请求 
    $.ajax({
        type:'put',
        url:'/comments/' + id,
        data:{
            state:state == 0 ? 1 : 0,
        },
        success:function(res){
            // console.log(res);    
        }
    })
})
// 删除按钮注册点击事件

$('tbody').on('click','.delBtn',function(){
    // 获取 当前按钮的id 
    let id = $(this).parents().attr('data-id');
    if(confirm('您确定要进行删除操作?')){ 
    //发送ajax 请求
    $.ajax({
        type:'delete',
        url:'/comments/' + id,
        success:function(res){
            console.log(res);
            
        }
    })
}
})