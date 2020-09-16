import React, {useEffect, useState} from 'react';
import APIHandler from '../APIHandler';
import Table from '../components/Table';
import {Error} from '../components/AuthForm';

function ReviewList(props) {
  const labels = ['리뷰 정책 이름', '생성자', '생성일'];
  const [list, setList] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    APIHandler.get('/policy').then(result => {
      if (result.status === 200) {
        setList(result.data);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }, []);

  return (
      <div>
        <h2>ReviewList</h2>
        <Table labels={labels} items={list}/>

        {isError && <Error>데이터를 가져오는 도중 문제가 발생했습니다. 관리자에게 문의하세요!</Error>}
      </div>
  );
}

ReviewList.routeName = '/list';
export default ReviewList;
