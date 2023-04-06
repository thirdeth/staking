/* PLOP_INJECT_IMPORT_REDUCER */
import ido from './ido/reducer';
import modals from './modals/reducer';
import staking from './staking/reducer';
import ui from './ui/reducer';
import user from './user/reducer';
import vault from './vault/reducer';

export default {
  ui,
  user,
  modals,
  /* PLOP_INJECT_PLACE_REDUCER */
  ido,
  staking,
  vault,
};
