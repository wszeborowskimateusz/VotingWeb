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
    bootbox.confirm({
      message,
      callback,
      centerVertical: true,
      className: 'modal-open',
    });
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
