// 添加校区
function add(obj){
    console.log(0)
    var tr = `<tr>
                <td>
                    <input type="checkbox" name="" id="a1" class="selectItem">
                </td>
                <td>${obj.campus}-${obj.apartment}</td>
                <td>${obj.Name}</td>
                <td>${obj.contact}</td>
                <td>${obj.location}</td>
                <td>
                    <span class="del">删除</span> /
                    <span class="change" data-toggle="modal" data-target="#myModal">修改</span>
                </td>
            </tr>`;
    $("#mod tbody").prepend(tr);
}
    //提交按钮
$(".btn-primary").on("click",function(e){
    var comNum = 0;
    var objLength = 0;
    var obj = {
        "campus": $("#campus").val(),//所属校区
        "apartment": $("#apartment").val(),  //所管理公寓
        "Name": $("#dormitoryName").val(), //姓名
        "contact": $("#count").val(), //联系方式
        "location": $("#location").val() //办公位置
    }
    // console.log(obj)

    for( var i in obj ){
        objLength++;
        if(obj[i]) comNum++;
    }

    if(comNum < objLength) $(".pop").css({display:"inline"});
    else{
        $(".btn-default").trigger("click");         //关闭模态框
        if( $(".btn-primary").attr("genre") == "add" ) add(obj);  //根据标识判断操作是修改还是添加
    }

});
//添加宿舍
$(".add").on("click",function(){
    $(".btn-primary").attr("genre","add"); //点击提交按钮时设置标识 添加
    $(".pop").css({display:"none"});
    $("#myModalLabel").html("添加宿舍");
    $("#campus").val("北科");               //初始化模态框字段
    $("#apartment").val("3A公寓");
    $("#dormitoryName").val("");
    $("#count").val("");
    $("#location").val("");
})

//修改宿舍
$("body").on("click",".change",function(){
    var that = this;
    $(".btn-primary").attr("genre","mod"); //点击提交按钮时设置标识 添加
    $(".pop").css({display:"none"});
    $("#myModalLabel").html("修改公寓信息");

    var obj = {
        "Name": $(this).parent().prevAll().eq(2).html(),//姓名
        "contact": $(this).parent().prevAll().eq(1).html(),  //联系方式
        "campus": $(this).parent().prevAll().eq(3).html().split("-")[0], //所属校区
        "apartment": $(this).parent().prevAll().eq(3).html().split("-")[1], //所管理公寓
        "location": $(this).parent().prev().html() //办公位置
    }
    // console.log(obj)

    $("#campus").val(obj.campus);               //初始化模态框字段
    if(obj.campus == '北科') 
        $("#apartment").html(`<option value="3A公寓" selected>3A公寓</option>
            <option value="21公寓">21公寓</option>
            <option value="12公寓">12公寓</option> `)
    if(obj.campus == '天丰利') 
        $("#apartment").html(`<option value="18公寓" selected>18公寓</option><option value="22公寓">22公寓</option>`)
    $("#apartment").val(obj.apartment);
    $("#dormitoryName").val(obj.Name);
    $("#count").val(obj.contact);
    $("#location").val(obj.location);

    $(".btn-primary").on("click",function(){
        var comNum = 0;
        var objLength = 0;
        var obj = {
            "campus": $("#campus").val()+"-"+$("#apartment").val(),//所管理公寓
            "Name": $("#dormitoryName").val(), //姓名
            "contact": $("#count").val(),//联系方式
            "location": $("#location").val() //办公位置
        }
        

        for( var i in obj ){
            objLength++;
            if(obj[i]) comNum++;
        }

        if(comNum < objLength) $(".pop").css({display:"inline"});
        else{
            $(".btn-default").trigger("click");         //关闭模态框
            if( $(".btn-primary").attr("genre") == "mod" )//根据标识判断操作是修改还是添加
            {  
                $(that).parent().prevAll().eq(3).html(obj.campus)
                $(that).parent().prevAll().eq(2).html(obj.Name)
                $(that).parent().prevAll().eq(1).html(obj.contact)
                $(that).parent().prev().html(obj.location)
            }
        }
    });
})

// 删除公寓  通过事件委托解决新添加的元素绑定不上事件的问题
$("body").on("click",".del",function () {
    var res = confirm("确认删除吗？");
    if (!res) return;
    else {
        var ele = this.parentNode.parentNode;
        $(ele).remove();
    }
})

// 全选
var flag1 = true;
$(".selectAll").on("click",function(){
    if(flag1)
    {
        $(".selectItem").prop("checked",true);
        flag1 = !flag1;
    }
    else{
        $(".selectItem").prop("checked",false);
        flag1 = !flag1;
    }
})

// 批量删除
var selectNum = 0;
$(".deletes").on("click",function(){
    if( $(".selectAll").prop("checked") ) selectNum = -1;
    else selectNum = 0;
    $(".selectItem").each(function(index,item){
        if( $(item).prop("checked") ) selectNum++;
    })
    if(!selectNum) alert("未选中任何删除项！");
    else{
        var res = confirm("确认删除该 "+selectNum+" 项数据？");
        if(res) alert("请求已发送！");
    }
})