'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.changeColumn('address_forward_callbacks', 'value', {
            type: Sequelize.DECIMAL
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.changeColumn('address_forward_callbacks', 'value', {
            type: Sequelize.INTEGER
        });
    }
};
//# sourceMappingURL=20190128061833-change-value-to-decimal.js.map