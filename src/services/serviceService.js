import { createService, findAllServices, findServiceById, updateServiceById, deleteServiceById } from '../repositories/serviceRepo.js';

export async function listServices() {
  return await findAllServices();
}

export async function getService(id) {
  const service = await findServiceById(id);
  if (!service) {
    const err = new Error('Service not found');
    err.status = 404;
    throw err;
  }
  return service;
}

export async function createNewService({ name, description }) {
  if (!name || !description) {
    const err = new Error('name and description are required');
    err.status = 400;
    throw err;
  }
  return await createService({ name, description });
}

export async function updateService(id, data) {
  const updates = {};
  if (data.name !== undefined) updates.name = data.name;
  if (data.description !== undefined) updates.description = data.description;

  if (Object.keys(updates).length === 0) {
    const err = new Error('No fields to update');
    err.status = 400;
    throw err;
  }

  await getService(id);
  return await updateServiceById(id, updates);
}

export async function deleteService(id) {
  await getService(id);
  return await deleteServiceById(id);
}
