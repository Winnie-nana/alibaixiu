
let cArr = [];

// 发送ajax 请求 获取数据显示在页面
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
       cArr = res
        render(cArr)
    },

})
function render(cArr) {
    let str = template('CTpl', { list: cArr });
    $('tbody').html(str);
}

// 给添加分类按钮添加点击事件
$('.btn-primary').on('click',function(){
    // console.log($('#cForm').serialize());
   
    //发送ajax 请求
    $.ajax({
        url:'/categories',
        type:'post',
        data:$('#cForm').serialize(),
        success:function(res){
            // console.log(res);            
            cArr.push(res);
            render(cArr);
            $('#title').val('');
            $('#className').val('');
        }
    })
})

let cId;
// 给编辑按钮绑定点击事件
$('tbody').on('click','.edit',function(){
    // 获取父元素身上的id
    cId = $(this).parent().attr('data-id');
    // 获取编辑按钮的父元素tr
    let trObj = $(this).parents('tr');
    // console.log(trObj.children(2).eq(2).text());
    

    $('#cForm>h2').text('修改分类');
    $('#title').val(trObj.children(1).eq(1).text());
    $('#className').val(trObj.children(2).eq(2).text());
    $('.addBtn').hide();
    $('.editBtn').show();
  
})

// 给修改按钮添加点击事件
$('.editBtn').on('click',function(){
    // 通过 $('#cForm).serialize()方法 获取表单的提交数据
    // 发送ajax 请求
    $.ajax({
        url:'/categories/'+cId,
        type:'put',
        data:$('#cForm').serialize(),
        success:function(res){
            // console.log(res);  拿到的是修改之后的数据
            // 根据这条数据的id 获取这条数据在数组中的值
             let index = cArr.findIndex(item=>item._id==res._id)  
            // console.log(index);
            
             // 用新的内容将之前的内容替换
             cArr[index]=res;
             //重新渲染
             render();

        }
    })
})

// 给删除添加按钮
$('tbody').on('click','.del',function(){
    if(confirm('您确定要删除吗?')){
        let id = $(this).parents().attr('data-id');
        //发送ajax 请求
        $.ajax({
            url:'/categories/'+id,
            type:'delete',
            success:function(res){
               let index =  cArr.findIndex(item>=item._id==res._id);
               cArr.splice(index,1);
            }
        })
    }
})