import prisma from '../config/db.js';

export async function createService({ name, description }) {
  return await prisma.service.create({
    data: { name, description },
  });
}

export async function findAllServices() {
  return await prisma.service.findMany();
}

export async function findServiceById(id) {
  return await prisma.service.findUnique({ where: { id } });
}

export async function updateServiceById(id, data) {
  return await prisma.service.update({ where: { id }, data });
}

export async function deleteServiceById(id) {
  return await prisma.service.delete({ where: { id } });
}
