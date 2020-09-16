import React from 'react';
import {useParams} from 'react-router-dom';

function ReviewUpdate(props) {
  let {id} = useParams();
  return <h2>ReviewUpdate{id}</h2>;
}

ReviewUpdate.routeBase = '/update';
ReviewUpdate.routeName = ReviewUpdate.routeBase + '/:id';
export default ReviewUpdate;
