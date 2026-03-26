import prisma from "./prisma.js";

/** Returns a random 6-digit string */
export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/** 10 minutes from now */
export function otpExpiry() {
  return new Date(Date.now() + 10 * 60 * 1000);
}

/**
 * Creates an OTP record in the database.
 * In development, also prints the code to the console.
 *
 * @param {string} userId
 * @param {"verify"|"login"} type - just used for the console label
 * @returns {Promise<string>} the generated code
 */
export async function createAndLogOtp(userId, type = "verify") {
  const code = generateOtp();

  await prisma.emailVerification.create({
    data: {
      user_id: userId,
      code,
      expires_at: otpExpiry(),
    },
  });

  if (process.env.NODE_ENV !== "production") {
    console.log(`\n========================================`);
    console.log(`  OTP [${type.toUpperCase()}] for user: ${userId}`);
    console.log(`  Code: ${code}`);
    console.log(`========================================\n`);
  }

  return code;
}
