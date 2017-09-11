/**
 * 人员列表
 * Created by landon 2017/9/4.
 */
define(["jquery","artTemplate","text!tpls/peopleList.html","./baseinfo","./visitant","./add","./del"],function($,art,peopleListTpl,baseinfo,visitant,peopleAdd,peopleDel){

    return function(){

        // $.get("/api/course",function(res){

            //编译模板
            // var courseList=art.render(courseListTpl,res);

            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            // var $courseList=$(courseList);

            // test
            var $peopleList=$(peopleListTpl);

            //实现人员管理事件
            $peopleList
            .on("click","#peopleAdd",function(){
                peopleAdd();
            })
            .on("click",".btn-people-del",function(){
                peopleDel();
            })
            .on("click","#peopleVisitantList",function(){

               visitant();
            })
            .on("click",".btn-edit-course-baseinfo",function(){
                //编辑课程基本信息

                //1、获取课程id
                // var cs_id=$(this).parent().attr("cs_id");
                //2、将课程id放到课时管理按钮中
                // $("#btnCourseBaseInfo").attr("cs_id",cs_id);
                //3、跳转到编辑基本信息模块
                // $("#btnCourseBaseInfo").trigger("click");

                // test
                baseinfo()
            })
            // .on("click",".link-course-pic",function(){

            //     //实现编辑图片的功能

            //     //1、获取课程id
            //     var cs_id=$(this).parent().parent().attr("cs_id");
            //     //2、将课程id放到课时管理按钮中
            //     $("#btnCoursePic").attr("cs_id",cs_id);
            //     //3、跳转到课程图片编辑页面
            //     $("#btnCoursePic").trigger("click");

            // })

            //把渲染好的元素放到页面中
            $(".module-container").append($peopleList);
        // })

        

    }
})