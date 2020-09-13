import React, {Component} from 'react';

class ReviewUpdate extends Component {
  render() {
    const params = this.props.match.params;
    return <h2>ReviewUpdate{params.id}</h2>;
  }
}

export default ReviewUpdate;
