/**
 * 职务添加
 * Created by land on 2017/9/20.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/configPostAdd.html", "bootstrap"], function ($, art, API, configPostAddTpl) {

    return function () {
        var parameterkey = "key_job";
        var organizationid = $.cookie("organizationid");
        API.getParameterList(0, 1, parameterkey, function (res) {
            
            $("#modalConfigPostAdd").remove();
            // var configPostAdd = art.render(configPostAddTpl, res.data)
            var $configPostAdd = $(configPostAddTpl);
            var list = res.data.list;
            
            $configPostAdd
                .on("submit", "form", function () {
                    var parameterkey = "key_job";
                    var addTitle = $(".addTitle").val();
                    var addValue = $(".addValue").val();
                    var addRemark = $(".addRemark").val();
                    var parameters = '[';
                    for (var i = -1; i < list.length; i++) {
                        if (i == -1) {
                            var title = addTitle;
                            var value = addTitle;
                            var remark = addRemark;
                        }else{
                            var title = list[i].title;
                            var value = list[i].value;
                            var remark = list[i].remark;
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

                    
                    API.addParameter(organizationid, parameterkey, parameters, description, function (res) {
                        
                        $configPostAdd.modal("hide");

                        //成功的添加职位-->刷新职位管理页面
                        $("#btnPostManagement").trigger("click");

                    })

                    return false; //阻止同步提交表单
                });

            $configPostAdd.appendTo("body").modal();

        })
    }
})