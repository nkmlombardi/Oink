import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Theme from '../material-theme.js'
import { authRedirect, authLogout } from '../actions/api/authActions'
import { getInitialState } from '../actions/api/apiActions'
import { changeView, switchComponent, showSettings } from '../actions/actions'
import SideNav from '../components/dashboard/sidenav/SideNav'
import Budget from './Budget'
import Goals from './Goals'
import Options from '../components/dashboard/Options'
import ComponentPlayground from './ComponentPlayground'
import { DROPDOWN_ACTIONS } from '../constants/componentActions'

class Dashboard extends React.Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    }
  }

  //Render home container with chart, budget input, and navbar
  componentWillMount() {
    this.checkAuth()
  }

  //Call init when component is mounted
  componentDidMount() {
    this.init()
  }

  //Get initial state of app, including all of user's transactions
  init() {
    this.props.actions.getInitialState()
  }

  checkAuth() {
    const { actions, isAuthenticated } = this.props
    if (!isAuthenticated) {
      actions.authRedirect()
    }
  }

  handleNavigation(component) {
    const { actions } = this.props
    actions.switchComponent(component)
  }

  render() {
    const { actions, currentComponent, data, homePage } = this.props
    return (
      <div className="dashboard-el">
      
        <SideNav
          changeView={ actions.changeView }
          handleNavigation = {this.handleNavigation.bind(this)}
          dropDownComponents = { DROPDOWN_ACTIONS } />

        <div className="dashboard">
      
          <div className="options u-pull-right">
            <Options logout={ actions.authLogout } showSettings={ actions.showSettings }/>
          </div>

          <div className="header">
            <div className="container">
              <div className="row">

                <h1>{ currentComponent.text }</h1>

              </div>
            </div>
          </div>

          <div className="view-container container">
            <ComponentPlayground
              currentComponent = { currentComponent } />
          </div>

        </div>

      </div>
    )
  }
}

Dashboard.childContextTypes = {
  muiTheme: PropTypes.object
}

function mapStateToProps(state) {
  return {
    isLoading: state.asyncStatus.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
    homePage: state.homePage,
    isAuthenticated: state.auth.isAuthenticated,
    currentComponent: state.dashboard.currentComponent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getInitialState,
      authRedirect,
      authLogout,
      showSettings,
      changeView,
      switchComponent
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)