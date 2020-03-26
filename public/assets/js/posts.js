$.ajax({
    type: "get",
    url: "/posts",
    data: {
        page: 1,
    },
    success(response) {
        let html = template("postsTpl", { data: response.records })
        console.log(response.records)
        $("tbody").html(html)
        // 分页
        let pagesHtml = template("pagesTpl", response)
        // console.log(pagesHtml)
        $(".pagination").html(pagesHtml)
    },
})
function changePage(index) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: index,
        },
        success(response) {
            let html = template("postsTpl", { data: response.records })
            $("tbody").html(html)
            // 分页
            let pagesHtml = template("pagesTpl", response)
            $(".pagination").html(pagesHtml)
        },
    })
}
