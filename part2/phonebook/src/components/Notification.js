import React from 'react'
const Notification = ({ message, kind }) => {
  if (message === null) { return null }
  return <div className={["notif", kind].join(" ")}>{message}</div>
}
export default Notification
