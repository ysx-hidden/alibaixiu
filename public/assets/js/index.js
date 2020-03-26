// 获取文章数量
$.ajax({
    type: "get",
    url: "/posts/count",
    success(response) {
        // console.log(response)
        $("#post").html(
            "<strong>" + response.postCount + "</strong>篇文章（<strong>" + response.draftCount + "</strong>篇草稿）",
        )
    },
})
// 获取分类数量
$.ajax({
    type: "get",
    url: "/categories/count",
    success(response) {
        $("#category").html("<strong>" + response.categoryCount + "</strong>个分类")
    },
})
// 获取评论数量
$.ajax({
    type: "get",
    url: "/comments/count",
    success(response) {
        $("#comments").html("<strong>" + response.commentCount + "</strong>条评论")
    },
})
