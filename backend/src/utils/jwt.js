import jwt from 'jsonwebtoken';

 export function generateTokens  (userId, res) {
    const token = jwt.sign({userId} , process.env.JWT_SECRET, {
        expiresIn: '7d',
    } );

    res.cookie("jwt" , token, {
        maxAge: 7* 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite:"strict"
    })

    return token;
}
 