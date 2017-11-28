/**
 * 添加机构
 * Author:land
 *   Date:2017/11/26
 */
define(["jquery", "artTemplate", "text!tpls/configOrgEdit.html", "common/api"], function ($, art, orgEditTpl, API) {
    return function (parentorganizationid,organizationid,principal,name) {
        var parentorganizationid = parentorganizationid;
        var organizationid = organizationid;
        var principal=principal;
            // 渲染模板
            // 查询当前机构
        var orgEdit=art.render(orgEditTpl);
        var $orgEdit=$(orgEdit);
        var qcode="1";
        
        // 提交表单
        $orgEdit
            .on("submit", "form", function () {
                // 获取表单参数 
                var name = $("#org-edit").val();
                // 接口
                console.log(organizationid,name,parentorganizationid,principal,qcode)
                API.editOrganization(organizationid,name,parentorganizationid,principal,qcode, function (res) {
                    $orgEdit.modal("hide");
                    //成功的添加用户->刷新用户管理页面
                    $("#btnPeopleManager").trigger("click");
                })
                return false; //阻止同步提交表单
            });
        // 清除上一次的模板
        $("#modalConfigOrgEdit").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $orgEdit.appendTo("body").modal();
        $("#org-edit").val(name);
    };
});