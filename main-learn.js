/**
 *
 * Created by WilbertCheng on 2017/6/8.
 */

require.config({
    baseUrl:"./js",
    paths:{
        jquery:"lib/jquery-2.1.4",
        cookie:"lib/jquery.cookie",
        text:"lib/text",
        artTemplate:"lib/template-web"
    }
})

//因为checkLogin依赖了cookie，所以cookie已经被加载
require(["jquery","artTemplate","text!../tpls/courseCategoryList.html","common/checkLogin"],function($,art,courseCategoryListTpl){


    //处理用户名和头像
    var tc_name=$.cookie("tc_name");

    var tc_avatar=$.cookie("tc_avatar");

    //$("#userImage").attr("src",tc_avatar);
    $("#userName").html(tc_name);


    //给退出这个按钮绑定事件实现退出登录的功能
    $("#btnLogout").on("click",function(){

        $.post("/api/logout",function(res){
            if(res.code==200){

                //清除cookie值
                $.removeCookie("tc_name");
                $.removeCookie("tc_avatar");

                //跳转到登录页
                location.href="login.html";


            }
        })



    });


    //实现点击不同功能菜单，出现不同功能的页面


    $("#btnTeacherManager").on("click",function(){
        //讲师管理
        $(".module-container").empty();

        $(".module-container").append("讲师管理");
    })

    $("#btnCourseManager").on("click",function(){
        //课程管理
        $(".module-container").empty();

        $(".module-container").append("课程管理");
    })

    $("#btnCourseCategoryManager").on("click",function(){
        //课程分类管理
        $(".module-container").empty();

        
    });

    $("#btnChartManager").on("click",function(){
        //图表统计
        $(".module-container").empty();

        $(".module-container").append("图表统计");
    });

    //希望一开始就渲染出讲师管理的功能？
    //  -->触发讲师管理的点击事件
    $("#btnTeacherManager").trigger("click");
    
    

    
    
    //==============artTemplate基本使用==============
    // var tpl=$("#t1").html();
    // var html=art.render(tpl,{
    //     numbers:[1,2,3,4,5,6,7,8,9,10]
    // });
    // console.log(html);
    //==============================================

})