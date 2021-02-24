import APIHandler from "../APIHandler";
import {Machine} from "xstate";
import {reviewStore} from "../zustand/reviewStore";

export default Machine({
    id: "Review API",
    initial: 'idle',
    states: {
        idle: {
            on: {
                CALL: {
                    target: 'loading',
                    actions: () => {
                        console.log(reviewStore.getState().count);
                        reviewStore.setState(state => ({count: state.count+1}));
                    }
                }
            }
        },
        loading: {
            invoke: {
                id: 'reviewCall',
                src: (context, event) => {
                    console.log(reviewStore.getState().count);
                    if (event.apiType === 'create') {
                        return APIHandler.post('/policy/', event.detailData);
                    } else if(event.apiType === 'update') {
                        return APIHandler.put(`/policy/${event.reviewId}/`, event.detailData);
                    } else {
                        return undefined;
                    }
                },
                onDone: {
                    target: 'success',
                },
                onError: {
                    target: 'failure',
                }
            }
        },
        success: {
            type: 'final'
        },
        failure: {
            on: {
                CALL: 'loading'
            },
            meta: {
                message: '리뷰 정보 변경에 문제가 발생했습니다.'
            }
        }
    }
})
