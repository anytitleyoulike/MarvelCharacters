export default getHeroes = function() {
    const privateKey = '6ff5c79f8348872cc1e726a9442f99fe94281cbb';
    const publicKey = '42781c78a838c70158dd3303848bb187';
    const timeStamp = Math.round(Date.now() / 1000);
    const hash = md5(timeStamp + privateKey + publicKey);


    const url = `https://gateway.marvel.com:443/v1/public/characters?&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
    const heroesData =  fetch(url);
    const response = heroesData.json()

    console.log('fetch heroes');

    let data = response.data.results.map(i => {
        return obj = {
            id: i.id,
            name: i.name,
            description: i.description,
            thumbnail: {
                path: i.thumbnail.path,
                extension: i.thumbnail.extension
            },
            favorite: false
        }
    })
    return data;
}