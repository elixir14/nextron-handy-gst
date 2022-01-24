import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const userData = JSON.parse(req.body);
  const savedData = await prisma.user.create({
    data: userData,
  });
  return res.json(savedData);
}
