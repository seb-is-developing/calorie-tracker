const isoDay = (d = new Date()) => d.toISOString().split("T")[0];

const yesterdayIsoDay = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return isoDay(d);
};

export const rollOverIfNewDay = async (user) => {
  const today = isoDay();
  const lastResetIso = user.lastResetDate ? isoDay(user.lastResetDate) : null;
  if (lastResetIso === today) return false;

  const yday = yesterdayIsoDay();

  const consumedTotal = (user.consumedCalories || []).reduce(
    (sum, item) => sum + item.total,
    0,
  );

  const existing = (user.totalConsumedCalories || []).find(
    (item) => item.date === yday,
  );
  if (existing) {
    existing.consumedTotal = consumedTotal;
  } else {
    user.totalConsumedCalories.push({
      date: yday,
      consumedTotal,
    });
  }

  user.consumedCalories = [];
  user.amountOfExercise = [];

  user.lastResetDate = new Date();

  await user.save();

  return true;
};
