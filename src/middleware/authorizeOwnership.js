export function authorizeOwnershipOrRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error('Not authenticated');
      error.status = 401;
      return next(error);
    }
    const targetId = Number(req.params.id);
    if (Number.isNaN(targetId)) {
      const error = new Error('Bad request: invalid user id');
      error.status = 400;
      return next(error);
    }
    if (allowedRoles.includes(req.user.role)) {
      return next();
    }
    if (req.user.id === targetId) {
      return next();
    }
    const error = new Error('Forbidden: insufficient permission');
    error.status = 403;
    return next(error);
  };
}