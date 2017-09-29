/**
 * 职务添加
 * Created by land on 2017/9/20.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/configPostAdd.html", "bootstrap"], function ($, art, API, configPostAddTpl) {

    return function () {
        var parameterkey = "key_job";
        var organizationid=$.cookie("organizationid");
        API.getParameterList(0, 1, parameterkey, function (res) {
            console.log(res)
            $("#modalConfigPostAdd").remove();
            var configPostAdd = art.render(configPostAddTpl, res.data)
            var $configPostAdd = $(configPostAdd);
            $configPostAdd
                .on("submit", "form", function () {
                    var parameterkey = "key_job";
                    var titles = $("input[name='itemtitle']");
                    // 这一版titles，values取值一样
                    var values = $("input[name='itemtitle']");
                    var remarks = $("input[name='itemremark']");
                    console.log(titles)
                    var parameters = '[';
                    titles.each(function (i) {
                        var title = titles[i].value;
                        var value = values[i].value;
                        var remark = remarks[i].value;
                        console.log(i)
                        console.log(title);
                        if (title != '' && value != '') {
                            parameters += "{'title' : '" + title + "','parameterkey':'" + parameterkey + "', 'value' : '" + value + "','remark' : '" + remark + "'},";
                        }
                    });

                    if (parameters != '[') {
                        parameters = parameters.substring(0, parameters.length - 1);
                    }
                    parameters += ']';

                    var description = "职位管理";

                    console.log(organizationid,parameterkey, parameters, description)
                    API.addParameter(organizationid,parameterkey, parameters, description, function (res) {
                        console.log(res)
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