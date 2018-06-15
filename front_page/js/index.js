var flag = true;
$(".modBtn").on("click",function(){
    if(flag) this.innerHTML = "取消修改";
    else this.innerHTML = "修改信息";
    $("#mod").toggle();
    $(".add").toggle();
    $(".deletes").toggle();
    flag = !flag;
})

// 添加校区
function add(name,num){
    var tr = `<tr>
                <td>
                    <input type="checkbox" name="" id="a1" class="selectItem">
                </td>
                <td>${name}</td>
                <td>${num}</td>
                <td>
                    <span class="del">删除</span> /
                    <span class="change" data-toggle="modal" data-target="#myModal">修改</span>
                </td>
            </tr>`;
    $("#mod tbody").prepend(tr);
}
$(".btn-primary").on("click",function(e){
    var schoolName = $("#schoolName").val();
    var schoolNum = $("#schoolNum").val();
    if(!schoolName || !schoolNum) $(".pop").css({display:"inline"});   //字段为空时不能提交 并显示提示
    else{
        $(".btn-default").trigger("click");
        if( $(".btn-primary").attr("genre") == "add" ) add(schoolName,schoolNum);  //根据标识判断操作是修改还是添加
    }
});

$(".add").on("click",function(){
    $(".btn-primary").attr("genre","add"); //点击提交按钮时设置标识 添加
    $(".pop").css({display:"none"});
    $("#myModalLabel").html("添加校区");
    $("#schoolNum").val("");
    $("#schoolName").val("");
})

// 删除校区  通过事件委托解决新添加的元素绑定不上事件的问题
$("body").on("click",".del",function () {
    var res = confirm("确认删除吗？");
    if (!res) return;
    else {
        var ele = this.parentNode.parentNode;
        $(ele).remove();
    }
})

// 修改校区
$("body").on("click",".change",function(){
    var that = this;
    $(".btn-primary").attr("genre","mod");  //点击提交按钮时设置标识 提交
    $(".pop").css({display:"none"});
    $("#myModalLabel").html("修改校区");
    $("#schoolNum").val($(this).parent().prev().html());
    $("#schoolName").val($(this).parent().prev().prev().html());

    $(".btn-primary").on("click",function(e){
        var schoolName = $("#schoolName").val();
        var schoolNum = $("#schoolNum").val();
        if(!schoolName || !schoolNum) $(".pop").css({display:"inline"});   //字段为空时不能提交 并显示提示
        else{
            $(".btn-default").trigger("click");
            if( $(".btn-primary").attr("genre") == "mod" )  //根据标识判断操作是修改还是添加
            {
                $(that).parent().prev().prev().html($("#schoolName").val());
                $(that).parent().prev().html($("#schoolNum").val());
            }
        }
    });
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