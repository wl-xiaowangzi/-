/**
 * 职务添加
 * Created by land on 2017/9/20.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/configPostEdit.html", "bootstrap"], function ($, art, API, configPostEditTpl) {

    return function (num) {
        var parameterkey = "key_job";
        var organizationid=$.cookie("organizationid");
        var num = num;
        API.getParameterList(0, 1, parameterkey, function (res) {
            console.log(res)
            $("#modalConfigPostEdit").remove();
            var configPostEdit = art.render(configPostEditTpl, res.data.list[num])
            var $configPostEdit = $(configPostEdit);
            var list = res.data.list;
            
            $configPostEdit
                .on("submit", "form", function () {
                    var parameterkey = "key_job";
                    var thisTitle = $(".thisTitle").val();
                    var thisValue = $(".thisValue").val();
                    var thisRemark = $(".thisRemark").val();
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

                    console.log(organizationid,parameterkey, parameters, description)
                    API.addParameter(organizationid,parameterkey, parameters, description, function (res) {
                        console.log(res)
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