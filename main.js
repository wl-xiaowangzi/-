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
        artTemplate:"lib/template-web",
        bootstrap:"../assets/bootstrap/js/bootstrap",
        //配置模板文件夹的路径
        tpls:"../tpls",
        upload:"../assets/uploadify/jquery.uploadify",
        datetimepicker:"../assets/datetimepicker/js/bootstrap-datetimepicker",
        datetimepickerLang:"../assets/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN",
        //UE主文件
        UEditor:"../assets/UEditor/ueditor.all",
        //UE配置文件
        UEditorConf:"../assets/UEditor/ueditor.config",
        eCharts:"lib/echarts.min"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        },
        datetimepickerLang:{
            deps:["datetimepicker"]
        }
    }
})

//因为checkLogin依赖了cookie，所以cookie已经被加载
require(["jquery","artTemplate","courseCategory/list","course/list","courseTime/list","text!tpls/courseCreate.html","course/baseInfo","course/pic","teacher/list","common/personalCenter","chart/index","common/loading","common/checkLogin"],function($,art,courseCategoryList,courseList,courseTimeList,courseCreateTpl,courseBaseInfo,coursePic,teacherList,personalCenter,chartIndex){


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

    //个人中心
    $("#btnPersonalCenter").on("click",function(){
        personalCenter();
    })


    //实现点击不同功能菜单，出现不同功能的页面


    $("#btnTeacherManager").on("click",function(){
        //讲师管理
        $(".module-container").empty();

        teacherList();
        
    })

    $("#btnCourseManager").on("click",function(){
        //课程管理
        $(".module-container").empty();

        courseList();
    });

    //课程图片编辑
    $("#btnCoursePic").on("click",function(){

        $(".module-container").empty();
        
        coursePic($(this).attr("cs_id"));
    })

    $("#btnCourseTimeManager").on("click",function(){
        //课时管理
        $(".module-container").empty();

        courseTimeList();
    });

    $("#btnCreateCourse").on("click",function(){
        //创建课程

        $("#modalCreateCourse").remove();

        var $courseCreate=$(courseCreateTpl);

        $courseCreate.on("submit","form",function(){
            var formData=$(this).serialize();

            $.post("/api/course/create",formData,function(res){
                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }

                //成功的创建的课程-->跳转到课程列表
                $courseCreate.modal("hide");

                $("#btnCourseManager").trigger("click");
            })

            return false;
        })

        $courseCreate.appendTo("body").modal();

    });

    $("#btnCourseBaseInfo").on("click",function(){
        $(".module-container").empty();

        //编辑课程基本信息
        
        //获取课程id
        var cs_id=$(this).attr("cs_id");
        
        courseBaseInfo(cs_id);
    })


    $("#btnCourseCategoryManager").on("click",function(){
        //课程分类管理
        $(".module-container").empty();


        //加载分类管理模块
        courseCategoryList();
    });

    $("#btnChartManager").on("click",function(){
        //图表统计
        $(".module-container").empty();

        chartIndex();
        
    });

    //希望一开始就渲染出讲师管理的功能？
    //  -->触发讲师管理的点击事件
    $("#btnTeacherManager").trigger("click");
    
    

    // //artTemplate基本使用
    // var tpl=$("#t1").html();
    // var html=art.render(tpl,{
    //     numbers:[1,2,3,4,5,6,7,8,9,10]
    // });
    // console.log(html);

})