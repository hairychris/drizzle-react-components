import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import { View, Text } from 'react-native';
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class AccountData extends Component {
  constructor(props, context) {
    super(props);

    this.precisionRound = this.precisionRound.bind(this);
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision)
    return Math.round(number * factor) / factor
  }

  render() {
    // No accounts found.
    if(Object.keys(this.props.accounts).length === 0) {
      return (
        <Text>Initializing...</Text>
      )
    }

    // Get account address and balance.
    const address = this.props.accounts[this.props.accountIndex]
    var balance = this.props.accountBalances[address]
    const units = this.props.units ? this.props.units.charAt(0).toUpperCase() + this.props.units.slice(1) : 'Wei'

    // Convert to given units.
    if (this.props.units) {
      balance = this.context.drizzle.web3.utils.fromWei(balance, this.props.units)
    }

    // Adjust to given precision.
    if (this.props.precision) {
      balance = this.precisionRound(balance, this.props.precision)
    }

    return(
      <View>
        <Text h4>{address}</Text>
        <Text>{balance} {units}</Text>
      </View>
    )
  }
}

AccountData.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    accountBalances: state.accountBalances    
  }
}

export default drizzleConnect(AccountData, mapStateToProps)
