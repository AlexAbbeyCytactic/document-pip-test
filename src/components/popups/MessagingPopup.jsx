import React from 'react';

const MessagingPopup = ({ onClose }) => {
  return (
    <div id="messaging-popup">
      <style>{`
        #messaging-popup {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            width: 900px;
            max-width: 100%;
        }

        #messaging-popup * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        #messaging-popup .browser-window {
            width: 100%;
            border-radius: 12px;
            box-shadow:
                0 25px 50px -12px rgba(0, 0, 0, 0.5),
                0 0 0 1px rgba(255, 255, 255, 0.05);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            background: #fff;
            height: 600px;
        }

        /* Generic Window Header - adapted for Messages style (often transparent/integrated, but sticking to project pattern for consistency in controls) */
        #messaging-popup .window-header {
            background: rgb(240, 240, 240); /* Mac gray */
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            border-bottom: 1px solid #d1d1d1;
            flex-shrink: 0;
            -webkit-app-region: drag;
        }

        #messaging-popup .window-title {
            color: #333;
            font-size: 13px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #messaging-popup .window-controls {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        #messaging-popup .control-icon {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            cursor: pointer;
            position: relative;
        }
        
        #messaging-popup .control-icon.close { background: #ff5f57; border: 1px solid #e0443e; }
        #messaging-popup .control-icon.minimize { background: #ffbd2e; border: 1px solid #dea123; }
        #messaging-popup .control-icon.maximize { background: #27c93f; border: 1px solid #1aab29; }

        /* Main App Container */
        #messaging-popup .app-container {
            display: flex;
            flex: 1;
            overflow: hidden;
            background: #fff;
        }

        /* Sidebar - Contact List */
        #messaging-popup .sidebar {
            width: 280px;
            background: rgba(245, 245, 245, 0.95);
            border-right: 1px solid #d1d1d1;
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(20px);
        }

        #messaging-popup .search-bar {
            padding: 12px 16px;
        }

        #messaging-popup .search-input-wrapper {
            position: relative;
        }

        #messaging-popup .search-icon {
            position: absolute;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
            color: #888;
            font-size: 14px;
        }

        #messaging-popup .search-input {
            width: 100%;
            padding: 6px 10px 6px 30px;
            border-radius: 6px;
            border: 1px solid #d1d1d1;
            background: #fff;
            font-size: 13px;
            outline: none;
        }

        #messaging-popup .search-input:focus {
            border-color: #007aff;
            box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
        }

        #messaging-popup .contact-list {
            flex: 1;
            overflow-y: auto;
        }

        #messaging-popup .contact-item {
            padding: 12px 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            transition: background 0.1s;
            position: relative;
        }

        #messaging-popup .contact-item:hover {
            background: rgba(0, 0, 0, 0.04);
        }

        #messaging-popup .contact-item.active {
            background: #007aff;
        }

        #messaging-popup .contact-item.active * {
            color: #fff !important;
        }

        #messaging-popup .avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #ccc;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: 500;
            font-size: 18px;
            position: relative;
        }

        #messaging-popup .avatar.img-avatar {
             background-size: cover;
             background-position: center;
        }

        #messaging-popup .online-indicator {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 12px;
            height: 12px;
            background: #4cd964;
            border: 2px solid #fff;
            border-radius: 50%;
        }

        #messaging-popup .contact-info {
            flex: 1;
            min-width: 0;
        }

        #messaging-popup .contact-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 4px;
        }

        #messaging-popup .contact-name {
            font-weight: 600;
            font-size: 14px;
            color: #000;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        #messaging-popup .contact-time {
            font-size: 12px;
            color: #8e8e93;
            flex-shrink: 0;
        }

        #messaging-popup .last-message {
            font-size: 13px;
            color: #8e8e93;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2;
        }

        #messaging-popup .contact-item.active .online-indicator {
            border-color: #007aff;
        }

        /* Chat Area */
        #messaging-popup .chat-area {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #fff;
        }

        #messaging-popup .chat-header {
            padding: 10px 20px;
            border-bottom: 1px solid #eee;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10;
        }

        #messaging-popup .to-label {
            color: #8e8e93;
            font-size: 13px;
        }

        #messaging-popup .recipient-name {
            font-weight: 600;
            font-size: 14px;
            color: #000;
        }

        #messaging-popup .recipient-detail {
            font-size: 11px;
            color: #8e8e93;
            margin-left: 6px;
        }

        #messaging-popup .messages-list {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        #messaging-popup .timestamp-divider {
            text-align: center;
            margin: 16px 0;
            color: #8e8e93;
            font-size: 11px;
            font-weight: 500;
        }

        #messaging-popup .message-row {
            display: flex;
            align-items: flex-end;
            margin-bottom: 4px;
        }

        #messaging-popup .message-row.sent {
            justify-content: flex-end;
        }

        #messaging-popup .message-bubble {
            max-width: 70%;
            padding: 8px 14px;
            font-size: 14px;
            line-height: 1.4;
            position: relative;
        }

        #messaging-popup .message-row.received .message-bubble {
            background: #e5e5ea;
            color: #000;
            border-radius: 18px 18px 18px 4px;
            margin-left: 8px;
        }

        #messaging-popup .message-row.sent .message-bubble {
            background: #007aff;
            color: #fff;
            border-radius: 18px 18px 4px 18px;
        }

        #messaging-popup .message-status {
            font-size: 10px;
            color: #8e8e93;
            text-align: right;
            margin-top: 2px;
            margin-bottom: 10px;
        }

        #messaging-popup .small-avatar {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #ccc;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: white;
            font-weight: 500;
        }

        /* Input Area */
        #messaging-popup .input-area {
            padding: 12px 20px;
            background: #fff; /* or transparent if we want blurry */
            border-top: 1px solid #eee;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        #messaging-popup .app-store-btn {
            color: #8e8e93;
            font-size: 24px;
            cursor: pointer;
        }

        #messaging-popup .message-input-wrapper {
            flex: 1;
            position: relative;
        }

        #messaging-popup .message-input {
            width: 100%;
            padding: 8px 36px 8px 14px;
            border-radius: 18px;
            border: 1px solid #d1d1d1;
            font-size: 14px;
            outline: none;
        }

        #messaging-popup .message-input:focus {
            border-color: #8e8e93;
        }

        #messaging-popup .send-btn {
            position: absolute;
            right: 4px;
            top: 50%;
            transform: translateY(-50%);
            width: 26px;
            height: 26px;
            background: #007aff;
            border-radius: 50%;
            border: none;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 14px;
        }

        #messaging-popup .imessage-placeholder {
            position: absolute;
            right: 40px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            color: #8e8e93;
            pointer-events: none;
        }
      `}</style>

      <div className="browser-window">
        {/* Header with macOS style controls */}
        <div className="window-header">
            <div className="window-controls">
                <div className="control-icon close" onClick={onClose}></div>
                <div className="control-icon minimize"></div>
                <div className="control-icon maximize"></div>
            </div>
            <div className="window-title">
                <i className="ph ph-chat-circle-dots"></i>
                Messages
            </div>
            <div style={{width: '40px'}}></div> {/* Spacer for center alignment */}
        </div>

        <div className="app-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="search-bar">
                    <div className="search-input-wrapper">
                        <i className="ph ph-magnifying-glass search-icon"></i>
                        <input type="text" className="search-input" placeholder="Search" />
                    </div>
                </div>
                <div className="contact-list">
                    <div className="contact-item active">
                        <div className="avatar" style={{background: '#ff9500'}}>R</div>
                        <div className="contact-info">
                            <div className="contact-header">
                                <span className="contact-name">Reporter (Daily Times)</span>
                                <span className="contact-time">9:41 AM</span>
                            </div>
                            <div className="last-message">We have sources confirm...</div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="avatar" style={{background: '#5ac8fa'}}>M</div>
                        <div className="contact-info">
                            <div className="contact-header">
                                <span className="contact-name">Mom</span>
                                <span className="contact-time">Yesterday</span>
                            </div>
                            <div className="last-message">Call me when you can!</div>
                        </div>
                    </div>
                     <div className="contact-item">
                        <div className="avatar" style={{background: '#8e8e93'}}>J</div>
                        <div className="contact-info">
                            <div className="contact-header">
                                <span className="contact-name">John Doe</span>
                                <span className="contact-time">Tuesday</span>
                            </div>
                            <div className="last-message">Did you see the game?</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="chat-area">
                <div className="chat-header">
                    <span className="to-label">To:</span>
                    <span className="recipient-name">Reporter - Daily Times</span>
                    <span className="recipient-detail">&lt;j.smith@dailytimes.com&gt;</span>
                </div>

                <div className="messages-list">
                    <div className="timestamp-divider">Today 9:30 AM</div>

                    <div className="message-row received">
                        <div className="small-avatar" style={{background: '#ff9500'}}>R</div>
                        <div className="message-bubble">
                            Hi there. This is Jennifer Smith from The Daily Times.
                        </div>
                    </div>

                    <div className="message-row received">
                         <div className="small-avatar" style={{visibility: 'hidden'}}>R</div>
                        <div className="message-bubble">
                            We've received a tip from an anonymous source claiming that your company has suffered a massive data breach involving user credit card information.
                        </div>
                    </div>

                    <div className="message-row received">
                         <div className="small-avatar" style={{visibility: 'hidden'}}>R</div>
                        <div className="message-bubble">
                             Can you confirm or deny this? We are running the story at noon.
                        </div>
                    </div>
                    
                    <div className="message-status">Delivered</div>

                </div>

                <div className="input-area">
                    <i className="ph ph-plus-circle app-store-btn" style={{fontSize: '20px', color: '#8e8e93'}}></i>
                    <div className="message-input-wrapper">
                        <input type="text" className="message-input" placeholder="iMessage" />
                        <button className="send-btn">
                            <i className="ph ph-arrow-up" style={{fontSize: '14px', fontWeight: 'bold'}}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPopup;
