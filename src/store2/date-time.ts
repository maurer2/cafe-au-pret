import { defineStore } from 'pinia'

import {
  getTimeFormatted,
  getDateFormatted,
  getCurrentDateISO,
} from '../util/dateUtil';

export const useDateTimeStore = defineStore('dateTime', {
  state: () => ({
    currentDateTime: new Date(),
    blockingDuration: 1,
    blockingTimeoutEnd: null as Date | null,
    refreshTimeoutInSeconds: 10,
    dateTimeFormatter: new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
  }),
  getters: {
    getCurrentDateKey: (state): string => {
      const { currentDateTime, dateTimeFormatter } = state;

      const isoString = getCurrentDateISO(dateTimeFormatter, currentDateTime);

      return isoString;
    },
    getCurrentDate: (state): string => {
      const { currentDateTime, dateTimeFormatter } = state;

      const dateFormatted = getDateFormatted(dateTimeFormatter, currentDateTime);

      return dateFormatted;
    },
    getCurrentTime: (state): string => {
      const { currentDateTime, dateTimeFormatter } = state;

      const timeFormatted = getTimeFormatted(dateTimeFormatter, currentDateTime);

      return timeFormatted;
    },
    isBlocked: (state): boolean => {
      const { blockingTimeoutEnd, currentDateTime } = state;

      if (blockingTimeoutEnd === null) {
        return false;
      }

      const differenceInMS = blockingTimeoutEnd.getTime() - currentDateTime.getTime();

      return Math.sign(differenceInMS) === 1;
    },
    getRemainingBlockingTime: (state): number => {
      const { blockingTimeoutEnd, currentDateTime } = state;

      if (blockingTimeoutEnd === null) {
        return 0;
      }

      const differenceInMS = blockingTimeoutEnd.getTime() - currentDateTime.getTime();

      return Math.sign(differenceInMS) === 1 ? differenceInMS : 0;
    },
  },
  actions: {
    async SET_CURRENT_DATE(newDateTime: Date): Promise<void> {
      this.currentDateTime = newDateTime
    },
    async SET_BLOCKING_TIMEOUT(blockingDateTime: Date | null): Promise<void> {
      if (blockingDateTime === null) {
        this.blockingTimeoutEnd = null;

        return
      }

      const blockingDurationMs: number = this.blockingDuration * 60 * 1000;
      const startDateMs: number = blockingDateTime.getTime();
      const endDateMs: number = startDateMs + blockingDurationMs;

      const blockingTimeoutEnd = new Date(endDateMs);

      this.blockingTimeoutEnd = blockingTimeoutEnd;
    }
  },
})
