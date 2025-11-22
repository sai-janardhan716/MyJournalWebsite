document.addEventListener('DOMContentLoaded',async ()=>{
    const postId = localStorage.getItem("postid");
    if(!postId){
        window.location.href = "../Login/Login.html";
        return;
    }
    const response = await fetch(`http://localhost:5000/${postId}`);
    if(response.status == 500){
        alert("Internal error");
        return;
    }
    if(response.status == 400){
        alert("Post not found");
        return;
    }
    const res = await response.json();
    const postTitle = res.postTitle;
    const postContent = res.postContent;
    const post = document.getElementById('post');
    post.innerHTML = `        
        <h1>${postTitle}</h1>
        <p>${postContent}</p>`
});