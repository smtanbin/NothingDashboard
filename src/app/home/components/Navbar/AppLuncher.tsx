import { useState } from "react";

export default function AppLuncher() {
    const [isOpen, setIsOpen] = useState(false);

    const apps = [
        {
            name: "Core Banking",
            icon: "fa fa-bank",
            bgColor: "linear-gradient(135deg, #4285f4, #34a853)",
            url: "#"
        },
        {
            name: "HR Portal",
            icon: "fa fa-users",
            bgColor: "linear-gradient(135deg, #34a853, #0f9d58)",
            url: "#"
        },
        {
            name: "LMS Portal",
            icon: "fa fa-graduation-cap",
            bgColor: "linear-gradient(135deg, #f4b400, #db4437)",
            url: "#"
        },
        {
            name: "Audit System",
            icon: "fa fa-shield",
            bgColor: "linear-gradient(135deg, #00acc1, #007c91)",
            url: "#"
        },
        {
            name: "Requisitions",
            icon: "fa fa-shopping-cart",
            bgColor: "linear-gradient(135deg, #db4437, #c53929)",
            url: "#"
        },
        {
            name: "Mailbox",
            icon: "fa fa-envelope",
            bgColor: "linear-gradient(135deg, #ab47bc, #7b1fa2)",
            url: "#"
        },
        {
            name: "Diagnostics",
            icon: "fa fa-wrench",
            bgColor: "linear-gradient(135deg, #ff9800, #f57c00)",
            url: "#"
        },
        {
            name: "Secure Vault",
            icon: "fa fa-lock",
            bgColor: "linear-gradient(135deg, #607d8b, #455a64)",
            url: "#"
        },
        {
            name: "Support Desk",
            icon: "fa fa-question-circle",
            bgColor: "linear-gradient(135deg, #3f51b5, #303f9f)",
            url: "#"
        }
    ];

    return (
        <li className={`dropdown tasks-menu ${isOpen ? "open" : ""}`} style={{ position: "relative" }}>
            {/* Backdrop overlay for closing dropdown on click outside */}
            {isOpen && (
                <div 
                    style={{ position: "fixed", inset: 0, zIndex: 1000, background: "transparent" }}
                    onClick={() => setIsOpen(false)} 
                />
            )}

            <a 
                href="#" 
                className="dropdown-toggle" 
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                style={{ position: "relative", zIndex: 1001 }}
                title="App Launcher"
            >
                <i className="fa fa-th" style={{ fontSize: "16px" }}></i>
            </a>

            {isOpen && (
                <ul 
                    className="dropdown-menu" 
                    style={{ 
                        zIndex: 1002, 
                        width: "320px", 
                        padding: "15px", 
                        borderRadius: "8px", 
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        border: "1px solid #e0e0e0"
                    }}
                >
                    <li className="header" style={{ borderBottom: "1px solid #f4f4f4", paddingBottom: "8px", marginBottom: "12px", textAlign: "left" }}>
                        <span style={{ fontWeight: "600", color: "#333", fontSize: "13px" }}>Standard Bank Services</span>
                    </li>
                    <li>
                        <div 
                            style={{ 
                                display: "grid", 
                                gridTemplateColumns: "repeat(3, 1fr)", 
                                gap: "12px 8px",
                                padding: 0
                            }}
                        >
                            {apps.map((app, index) => (
                                <a 
                                    key={index}
                                    href={app.url}
                                    onClick={(e) => e.preventDefault()}
                                    className="waffle-item"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "8px 4px",
                                        borderRadius: "8px",
                                        textDecoration: "none",
                                        transition: "all 0.2s ease",
                                        cursor: "pointer"
                                    }}
                                >
                                    <div 
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            borderRadius: "50%",
                                            background: app.bgColor,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                            transition: "transform 0.15s ease",
                                            color: "#ffffff"
                                        }}
                                        className="waffle-icon"
                                    >
                                        <i className={app.icon} style={{ fontSize: "18px" }}></i>
                                    </div>
                                    <span 
                                        style={{
                                            marginTop: "8px",
                                            fontSize: "11px",
                                            color: "#444444",
                                            fontWeight: "500",
                                            textAlign: "center",
                                            width: "100%",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        }}
                                    >
                                        {app.name}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </li>
                    <li className="footer" style={{ borderTop: "1px solid #f4f4f4", paddingTop: "12px", marginTop: "12px", textAlign: "center" }}>
                        <a href="#" style={{ fontSize: "12px", color: "#3c8dbc", fontWeight: "600" }} onClick={(e) => e.preventDefault()}>More Portal Services</a>
                    </li>

                    {/* Inline CSS styling for waffle app items hover */}
                    <style dangerouslySetInnerHTML={{__html: `
                        .waffle-item:hover {
                            background-color: #f1f3f4 !important;
                        }
                        .waffle-item:hover .waffle-icon {
                            transform: scale(1.06);
                        }
                    `}} />
                </ul>
            )}
        </li>
    );
}
