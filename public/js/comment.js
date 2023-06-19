// add new comment
const newComment = async (event) => {
    event.preventDefault();
    
    const comment = $('#comment').val().trim();
    
    if (!comment) {
        alert('Nothing commented.');
    } else {
        console.log(comment)
        const response = await fetch(`/api/comments/newComment`, {
            method: 'POST', 
            body: JSON.stringify({ comment, post_id: post.id }), 
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace(`/api/posts/${post.id}`)
        } else {
            alert('Unable to comment.')
        }
    }
};

$('.comment-form').on('submit', newComment);
