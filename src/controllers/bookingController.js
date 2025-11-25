import { 
  listBookings, 
  getBooking, 
  createNewBooking, 
  updateBooking, 
  deleteBooking 
} from '../services/bookingService.js';

/**
 * GET /bookings
 * ADMIN + STAFF can view all bookings
 */
export async function getAllBookingsHandler(req, res, next) {
  try {
    if (!req.user || !['ADMIN', 'STAFF'].includes(req.user.role)) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }

    const bookings = await listBookings();
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /bookings/:id
 * A user can view only their own booking unless ADMIN/STAFF
 */
export async function getBookingByIdHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    const booking = await getBooking(id);

    // Ownership check unless ADMIN/STAFF
    if (
      req.user.role !== 'ADMIN' &&
      req.user.role !== 'STAFF' &&
      booking.user_id !== req.user.id
    ) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }

    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /bookings
 * Any authenticated user can create a booking for themselves
 * ADMIN can create for any user
 */
export async function createBookingHandler(req, res, next) {
  try {
    let { user_id, room_id, check_in, check_out, total_price, status } = req.body;

    // Guests can only create bookings for THEIR OWN user_id
    if (req.user.role === 'GUEST') {
      user_id = req.user.id;
    }

    const booking = await createNewBooking({
      user_id,
      room_id,
      check_in,
      check_out,
      total_price,
      status,
    });

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /bookings/:id
 * ADMIN + STAFF can edit any booking
 * Regular users can only edit their own booking
 */
export async function updateBookingHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    const existing = await getBooking(id);

    if (
      req.user.role !== 'ADMIN' &&
      req.user.role !== 'STAFF' &&
      existing.user_id !== req.user.id
    ) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }

    const updated = await updateBooking(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /bookings/:id
 * ADMIN can delete any booking
 * Users can delete ONLY their own booking
 */
export async function deleteBookingHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    const existing = await getBooking(id);

    if (
      req.user.role !== 'ADMIN' &&
      req.user.role !== 'STAFF' &&
      existing.user_id !== req.user.id
    ) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }

    await deleteBooking(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
