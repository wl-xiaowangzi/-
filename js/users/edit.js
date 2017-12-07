/**
 * 用户管理编辑
 * Created by land on 2017/9/1.
 */
define(["jquery","artTemplate","common/api","text!tpls/usersEdit.html","common/prompt","bootstrap"],function($,art,API,usersEditTpl,prompt){
    return function(user_id){
        // 查询数据
        API.queryUser(user_id,function(res){
            console.log(res)
            // 渲染数据
            var usersEdit=art.render(usersEditTpl,res.data[0]);
            var $usersEdit=$(usersEdit);
            // 提交表单    
            $usersEdit.on("submit","form",function(){
                //获取表单信息
                var user_id=$("#user_id").val();
                var name=$("#userEditName").val();
                var username=$("#admin").val();
                var password=$("#password-edit").val();
                var phonenumber=$("#ue-phonenumber").val();
                var faceimage=$("#ue-pic").attr("uefaceimage");
                var facedata=$("#ue-pic").attr("uefacedata");
                var roleid=$("#userEditName").attr("roleid");
                console.log(user_id,name,username,password,phonenumber,faceimage,facedata,roleid)
                API.editUser(user_id,name,username,password,phonenumber,faceimage,facedata,roleid,function(res){
                    if($("#password-edit").val()!=""){
                        var iptinfo = "密码重置成功"
                        prompt(iptinfo)
                    }
                    //成功的更新了分类信息
                    $usersEdit.modal("hide");//关闭模态框
                    $("#btnUsersManager").trigger("click");//刷新了分类列表模块
                })
                return false;//阻止表单的自动提交
            });
            //  移出模板
            $("#modalEditUsers").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $usersEdit.appendTo("body").modal();
        });
    }
})