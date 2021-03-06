import React from 'react';
import './styles.scss';
import * as Yup from 'yup';
import {Formik} from 'formik';
import TextInput from '../Formik/TextInput';
import Button from '../common/Button';
import {createMailList} from './client';
import {toast} from 'react-toastify';
import DropDown from '../Formik/DropDown';
import CkEditor from '../Formik/CkEditor';

const mailSchema = Yup.object().shape({
  fileUrl: Yup.string().required('Link is Required'),
  listName: Yup.string().required('Mail list name is Required'),
  folderId: Yup.number('Folder ID cannot be a text..').required('Folder Id is required')
});

class CreateMailList extends React.Component {
  state = {
    initialValues: {
      fileUrl: '',
      listName: '',
      folderId: ''
    }
  };
  async handleSubmitForm({values, actions}) {
    actions.setSubmitting(true);
    var result = await createMailList(values);
    actions.setSubmitting(false);
    actions.resetForm();
    toast.success('Mailer List Created Successfully..');
  }

  render() {
    const renderView = (props) => {
      return (
        <form onSubmit={props.handleSubmit}>
          <div className="p-2 pt-3">
            <div className="row align-items-end">
              <div className="col-sm-6">
                <TextInput
                  type="text"
                  labelName="fileUrl"
                  placeholder="Please Enter S3 Link or Google Drive link"
                  labelTitle="Please Enter the csv link:"
                  isMandatory={true}
                />
                <TextInput
                  type="text"
                  labelName="listName"
                  placeholder="list name"
                  labelTitle="Enter List name"
                  isMandatory={true}
                />
                <TextInput
                  type="number"
                  labelName="folderId"
                  placeholder="Just a another number"
                  labelTitle="Folder ID for Send In Blue reference"
                  isMandatory={true}
                />
              </div>
              <div className="offset-md-3 col-sm-3">
                <Button type="submit" text="Create Mail List" isSpinning={props.isSubmitting} />
              </div>
            </div>
          </div>
        </form>
      );
    };
    return (
      <Formik
        initialValues={this.state.initialValues}
        render={renderView}
        validationSchema={mailSchema}
        onSubmit={(values, actions) => {
          console.log('CreateMailList -> render -> actions', actions);
          this.handleSubmitForm({values, actions});
        }}
      />
    );
  }
}

export default CreateMailList;
