document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        window.location.href = "../Login/Login.html";
        return;
    }
    const response = await fetch(`http://localhost:5000/fetchPosts/${userId}`);
    const posts = await response.json();
    const container = document.getElementById("posts");
    container.innerHTML = "";
    if (posts.length == 0) {
        container.innerHTML += "<h1>No Posts Found</h1>";
    } else {
        posts.forEach(post => {
            const date = new Date(post.created_at);
            const formatted = date.toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
            });
            container.innerHTML += `
            <div class="post">
                <h1>${post.postTitle}</h1> 
                <p>${post.postContent}</p>   
                <small>Post created at : ${formatted}</small>
                <br>
                <div class="mt-3">
                    <button class="btn btn-primary viewPostBtn" data-id=${post.postId}>View Post</button>
                    <button class="btn btn-danger ml-3 deletePostBtn" id="deletePost" data-id=${post.postId}>Delete Post</button>
                </div>
            </div>
        `;
        });
    }
});
const createPost = document.getElementById('createPost');
createPost.addEventListener('click', () => {
    window.location.href = "../CreatePost/CreatePost.html";
});
const logout = document.getElementById('logoutbtn');
logout.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = "../Login/Login.html";
});
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("deletePostBtn")) {
        const postId = e.target.getAttribute("data-id");
        if (!confirm("Are you sure you want to delete this post?")) return;
        const response = await fetch(`http://localhost:5000/deletePost/${postId}`, {
            method: "DELETE"
        });
        const msg = await response.text();
        alert(msg);
        location.reload();
    }
});
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("viewPostBtn")) {
        const postId = e.target.getAttribute("data-id");
        localStorage.setItem("postid",postId);
        window.location.href="../DedicatedPage/DedicatedPage.html";
    }
});
