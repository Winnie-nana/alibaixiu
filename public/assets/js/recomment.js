$.ajax({
    type:'get',
    url:'/posts/recommend',
    success:function(res){
        let recommendTpl = `
        {{each list}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
      </li>
      {{/each}}
        `
        let  html = template.render(recommendTpl,{list :res});
        // console.log(html);
        
        $('#recommentBox').html(html);
    }
})