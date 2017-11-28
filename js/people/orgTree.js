/**
 * 事由管理
 * Created by land 2017/9/4.
 */
define(["jquery", "artTemplate", "common/api", "./orgAdd","./orgEdit","./orgDel","text!tpls/configOrganizationalManagement.html", "mtree"], function ($, art, API,orgAdd ,orgEdit ,orgDel,configOrganizationalManagementTpl) {

    return function () {
        var organizationid = $.cookie("organizationid");
        API.queryTree(organizationid, function (res) {
            console.log(res)
            var configOrganizationalManagement = art.render(configOrganizationalManagementTpl,res.data[0]);
            var $configOrganizationalManagement = $(configOrganizationalManagement);
            $configOrganizationalManagement
            .on("click",".btn-add",function(){
                var parentorganizationid = $(this).parent().attr("organizationid");
                var principal = $(this).parent().attr("principal");
                orgAdd(parentorganizationid,principal)
            })
            .on("click",".btn-post-edit",function(){
                var parentorganizationid = $(this).parent().attr("parentorganizationid");
                var organizationid = $(this).parent().attr("organizationid");
                var principal = $(this).parent().attr("principal");
                var name = $(this).parent().attr("name");
                orgEdit(parentorganizationid,organizationid,principal,name)
            })
            .on("click",".btn-post-del",function(){
                var organizationids = $(this).parent().attr("organizationid");
                orgDel(organizationids)
            })
            $(".module-container").append($configOrganizationalManagement);
            $(".myline").on("mouseenter",function(){
                $(".right").addClass("displayN")
                $(this).find(".right").removeClass("displayN")
            });

        })
    }
})