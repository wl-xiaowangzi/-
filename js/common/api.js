/**
 * 这是注释的内容
 * Author:land
 *   Date:2017/9/6
 */
define(["jquery"],function($){
    // var api="http://39.108.171.172:8081/facerecognition";
    var api="http://127.0.0.1:80/facerecognition";
    return {
        // 识别记录
        getRecordList:function(organizationid,starttime,endtime,callback){
            $.get(api+"/system/record/query",{organizationid:organizationid,starttime:starttime,endtime:endtime},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 查看详细信息
        showRecord:function(ps_id,organizationid,callback){
            $.get(api+"/system/record/query",{personid:ps_id,organizationid:organizationid},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 入库审批列表
        getApprovalList:function(start,limit,callback){
            $.get(api+"/system/uploadFile",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 员工审批列表
        getPeopleApprovalList:function(start,limit,status,callback){
            $.get(api+"/system/employee/query",{start,limit,status},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 访客审批列表
        getVisitorApprovalList:function(start,limit,status,callback){
            $.get(api+"/system/visitor/query",{start,limit,status},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 图片上传
        uploadImage:function(imagefile,callback){
            $.ajax({
                url:api+"/system/uploadFile",
                type:"post",
                data:{imagefile:imagefile},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 员工列表
        getPeopleList:function(start,limit,callback){
            $.get(api+"/system/employee/query",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
          /**
         * 根据员工id获取员工基本信息
         * @param ep_id 员工id
         * @param callback
         */
        getEmployeeBaseInfo:function(ep_id,callback){
            $.get(api+"/system/employee/query",{employeeid:ep_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 员工编辑
        editEmployee:function(formData,callback){
            $.ajax({
                url:api+"/system/employee/update",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 访客列表
        getVisitorList:function(start,limit,callback){
            $.get(api+"/system/visitor/query",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        /**
         * 根据访客id获取访客基本信息
         * @param ep_id 访客id
         * @param callback
         */
        getVisitorBaseInfo:function(vs_id,callback){
            $.get(api+"/system/visitor/query",{visitorid:vs_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 用户管理
        
        // 系统设置
        // 设备列表
        getDeviceList:function(start,limit,callback){
            $.get(api+"/system/device/query",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 添加设备
        addDevice:function(formData,callback){
            $.ajax({
                url:api+"/system/device/add",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
         // 查看设备信息
        queryDevice:function(dv_id,callback){
            $.get(api+"/system/device/query",{deviceid:dv_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 设备编辑
        editDevice:function(formData,callback){
            $.ajax({
                url:api+"/system/device/update",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        //删除设备
        delDevice:function(dv_id,callback){
            $.post(api+"/system/device/delete",{deviceids:dv_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }

                callback && callback();

            })
        },
        // 用户信息
        // 用户列表
        getUsersList:function(start,limit,callback){
            $.get(api+"/system/user/query",{start,limit},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 增加用户
        addUser:function(formData,callback){
            $.ajax({
                url:api+"/system/user/add",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 查看用户信息
        queryUser:function(user_id,callback){
            $.get(api+"/system/user/query",{userid:user_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 用户编辑
        editUser:function(formData,callback){
            $.ajax({
                url:api+"/system/user/update",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 用户删除
        delUser:function(user_id,callback){
            $.ajax({
                url:api+"/system/user/delete",
                type:"post",
                data:{userids:user_id},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 修改密码
        changePWD:function(formData,callback){
             $.ajax({
                url:api+"/system/user/editpwd",
                type:"post",
                data:formData,
                success:function(res){
                    
                callback && callback(res);
                }
            })
        },
        // 用户登出
        logout:function(callback){
            $.ajax({
                url:api+"/system/logout",
                type:"post",
                success:function(res){
                    
                callback && callback(res);
                }
            })
        }
    }
})