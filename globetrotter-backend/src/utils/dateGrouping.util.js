function toDateOnly(date) {
  return new Date(date).toISOString().slice(0, 10);
}

function atMidnight(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function dayNumberFor(date, tripStartMidnight) {
  return Math.floor((atMidnight(date).getTime() - tripStartMidnight.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

function getOrCreateDay(dayMap, date, tripStartMidnight) {
  const dateKey = toDateOnly(date);
  if (!dayMap.has(dateKey)) {
    dayMap.set(dateKey, {
      day: dayNumberFor(date, tripStartMidnight),
      date: dateKey,
      stops: new Map(),
    });
  }
  return dayMap.get(dateKey);
}

function getOrCreateStopEntry(dayEntry, stop) {
  if (!dayEntry.stops.has(stop.id)) {
    dayEntry.stops.set(stop.id, {
      city: stop.city,
      activities: [],
    });
  }
  return dayEntry.stops.get(stop.id);
}

function groupTripStopsByDay(trip) {
  const tripStartMidnight = atMidnight(trip.startDate);
  const dayMap = new Map();

  for (const stop of trip.stops) {
    // Seed a day entry for every date the stop actually spans, even if it
    // has no activities attached yet — otherwise a stop with no activities
    // (a normal, common state while building an itinerary) disappears from
    // the view entirely.
    const stopStart = atMidnight(stop.startDate);
    const stopEnd = atMidnight(stop.endDate);

    for (let d = new Date(stopStart); d <= stopEnd; d.setDate(d.getDate() + 1)) {
      const dayEntry = getOrCreateDay(dayMap, d, tripStartMidnight);
      getOrCreateStopEntry(dayEntry, stop);
    }

    // Now attach each activity to the day it's actually scheduled for
    // (falling back to the stop's start date if unscheduled). This can
    // still create a day entry outside the stop's own range if an activity
    // was scheduled oddly — that's intentional, so no activity is ever lost.
    for (const tsa of stop.activities) {
      const scheduledDate = tsa.scheduledDate ? new Date(tsa.scheduledDate) : new Date(stop.startDate);
      const dayEntry = getOrCreateDay(dayMap, scheduledDate, tripStartMidnight);
      const stopEntry = getOrCreateStopEntry(dayEntry, stop);

      stopEntry.activities.push({
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