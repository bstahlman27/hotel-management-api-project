import { 
    createBooking, 
    findAllBookings, 
    findBookingById, 
    updateBookingById, 
    deleteBookingById 
} from '../repositories/bookingRepo.js';

import { findRoomById } from '../repositories/roomRepo.js';
import { findUserById } from '../repositories/userRepo.js';

function sanitize(booking) {
    return booking;
}

export async function listBookings() {
    const bookings = await findAllBookings();
    return bookings.map(sanitize);
}

export async function getBooking(id) {
    const booking = await findBookingById(id);
    if (!booking) {
        const err = new Error('Booking not found');
        err.status = 404;
        throw err;
    }
    return sanitize(booking);
}

export async function createNewBooking({ 
    user_id, 
    room_id, 
    check_in, 
    check_out, 
    total_price, 
    status 
}) {
    if (!user_id || !room_id || !check_in || !check_out || total_price === undefined || !status) {
        const err = new Error('user_id, room_id, check_in, check_out, total_price, and status are required');
        err.status = 400;
        throw err;
    }

    const user = await findUserById(user_id);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

    const room = await findRoomById(room_id);
    if (!room) {
        const err = new Error('Room not found');
        err.status = 404;
        throw err;
    }

    const booking = await createBooking({
        user_id,
        room_id,
        check_in: new Date(check_in),
        check_out: new Date(check_out),
        total_price,
        status
    });

    return sanitize(booking);
}

export async function updateBooking(id, data) {

    await getBooking(id);

    const updates = {};

    if (data.user_id !== undefined) {
        const user = await findUserById(data.user_id);
        if (!user) {
            const err = new Error('User not found');
            err.status = 404;
            throw err;
        }
        updates.user_id = data.user_id;
    }

    if (data.room_id !== undefined) {
        const room = await findRoomById(data.room_id);
        if (!room) {
            const err = new Error('Room not found');
            err.status = 404;
            throw err;
        }
        updates.room_id = data.room_id;
    }

    if (data.check_in !== undefined) {
        updates.check_in = new Date(data.check_in);
    }

    if (data.check_out !== undefined) {
        updates.check_out = new Date(data.check_out);
    }

    if (data.total_price !== undefined) {
        updates.total_price = data.total_price;
    }

    if (data.status !== undefined) {
        updates.status = data.status;
    }

    if (Object.keys(updates).length === 0) {
        const err = new Error('No fields to update');
        err.status = 400;
        throw err;
    }

    const updated = await updateBookingById(id, updates);
    return sanitize(updated);
}

export async function deleteBooking(id) {
    try {
        await deleteBookingById(id);
    } catch (err) {
        if (err.code === 'P2025') {
            const e = new Error('Booking not found');
            e.status = 404;
            throw e;
        }
        throw err;
    }
}
