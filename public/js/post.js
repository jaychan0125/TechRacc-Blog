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
    event.preventDefault();
    const postId = $('.post-title').attr('data-postId');
    console.log(postId);

    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace("/my-posts",);
        } else {
            alert('Failed to delete post.')
        }
    } catch (err) {
        console.error(err)
    }
};

const updatePost = async (event) => {
    event.preventDefault();
    const postId = $('.post-title').attr('data-postId');

// HOW DO I MAKE IT SO THE FORM IS OPEN SO I CAN UPDATE IT IF I WANNA?!

    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
        });

        if (response.ok) {
            console.log(response)
            // document.location.replace("/my-posts",);
        } else {
            alert('Failed to delete post.')
        }

    } catch (err) {
        console.error(err)
    }
};



$('.post-form').on('submit', newPost);
$('#post-delete').on('click', deletePost);
$('#post-update').on('click', updatePost);