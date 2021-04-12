import { DECREMENT, INCREMENT, REMOVE, USERCREATE, REVIEWCREATE } from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove = (id) => ({ type: REMOVE, id });
export const usercreate = (name) => { console.log(name); return { type: USERCREATE, name } };
export const reviewcreate = (text, rating) => { console.log(text); return { type: REVIEWCREATE, text, rating } };
