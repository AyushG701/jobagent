import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  // Extract the authorization header from the request
  const authHeader = req?.headers?.authorization;

  // Check if the authorization header is present and starts with "Bearer"
  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    next("Authentication failed"); // Proceed to the next middleware with an error message
  }

  // Extract the token from the authorization header
  const token = authHeader?.split(" ")[1];

  try {
    // Verify the token using the secret key
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the userId from the token to the request body
    req.body.user = {
      userId: userToken.userId,
    };

    next(); // Proceed to the next middleware
  } catch (error) {
    console.log(error); // Log the error
    next("Authentication failed"); // Proceed to the next middleware with an error message
  }
};

export default userAuth;
