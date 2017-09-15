/**
 * 用户列表
 * Created by land on 2017/9/1.
 */
define(["jquery", "artTemplate", "text!tpls/usersList.html","./edit","./del"], function ($, art, usersListTpl,editUsers,delUsers) {

    return function () {
        $.get("http://39.108.171.172:8081/facerecognition/system/user/query",{limit:12,start:0},function(res){
            console.log(res)
              //编译模板
             var usersList=art.render(usersListTpl,res);
            var $usersList = $(usersList);

            //实现添加分类功能--->给添加分类的按钮绑定单击事件
            $usersList
                .on("click", ".btn-del", function () {
                    //加载添加课程分类的模块
                    delUsers();

                })
                .on("click", ".btn-edit", function () {
                    //获取该行数据对应的分类id
                    // var cg_id=$(this).parent().attr("cg_id");

                    //加载编辑分类的模块
                    // editUsers(cg_id);
                    editUsers();
                })


            //把渲染好的元素放到页面中
            $(".module-container").append($usersList);
        },"jsonp")
    };
})