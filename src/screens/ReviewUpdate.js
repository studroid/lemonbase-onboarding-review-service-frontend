import React, {useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import ReviewDetail from '../components/ReviewDetail';
import {Error, SmallButton} from '../components/StyledComponents';
import APIHandler from '../APIHandler';
import ReviewList from './ReviewList';

function ReviewUpdate(props) {
  const [isError, setIsError] = useState(false);

  const history = useHistory();
  const {id} = useParams();

  function onUpdateClicked(detail_data) {
    APIHandler.put(`/policy/${id}/`, detail_data).then(result => {
      if (result.status == 200) {
        alert('리뷰 정책이 변경되었습니다!');
        history.push(ReviewList.routeName);
      } else {
        setIsError(true);
      }

    }).catch(e => {
      setIsError(true);
    });
  }

  function onDeleteClick() {
    APIHandler.delete(`/policy/${id}`).then(result => {
      if (result.status == 204) {
        alert('리뷰 정책이 삭제되었습니다.');
        history.push(ReviewList.routeName);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  return (
      <div>
        <h2>ReviewUpdate{id}</h2>
        <ReviewDetail buttonName='수정하기' onSubmitClicked={onUpdateClicked}
                      defaultData={props.location.state.defaultData}/>
        <SmallButton onClick={onDeleteClick}>삭제하기</SmallButton>
        {isError && <Error>처리 도중 문제가 발생했습니다. 입력을 다시 확인하세요!</Error>}
      </div>
  );
}

ReviewUpdate.routeBase = '/update';
ReviewUpdate.routeName = ReviewUpdate.routeBase + '/:id';
export default ReviewUpdate;
