/**
 * 职务添加
 * Created by land on 2017/9/20.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/configPostEdit.html", "bootstrap"], function ($, art, API, configPostEditTpl) {

    return function (num) {
        // 获取参数
        var parameterkey = "key_job";
        var organizationid=$.cookie("organizationid");
        var num = num;
        // 获取职位参数列表
        API.getParameterList(0, 1, parameterkey, function (res) {
            // 移除模态框
            $("#modalConfigPostEdit").remove();
            // 渲染模板
            var configPostEdit = art.render(configPostEditTpl, res.data.list[num])
            var $configPostEdit = $(configPostEdit);
            var list = res.data.list;
            // 提交表单
            $configPostEdit
                .on("submit", "form", function () {
                    var parameterkey = "key_job";
                    var thisTitle = $(".thisTitle").val();
                    var thisValue = $(".thisValue").val();
                    var thisRemark = $(".thisRemark").val();
                    // 找到对应的栏目赋值成修改内容
                    var parameters = '[';
                    for(var i=0;i<list.length;i++){
                        var title = list[i].title;
                        var value = list[i].value;
                        var remark = list[i].remark;
                        if(i==num){
                            title = thisTitle;
                            value = thisTitle;
                            remark = thisRemark;
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
                    // 编辑职位
                    API.addParameter(organizationid,parameterkey, parameters, description, function (res) {
                        $configPostEdit.modal("hide");
                        //成功的添加职位-->刷新职位管理页面
                        $("#btnPostManagement").trigger("click");
                    })
                    return false; //阻止同步提交表单
                });
            $configPostEdit.appendTo("body").modal();
        })
    }
})