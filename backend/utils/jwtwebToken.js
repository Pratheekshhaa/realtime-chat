import jwt from "jsonwebtoken";

const jwtToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn : "30d"}) //basically creates a token with userId as payload and it expires in 30 days
    res.cookie('jwt', token, { //send the token as cookie
        maxAge: 30 *24*60*60*1000, //30 days
        httpOnly: true, // cannot be accessed by client side scripts so it is more secure 
        sameSite: "strict", //to prevent CSRF attacks it basically means that the cookie will only be sent to the same site
        secure: process.env.SECURE !== "development" //that means in production it will be true but during development it wont be secure
    })
}

export default jwtToken;