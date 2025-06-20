import { intervals, type TInterval } from '../data';

const getTimeByMinutes = (time: string): number => {
  const hours: number = +time.split(':')[0];
  const minutes: number = +time.split(':')[1];
  const timeByMinutes: number = hours * 60 + minutes;
  return timeByMinutes;
};

export const checkIsCloseTransfer = (
  time: string,
  intervals: TInterval[]
): boolean => {
  return intervals.some((interval) => {
    return (
      getTimeByMinutes(time) >= getTimeByMinutes(interval.close) &&
      getTimeByMinutes(time) < getTimeByMinutes(interval.open)
    );
  });
};

export const getMoscowTime = (): string => {
  return new Date().toLocaleTimeString('ru-RU', {
    timeZone: 'Europe/Moscow',
  });
};

const getCloseInterval = (): TInterval | null => {
  return (
    intervals.find(
      (interval) =>
        getTimeByMinutes(getMoscowTime()) >= getTimeByMinutes(interval.close) &&
        getTimeByMinutes(getMoscowTime()) < getTimeByMinutes(interval.open)
    ) || null
  );
};

const getNextCloseInterval = (): string => {
  let nextInterval = intervals[0].close;
  for (const interval of intervals) {
    if (getTimeByMinutes(interval.close) > getTimeByMinutes(getMoscowTime())) {
      nextInterval = interval.close;
      break;
    }
  }
  return nextInterval;
};

export const getDiffTime = (): string => {
  const interval: TInterval = getCloseInterval() as TInterval;

  if (interval)
    return String(
      getTimeByMinutes(interval.open) - getTimeByMinutes(getMoscowTime())
    );
  const openDiffTime: number =
    getTimeByMinutes(getNextCloseInterval()) -
    getTimeByMinutes(getMoscowTime());
  return String(openDiffTime > 0 ? openDiffTime : openDiffTime * -1);
};

export const pluralize = (number: number): string => {
  const forms = ['минуту', 'минуты', 'минут'];
  if (number % 10 === 1 && number % 100 !== 11) return forms[0];
  else if (
    [2, 3, 4].includes(number % 10) &&
    ![12, 13, 14].includes(number % 100)
  )
    return forms[1];
  else return forms[2];
};
