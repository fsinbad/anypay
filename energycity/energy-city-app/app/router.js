import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  //this.route('geolocate', { path: '/' });
  this.route('city', { path: '/cities/:city' });
  this.route('business', { path: '/:city/businesses/:stub' });
  this.route('cities', { path: '/' });
  this.route('moneybutton-auth-redirect', { path: '/auth/moneybutton/redirect' });
  this.route('payments');
  this.route('logout');
  this.route('index');
});

export default Router;
