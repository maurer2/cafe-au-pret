import { Mutations, Actions, ActionsType } from './types';
import { storageIsAvailable } from '../util/storageUtil';

const actions: ActionsType = {
  async [Actions.INCREASE_ZOOM](context) {
    context.commit(Mutations.UPDATE_ZOOM, 10);
  },
  async [Actions.DECREASE_ZOOM](context) {
    context.commit(Mutations.UPDATE_ZOOM, -10);
  },
  async [Actions.RESET_ZOOM](context) {
    context.commit(Mutations.UPDATE_ZOOM, 0);
  },
  async [Actions.ADD_ORDER](context, order: Order) {
    const dateKey: string = context.getters.getCurrentDateKey;
    const { isBlocked }: { isBlocked: boolean } = context.getters;
    const { dateTime } = order;

    if (isBlocked) {
      throw new Error('Blocked');
    } else {
      context.commit(Mutations.ADD_DAILY_ORDER, { dateKey, order });
      context.commit(Mutations.SET_BLOCKING_TIMEOUT, dateTime);

      if (storageIsAvailable()) {
        context.commit(Mutations.PERSIST_ORDER, { dateKey });
      }
    }
  },
  async [Actions.UPDATE_CURRENT_DATE](context, dateTime) {
    context.commit(Mutations.UPDATE_CURRENT_DATE, dateTime);
  },
};

export default actions;
