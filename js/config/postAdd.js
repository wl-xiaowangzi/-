/**
 * 职务添加
 * Created by land on 2017/9/20.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/configPostAdd.html", "bootstrap"], function ($, art, API, configPostAddTpl) {

    return function () {

        $("#modalConfigPostAdd").remove();

        var $configPostAdd = $(configPostAddTpl);
        $configPostAdd
            .on("submit", "form", function () {
                var parameterkey = "key_job";
                var titles = $("input[name='itemtitle']");
                var values = $("input[name='itemvalue']");
                var remarks = $("input[name='itemremark']");

                var parameters = '[';
                titles.each(function (i) {
                    var title = titles[i].value;
                    //condType = condType.substring(condType.indexOf(":") + 1);
                    var value = values[i].value;
                    var remark = remarks[i].value;
                    console.log(title);
                    if (title != '' && value != '') {
                        parameters += "{'title' : '" + title + "','parameterkey':'" + parameterkey + "', 'value' : '" + value + "','remark' : '" + remark + "'},";
                    }
                });

                if (parameters != '[') {
                    parameters = parameters.substring(0, parameters.length - 1);
                }
                parameters += ']';
                
                var description = "wu";


                API.addParameter(parameterkey, parameters, description, function (res) {
                    console.log(res)
                    $configPostAdd.modal("hide");

                    //成功的添加职位-->刷新职位管理页面
                    $("#btnPostManagement").trigger("click");

                })

                return false; //阻止同步提交表单
            });

        $configPostAdd.appendTo("body").modal();

    }
})