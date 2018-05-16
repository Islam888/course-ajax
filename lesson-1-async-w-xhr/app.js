(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
    function addImage() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
        if (data && data.results && data.results[0]) {
            const firstImage = data.results[0];
            htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`
        } else {
            htmlContent = '<div class="error-no-image">No image available</div>'
        }
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    
    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID <7c07e16352a1d717b5dbdf66acc4b334a19bc004be2d278e7ded4b7f3239b0e7>');
})();
