/**
 * 相机
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/camera.html", "common/api", "datetimepicker", "datetimepickerLang"], function ($, art,cameraTpl, API) {
    return function () {
        $("#modalcamera").remove();

        var $camera = $(cameraTpl);

        $camera
            .on("click", "#picture", function () {
                context.drawImage(video, 0, 0, 640, 480);
                //从画布上获取照片数据  
                var imgData = canvas.toDataURL("image/png");
                //将图片转换为Base64  
                var base64Data = imgData.substr(22);
                //将图片上传到服务器
                console.log(imgData)
                API.uploadImage(base64Data,function(res){
                    
                    console.log(res)
                    
                })
            })

        $camera.appendTo("body").modal();

    };
});