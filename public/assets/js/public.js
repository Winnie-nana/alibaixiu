$.ajax({
    type:'get',
    url:'/posts/random',
    success:function(res){
        // console.log(res);
        let randomTpl = `
        {{each list}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
      {{/each}}
        `;
        let html = template.render(randomTpl,{list:res});
        // console.log(html);
        $('#randomBox').append(html);
    }
})

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

// 获取分类
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        // console.log(res);
        
        let  navTpl = `
        {{each list}}
        <li>
            <a href="list.html?cid={{$value._id}}">
                <i class="fa {{$value.className}}"></i>{{$value.title}}
            </a>
        </li>
        {{/each}}
        `;
        let html = template.render(navTpl,{list:res})
        $('.navBox').html(html);
    }
})

// 文章搜索功能
// 给表单搜索按钮绑定点击事件
$('.btn').on('click',function(){
    // 获取表单内容的值
    let keys = $(this).siblings('.keys').val();
    //  alert(keys)
    location.href='/search.html?key='+keys;
  
});

//展示最新评论
$.ajax({
    type:'get',
    url:'/comments/lasted',
    success:function(res){
        // console.log(res);
        let commentTpl = `
        {{each list}}
        <li>
        <a href="javascript:;">
          <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="">
          </div>
          <div class="txt">
            <p>
              <span>{{$value.author.nickName}}</span>{{$value.author.createTime.substr(0,10)}}说:
            </p>
            <p>{{$value.content}}</p>
          </div>
        </a>
      </li>
      {{/each}} `
        let html = template.render(commentTpl,{list:res});
        $('#commentBox').html(html)
    }
})
