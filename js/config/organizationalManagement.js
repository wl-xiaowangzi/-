/**
 * 事由管理
 * Created by land 2017/9/4.
 */
define(["jquery","artTemplate","text!tpls/configOrganizationalManagement.html"],function($,art,configOrganizationalManagementTpl){

    return function(){

        // $.get("/api/course",function(res){

            //编译模板
            // var courseList=art.render(courseListTpl,res);

            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            // var $courseList=$(courseList);

            // test
            var $configOrganizationalManagement=$(configOrganizationalManagementTpl);

            //实现编辑课时
            // $configViewLog
            // .on("click","#peopleVisitantList",function(){

            //    visitant();
            // })
            
            //把渲染好的元素放到页面中
            $(".module-container").append($configOrganizationalManagement);
        // })

        

    }
})