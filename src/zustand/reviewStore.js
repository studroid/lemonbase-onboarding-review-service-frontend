import create from "zustand/vanilla";

export const reviewStore = create(set => ({
    count: 12,
}));
