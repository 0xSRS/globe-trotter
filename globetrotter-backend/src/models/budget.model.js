const prisma = require('../config/db');

async function upsertBudgetEntry(tripId, category, amount) {
  const existing = await prisma.budget.findFirst({
    where: { tripId, category },
  });

  if (existing) {
    return prisma.budget.update({
      where: { id: existing.id },
      data: { amount },
    });
  }

  return prisma.budget.create({
    data: { tripId, category, amount },
  });
}

async function getBudgetBreakdown(tripId) {
  const [manualEntries, stops] = await Promise.all([
    prisma.budget.findMany({ where: { tripId } }),
    prisma.tripStop.findMany({
      where: { tripId },
      include: {
        activities: {
          include: { activity: true },
        },
      },
    }),
  ]);

  // Manual entries the user has explicitly set (e.g. transport, stay, meals)
  const manualByCategory = {};
  let manualTotal = 0;
  for (const entry of manualEntries) {
    manualByCategory[entry.category] = entry.amount;
    manualTotal += entry.amount;
  }

  // Planned/estimated costs derived from the itinerary itself
  let sectionBudgetTotal = 0;
  let activitiesTotal = 0;

  for (const stop of stops) {
    if (stop.budgetForSection) {
      sectionBudgetTotal += stop.budgetForSection;
    }
    for (const tsa of stop.activities) {
      const cost = tsa.costOverride !== null && tsa.costOverride !== undefined
        ? tsa.costOverride
        : tsa.activity.cost;
      activitiesTotal += cost || 0;
    }
  }

  const estimatedTotal = manualTotal + sectionBudgetTotal + activitiesTotal;

  const numDays = stops.length > 0
    ? Math.max(
        1,
        Math.round(
          (new Date(Math.max(...stops.map((s) => new Date(s.endDate)))) -
            new Date(Math.min(...stops.map((s) => new Date(s.startDate))))) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 1;

  return {
    breakdown: {
      transport: manualByCategory.transport || 0,
      stay: manualByCategory.stay || 0,
      meals: manualByCategory.meals || 0,
      activities: activitiesTotal,
      sectionBudgets: sectionBudgetTotal,
    },
    manualTotal,
    estimatedTotal,
    averageCostPerDay: Math.round((estimatedTotal / numDays) * 100) / 100,
  };
}

module.exports = {
  upsertBudgetEntry,
  getBudgetBreakdown,
};