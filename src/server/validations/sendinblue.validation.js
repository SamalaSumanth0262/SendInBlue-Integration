const {commonValidations} = require('./common.validation');
module.exports = {
  //TO_DO: write validation for form - data
  createMailerList: {
    body: {
      listName: commonValidations.stringRequired,
      folderId: commonValidations.emailRequired,
      fileUrl: commonValidations.stringRequired
    }
  }
};
