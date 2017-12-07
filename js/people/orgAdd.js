/**
 * 添加机构
 * Author:land
 *   Date:2017/11/26
 */
define(["jquery", "artTemplate", "text!tpls/configOrgAdd.html", "common/api"], function ($, art, orgAddTpl, API) {
    return function (parentorganizationid,principal) {
        var parentorganizationid = parentorganizationid;
        var principal=principal;
        API.getOrganizationId(parentorganizationid,function(res){
            console.log(res.data)
            // 渲染模板
        var orgAdd=art.render(orgAddTpl);
        var $orgAdd=$(orgAdd);
        var organizationid = res.data;
        var qcode="1";
        
        // 提交表单
        $orgAdd
            .on("submit", "form", function () {
                // 获取表单参数 
                var name = $("#org-add").val();
                // 接口
                console.log(organizationid,name,parentorganizationid,principal,qcode)
                API.addOrganization(organizationid,name,parentorganizationid,principal,qcode, function (res) {
                    $orgAdd.modal("hide");
                    //成功的添加组织机构->刷新组织机构管理页面
                    $("#btnOrgTree").trigger("click");
                })
                return false; //阻止同步提交表单
            });
        // 清除上一次的模板
        $("#modalConfigOrgAdd").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $orgAdd.appendTo("body").modal();
        })
        
    };
});