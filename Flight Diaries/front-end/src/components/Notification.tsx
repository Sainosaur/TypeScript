
const Notification = ({notification}: {notification: string}) => {
    const notificationStyle = {
        color: 'red'
    }

    if (notification !== '') {
        return (
            <div>
                <p style={notificationStyle}>{notification}</p>
            </div>
        )
    } else {
        return null
    }
}

export default Notification;