const fetchImage = async (keyword: string) => {
    console.log("keyword",keyword);
    try {
        const imageData = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`);
        const jsonImageData = await imageData.json();
        const result = jsonImageData.results;
        return result;
    } catch (error) {
        console.log(error);
    }
}

export default fetchImage;