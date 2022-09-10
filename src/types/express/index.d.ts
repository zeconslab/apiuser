declare namespace Express {
    interface Request {
        userTokenId: string;
        userTokenIat: number;
        userTokenExp: number;
    }
}