import { drizzleConnect } from 'drizzle-react'
import React, { Children, Component } from 'react'
import { View, Text } from 'react-native';
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class LoadingContainer extends Component {
  render() {
    if (this.props.web3.status === 'failed')
    {
      if (this.props.errorComp) {
        return this.props.errorComp
      }

      return(
        <View>
          <Text h1>⚠️</Text>
          <Text>This browser has no connection to the Ethereum network. Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</Text>
        </View>
      )
    }

    if (this.props.web3.status === 'initialized' && Object.keys(this.props.accounts).length === 0)
    {
      return(
        <View>
          <Text h1>🦊</Text>
          <Text>We can't find any Ethereum accounts! Please check and make sure Metamask or you browser are pointed at the correct network and your account is unlocked.</Text>
        </View>
      )
    }

    if (this.props.drizzleStatus.initialized)
    {
      return Children.only(this.props.children)
    }

    if (this.props.loadingComp) {
      return this.props.loadingComp
    }

    return(
      <View>
        <Text h1>⚙️</Text>
        <Text>Loading dapp...</Text>
      </View>
    )
  }
}

LoadingContainer.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3
  }
}

export default drizzleConnect(LoadingContainer, mapStateToProps)