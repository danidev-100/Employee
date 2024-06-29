import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

 let token = req.headers.authorization;


 if (!token) {
   return res.status(401).json({
     message: "Not token providedessfully",
    });
  }
  
  token = token.split(" ")[1];


  try {
    const { email , role  } = jwt.verify(token, process.env.SECRET_KEY);

    req.email = email
    req.role = role

    next();

  } catch (error) {
    return res.status(400).json({ error: "Error verifying token"})
  }
};


export const verifyAdmin = (req, res, next) => {

  if(req.role === "ADMIN") {
    next();
  } else {
    return res.status(403).json({
      message: "Not authorized only admins",
    });
  
}

}


export const verifyUser = (req, res, next) => {
  if(req.role === "USER" || req.role === "ADMIN") {
    next();
  } else {
    return res.status(403).json({
      message: "Not authorized ",
    });
}}