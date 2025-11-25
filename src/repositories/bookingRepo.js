import prisma from '../config/db.js';

export async function createBooking({ 
  user_id, 
  room_id, 
  check_in, 
  check_out, 
  total_price, 
  status 
}) {
  return await prisma.booking.create({
    data: {
      user_id,
      room_id,
      check_in,
      check_out,
      total_price,
      status,
    },
  });
}

export async function findAllBookings() {
  return await prisma.booking.findMany();
}

export async function findBookingById(id) {
  return await prisma.booking.findUnique({
    where: { id },
  });
}

export async function updateBookingById(id, data) {
  return await prisma.booking.update({
    where: { id },
    data,
  });
}

export async function deleteBookingById(id) {
  return await prisma.booking.delete({
    where: { id },
  });
}
