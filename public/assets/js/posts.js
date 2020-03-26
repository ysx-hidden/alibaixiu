let category = $("#category").val()
let state = $("#state").val()
// 代码重复，定义render函数
// category文章类的id  state文章是草稿还是已发布  page页码
function render(category, state, page = 1) {
    // 打开/刷新页面发送的请求
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page,
            category,
            state,
        },
        success(response) {
            let html = template("postsTpl", { data: response.records })
            // console.log(response.records)
            $("tbody").html(html)
            // 分页
            let pagesHtml = template("pagesTpl", response)
            // console.log(pagesHtml)
            $(".pagination").html(pagesHtml)
        },
    })
}
// 第一次打开页面/刷新页面渲染到页码为1
render(category, state)
// 点击页码的函数(标签中的onclick事件)
function changePage(index) {
    // $.ajax({
    //     type: "get",
    //     url: "/posts",
    //     data: {
    //         page: index,
    //         category,
    //         state,
    //     },
    //     success(response) {
    //         let html = template("postsTpl", { data: response.records })
    //         $("tbody").html(html)
    //         // 分页
    //         let pagesHtml = template("pagesTpl", response)
    //         $(".pagination").html(pagesHtml)
    //     },
    // })
    render(category, state, index)
}
// 获取所有文章分类, 渲染下拉菜单
$.ajax({
    type: "get",
    url: "/categories",
    success(response) {
        let html = template("filterTpl", { data: response })
        $("#category").append(html)
    },
})
// 筛选功能
$("#searchBtn").on("click", function() {
    // 获取选择的分类和状态   进行筛选
    category = $("#category").val()
    state = $("#state").val()
    // $.ajax({
    //     type: "get",
    //     url: "/posts",
    //     data: {
    //         category,
    //         state,
    //     },
    //     success(response) {
    //         let html = template("postsTpl", { data: response.records })
    //         $("tbody").html(html)
    //         // 分页
    //         let pagesHtml = template("pagesTpl", response)
    //         $(".pagination").html(pagesHtml)
    //     },
    // })
    render(category, state)
})
