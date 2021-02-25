import create from "zustand";
import reviewMachine from "../xstate/reviewMachine";
import {createMachine} from "xstate";

export const useReviewStore = create(set => ({
    state: null,
    sender: null,
    service: null,
    setMachine: (reviewState, reviewSend) => set({state: reviewState, sender: reviewSend}),
    setService: (service) => set({service})
}));
