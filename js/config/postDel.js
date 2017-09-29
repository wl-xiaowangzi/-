/**
 * 职务添加
 * Created by land on 2017/9/20.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/configPostDel.html", "bootstrap"], function ($, art, API, configPostDelTpl) {

    return function (num) {
        var parameterkey = "key_job";
        var organizationid = $.cookie("organizationid");
        var num = num;
        API.getParameterList(0, 1, parameterkey, function (res) {
            console.log(res)
            $("#modalConfigPostDel").remove();
            var $configPostDel = $(configPostDelTpl);
            var list = res.data.list;

            $configPostDel
                .on("submit", "form", function () {
                    var parameterkey = "key_job";
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

                    console.log(organizationid, parameterkey, parameters, description)
                    API.addParameter(organizationid, parameterkey, parameters, description, function (res) {
                        console.log(res)
                        $configPostDel.modal("hide");

                        //成功的添加职位-->刷新职位管理页面
                        $("#btnPostManagement").trigger("click");

                    })

                    return false; //阻止同步提交表单
                });

            $configPostDel.appendTo("body").modal();

        })
    }
})