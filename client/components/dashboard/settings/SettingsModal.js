import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import { Link } from 'react-router'
import AccountSettingsField from './AccountSettingsField'
import CommunicationSettingsField from './CommunicationSettingsField'

class SettingsModal extends Component {

  componentDidUpdate() {
    if (this.props.showSettings) {
      this.refs.modal.show()
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { showSettings } = this.props
    showSettings ? this.handleSettings() : null
  }

  handleSettings() {

    const { accountData, communicationData } = this.props

    console.log('ACCOUNT DATA:', accountData)
    console.log('COMMUNICATION DATA', communicationData)
    console.log('PROPS:', this.props)

    let completeData = {}

    for (let key in accountData) {
      completeData[key] = accountData[key]
    }

    for (let key in communicationData) {
      completeData[key] = communicationData[key]
    }

    this.props.postSettings(completeData)
    this.props.hideSettingsModal()
    this.refs.modal.dismiss()
  }

  handleCancel(e) {
    e.preventDefault()
    const { showSettings, hideSettingsModal } = this.props
    showSettings ? hideSettingsModal() : null
    this.refs.modal.dismiss()
  }

  parsePhoneNumber(num) {
    if (num.length === 10) {
      return "(" + num.slice(0, 3) + ")" + num.slice(3, 6) + "-" + num.slice(6)
    }
    return num
  }

  render() {
    let user = {
      firstName: this.props.data.user ? this.props.data.user.first_name : '',
      lastName: this.props.data.user ? this.props.data.user.last_name : '',
      phoneNumber: this.props.data.user ? this.props.data.user.phone_number : ''
    }

    let userData = [
      {property: user.firstName, title: 'First Name', key: 'FIRST_NAME', editing: this.props.editingFirstName},
      {property: user.lastName,  title: 'Last Name', key: 'LAST_NAME', editing: this.props.editingLastName},
      {property: user.email,  title: 'Email', key: 'EMAIL', editing: this.props.editingEmail},
    ]

    let CommunicationData = [
      {property: this.parsePhoneNumber(user.phoneNumber), title: 'Phone Number', key: 'PHONE_NUMBER', editing: this.props.editingPhoneNumber}
    ]

    let modalActions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleCancel.bind(this)} />,
      <FlatButton
        key={1}
        label="Save"
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)} />
    ]

    return (
      <Dialog
        ref="modal"
        // title="Settings"
        actions={modalActions}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        modal={true}
      >
        <Tabs>
          <Tab label="Account" >
            <div className="modal-content">

              <AccountSettingsField
                userData={userData}
                editStart={this.props.editStart}
                editFinish={this.props.editFinish}
                firstName={user.firstName}
                editingFirstName={this.props.editingFirstName}
                lastName={user.lastName}
                editingLastName={this.props.editingLastName}
                updateAccountSettings={this.props.updateAccountSettings}
                updateCommunicationSettings={this.props.updateCommunicationSettings}
              />
              
            </div>
          </Tab>
          <Tab label="Communication" >

            <CommunicationSettingsField
              phoneNumber={user.phoneNumber}
            />

          </Tab>
          <Tab
            label="Item Three"
            route="home"
            onActive={this._handleTabActive} />
        </Tabs>
      </Dialog>
    )
  }
}

SettingsModal.propTypes = {
  showSettings: PropTypes.bool.isRequired,
  hideSettingsModal: PropTypes.func.isRequired,
  showSettingsModal: PropTypes.func.isRequired
}

export default SettingsModal
