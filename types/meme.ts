interface Meme {
    id: string;
    imageSmall: string;
    tags: string;
    createdAt: string;
    user: {
        firstName: string;
        lastName: string;
        picture: string;
    };
}