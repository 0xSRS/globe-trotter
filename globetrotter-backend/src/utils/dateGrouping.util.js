function toDateOnly(date) {
  return new Date(date).toISOString().slice(0, 10);
}

function groupTripStopsByDay(trip) {
  const tripStartDate = new Date(trip.startDate);
  const dayMap = new Map();

  for (const stop of trip.stops) {
    for (const tsa of stop.activities) {
      const scheduledDate = tsa.scheduledDate ? new Date(tsa.scheduledDate) : new Date(stop.startDate);
      const dateKey = toDateOnly(scheduledDate);

      if (!dayMap.has(dateKey)) {
        const dayNumber =
          Math.floor((scheduledDate.setHours(0, 0, 0, 0) - new Date(tripStartDate).setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)) + 1;

        dayMap.set(dateKey, {
          day: dayNumber,
          date: dateKey,
          stops: new Map(),
        });
      }

      const dayEntry = dayMap.get(dateKey);

      if (!dayEntry.stops.has(stop.id)) {
        dayEntry.stops.set(stop.id, {
          city: stop.city,
          activities: [],
        });
      }

      dayEntry.stops.get(stop.id).activities.push({
        name: tsa.activity.name,
        time: tsa.scheduledTime,
        cost: tsa.costOverride ?? tsa.activity.cost,
      });
    }
  }

  const days = Array.from(dayMap.values())
    .sort((a, b) => a.day - b.day)
    .map((d) => ({
      day: d.day,
      date: d.date,
      stops: Array.from(d.stops.values()),
    }));

  return days;
}

module.exports = { groupTripStopsByDay };