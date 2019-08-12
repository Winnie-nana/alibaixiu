// 格式日期时间
function dataFormat(data) {
  // 将日期时间字符串转换为时间对象
  data = new Date(data);
  return data.getFullYear() + '-' + (data.getMonth() + 1).toString().padStart(2, 0) + '-' + data.getDate().toString().padStart(2, 0);
}

// template.defaults.imports.dataFormat = dataFormat;
// 发送ajax 请求 获取数据库的数据 渲染到页面

// $.ajax({
//   url: '/posts',
//   type: 'get',
//   success: function (res) {
//     console.log(res);
//     let html = template('postsTpl', res);
//     $('tbody').html(html);
//     let page = template('pageTpl',res);
//     $('.pagination').html(page);
//   }
// })


let c;
let s;
// es6 新增函数的默认传参
function render(s = "all", c = "all", page = 1) {
  $.ajax({
    url: '/posts',
    type: 'get',
    data:
    {
      page: page,
      category: c,
      state: s
    },
    success: function (res) {
      window.currentPage = res.page;
      // console.log(res);
      let html = template('postsTpl', res);
      $('tbody').html(html);
      let page = template('pageTpl', res);
      $('.pagination').html(page);
    }
  })
}
render();

function pageChange(page) {
  render(s, c, page);
}

// 取出所有的分类
// 向服务器端发送请求 获取文章分类数据
$.ajax({
  url: '/categories',
  type: 'get',
  success: function (res) {
    // console.log(res);

    var html = template('categoryTpl', { data: res });
    $('#category').append(html);
  }
})

$('#searchBtn').on('click', function () {
  //获取当前id 的分类和状态
  c = $('#category').val();
  s = $('#state').val();
  // console.log(s, c);

  render(s, c);
})

// 删除文章点击事件
$('tbody').on('click', '.postsDel', function () {
  if (confirm('您真的要进行删除操作吗?')) {
    let id = $(this).attr('data-id');
    $.ajax({
      type: 'delete',
      url: '/posts/' + id,
      success: function (res) {
        // console.log(res);
        render(s, c, currentPage);
      }
    })
  }
})
