import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getNumberOfRounds();
  const pepperedPassword = pepperPassword(password);
  return await bcryptjs.hash(pepperedPassword, rounds);
}

async function compare(providedPassword, storedPassword) {
  const pepperedPassword = pepperPassword(providedPassword);
  return await bcryptjs.compare(pepperedPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

function pepperPassword(password) {
  const pepper = process.env.PEPPER_SECRET || "";
  return password + pepper;
}
