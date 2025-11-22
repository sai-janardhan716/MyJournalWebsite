const postForm = document.getElementById('postForm');
postForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const formData = new URLSearchParams(new FormData(postForm));
    formData.append("userId",localStorage.getItem('userId'));
    const response = await fetch("http://localhost:5000/addPost",{
        method : "POST",
        headers : { "Content-Type": "application/x-www-form-urlencoded"},
        body : formData
    });
    const res = await response.text();
    alert(res);
    if(response.status == 200){
        window.location.href = "../FeedPage/FeedPage.html";
    };
});