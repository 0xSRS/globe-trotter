function normalizeToMidnight(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function computeTripStatus(trip) {
  const today = normalizeToMidnight(new Date());
  const startDate = normalizeToMidnight(trip.startDate);
  const endDate = normalizeToMidnight(trip.endDate);

  if (startDate > today) {
    return 'upcoming';
  }

  if (endDate < today) {
    return 'completed';
  }

  return 'ongoing';
}

module.exports = computeTripStatus;