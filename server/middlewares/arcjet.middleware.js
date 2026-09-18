import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
      const decision = await aj.protect(req, { requested: 1 });
      
      //if you try to spam GET requests to the server, you will be blocked
      if (decision.isDenied()) {
          if (decision.reason.isRateLimit()) {
              res.status(429).send("Rate limit exceeded");
            }
      if (decision.reason.isBot()) {
        res.status(403).send("Bot detected");
      }
      return res.status(403).send("ACCESS DENIED");
    }
    next();
  } catch (error) {
    console.log(`ARCJET Middleware Error: ${error}`);
    next(error);
  }
};

export default arcjetMiddleware;

//We protect the servers by implementing arcjet