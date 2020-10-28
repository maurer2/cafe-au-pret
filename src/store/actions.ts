import { Mutations, Actions, ActionsType } from './types';

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
    const dateTime: string = context.getters.getCurrentDateKey;

    context.commit(Mutations.ADD_DAILY_ORDER, { dateTime, order });
  },
  async [Actions.UPDATE_CURRENT_DATE](context, dateTime) {
    context.commit(Mutations.UPDATE_CURRENT_DATE, dateTime);
  },
};

export default actions;
