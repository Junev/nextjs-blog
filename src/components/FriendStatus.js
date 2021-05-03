import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ChatAPI from "../../lib/chat";

const useFriendStatus = (friendId) => {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    const handleStatusChange = (status) => {
      setIsOnline(status.isOnline);
    };

    ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange);
    return () => ChatAPI.unsubcribeToFriendStatus(friendId, handleStatusChange);
  }, [friendId]);
  return isOnline;
};

const FriendStatus = (props) => {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return "Loading";
  }
  return isOnline ? "Online" : "offline";
};

FriendStatus.propTypes = {
  friend: PropTypes.exact({
    id: PropTypes.string,
  }),
};

export default FriendStatus;
