import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChain } from './../actions/arifCoin.action';
import { Blockchain } from './arifCoin/Blockchain';

class Home extends Component {
  componentDidMount() {
    this.props.getChain();
  }
  render() {
    const { auth, arifCoin } = this.props;
    const { blockchain } = arifCoin;

    return (
      <div>
        <h1 className="text-center">ArifCoin's Chain!!</h1>
        <Blockchain blockchain={blockchain} />
      </div>
    );
  }
}
Home.propTypes = {
  auth: PropTypes.object.isRequired,
  arifCoin: PropTypes.object.isRequired,
  getChain: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  arifCoin: state.arifCoin,
});

export default connect(
  mapStateToProps,
  { getChain },
)(Home);
