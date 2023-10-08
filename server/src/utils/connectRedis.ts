import { createClient } from "redis";
import config from "config";

const redisUrl: string =
  process.env.NODE_ENV === "development"
    ? "redis://localhost:6379"
    : config.get("redisUrl");

const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected...");
  } catch (err: any) {
    console.log(err.message);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

redisClient.on("error", (err) => console.log(err));

export default redisClient;
