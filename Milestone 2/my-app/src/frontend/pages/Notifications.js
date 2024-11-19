import React, { useState, useEffect } from 'react';

const Notifications = ({ user }) => {
    const notificationMessages = [
        "You have been added to the ER queue. Please come in ASAP.",
        "Fortunately, after triaging your health concern, the clinicians decided your issue does not require emergency attention. Please visit your local physician for this health concern.",
        "Please call 911."
    ];

    const stickyOldNotifications = [
        { id: 1, message: "Your prescription for Nitrous Oxide is ready to pick up." },
        { id: 2, message: "Reminder: Follow up with your doctor next week." }
    ];

    const [newNotifications, setNewNotifications] = useState([]);
    const [oldNotifications, setOldNotifications] = useState([...stickyOldNotifications]);

    // Generate a single new notification on page load
    useEffect(() => {
        const randomMessage =
            notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
        setNewNotifications([{ id: Date.now(), message: randomMessage, expanded: false }]);
    }, []);

    // Handle moving a notification to old
    const handleDoneNotification = (id) => {
        const notificationToMove = newNotifications.find((n) => n.id === id);
        setOldNotifications((prev) => [
            ...prev.slice(-3), // Keep the last 3 old notifications plus the new one
            { ...notificationToMove, expanded: false }
        ]);
        setNewNotifications([]);
    };

    // Handle expanding a notification
    const toggleExpandNotification = (id, isNew) => {
        if (isNew) {
            setNewNotifications((prev) =>
                prev.map((n) =>
                    n.id === id ? { ...n, expanded: !n.expanded } : n
                )
            );
        } else {
            setOldNotifications((prev) =>
                prev.map((n) =>
                    n.id === id ? { ...n, expanded: !n.expanded } : n
                )
            );
        }
    };

    const notificationStyles = {
        container: {
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid lightgrey',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
            maxHeight: '50px', // Default collapsed height
        },
        expanded: {
            maxHeight: '200px', // Expanded height
        },
        content: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexGrow: 1,
        },
        arrowButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2em',
        },
        doneButton: {
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 10px',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ justifyContent: 'center', color: 'grey', textAlign: 'center', fontWeight: 'bold', fontSize: '3em' }}>
                Notifications
            </h1>

            <div>
                <h2 style={{ color: 'red' }}>New Notifications</h2>
                {newNotifications.length > 0 ? (
                    newNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            style={{
                                ...notificationStyles.container,
                                ...(notification.expanded ? notificationStyles.expanded : {}),
                            }}
                        >
                            <div style={notificationStyles.content}>
                                <span
                                    style={{
                                        height: '10px',
                                        width: '10px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        marginRight: '10px',
                                    }}
                                ></span>
                                <span>{notification.message}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <button
                                    style={notificationStyles.arrowButton}
                                    onClick={() => toggleExpandNotification(notification.id, true)}
                                >
                                    {notification.expanded ? '▲' : '▼'}
                                </button>
                                <button
                                    style={notificationStyles.doneButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDoneNotification(notification.id);
                                    }}
                                >
                                    READ
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No new notifications</p>
                )}
            </div>

            <div style={{ marginTop: '20px' }}>
                <h2 style={{ color: 'grey' }}>Old Notifications</h2>
                {oldNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        style={{
                            ...notificationStyles.container,
                            ...(notification.expanded ? notificationStyles.expanded : {}),
                        }}
                        onClick={() => toggleExpandNotification(notification.id, false)}
                    >
                        <div style={notificationStyles.content}>{notification.message}</div>
                        <button style={notificationStyles.arrowButton}>
                            {notification.expanded ? '▲' : '▼'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
