import * as Sequelize from 'sequelize';
import * as sequelize from '../database';

var Account = require('./account');
var AccessToken = require('./access_token');
var Address = require('./address');
var Ambassador = require('./ambassador')(sequelize, Sequelize);
var AmbassadorClaim = require('./ambassador_claim')(sequelize, Sequelize);
var AmbassadorTeam = require('./ambassador_team')(sequelize, Sequelize);
var AmbassadorTeamMember = require('./ambassador_team_member')(sequelize, Sequelize);
var DashBackMerchant = require('./dash_back_merchant');
var DashBackMerchantPayment = require('./dash_back_merchant_payment');
var DashBackCustomerPayment = require('./dash_back_customer_payment');
var MerchantBountyReward = require('./merchant_bounty_reward');
var Invoice = require('./invoice');
var PaymentForward = require('./payment_forward');
var PaymentForwardInputPayment = require('./payment_forward_input_payment');
var PaymentForwardOutputPayment = require('./payment_forward_output_payment');
var PayrollAccount = require('./payroll_account');
var PayrollInvoice = require('./payroll_invoice');
var PayrollPayment = require('./payrollpayment');
var AmbassadorTeamJoinRequest = require('./ambassador_team_join_request')(sequelize, Sequelize);
var DashInstantsendTransaction = require('./dash_instantsend_transaction')(sequelize, Sequelize);

export {
  Account,
  AccessToken,
  Address,
  Ambassador,
  AmbassadorClaim,
  AmbassadorTeam,
  AmbassadorTeamMember,
  DashBackMerchant,
  DashBackMerchantPayment,
  DashBackCustomerPayment,
  Invoice,
  PaymentForward,
  PaymentForwardInputPayment,
  PaymentForwardOutputPayment,
  PayrollAccount,
  PayrollInvoice,
  PayrollPayment,
  MerchantBountyReward,
  AmbassadorTeamJoinRequest,
  DashInstantsendTransaction
};

