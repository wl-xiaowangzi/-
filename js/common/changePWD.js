/**
 * 个人中心
 * Author:land
 *   Date:2017/9/4
 */
define(["jquery","artTemplate","common/api","text!tpls/changePWD.html",],function($,art,API,changePWDTpl){

    return function(){
        // API.changePWD(function(res){


            $("#modalChangePWD").remove();

            // var personalCenter=art.render(personalCenterTpl,res.result);

            var $changePWD=$(changePWDTpl);
            
            $changePWD
                // .on("submit","form",function(){
                
                //     var formData=$(this).serialize();

                //     API.editSavePersonalCenter(formData,function(){
                //         location.href="/";//刷新页面
                //     })

                //     return false;
                // })

            $changePWD.appendTo("body").modal();

        // })


    }
})