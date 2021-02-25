import React, {useEffect, useState} from 'react';
import {Form, Input, SmallButton} from './StyledComponents';
import {useReviewStore} from "../zustand/reviewStore";
import {useService} from "@xstate/react";

function ReviewDetail(props) {
  const defaultData = props.defaultData || {};
  const [name, setName] = useState(defaultData.name || '');
  const [reviewees, setReviewees] = useState(defaultData.reviewees || []);
  const [question, setQuestion] = useState(defaultData.question || {title: '', description: ''});
  const reviewStore = useReviewStore();

  function buildDetailData() {
      console.log("RD :" + reviewStore.service.state.context.count);
    return {
      name,
      reviewees,
      question,
    };
  }

  return (
      <Form>
        <label>* 리뷰 정책 이름: <Input type="text" value={name} onChange={e => {
          setName(e.target.value);
        }}/></label>
        <label>리뷰 받는 사람: <Input type="text" value={reviewees.join(',')}
                                onChange={e => {
                                  setReviewees((e.target.value).split(','));
                                }}/></label>
        <label>* 질문: <Input type="text" value={question.title} onChange={e => {
          setQuestion(
              {title: e.target.value, description: question.description});
        }}/></label>
        <label>* 질문 설명: <Input type="text" value={question.description}
                               onChange={e => {
                                 setQuestion({
                                   title: question.title,
                                   description: e.target.value,
                                 });
                               }}/></label>

        <SmallButton onClick={() => props.onSubmitClicked(
            buildDetailData())}>{props.buttonName}</SmallButton>
      </Form>
  );
}

export default ReviewDetail;
