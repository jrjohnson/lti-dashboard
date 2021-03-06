import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
  intl: service(),
  moment: service(),
  currentUser: service(),

  beforeModel() {
    const intl = this.intl;
    const moment = this.moment;
    moment.setLocale(intl.locale);
    window.document.querySelector('html').setAttribute('lang', intl.locale);
  },

  /**
   * Preload the user model and the users roles
   * This makes the initial page rendering (especially the navigation) much smoother
   */
  async afterModel() {
    const currentUser = this.currentUser;
    const user = await currentUser.getModel();
    if (user) {
      await user.roles;
    }
  },
});
