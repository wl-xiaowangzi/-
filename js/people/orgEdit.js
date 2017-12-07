/**
 * 添加机构
 * Author:land
 *   Date:2017/11/26
 */
define(["jquery", "artTemplate", "text!tpls/configOrgEdit.html", "common/api","text!tpls/peopleSubAuthority.html"], function ($, art, orgEditTpl, API,peopleSubAuthorityTpl) {
    return function (parentorganizationid,organizationid,principal,name) {
        var parentorganizationid = parentorganizationid;
        var organizationid = organizationid;
        var principal=principal;
        var keyword;
            // 渲染模板
            // 查询当前机构
        var orgEdit=art.render(orgEditTpl);
        var $orgEdit=$(orgEdit);
        var qcode="1";
        //  授权组选项
            API.queryAuthorizationgroupList(0, 100, keyword,1, function (res) {
                var peopleSubAuthority = art.render(peopleSubAuthorityTpl,res);
                 var $peopleSubAuthority = $(peopleSubAuthority);
                 $("#org-authorization").append($peopleSubAuthority);
                //  $("#"+auID).prop("selected","selected");
            })
        // 提交表单
        $orgEdit
            .on("submit", "form", function () {
                // 获取表单参数 
                var name = $("#org-edit").val();
                var authorizationgroupid = $("#org-authorization").val();
                // 接口
                console.log(organizationid,name,parentorganizationid,principal,qcode,authorizationgroupid)
                API.editOrganization(organizationid,name,parentorganizationid,principal,qcode,authorizationgroupid, function (res) {
                    $orgEdit.modal("hide");
                    //成功的修改组织机构->刷新组织机构管理页面
                    $("#btnOrgTree").trigger("click");
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