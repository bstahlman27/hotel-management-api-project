import { listServices, getService, createNewService, updateService, deleteService } from '../services/serviceService.js';

const staffOrAdmin = (user) => user && (user.role === 'ADMIN' || user.role === 'STAFF');

export async function getAllServicesHandler(req, res, next) {
  try {
    const services = await listServices();
    res.status(200).json(services);
  } catch (err) {
    next(err);
  }
}

export async function getServiceByIdHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    const service = await getService(id);
    res.status(200).json(service);
  } catch (err) {
    next(err);
  }
}

export async function createServiceHandler(req, res, next) {
  try {
    if (!staffOrAdmin(req.user)) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
    const { name, description } = req.body;
    const service = await createNewService({ name, description });
    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
}

export async function updateServiceHandler(req, res, next) {
  try {
    if (!staffOrAdmin(req.user)) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
    const id = Number(req.params.id);
    const data = req.body;
    const updated = await updateService(id, data);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteServiceHandler(req, res, next) {
  try {
    if (!staffOrAdmin(req.user)) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
    const id = Number(req.params.id);
    await deleteService(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
