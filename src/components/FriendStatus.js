import React, { useEffect } from "react"
import PropTypes from "prop-types"

const FriendStatus = ({ friendId }) => {
  useEffect(() => {
    console.log(friendId)
  }, [friendId])
  return <div></div>
}

FriendStatus.propTypes = {
  friendId: PropTypes.string,
}

export default FriendStatus
