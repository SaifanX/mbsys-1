import crypto from "crypto";

// Get secret key from environment or fallback (fallback only for local dev verification)
const getSecret = () => {
  return process.env.JWT_SECRET || "f3a8c2e1d9b4f7a2c5e8d1b4f7a2c5e8d1b4f7a2c5e8d1b4f7a2c5e8d1b4f7a2";
};

// Sign a session payload
export function signSession(payload: any, expiresInMs: number = 12 * 60 * 60 * 1000): string {
  const expires = Date.now() + expiresInMs;
  const data = JSON.stringify({ ...payload, expires });
  const base64Data = Buffer.from(data).toString("base64url");
  
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(base64Data);
  const signature = hmac.digest("base64url");
  
  return `${base64Data}.${signature}`;
}

// Verify a session token and return the payload if valid
export function verifySession(token: string): any | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  
  const [base64Data, signature] = parts;
  
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(base64Data);
  const expectedSignature = hmac.digest("base64url");
  
  if (signature !== expectedSignature) {
    return null; // Signature mismatch
  }
  
  try {
    const dataJson = Buffer.from(base64Data, "base64url").toString("utf8");
    const payload = JSON.parse(dataJson);
    
    if (payload.expires && payload.expires < Date.now()) {
      return null; // Expired
    }
    
    return payload;
  } catch (e) {
    return null;
  }
}
