import { useEffect, useState } from 'react';
import { Nullable } from 'types';

import { DateLike, ITimeLeft } from './useTimeLeft.types';

const MILLISECONDS = 1;
const SECONDS = 1000 * MILLISECONDS;
const MINUTE = 60 * SECONDS;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
/**
 * Calculates time left from endTime to now
 * @param endTime
 * @returns {
 *     days:number;
 *     hours:number;
 *     minutes:number;
 *     seconds:number;
 * } | null
 */
export const useTimeLeft = (endTime: DateLike): Nullable<ITimeLeft> => {
  const calculateTimeLeft = (): Nullable<ITimeLeft> => {
    const dateEndTime = new Date(endTime);
    const difference = +dateEndTime - Date.now();
    let timeLeft: Nullable<ITimeLeft> = null;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / DAY),
        hours: Math.floor((difference % DAY) / HOUR),
        minutes: Math.floor((difference % HOUR) / MINUTE),
        seconds: Math.floor((difference % MINUTE) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Nullable<ITimeLeft>>(calculateTimeLeft());

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  });

  return timeLeft;
};
