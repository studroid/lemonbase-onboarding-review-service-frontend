import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import ReviewDetail from '../components/ReviewDetail';
import {Error} from '../components/StyledComponents';
import ReviewList from './ReviewList';
import SuperComponent from '../super/SuperComponent';
import reviewMachine from "../xstate/reviewMachine";
import {useMachine} from "@xstate/react";

function Component(props) {
  const [reviewState, reviewSend] = useMachine(reviewMachine);

  useEffect(() => {
      if(reviewState.matches('success')) {
        history.push(ReviewList.routeName);
      }
  })

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
