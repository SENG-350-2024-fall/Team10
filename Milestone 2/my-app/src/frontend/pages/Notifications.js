import React, { useState, useEffect } from 'react';

const Notifications = ({ user }) => {
    const notificationMessages = [
        "You have been added to the ER queue. Please come in ASAP.",
        "Fortunately, after triaging your health concern, the clinicians decided your issue does not require emergency attention. Please visit your local physician for this health concern.",
        "Please call 911."
    ];

    const generateRandomDate = () => {
        const startDate = new Date("2024-01-01");
        const endDate = new Date("2024-10-20");
        const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        return new Date(randomTime).toLocaleDateString();
    };

    const stickyOldNotifications = [
        { id: 1, message: "Your prescription for Nitrous Oxide is ready to pick up.", date: generateRandomDate() },
        { id: 2, message: "Reminder: Follow up with your doctor next week.", date: generateRandomDate() },
        { id: 3, message: "Your lab results are now available. Please call 205-785-2394.", date: generateRandomDate() },
        { id: 4, message: "Appointment confirmed for November 5th, 2024 at 3:00 PM.", date: generateRandomDate() },
        { id: 5, message: "Your insurance claim has been processed successfully.", date: generateRandomDate() },
        { id: 6, message: "Annual flu vaccine reminder: Schedule your vaccination soon.", date: generateRandomDate() },
        { id: 7, message: "You missed your appointment on October 15, 2024. Please reschedule.", date: generateRandomDate() }
    ];

    const [newNotifications, setNewNotifications] = useState([]);
    const [oldNotifications, setOldNotifications] = useState([...stickyOldNotifications]);

    // Generate a single new notification on page load
    useEffect(() => {
        const randomMessage =
            notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
        setNewNotifications([{ id: Date.now(), message: randomMessage, expanded: false, date: "now" }]);
    }, []);

    // Handle moving a notification to old
    const handleDoneNotification = (id) => {
        const notificationToMove = newNotifications.find((n) => n.id === id);
        const notificationWithDate = {
            ...notificationToMove,
            expanded: false,
            date: new Date().toLocaleDateString() // Use the current date
        };

        setOldNotifications((prev) => {
            const updated = [notificationWithDate, ...prev];
            return updated.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, descending
        });

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
                                <span style={{ fontSize: '0.8em', color: 'gray' }}>{notification.date}</span>
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
                        <div style={notificationStyles.content}>
                            <span>{notification.message}</span>
                        </div>
                        <span style={{ fontSize: '0.8em', color: 'gray' }}>{notification.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
