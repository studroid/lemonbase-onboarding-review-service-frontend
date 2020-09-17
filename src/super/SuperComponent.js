import React from 'react';

function Component(props) {
  return (
      <div>
        <h2>The key 'component' is missing in export object</h2>
        <p>Please specify the component for this page!</p>
      </div>
  );
}

function prepare() {
  alert('Prepare is not implemented');
  return new Promise((resolve, reject) => {
    reject();
  });
}

const SuperComponent = {
  routeName: '/',
  component: Component,
  prepare: prepare,
};

export default SuperComponent;
