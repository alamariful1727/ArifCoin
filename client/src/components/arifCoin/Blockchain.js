import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
} from 'reactstrap';

export class Blockchain extends Component {
  render() {
    const { blockchain } = this.props;
    const cardStyle = {
      'overflow-x': 'scroll',
    };

    return (
      <div style={cardStyle}>
        <Card>
          <CardBody>
            <CardTitle>Block 1</CardTitle>
            <CardSubtitle>Mined by A</CardSubtitle>
            <CardText>
              This is a wider card with supporting text below as a
              natural lead-in to additional content. This card has
              even longer content than the first to show that equal
              height action.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Block 2</CardTitle>
            <CardSubtitle>Mined by B</CardSubtitle>
            <CardText>
              This is a wider card with supporting text below as a
              natural lead-in to additional content. This card has
              even longer content than the first to show that equal
              height action.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Block 3</CardTitle>
            <CardSubtitle>Mined by C</CardSubtitle>
            <CardText>
              This is a wider card with supporting text below as a
              natural lead-in to additional content. This card has
              even longer content than the first to show that equal
              height action.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Block 4</CardTitle>
            <CardSubtitle>Mined by A</CardSubtitle>
            <CardText>
              This is a wider card with supporting text below as a
              natural lead-in to additional content. This card has
              even longer content than the first to show that equal
              height action.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Block 5</CardTitle>
            <CardSubtitle>Mined by B</CardSubtitle>
            <CardText>
              This is a wider card with supporting text below as a
              natural lead-in to additional content. This card has
              even longer content than the first to show that equal
              height action.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Block 6</CardTitle>
            <CardSubtitle>Mined by C</CardSubtitle>
            <CardText>
              This is a wider card with supporting text below as a
              natural lead-in to additional content. This card has
              even longer content than the first to show that equal
              height action.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}
Blockchain.propTypes = {
  blockchain: PropTypes.object.isRequired,
};
