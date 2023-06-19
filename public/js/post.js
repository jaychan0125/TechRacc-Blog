// make new post
const newPost = async (event) => {
    event.preventDefault();
    
    const title = $('#title').val().trim();
    const content = $('#content').val().trim();
    
    if (title && content) {
        const response = await fetch('/api/posts/newPost', {
            method: 'POST', 
            body: JSON.stringify({ title, content }), 
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace("/")
        } else {
            alert('Unable to make post.')
        }
    }
};


const deletePost = async (event) => {
    // 
}

const updatePost = async (event) => {
    // 
}



$('.post-form').on('submit', newPost);