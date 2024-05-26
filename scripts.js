document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});

function addPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const imageInput = document.getElementById('postImage');
    const date = new Date().toLocaleString();
    let imageUrl = '';

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageUrl = e.target.result;
            savePost(title, content, date, imageUrl);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        savePost(title, content, date, imageUrl);
    }
}

function savePost(title, content, date, imageUrl) {
    if (title && content) {
        const post = {
            title,
            content,
            date,
            imageUrl
        };

        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.unshift(post); // Add the new post at the beginning
        localStorage.setItem('posts', JSON.stringify(posts));

        document.getElementById('postTitle').value = '';
        document.getElementById('postContent').value = '';
        document.getElementById('postImage').value = '';
        displayPosts();
    }
}

function loadPosts() {
    displayPosts();
}

function displayPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        postElement.innerHTML = `
            <div class="post-title">${post.title}</div>
            <div class="post-date">${post.date}</div>
            <div class="post-content">${post.content}</div>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post Image">` : ''}
            <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
        `;

        postsContainer.appendChild(postElement);
    });
}

function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}
