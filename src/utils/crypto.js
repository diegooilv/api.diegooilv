import argon2 from "argon2";

const PEPPER = process.env.PEPPER || "";

/**
 * Gera um hash de senha com Argon2id
 * @param {string} plainPassword
 * @returns {Promise<string>}
 */
export async function hashPassword(plainPassword) {
  const passwordWithPepper = PEPPER
    ? `${plainPassword}${PEPPER}`
    : plainPassword;
  return await argon2.hash(passwordWithPepper, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
}

/**
 * Verifica uma senha em texto puro com o hash salvo
 * @param {string} hash
 * @param {string} plainPassword
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(hash, plainPassword) {
  const passwordWithPepper = PEPPER
    ? `${plainPassword}${PEPPER}`
    : plainPassword;
  return await argon2.verify(hash, passwordWithPepper);
}
