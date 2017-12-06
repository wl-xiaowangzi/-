/**
 * 访问授权
 * Created by land on 2017/11/22.
 */
define(["jquery", "artTemplate", "common/api","./groupAdd", "./groupEdit","./groupDel","./authorization","text!tpls/authorizationList.html","pager"], function ($, art, API,groupAdd,groupEdit,groupDel,authorization, authorizationListTpl) {

    return function () {
        // 获取参数
        var page = $("#btnPager").attr("page")||1;
        var keyword = $("#btnSearchWords").attr("keyword");
        var start = 30*(page-1);
        var limit = 30;
        var status = 1;
        
        $("#btnPager").removeAttr("page");
        $("body").removeClass("noResult");
        // 调用接口
        API.getAuthorizationgroupList(start, limit, keyword, status,function (res) {
            //编译模板
            console.log(res)
            var authorizationList = art.render(authorizationListTpl, res);
            var $authorizationList = $(authorizationList);
            $authorizationList
            .on("click","#author-add",function(){
                groupAdd()
            })
            .on("click",".author-edit",function(){
                var datanumber=$(this).parent().attr("datanumber");
                groupEdit(datanumber);
            })
            .on("click",".author-del",function(){
                var datanumbers=$(this).parent().attr("datanumber");
                groupDel(datanumbers);
            })
            .on("click",".author-default",function(){
                var datanumber = $(this).parent().attr("datanumber");
                API.setAuthorizationgroupDefault(datanumber,function(res){
                    $("#btnAuthorization").trigger("click");
                })
            })
            .on("click","#author-employee",function(){
                var content="type=employee";
                authorization(content);
            })
            .on("click","#author-visitor",function(){
                var content="type=visitor";
                authorization(content)
            })
            //把渲染好的元素放到页面中
            $(".module-container").empty();
            $(".module-container").append($authorizationList);
        })
    };
})