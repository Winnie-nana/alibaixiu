

// 获取地址栏中的key的值
let key = getUrlParams('key');
// alert(key)
// 发送ajax 请求 
$.ajax({
    type:'get',
    url:'/posts/search/'+key,
    success:function(res){
      
         let html = template('searchTpl',{list:res});
         $('#newTpl').html(html);
    }
})