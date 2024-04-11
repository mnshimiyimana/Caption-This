// memesActionTypes.ts

export const POST_MEME_REQUEST = 'POST_MEME_REQUEST';
export const POST_MEME_SUCCESS = 'POST_MEME_SUCCESS';
export const POST_MEME_FAILURE = 'POST_MEME_FAILURE';

interface PostMemeRequestAction {
  type: typeof POST_MEME_REQUEST;
}

interface PostMemeSuccessAction {
  type: typeof POST_MEME_SUCCESS;
  payload: any; // Replace 'any' with the type of your response data
}

interface PostMemeFailureAction {
  type: typeof POST_MEME_FAILURE;
  payload: string; // Error message
}

export type MemesActionTypes =
  | PostMemeRequestAction
  | PostMemeSuccessAction
  | PostMemeFailureAction;
