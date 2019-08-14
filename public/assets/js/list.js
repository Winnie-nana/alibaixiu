let listId = getUrlParams('cid');

$.ajax({
    type:'get',
    url:'/posts/category/'+listId,
    success:function(res){
        // console.log(res);
        let html = template('listTpl',{list:res});
        $('#newTpl').html(html);
    }
})