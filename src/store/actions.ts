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
    const dateTime = 'YYYY-MM-DD';

    context.commit(Mutations.ADD_DAILY_ORDER, { dateTime, order });
  },
};

export default actions;
