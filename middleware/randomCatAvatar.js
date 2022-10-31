const randomCatAvatar = () => {
    const list = [
        'https://raw.githubusercontent.com/Laosing/cute-cat-avatars/master/assets/img/award.png',
        'https://raw.githubusercontent.com/Laosing/cute-cat-avatars/master/assets/img/cat.png',
        'https://raw.githubusercontent.com/Laosing/cute-cat-avatars/master/assets/img/logo.png',
        'https://raw.githubusercontent.com/Laosing/cute-cat-avatars/master/assets/img/tv.png',
        'https://raw.githubusercontent.com/Laosing/cute-cat-avatars/master/assets/img/gaming.png',
    ]
    return list[Math.floor(Math.random() * list.length)];
};

export default randomCatAvatar;