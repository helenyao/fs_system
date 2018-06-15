// 添加校区
function add(obj){
    var tr = `<tr>
                <td>
                <input type="checkbox" name="" id="a1" class="selectItem">
                </td>
                <td>${obj.campus}</td>
                <td>${obj.schoolName}</td>
                <td>${obj.type}</td>
                <td>${obj.num}</td>
                <td><span class="form">${obj.dataStart}</span>~<span class="to">${obj.dataEnd}</span></td>
                <td>${obj.count}</td>
                <td>
                    <span class="del">删除</span> /
                    <span class="change" data-toggle="modal" data-target="#myModal">修改</span>
                </td>
            </tr>`;
    $("#mod tbody").prepend(tr);
}

//添加公寓
$(".add").on("click",function(){
    $(".btn-primary").attr("genre","add"); //点击提交按钮时设置标识 添加
    $(".pop").css({display:"none"});
    $("#myModalLabel").html("添加公寓");
    $("#campus").val("北科");               //初始化模态框字段
    $("#schoolName").val("");
    $("#type").val("自有");
    $("#num").val("");
    $("#datepicker1").val("");
    $("#datepicker2").val("");
    $("#count").val("");

    
})

$(".btn-primary").on("click",function(){
    option("add")
});

//修改公寓
$(document).off("click",".change")
$("body").on("click",".change",function(){
    $(".pop").css({display:"none"});
    $("#myModalLabel").html("修改公寓信息");

    var obj = {
        "campus": $(this).parent().prevAll().eq(5).html(),//所属校区
        "schoolName": $(this).parent().prevAll().eq(4).html(),  //公寓名称
        "type": $(this).parent().prevAll().eq(3).html(), //公寓类型
        "num": $(this).parent().prevAll().eq(2).html(), //公寓编号
        "dataStart": $(this).parent().prevAll().eq(1).find(".form").html(), //租期
        "dataEnd": $(this).parent().prevAll().eq(1).find(".to").html(), //到期
        "count": $(this).parent().prev().html() //宿舍数量
    }

    $("#campus").val(obj.campus);               //初始化模态框字段
    $("#schoolName").val(obj.schoolName);
    $("#type").val(obj.type);
    $("#num").val(obj.num);
    $("#datepicker1").val(obj.dataStart);
    $("#datepicker2").val(obj.dataEnd);
    $("#count").val(obj.count);

    $(".btn-primary").on("click",function(){
        option("mod",this)
        console.log(this)
    }.bind(this));
})

function option(type,that){
    // console.log(that)
    var comNum = 0;
    var objLength = 0;
    var obj = {
        "campus": $("#campus").val(),//所属校区
        "schoolName": $("#schoolName").val(),  //公寓名称
        "type": $("#type").val(), //公寓类型
        "num": $("#num").val(), //公寓编号
        "dataStart": $("#datepicker1").val(), //租期
        "dataEnd": $("#datepicker2").val(), //到期
        "count": $("#count").val() //宿舍数量
    }

    for( var i in obj ){
        objLength++;
        if(obj[i]) comNum++;
    }

    if(comNum < objLength) $(".pop").css({display:"inline"});
    else{
        $(".close").trigger("click");         //关闭模态框
        if( type == "mod" ){  //根据标识判断操作是修改还是添加
            $(that).parent().prevAll().eq(5).html(obj.campus)
            $(that).parent().prevAll().eq(4).html(obj.schoolName)
            $(that).parent().prevAll().eq(3).html(obj.type)
            $(that).parent().prevAll().eq(2).html(obj.num)
            $(that).parent().prevAll().eq(1).find(".form").html(obj.dataStart)
            $(that).parent().prevAll().eq(5).html(obj.campus)
            $(that).parent().prevAll().eq(1).find(".to").html(obj.dataEnd)
            $(that).parent().prev().html(obj.count)
        }
        if( type == "add" ) add(obj);  //根据标识判断操作是修改还是添加
    }
    // location.reload();
}

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