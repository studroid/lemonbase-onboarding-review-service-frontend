import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import ReviewDetail from '../components/ReviewDetail';
import {Error} from '../components/StyledComponents';
import ReviewList from './ReviewList';
import SuperComponent from '../super/SuperComponent';
import {useMachine, useService} from "@xstate/react";
import {useReviewStore} from "../zustand/reviewStore";
import reviewMachine from "../xstate/reviewMachine";

function Component(props) {
  const [reviewState, reviewSend] = useService(reviewMachine);
  const reviewStore = useReviewStore();

  useEffect(() => {
      if(reviewState.matches('success')) {
        history.push(ReviewList.routeName);
      }
  });

  useEffect(() => {
      // reviewStore.setService(service);
      reviewStore.setMachine(reviewState, reviewSend);
  }, [])

  const history = useHistory();

  function onSubmitClicked(detail_data) {
      reviewSend('CALL', {apiType: 'create', detailData: detail_data});
  }

  return (
      <div>
        <h2>ReviewCreate</h2>
        <ReviewDetail buttonName='생성하기' onSubmitClicked={onSubmitClicked}/>
        {reviewState.matches('failure') && <Error>정책 생성 도중 문제가 발생했습니다. 입력을 다시 확인하세요!</Error>}
      </div>
  );
}

const ReviewCreate = {
  ...SuperComponent,
  routeName: '/create',
  component: Component,
}

export default ReviewCreate;
