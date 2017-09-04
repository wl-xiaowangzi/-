/**
 * 设备管理
 * Created by land 2017/9/4.
 */
define(["jquery","artTemplate","text!tpls/configDeviceManagement.html","./deviceEdit","./deviceDel"],function($,art,configDeviceManagementTpl,deviceEdit,deviceDel){

    return function(){

        // $.get("/api/course",function(res){

            //编译模板
            // var courseList=art.render(courseListTpl,res);

            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            // var $courseList=$(courseList);

            // test
            var $configDeviceManagement=$(configDeviceManagementTpl);

            //实现编辑设备
            $configDeviceManagement
            .on("click",".btn-device-edit",function(){
               deviceEdit();
            })
            .on("click",".btn-device-del",function(){
               deviceDel();
            })
            
            //把渲染好的元素放到页面中
            $(".module-container").append($configDeviceManagement);
        // })

        

    }
})