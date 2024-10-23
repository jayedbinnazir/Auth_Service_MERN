import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// Generate an RSA key pair
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
   modulusLength: 2048, // The key size in bits
   publicKeyEncoding: {
      type: "pkcs1", // Recommended to use 'spki' for public key encoding
      format: "pem", // PEM format is commonly used
   },
   privateKeyEncoding: {
      type: "pkcs1", // Recommended to use 'pkcs8' for private key encoding
      format: "pem", // PEM format for private key
   },
});

fs.writeFileSync("certs/private.pem", privateKey);
fs.writeFileSync("certs/public.pem", publicKey);
