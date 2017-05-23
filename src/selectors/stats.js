import {formatMinutes, weeksAgo, monthsAgo, yearsAgo} from '../libs/timeFunctions';

export const getSlide = state => ({
  week: state.week.slide,
  month: state.month.slide,
  year: state.year.slide
});
export const getDays = state => ({
  week: state.week.data.days,
  month: state.month.data.days,
  year: state.year.data.days
});
export const getShouldWork = state => ({
  week: formatMinutes(state.week.data.shouldwork),
  month: formatMinutes(state.month.data.shouldwork),
  year: formatMinutes(state.year.data.shouldwork)
});
export const getDidWork = state => ({
  week: formatMinutes(state.week.data.didwork),
  month: formatMinutes(state.month.data.didwork),
  year: formatMinutes(state.year.data.didwork)
});
export const getText = state => ({
  week: weeksAgo(state.week.slide),
  month: monthsAgo(state.month.slide),
  year: yearsAgo(state.year.slide)
});
export const getOverTime = state => ({
  week: state.week.data.didwork >= state.week.data.shouldwork,
  month: state.month.data.didwork >= state.month.data.shouldwork,
  year: state.year.data.didwork >= state.year.data.shouldwork
});