// ## Plaid Bank log in button

import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/lib/raised-button'

class PlaidButton extends Component {
  componentDidMount() {
    this.props.getKey()
  }

  handlePlaid(e) {
    e.preventDefault()

    const { authenticate, publicKey, accountModal } = this.props

    accountModal.dismiss()

    let sandboxHandler = Plaid.create({
      env: 'tartan',
      clientName: 'Oink',
      key: publicKey,
      product: 'connect',
      onSuccess(public_token) {
        authenticate(public_token)
      },
    })

    sandboxHandler.open()
  }

  render() {
    return (
      <div className="row" style={{padding: '24px'}}>
        <RaisedButton
          label="Link your Bank Account"
          onClick={this.handlePlaid.bind(this)}
          style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}}
        />
      </div>
    )
  }
}

// Specify what props are required by the component
PlaidButton.propTypes = {
  authenticate: PropTypes.func.isRequired,
  accountModal: PropTypes.object.isRequired,
  getKey: PropTypes.func.isRequired,
  publicKey: PropTypes.string.isRequired
}

export default PlaidButton
