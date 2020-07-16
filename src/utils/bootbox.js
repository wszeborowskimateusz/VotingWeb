import i18n from '../i18n';

const bootbox = require('bootbox');

export default {
  alert(message) {
    bootbox.alert({
      message,
      backdrop: true,
      centerVertical: true,
      className: 'modal-open',
    });
  },
  confirmationDialog(message, callback) {
    this.customConfirmationDialog(
      message,
      (isAccepted) => {
        if (isAccepted) {
          callback();
        }
      },
      i18n.tc('common.confirm'),
      i18n.tc('common.cancel'),
    );
  },
  customConfirmationDialog(message, callback, confirmTitle, declineTitle) {
    bootbox.confirm({
      message,
      callback,
      backdrop: true,
      centerVertical: true,
      className: 'modal-open',
      buttons: {
        confirm: {
          label: `<i class="fa fa-check"></i> ${confirmTitle}`,
        },
        cancel: {
          label: `<i class="fa fa-times"></i> ${declineTitle}`,
        },
      },
    });
  },
};
