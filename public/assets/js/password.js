$('#editPassword').on('click',function(){
    let formData = $('.form-horizontal').serialize();
    if($('#newPass').val()==$('#confirPass').val()){
        //发送ajax
        $.ajax({
            url:'/users/password',
            type:'put',
            data:formData,
            success:function(){
                location.href='/admin/login.html'
            }
        })
    }
})