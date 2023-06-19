const newPost = async (event) => {
    event.preventDefault();

    const title = $('#title').val().trim();
    const content = $('#content').val().trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST', 
            body: JSON.stringify({ title, content }), 
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            document.location.replace('/') //i think i want it to just go to homepage. please check waht this endpoint is LOL
        } else {
            alert('Unable to make post.')
        }
    }

};


const deletePost = async (event) => {
    // 
}



$('#newPost').on('click', newPost);