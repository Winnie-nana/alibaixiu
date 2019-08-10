 // 格式日期时间
 function dataFormat(data) {
    // 将日期时间字符串转换为时间对象
    data = new Date(data);
    return data.getFullYear() + '-' + (data.getMonth() + 1).toString().padStart(2,0) + '-' + data.getDate().toString().padStart(2,0);
  }

  // template.defaults.imports.dataFormat = dataFormat;
  // 发送ajax 请求 获取数据库的数据 渲染到页面
  $.ajax({
    url: '/posts',
    type: 'get',
    success: function (res) {
      // console.log(res);
      let html = template('postsTpl', res)
      $('tbody').html(html);
    }
  })