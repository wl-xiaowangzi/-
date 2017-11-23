/**
 * 访问授权
 * Created by land on 2017/11/22.
 */
define(["jquery", "artTemplate", "common/api","./groupAdd", "./groupEdit","./authorization","text!tpls/authorizationList.html","pager"], function ($, art, API,groupAdd,groupEdit,authorization, authorizationListTpl) {

    return function () {
        // 获取参数
        var page = $("#btnPager").attr("page")||1;
        var keyword = $("#btnSearchWords").attr("keyword");
        var start = 30*(page-1);
        var limit = 30;
        
        $("#btnPager").removeAttr("page");
        $("body").removeClass("noResult");
        // 调用接口
        API.getUsersList(start, limit, keyword, function (res) {
            //编译模板
            // var attendanceList = art.render(usersListTpl, res);
            var $authorizationList = $(authorizationListTpl);
            $authorizationList
            .on("click","#author-add",function(){
                groupAdd()
            })
            .on("click",".author-edit",function(){
                groupEdit()
            })
            .on("click","#author-employee",function(){
                authorization()
            })
            .on("click","#author-visitor",function(){
                authorization()
            })
            //把渲染好的元素放到页面中
            $(".module-container").empty();
            $(".module-container").append($authorizationList);
        })
    };
})