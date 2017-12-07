/**
 * 添加访客
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/usersAuthority.html", "common/api"], function ($, art, usersAuthorityTpl, API) {
    return function (name,username,password,phonenumber,faceimage,facedata) {
        var username=username;
        var password=password;
        var name=name;
        var phonenumber=phonenumber;
        var faceimage=faceimage;
        var facedata=facedata;
        var keyword=keyword;
        API.queryRole(0,100,keyword,function(res){
            console.log(res)
        // 渲染模板
        var usersAuthority=art.render(usersAuthorityTpl,res);
        var $usersAuthority=$(usersAuthority);
        // 提交表单
        $usersAuthority
            .on("click", ".users-add", function () {
                // 获取表单参数 
                var roleid=$("#users-authority").val();
                // 接口
                API.addUser(name,username,password,phonenumber,faceimage,facedata,roleid, function (res) {
                    $usersAuthority.modal("hide");
                    //成功的添加用户->刷新用户管理页面
                    $("#btnUsersManager").trigger("click");
                })
                return false; //阻止同步提交表单
            });
        // 清除上一次的模板
        $("#modalUsersAuthority").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $usersAuthority.appendTo("body").modal();
        })
       
    };
});