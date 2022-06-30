import modals from './modals/reducer';
/* PLOP_INJECT_IMPORT_REDUCER */
import staking from './staking/reducer';
import ui from './ui/reducer';
import user from './user/reducer';

export default {
  ui,
  user,
  modals,
  /* PLOP_INJECT_PLACE_REDUCER */
  staking,
};
