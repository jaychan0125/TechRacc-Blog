// nav search bar
const searchBar = async (event) => {
    event.preventDefault();
    console.log('is my console even working?')

    const searchData = $('#search-bar').val().trim();
    console.log(searchData)

    if (!searchData) {
        alert('Nothing searched.')
    } else {
        const response = await fetch('/posts')
    }

}

$('.search-bar').on('submit', searchBar);