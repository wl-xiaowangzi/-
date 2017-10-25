/**
 * 职务添加
 * Created by land on 2017/9/20.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/configPostDel.html", "bootstrap"], function ($, art, API, configPostDelTpl) {
    return function (num) {
        // 获取参数
        var parameterkey = "key_job";
        var organizationid = $.cookie("organizationid");
        var num = num;
        // 获取职位参数列表
        API.getParameterList(0, 1, parameterkey, function (res) {
            // 渲染模板
            var $configPostDel = $(configPostDelTpl);
            var list = res.data.list;
            // 提交表单
            $configPostDel
                .on("submit", "form", function () {
                    var parameterkey = "key_job";
                    // 找到对应的栏目把值设为空
                    var parameters = '[';
                   for(var i=0;i<list.length;i++){
                        var title = list[i].title;
                        var value = list[i].value;
                        var remark = list[i].remark;
                        if(i==num){
                            title = "";
                            value = "";
                            remark = "";
                        }
                        if (title != '' && value != '') {
                            parameters += "{'title' : '" + title + "','parameterkey':'" + parameterkey + "', 'value' : '" + value + "','remark' : '" + remark + "'},";
                        }
                    }
                    if (parameters != '[') {
                        parameters = parameters.substring(0, parameters.length - 1);
                    }
                    parameters += ']';
                    var description = "职位管理";
                    // 删除职位
                    API.addParameter(organizationid, parameterkey, parameters, description, function (res) {
                        $configPostDel.modal("hide");
                        //成功的添加职位-->刷新职位管理页面
                        $("#btnPostManagement").trigger("click");
                    })
                    return false; //阻止同步提交表单
                });
            // 移除上一次模态框
            $("#modalConfigPostDel").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            $configPostDel.appendTo("body").modal();
        })
    }
})