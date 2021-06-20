import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import chatService from 'services/chatService';
import dayjs from 'dayjs';

const adapter = createEntityAdapter({
  selectId: message => message.timestamp,
});

const slice = createSlice({
  name: 'chat',
  initialState: adapter.getInitialState({
    loading: {messages: false},
    error: {messages: false},
  }),
  reducers: {
    requestConversation: state => {
      state.loading.messages = true;
      state.error.messages = null;
    },
    receiveConversationSuccess: (state, action) => {
      state.loading.messages = false;
      adapter.setAll(state, action.payload);
    },
    receiveConversationFail: (state, action) => {
      state.loading.messages = false;
      state.error.messages = action.payload;
    },
    // send message
    requestSendMessage: (state, {payload}) => {
      adapter.addOne(state, {
        ...payload,
        confirmed: false,
      });
    },
    receiveSendMessageSuccess: (state, action) => {
      adapter.removeOne(state, 'pending');
      adapter.addOne(state, action);
    },
    addMessage: adapter.addOne,
  },
});
export default {[slice.name]: slice.reducer};
export const {
  requestConversation,
  receiveConversationSuccess,
  receiveConversationFail,
  requestSendMessage,
  receiveSendMessageSuccess,
  addMessage,
} = slice.actions;

// THUNK
export const fetchConversation = shipmentId => async dispatch => {
  dispatch(requestConversation());
  try {
    const {data} = await chatService.getConversation(shipmentId);
    dispatch(
      receiveConversationSuccess(
        data
          .filter(m => m.timestamp)
          .sort((x, y) => x.timestamp - y.timestamp)
          .map(m => ({...m, confirmed: true})),
      ),
    );
  } catch (e) {
    dispatch(receiveConversationFail(e?.response?.data?.message || e));
  }
};

export const sendMessage = (shipment_id, message, userId) => async dispatch => {
  let m = {
    sender_id: userId,
    senderId: userId,
    timestamp: dayjs().valueOf(),
    message,
  };
  dispatch(requestSendMessage(m));
  try {
    await chatService.sendMessage({
      shipment_id,
      message,
    });
    dispatch(receiveSendMessageSuccess(m));
  } catch (e) {}
};

// SELECTORS
const selectors = adapter.getSelectors();

export const selectIsLoadingMessages = state =>
  state[slice.name].loading.messages;
export const selectMessagesError = state => state[slice.name].error.messages;

export const selectConversationMessages = createSelector(
  state => selectors.selectAll(state[slice.name]),
  messages =>
    messages.reduce((acc, curr) => {
      const [lastMessage] = acc?.slice(-1);
      if (lastMessage?.senderId === curr.senderId) {
        acc.splice(-1, 1, {
          ...lastMessage,
          timestamp: curr.timestamp,
          message: [...lastMessage.message, curr.message],
        });
        return acc;
      }
      return [
        ...acc,
        {
          ...curr,
          message: [curr.message],
        },
      ];
    }, []),
);
