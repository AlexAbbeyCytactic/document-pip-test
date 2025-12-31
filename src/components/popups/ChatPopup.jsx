import React from 'react';

const ChatPopup = ({ onClose }) => {
  return (
    <div id="chat-crisis-popup">
      <style>{`
        #chat-crisis-popup {
            font-family: 'Segoe UI', system-ui, sans-serif;
            width: 1000px;
            max-width: 100%;
        }
        
        #chat-crisis-popup * { margin: 0; padding: 0; box-sizing: border-box; }

        #chat-crisis-popup .chat-window {
            width: 100%;
            height: 700px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        /* Generic Window Header */
        #chat-crisis-popup .window-header {
            background: rgb(9, 33, 77);
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            border-bottom: 1px solid rgba(122, 162, 212, 0.2);
            flex-shrink: 0;
        }

        #chat-crisis-popup .window-title {
            color: #c0d4eb;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #chat-crisis-popup .window-controls {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        #chat-crisis-popup .control-icon {
            color: #7aa2d4;
            cursor: pointer;
            font-size: 14px;
            transition: color 0.2s;
            display: flex;
            align-items: center;
        }

        #chat-crisis-popup .control-icon:hover { color: #fff; }
        #chat-crisis-popup .control-icon.close:hover { color: #ff5f57; }

        #chat-crisis-popup .app-container {
            display: flex;
            flex: 1;
            overflow: hidden;
        }

        /* Sidebar */
        #chat-crisis-popup .sidebar {
            width: 260px;
            background: #19171d; /* Deep purple/black like Slack */
            display: flex;
            flex-direction: column;
            color: #b8b8b8;
        }

        #chat-crisis-popup .workspace-name {
            padding: 16px;
            font-weight: 700;
            color: #fff;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        #chat-crisis-popup .channel-list {
            padding: 12px 0;
            flex: 1;
            overflow-y: auto;
        }

        #chat-crisis-popup .channel-group {
            margin-bottom: 16px;
        }

        #chat-crisis-popup .group-title {
            padding: 0 16px;
            font-size: 11px;
            text-transform: uppercase;
            margin-bottom: 4px;
            opacity: 0.7;
        }

        #chat-crisis-popup .channel {
            padding: 6px 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            opacity: 0.8;
            font-size: 15px;
        }

        #chat-crisis-popup .channel:hover { background: rgba(255, 255, 255, 0.05); }
        
        #chat-crisis-popup .channel.active {
            background: #1164A3;
            color: #fff;
            opacity: 1;
        }

        #chat-crisis-popup .channel.unread {
            color: #fff;
            font-weight: 700;
        }

        #chat-crisis-popup .channel i { font-size: 14px; }

        /* Main Area */
        #chat-crisis-popup .main-chat {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #fff;
        }

        #chat-crisis-popup .chat-header {
            padding: 16px 20px;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #chat-crisis-popup .header-title {
            font-weight: 700;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        #chat-crisis-popup .message-list {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 4px; /* Grouped messages closer */
        }

        #chat-crisis-popup .day-divider {
            position: relative;
            text-align: center;
            margin: 20px 0;
        }

        #chat-crisis-popup .day-divider::before {
            content: '';
            position: absolute;
            left: 0; top: 50%;
            width: 100%;
            height: 1px;
            background: #eee;
            z-index: 1;
        }

        #chat-crisis-popup .day-divider span {
            background: #fff;
            padding: 0 12px;
            position: relative;
            z-index: 2;
            font-size: 12px;
            font-weight: 700;
            color: #555;
            border-radius: 12px;
            border: 1px solid #eee;
        }

        #chat-crisis-popup .message-group {
            display: flex;
            gap: 12px;
            margin-top: 12px;
        }

        #chat-crisis-popup .message-group:hover { background: #f8f8f8; margin-left: -20px; padding-left: 20px; margin-right: -20px; padding-right: 20px; }

        #chat-crisis-popup .avatar {
            width: 36px;
            height: 36px;
            border-radius: 4px;
            background: #ccc;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: 700;
            font-size: 14px;
        }

        #chat-crisis-popup .msg-content {
            flex: 1;
        }

        #chat-crisis-popup .msg-header {
            display: flex;
            align-items: baseline;
            gap: 8px;
            margin-bottom: 2px;
        }

        #chat-crisis-popup .username { font-weight: 700; color: #1d1c1d; }
        #chat-crisis-popup .timestamp { font-size: 11px; color: #616061; }

        #chat-crisis-popup .msg-text {
            color: #1d1c1d;
            line-height: 1.5;
            font-size: 15px;
        }

        #chat-crisis-popup .typing-indicator {
            font-style: italic;
            color: #616061;
            font-size: 12px;
            margin-left: 68px; /* Align with text */
            margin-bottom: 10px;
        }

        /* Input Area */
        #chat-crisis-popup .input-area {
            padding: 20px;
            border-top: 1px solid #ddd;
        }

        #chat-crisis-popup .input-box {
            border: 1px solid #868686;
            border-radius: 8px;
            min-height: 80px;
            padding: 10px;
            display: flex;
            flex-direction: column;
        }

        #chat-crisis-popup .input-toolbar {
            border-top: 1px solid #eee;
            margin-top: auto;
            padding-top: 8px;
            display: flex;
            justify-content: space-between;
        }

        #chat-crisis-popup .send-btn {
            background: #007a5a;
            color: white;
            border: none;
            padding: 4px 12px;
            border-radius: 4px;
            font-weight: 600;
            font-size: 13px;
        }
      `}</style>
      <div className="chat-window">
        {/* Generic Window Header */}
        <div className="window-header">
            <div className="window-title">
                <i className="ph ph-chat-circle-dots"></i>
                Messenger
            </div>
            <div className="window-controls">
                <div className="control-icon zoom-out"><i className="ph ph-minus"></i></div>
                <div className="control-icon zoom-in"><i className="ph ph-plus"></i></div>
                <div className="control-icon close" onClick={onClose}><i className="ph ph-x"></i></div>
            </div>
        </div>

        <div className="app-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="workspace-name">
                    ACME Corp
                    <i className="ph ph-caret-down"></i>
                </div>
                <div className="channel-list">
                    <div className="channel-group">
                        <div className="channel"><i className="ph ph-list-dashes"></i> All Threads</div>
                        <div className="channel"><i className="ph ph-chat-text"></i> DMs</div>
                    </div>

                    <div className="channel-group">
                        <div className="group-title">Channels</div>
                        <div className="channel"><i className="ph ph-hash"></i> general</div>
                        <div className="channel"><i className="ph ph-hash"></i> announcements</div>
                        <div className="channel unread"><i className="ph ph-hash"></i> engineering</div>
                        <div className="channel active"><i className="ph ph-hash"></i> incident-response</div>
                        <div className="channel"><i className="ph ph-lock"></i> sec-ops-private</div>
                    </div>

                    <div className="channel-group">
                        <div className="group-title">Direct Messages</div>
                        <div className="channel"><div className="avatar" style={{width: '16px', height: '16px', fontSize: '8px'}}>S</div> Sarah (CISO)</div>
                        <div className="channel"><div className="avatar" style={{width: '16px', height: '16px', fontSize: '8px'}}>D</div> Dave (DevOps)</div>
                    </div>
                </div>
            </div>

            {/* Main Chat */}
            <div className="main-chat">
                <div className="chat-header">
                    <div className="header-title">
                        <i className="ph ph-hash"></i> incident-response
                    </div>
                    <div style={{color: '#666', fontSize: '13px'}}>
                        <i className="ph ph-users"></i> 42 members
                    </div>
                </div>

                <div className="message-list">
                    <div className="day-divider"><span>Today</span></div>

                    <div className="message-group">
                        <div className="avatar" style={{background: '#E01E5A'}}>S</div>
                        <div className="msg-content">
                            <div className="msg-header">
                                <span className="username">Sarah Jenkins (CISO)</span>
                                <span className="timestamp">9:10 AM</span>
                            </div>
                            <div className="msg-text">Has anyone else lost access to the Prod DB cluster? I'm getting connection refused.</div>
                        </div>
                    </div>

                    <div className="message-group">
                        <div className="avatar" style={{background: '#36C5F0'}}>D</div>
                        <div className="msg-content">
                            <div className="msg-header">
                                <span className="username">Dave Miller</span>
                                <span className="timestamp">9:11 AM</span>
                            </div>
                            <div className="msg-text">Checking now. The load balancers are throwing 500s everywhere.</div>
                        </div>
                    </div>

                    <div className="message-group">
                        <div className="avatar" style={{background: '#2EB67D'}}>M</div>
                        <div className="msg-content">
                            <div className="msg-header">
                                <span className="username">Mike Chen</span>
                                <span className="timestamp">9:12 AM</span>
                            </div>
                            <div className="msg-text">Guys... check your file shares. All my project files just turned into `.locked` files.</div>
                            <div className="msg-text" style={{marginTop: '4px', padding: '8px', background: '#f0f0f0', borderRadius: '4px', border: '1px solid #ddd', display: 'inline-block'}}>
                                <i className="ph ph-file-text"></i> screenshot_error.png
                            </div>
                        </div>
                    </div>

                    <div className="message-group">
                        <div className="avatar" style={{background: '#E01E5A'}}>S</div>
                        <div className="msg-content">
                            <div className="msg-header">
                                <span className="username">Sarah Jenkins (CISO)</span>
                                <span className="timestamp">9:13 AM</span>
                            </div>
                            <div className="msg-text" style={{fontWeight: 700, color: '#E01E5A', background: 'rgba(224, 30, 90, 0.1)', padding: '8px', borderRadius: '4px'}}>
                                @channel THIS IS NOT A DRILL. DISCONNECT FROM VPN IMMEDIATELY. PULL ETHERNET CABLES IF YOU ARE IN THE OFFICE.
                            </div>
                        </div>
                    </div>

                    <div className="message-group">
                        <div className="avatar" style={{background: '#ECB22E'}}>A</div>
                        <div className="msg-content">
                            <div className="msg-header">
                                <span className="username">Alex (SysAdmin)</span>
                                <span className="timestamp">9:14 AM</span>
                            </div>
                            <div className="msg-text">I just got a "DarkShadow" popup on the AD server. They have domain admin. It's over.</div>
                        </div>
                    </div>

                    <div className="message-group">
                        <div className="avatar" style={{background: '#888'}}>sys</div>
                        <div className="msg-content">
                            <div className="msg-header">
                                <span className="username">System</span>
                                <span className="timestamp">9:15 AM</span>
                            </div>
                            <div className="msg-text" style={{fontStyle: 'italic', color: '#888'}}>user @alex_sysadmin has left the workspace.</div>
                        </div>
                    </div>
                </div>
                
                <div className="typing-indicator">Sarah Jenkins is typing...</div>

                <div className="input-area">
                    <div className="input-box">
                        <span style={{color: '#aaa'}}>Message #incident-response</span>
                        <div className="input-toolbar">
                            <div style={{display: 'flex', gap: '8px', color: '#666'}}>
                                <i className="ph ph-text-b"></i>
                                <i className="ph ph-text-italic"></i>
                                <i className="ph ph-link"></i>
                            </div>
                            <button className="send-btn"><i className="ph ph-paper-plane-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
