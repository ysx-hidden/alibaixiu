// 定义一个数组
let userArr = []
// 发送请求
$.ajax({
    type: "get",
    url: "/users",
    success(response) {
        userArr = response
        render()
    },
})
// 封装渲染页面的函数
function render() {
    let html = template("userTpl", { data: userArr })
    $("tbody").html(html)
}
