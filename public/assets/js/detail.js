let postid = getUrlParams('id');

// 评论是否经过人工审核
var review;
// 跳转详情页面
$.ajax({
    type:'get',
    url:'/posts/'+ postid,
    success:function(res){
        // console.log(res);
        let html = template('detailTpl',res);
        $('.article').append(html)
    }
})
// 文章点赞功能
$('.article').on('click','#like',function(){
    // 向服务器端发送ajax请求
    $.ajax({
        type:'post',
        url:'/posts/fabulous/'+postid,
        success:function(res){
           alert('点赞成功')          
        }
    })
})

// 判断管理员是否开启了评论功能
// 获取网站的配置信息
$.ajax({
	type: 'get',
	url: '/settings',
	success: function (response) {
		review = response.review
		// 判断管理员是否开启的评论功能
		if (response.comment) {
			// 管理员开启了评论功能 渲染评论模板
			var html = template('commentTpl');
			// 渲染评论模板
			$('#comment').html(html);
		}
	}
})

// 当评论表单发生提交行为的时候
$('#comment').on('click', '#addBtn', function () {
	// 获取用户输入的评论内容
	var content = $(this).siblings('textarea').val();
	// 代表评论的状态
	var state;
		
	if (review) {
		// 要经过人工审核
		state = 0;
	}else {
		// 不需要经过人工审核
		state = 1;
	}

	// 向服务器端发送请求 执行添加评论操作
	$.ajax({
		type: 'get',
		url: '/comments',
		data: {
			content: content,
			post: postid,
			state: state
		},
		success: function () {
			alert('评论成功')
			location.reload();
		},
		error: function () {
			alert('评论失败')
		}
	})

})
