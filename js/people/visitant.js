/**
 * 课程列表
 * Created by land on 2017/9/2.
 */
define(["jquery","artTemplate","text!tpls/peopleVisitantList.html","./visitantinfo","./visitantAdd"],function($,art,peopleVisitantListTpl,visitantinfo,visitantAdd){

    return function(){

        // $.get("/api/course",function(res){

            //编译模板
            // var courseList=art.render(courseListTpl,res);

            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            // var $courseList=$(courseList);
            $(".module-container").empty();
            // test
            var $peopleVisitantList=$(peopleVisitantListTpl);

            //编辑入库信息
            $peopleVisitantList
            .on("click",".btn-peopleList",function(){
                $("#btnPeopleManager").trigger("click");
            })
            .on("click",".btn-edit-visitant-baseinfo",function(){
                
                visitantinfo();
            })
            .on("click","#visitantAdd",function(){
                visitantAdd();
            })
            //把渲染好的元素放到页面中
            $(".module-container").append($peopleVisitantList);
        // })



    }
})