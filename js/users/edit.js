/**
 * 用户管理编辑
 * Created by land on 2017/9/1.
 */
define(["jquery","artTemplate","common/api","text!tpls/usersEdit.html","bootstrap"],function($,art,API,usersEditTpl){
    
    return function(user_id){
        // var organizationid = $.cookie("organizationid");
        API.queryUser(user_id,function(res){
             
            $("#modalEditUsers").remove();

            var usersEdit=art.render(usersEditTpl,res.data[0]);
            var $usersEdit=$(usersEdit);
           
            $usersEdit.on("submit","form",function(){

                //获取表单信息
                var formData=$(this).serialize();
                
                API.editUser(formData,function(res){
                   
                    //成功的更新了分类信息
                    $usersEdit.modal("hide");//关闭模态框
                    $("#btnUsersManager").trigger("click");//刷新了分类列表模块

                })

                return false;//阻止表单的自动提交
            });
            
            
            $usersEdit.appendTo("body").modal();

        });
    }
})