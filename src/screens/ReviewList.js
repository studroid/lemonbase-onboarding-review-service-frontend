import React, {useEffect, useState} from 'react';
import APIHandler from '../APIHandler';
import Table from '../components/Table';
import {Error, SmallButton} from '../components/StyledComponents';
import {Link, useHistory} from 'react-router-dom';
import ReviewUpdate from './ReviewUpdate';
import ReviewCreate from './ReviewCreate';
import SuperComponent from '../super/SuperComponent';

function Component(props) {
  const labels = ['리뷰 정책 이름', '생성자', '생성일'];
  const [isError, setIsError] = useState(false);

  const history = useHistory();

  function onPolicyClicked(policy_id) {
    ReviewUpdate.prepare(policy_id).then(data => {
      history.push(ReviewUpdate.routeName, {defaultData: data});
    }).catch(e => {
      setIsError(true);
    })
  }

  return (
      <div>
        <h2>ReviewList</h2>
        <Table labels={labels} items={props.location.state.defaultData} onItemClick={onPolicyClicked}/>
        <Link to={ReviewCreate.routeName}>
          <SmallButton>리뷰 정책 생성</SmallButton>
        </Link>
        {isError && <Error>데이터를 가져오는 도중 문제가 발생했습니다. 관리자에게 문의하세요!</Error>}
      </div>
  );
}

function prepare() {
  return APIHandler.get(`/policy/`).then(result => {
    if (result.status === 200) {
      return result.data;
    } else {
      throw `Status code returned: ${result.status}`;
    }
  }).catch(e => {
    throw 'Error';
  });
}

const ReviewList = {
  ...SuperComponent,
  routeName: '/list',
  component: Component,
  prepare: prepare,
}

export default ReviewList;
