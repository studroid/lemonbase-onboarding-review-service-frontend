import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import ReviewDetail from '../components/ReviewDetail';
import APIHandler from '../APIHandler';
import {Error} from '../components/StyledComponents';
import ReviewList from './ReviewList';

function ReviewCreate(props) {
  const [isError, setIsError] = useState(false);

  const history = useHistory();

  function onSubmitClicked(detail_data) {
    APIHandler.post('/policy/', detail_data).then(result => {
      if (result.status == 201) {
        alert('리뷰 정책이 생성되었습니다!');
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
        <h2>ReviewCreate</h2>
        <ReviewDetail buttonName='생성하기' onSubmitClicked={onSubmitClicked}/>
        {isError && <Error>정책 생성 도중 문제가 발생했습니다. 입력을 다시 확인하세요!</Error>}
      </div>
  );
}

ReviewCreate.routeName = '/create';
export default ReviewCreate;
