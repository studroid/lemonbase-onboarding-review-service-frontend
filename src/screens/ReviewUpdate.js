import React from 'react';
import {useParams} from 'react-router-dom';

function ReviewUpdate(props) {
  const {id} = useParams();
  return <h2>ReviewUpdate{id}</h2>;
}

ReviewUpdate.routeName = '/update/:id';
export default ReviewUpdate;
