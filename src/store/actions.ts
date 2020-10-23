import { ActionContext } from 'vuex';
import { MutationsType, ActionsType, StateType } from './types';

type Actions = {
  [key in keyof typeof ActionsType]: (
    context: ActionContext<StateType, StateType>,
    payload?: any,
  ) => Promise<void>;
};

const actions: Actions = {
  async [ActionsType.INCREASE_ZOOM](context) {
    context.commit(MutationsType.UPDATE_ZOOM, 10);
  },
  async [ActionsType.DECREASE_ZOOM](context) {
    context.commit(MutationsType.UPDATE_ZOOM, -10);
  },
  async [ActionsType.RESET_ZOOM](context) {
    context.commit(MutationsType.UPDATE_ZOOM, 0);
  },
  async [ActionsType.ADD_ORDER](context, order: Order) {
    const dateTime = 'YYYY-MM-DD';

    context.commit(MutationsType.ADD_DAILY_ORDER, { dateTime, order });
  },
};

export default actions;
