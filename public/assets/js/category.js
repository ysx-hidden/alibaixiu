// 分类数组
let categoryArr = []
// 定义render函数
function render() {
    let html = template("categoryTpl", { data: categoryArr })
    $("tbody").html(html)
    // 隐藏批量删除按钮
    $("#delMany").hide()
}
// 渲染页面
$.ajax({
    type: "get",
    url: "/categories",
    success(response) {
        categoryArr = response
        render()
    },
})
// 分类的添加功能
$("#addBtn").on("click", function() {
    let title = $('[name="title"]')
        .val()
        .trim()
    let className = $('[name="className"]')
        .val()
        .trim()
    if (title.length == 0) return alert("请填写分类的名称")
    if (className.length == 0) return alert("请填写类名")
    // 全部通过就发送请求
    $.ajax({
        type: "post",
        url: "/categories",
        data: {
            title,
            className,
        },
        success(response) {
            // 存到分类数组中
            categoryArr.push(response)
            // console.log(categoryArr)
            render()
            // 清空
            $('[name="title"]').val("")
            $('[name="className"]').val("")
        },
        error(a) {
            console.log(a)
        },
    })
})
// 编辑功能
$("tbody").on("click", ".editBtn", function() {
    $("#addBtn").addClass("hidden")
    $("#editBtn").removeClass("hidden")
    $("h2").text("编辑分类")
    $("#editBtn").attr(
        "data-id",
        $(this)
            .parent()
            .attr("data-id"),
    )
    let tr = $(this).parents("tr")
    $('[name="title"]').val(
        tr
            .children()
            .eq(1)
            .text(),
    )
    $('[name="className"]').val(
        tr
            .children()
            .eq(2)
            .text(),
    )
})
$("#editBtn").on("click", function() {
    let id = $(this).attr("data-id")
    let data = $("#editCategory").serialize()
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data,
        success(response) {
            categoryArr[categoryArr.findIndex(item => item._id == response._id)] = response
            render()
            $('[name="title"]').val("")
            $('[name="className"]').val("")
            $("#addBtn").removeClass("hidden")
            $("#editBtn").addClass("hidden")
            $("h2").text("添加分类")
        },
    })
})
// 删除单个分类
$("tbody").on("click", ".deleteBtn", function() {
    let id = $(this)
        .parent()
        .attr("data-id")
    if (confirm("确定要删除吗？")) {
        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success(response) {
                categoryArr = categoryArr.filter(item => item._id !== id)
                render()
            },
        })
    }
})
// 全选按钮, 让所有用户的复选框与全选按钮保持一致
$("#selectAll").on("change", function() {
    // 获取全选按钮的选中状态
    let status = $(this).prop("checked")
    // 获取所有的用户, 与全选按钮的选中状态一致
    $("tbody")
        .find("input")
        .prop("checked", status)
    // 显示隐藏批量删除按钮
    if (status) $("#delMany").show()
    else $("#delMany").hide()
})
// 当所有复选框被选中时全选被选中
$("tbody").on("change", "input", function() {
    // 获取所有选中的用户，如果数量与总用户数量相同，全选就选中
    if (
        $("tbody")
            .find("input")
            .filter(":checked").length == categoryArr.length
    ) {
        $("#selectAll").prop("checked", true)
    } else {
        $("#selectAll").prop("checked", false)
    }
    // 显示隐藏批量删除按钮
    if (
        $("tbody")
            .find("input")
            .filter(":checked").length > 1
    )
        $("#delMany").show()
    else $("#delMany").hide()
})
// 批量删除按钮
$("#delMany").on("click", function() {
    if (confirm("确定删除吗？")) {
        let selectedArr = []
        // console.log($("tbody input:checked").length)
        // 获取被选中元素的id, push到selectedArr数组中
        $("tbody input:checked").each((index, item) => {
            selectedArr.push(
                $(item)
                    .parent()
                    .parent()
                    .find("#operation")
                    .attr("data-id"),
            )
        })
        // console.log(selectedArr) // 获取成功
        // 发送请求
        $.ajax({
            type: "delete",
            url: "/categories/" + selectedArr.join("-"),
            // 如果请求成功会返回一个包含所有被删除的用户的数组
            success(response) {
                // 遍历这个数组
                response.forEach(delItem => {
                    // 去掉用户数组中被删除的用户
                    categoryArr = categoryArr.filter(item => item._id != delItem._id)
                })
                render()
            },
        })
    }
})
