/**
 * 设备编辑
 * Created by land on 2017/9/4.
 */
define(["jquery","artTemplate","common/api","text!tpls/configDeviceEdit.html","bootstrap"],function($,art,API,configDeviceEditTpl){
    
    return function(dv_id){
        console.log(dv_id)
        var organizationid = $.cookie("organizationid");
        API.queryDevice(dv_id,organizationid,function(res){
             console.log(res)
            $("#modalConfigDeviceEdit").remove();

            var configDeviceEdit=art.render(configDeviceEditTpl,res.data[0]);
            var $configDeviceEdit=$(configDeviceEdit);
           
            $configDeviceEdit.on("submit","form",function(){

                //获取表单信息
                var formData=$(this).serialize();
                console.log(formData)
                API.editDevice(formData,function(res){
                   
                    //成功的更新了分类信息
                    $configDeviceEdit.modal("hide");//关闭模态框
                    $("#btnDeviceManagement").trigger("click");//刷新了分类列表模块

                })

                return false;//阻止表单的自动提交
            });
            
            
            $configDeviceEdit.appendTo("body").modal();

        });
    }
    
})