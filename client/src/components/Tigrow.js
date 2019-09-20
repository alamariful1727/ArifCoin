import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getMessages, newMessage } from './../actions/message.action';
import { dateFormatter } from './../helpers/index';

class Tigrow extends Component {
  state = {
    inputMessage: '',
    user: {},
  };

  componentDidMount() {
    this.props.getMessages();
  }

  dateFormat = date => {
    return dateFormatter(date);
  };

  onSubmit = async e => {
    e.preventDefault();
    const { inputMessage } = this.state;

    let newMsg = {
      text: inputMessage,
    };
    await this.props.newMessage(newMsg);

    // Clear State
    this.setState({
      inputMessage: '',
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { inputMessage } = this.state;
    return (
      <>
        <h1 className="text-center">TiGrow-Chat</h1>
        <div className="offset-lg-3 col-lg-6 my-3">
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="inputMessage">Enter your message</Label>
              <Input
                type="textarea"
                required
                name="inputMessage"
                id="inputMessage"
                rows="3"
                value={inputMessage}
                onChange={this.onChange}
              />
            </FormGroup>
            <Button type="submit" className="btn btn-success">
              Send
            </Button>
          </Form>
        </div>
        <div className="messages"></div>
      </>
    );
  }
}

Tigrow.propTypes = {
  getMessages: PropTypes.func.isRequired,
  newMessage: PropTypes.func.isRequired,
  msg: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
  auth: state.auth,
  msg: state.msg,
  isAuthenticate: state.auth.isAuthenticate,
});

export default connect(
  mapStateToProps,
  {
    getMessages,
    newMessage,
  },
)(Tigrow);
