// 获取文章的数量
$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(res){
        // console.log(res);
       $('#posts').html('<strong>'+res.postCount+'</strong>篇文章（<strong>'+res.draftCount+'</strong>篇草稿）') 
        
    }
})
// 获取分类数量
$.ajax({
    type:'get',
    url:'/categories/count',
    success:function(res){
        $('#category').html('<strong>'+res.categoryCount+'</strong>个分类')
    }
})
// 评论数量获取
$.ajax({
    type:'get',
    url:'/comments/count',
    success:function(res){
        $('#comments').html('<strong>'+res.commentCount+'</strong>条评论')
    }
})

// 