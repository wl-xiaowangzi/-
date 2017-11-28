/**
 * 删除机构
 * Author:land
 *   Date:2017/11/26
 */
define(["jquery", "artTemplate", "text!tpls/configOrgDel.html", "common/api"], function ($, art, orgDelTpl, API) {
    return function (organizationids) {
            // 渲染模板
        var orgDel=art.render(orgDelTpl);
        var $orgDel=$(orgDel);
        var qcode="1";
        
        // 提交表单
        $orgDel
            .on("submit", "form", function () {
                // 获取表单参数 
                API.delOrganization(organizationids, function (res) {
                    $orgDel.modal("hide");
                    //成功的添加用户->刷新用户管理页面
                    $("#btnPeopleManager").trigger("click");
                })
                return false; //阻止同步提交表单
            });
        // 清除上一次的模板
        $("#modalConfigOrgDel").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $orgDel.appendTo("body").modal();
    };
});