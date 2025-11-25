import { getBooking } from '../services/bookingService.js';

export function authorizeBookingOwnershipOrRoles(...allowedRoles) {
  return async (req, res, next) => {
    if (!req.user) {
      const error = new Error('Not authenticated');
      error.status = 401;
      return next(error);
    }

    const bookingId = Number(req.params.id);
    if (Number.isNaN(bookingId)) {
      const error = new Error('Bad request: invalid booking id');
      error.status = 400;
      return next(error);
    }

    if (allowedRoles.includes(req.user.role)) {
      return next();
    }

    try {
      const booking = await getBooking(bookingId);
      if (booking.user_id === req.user.id) {
        return next();
      } else {
        const error = new Error('Forbidden: insufficient permission');
        error.status = 403;
        return next(error);
      }
    } catch (err) {
      return next(err);
    }
  };
}
