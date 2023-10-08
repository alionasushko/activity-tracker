import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = Buffer.from(
    config.get<string>("accessTokenPrivateKey"),
    "base64"
  ).toString("ascii");

  return jwt.sign(payload, privateKey.replace(/\\n/g, "\n"), {
    ...(options && options),
    algorithm: "HS256",
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(
      config.get<string>("accessTokenPrivateKey"),
      "base64"
    ).toString("ascii");

    // const publicKey = config.get<string>("accessTokenPublicKey");

    console.log({
      token,
      publicKey,
      env: config.get<string>("accessTokenPublicKey"),
    });
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
