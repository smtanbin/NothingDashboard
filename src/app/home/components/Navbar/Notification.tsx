import { useState } from "react";
import avatarUrl from "../../../avatar.png";

export default function Notification() {
    const [isOpen, setIsOpen] = useState(false);

    const notifications = [
        {
            id: 1,
            type: "user",
            icon: "fa fa-user-plus text-blue",
            iconBg: "#e8f0fe",
            title: "New Registration",
            message: "5 new users registered today",
            time: "3 mins ago",
            unread: true
        },
        {
            id: 2,
            type: "warning",
            icon: "fa fa-warning text-warning",
            iconBg: "#fff3cd",
            title: "Server Load Warning",
            message: "Server memory usage reached 85%",
            time: "15 mins ago",
            unread: true
        },
        {
            id: 3,
            type: "success",
            icon: "fa fa-shopping-cart text-success",
            iconBg: "#d4edda",
            title: "Transaction Successful",
            message: "Corporate payroll transaction processed",
            time: "2 hours ago",
            unread: false
        },
        {
            id: 4,
            type: "danger",
            icon: "fa fa-ban text-danger",
            iconBg: "#f8d7da",
            title: "Security Alert",
            message: "Failed login attempt from IP 192.168.1.42",
            time: "5 hours ago",
            unread: false
        }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <li className="dropdown notifications-menu">
            {/* Trigger Button */}
            <a 
                href="#" 
                className="dropdown-toggle" 
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                }}
                title="Notifications"
            >
                <i className="fa fa-bell-o"></i>
                {unreadCount > 0 && <span className="label label-warning">{unreadCount}</span>}
            </a>

            {/* Backdrop Overlay */}
            <div 
                style={{ 
                    position: "fixed", 
                    inset: 0, 
                    background: "rgba(0, 0, 0, 0.4)", 
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? "visible" : "hidden",
                    transition: "opacity 0.25s ease, visibility 0.25s ease",
                    zIndex: 9999 
                }}
                onClick={() => setIsOpen(false)}
            />

            {/* Offcanvas Right Drawer */}
            <div 
                style={{ 
                    position: "fixed", 
                    top: 0, 
                    right: 0, 
                    bottom: 0, 
                    width: "380px", 
                    maxWidth: "100%",
                    background: "#ffffff", 
                    boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
                    transform: isOpen ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    zIndex: 10000,
                    display: "flex",
                    flexDirection: "column",
                    color: "#333333",
                    textAlign: "left"
                }}
            >
                {/* Drawer Header */}
                <div 
                    style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        padding: "20px", 
                        borderBottom: "1px solid #eeeeee" 
                    }}
                >
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#333333" }}>
                        <i className="fa fa-bell" style={{ color: "#3c8dbc", marginRight: "8px" }}></i> Notifications Stack
                    </h3>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        style={{ 
                            background: "none", 
                            border: "none", 
                            cursor: "pointer", 
                            padding: "6px", 
                            color: "#999999", 
                            fontSize: "16px",
                            outline: "none"
                        }}
                        className="hover-close"
                    >
                        <i className="fa fa-times"></i>
                    </button>
                </div>

                {/* Drawer Subheader */}
                <div 
                    style={{ 
                        padding: "10px 20px", 
                        background: "#f8f9fa", 
                        borderBottom: "1px solid #eeeeee",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "12px",
                        color: "#666666"
                    }}
                >
                    <span>You have {unreadCount} unread notification{unreadCount !== 1 && 's'}</span>
                    <a href="#" style={{ color: "#3c8dbc", textDecoration: "none", fontWeight: "600" }} onClick={(e) => e.preventDefault()}>Mark all as read</a>
                </div>

                {/* Drawer Scrollable Body */}
                <div style={{ flex: 1, overflowY: "auto" }}>
                    <ul className="list-unstyled" style={{ margin: 0, padding: 0 }}>
                        {notifications.map((n) => (
                            <li 
                                key={n.id} 
                                style={{ 
                                    borderBottom: "1px solid #f2f2f2",
                                    borderLeft: n.unread ? "4px solid #3c8dbc" : "4px solid transparent"
                                }}
                            >
                                <a 
                                    href="#" 
                                    onClick={(e) => e.preventDefault()}
                                    style={{ 
                                        display: "flex", 
                                        padding: "15px 20px", 
                                        background: n.unread ? "#f5f9ff" : "#ffffff",
                                        textDecoration: "none",
                                        transition: "background 0.2s"
                                    }}
                                    className="offcanvas-item"
                                >
                                    <div 
                                        style={{ 
                                            width: "36px", 
                                            height: "36px", 
                                            borderRadius: "50%", 
                                            background: n.iconBg, 
                                            display: "flex", 
                                            alignItems: "center", 
                                            justifyContent: "center",
                                            marginRight: "14px",
                                            flexShrink: 0
                                        }}
                                    >
                                        <i className={n.icon} style={{ fontSize: "15px" }}></i>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                                            <span style={{ fontWeight: "700", fontSize: "13px", color: "#333333" }}>{n.title}</span>
                                            <span style={{ fontSize: "10px", color: "#888888", flexShrink: 0 }}>{n.time}</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: "12px", color: "#555555", lineHeight: "1.4" }}>
                                            {n.message}
                                        </p>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Drawer Footer */}
                <div 
                    style={{ 
                        padding: "15px 20px", 
                        borderTop: "1px solid #eeeeee", 
                        textAlign: "center",
                        background: "#f8f9fa" 
                    }}
                >
                    <a 
                        href="#" 
                        style={{ 
                            fontSize: "13px", 
                            color: "#3c8dbc", 
                            fontWeight: "700",
                            textDecoration: "none"
                        }} 
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(false);
                        }}
                    >
                        View All Activity History
                    </a>
                </div>
            </div>

            {/* Inline CSS styling for hover actions */}
            <style dangerouslySetInnerHTML={{__html: `
                .offcanvas-item:hover {
                    background-color: #f7f9fc !important;
                }
                .hover-close:hover {
                    color: #333333 !important;
                    transition: color 0.15s ease-in-out;
                }
            `}} />
        </li>
    );
}
