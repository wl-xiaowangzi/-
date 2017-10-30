/**
 * 第二次调用相机
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/testCamera.html", "common/api", "lrz"], function ($, art, cameraTpl, API, lrz) {
    return function () {
        var $camera = $(cameraTpl);
        $(".module-container").empty()
        $(".module-container").append($camera);

        $("#file").trigger("click");

        $('#file').unbind().on('change', function () {
            // 查询设备
            API.getDeviceList(0, 1000, null, function (res) {
                // 拼接设备号
                var device = res.data;
                var deviceids = device[0].deviceid;
                for (var i = 1; i < res.data.length; i++) {
                    deviceids += "," + device[i].deviceid
                }
                $("#btnDeviceids").attr("deviceids", deviceids);
            })
            var file = this.files;
            function add(file,j) {
                lrz(file[j], {
                        width: 640
                    })
                    .then(function (rst) {
                        // 处理成功会执行
                        var output = rst.base64; //获取base64位图片信息      
                        var base64Data = output.substr(22);
                        // 将图片上传到服务器
                        API.uploadImage(base64Data, function (res) {
                            if (res.code != 0) {
                                console.log(res.message)
                                return
                            }
                            var a = Math.ceil(Math.random()*10000);
                            var faceimages = res.data.faceimage;
                            var facedatas = JSON.stringify(res.data.facedata).replace(/\[|]/g, '');
                            var facedatas = "[" + facedatas + "]";
                            var headfaceimage2 = res.data.headfaceimage;
                            var deviceids = $("#btnDeviceids").attr("deviceids");
                            var name = "员工" + a;
                            var sex = 1;
                            var birthday = "199" + a;
                            var phonenumber = "139774339" + a;
                            var employeenumber = a;
                            var job = "test" + a;
                            var facetypes = 1;
                            console.log(facedatas);
                            // finishPhoto(faceimage2, facedata2, headfaceimage2);
                            API.addEmployee(deviceids, name, sex, birthday, phonenumber, employeenumber, job, faceimages, facedatas, facetypes, function () {
                                console.log("success");
                            })
                        })
                    })
                    .catch(function (err) {
                        // 处理失败会执行
                    })
                    .always(function () {
                        // 不管是成功失败，都会执行
                    });
            }
            var i = -1;
            var maxNum = file.length-1;
            var timer = null;
            timer =  setInterval(function () {
                if(i<maxNum){
                    i++
                console.log(i)
                add(file,i);
            }else{
                clearInterval(timer);
                return
                }
            }, 500);
        })

    };
});