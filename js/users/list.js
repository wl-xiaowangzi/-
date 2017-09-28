/**
 * 用户列表
 * Created by land on 2017/9/1.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/usersList.html", "./edit", "./del", "./add","pager"], function ($, art, API, usersListTpl, editUsers, delUsers, addUsers) {

    return function () {
        var page = $("#btnPager").attr("page")||1;
        $("#btnPager").removeAttr("page");
        var start = 30*(page-1);
        var limit = 30*(page);
        var keyword = $("#btnSearchWords").attr("keyword");
        $("#btnSearchWords").removeAttr("keyword");
    
        API.getUsersList(start, limit, keyword, function (res) {
            console.log(res)
            //编译模板
            var usersList = art.render(usersListTpl, res);
            var $usersList = $(usersList);

            //实现添加分类功能--->给添加分类的按钮绑定单击事件
            $usersList
                .on("click", "#btnUserAdd", function () {
                    // 获取该系统组织id
                    var organizationid = $.cookie("organizationid");
                    // 加载添加用户模块
                    addUsers(organizationid)
                })
                .on("click", ".btn-del", function () {
                    //获取该行数据对应的分类id
                    var user_id = $(this).parent().attr("user_id");
                    //加载删除账号的模块
                    delUsers(user_id);

                })
                .on("click", ".btn-edit", function () {
                    //获取该行数据对应的分类id
                    var user_id = $(this).parent().attr("user_id");
                    //加载编辑账号的模块
                    editUsers(user_id);
                })
                .on("click",".btn-search",function(){
                    var keyword = $(".search-word").val();
                    $("#btnSearchWords").attr("keyword",keyword);
                    $("#btnUsersManager").trigger("click");//刷新
                })
            //把渲染好的元素放到页面中
            $(".module-container").append($usersList);

            var num = Math.ceil(res.sumsize/30);
            
            Page({
                num: num, //页码数
                startnum: page||1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page",n);
                    $("#btnUsersManager").trigger("click");//刷新
                }
            });
        })

    };
})