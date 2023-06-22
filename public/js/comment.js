// add new comment
const newComment = async (event) => {
    event.preventDefault();
    
    const postId = $('.post-title').attr('data-postId');
    const comment = $('#comment').val().trim();
    
    if (!comment) {
        alert('Nothing commented.');
    } else {
        const response = await fetch(`/api/comments/newComment`, {
            method: 'POST', 
            body: JSON.stringify({ comment, postId }), 
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace(`/api/posts/${postId}`)
        } else {
            alert('Unable to comment.')
        }
    }
};

$('.comment-form').on('submit', newComment);
