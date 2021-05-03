const ChatAPI = {
  friendList: new Map(),
  subscribeToFriendStatus: (id, cb) => {
    const isOnline = !!(id % 2).toFixed();
    const data = {
      isOnline,
    };
    if (!ChatAPI.friendList.has(id)) {
      ChatAPI.friendList.set(id, isOnline);
    }
    setTimeout(() => {
      cb(data);
    }, 200);
  },
  unsubcribeToFriendStatus: (id, cb) => {
    ChatAPI.friendList.set(id, false);
    const data = { isOnline: false };
    setTimeout(() => {
      cb(data);
    }, 200);
  },
};

export default ChatAPI;
