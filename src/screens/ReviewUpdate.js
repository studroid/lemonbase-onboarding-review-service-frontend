import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import ReviewDetail from '../components/ReviewDetail';
import {Error, SmallButton} from '../components/StyledComponents';
import APIHandler from '../APIHandler';
import ReviewList from './ReviewList';
import SuperComponent from '../super/SuperComponent';
import reviewMachine from "../xstate/reviewMachine";
import {useMachine} from "@xstate/react";

function Component(props) {
  const [reviewState, reviewSend] = useMachine(reviewMachine);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
      if(reviewState.matches('success')) {
        history.push(ReviewList.routeName);
      }
  }, [reviewState])

  const history = useHistory();
  const {id} = useParams();

  function onUpdateClicked(detail_data) {
    reviewSend('CALL', {apiType: 'update', reviewId: id, detailData: detail_data});
  }

  function onDeleteClick() {
    APIHandler.delete(`/policy/${id}`).then(result => {
      if (result.status === 204) {
        alert('리뷰 정책이 삭제되었습니다.');
        history.push(ReviewList.routeName);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if(reviewState.matches('success')) {
      history.push(ReviewList.routeName);
  }

  return (
      <div>
        <h2>ReviewUpdate{id}</h2>
        <ReviewDetail buttonName='수정하기' onSubmitClicked={onUpdateClicked}
                      defaultData={props.location.state.defaultData}/>
        <SmallButton danger onClick={onDeleteClick}>삭제하기</SmallButton>
        {(reviewState.matches('failure') || isError) && <Error>처리 도중 문제가 발생했습니다. 입력을 다시 확인하세요!</Error>}
      </div>
  );
}

const routeBase = '/update';

const ReviewUpdate = {
  ...SuperComponent,
  routeBase: routeBase,
  routeName: `${routeBase}/:id`,
  component: Component,
};
export default ReviewUpdate;
