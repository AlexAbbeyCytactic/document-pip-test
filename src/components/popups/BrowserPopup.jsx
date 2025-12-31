import React from 'react';

const BrowserPopup = ({ onClose }) => {
  return (
    <div id="browser-design-popup">
      <style>{`
        #browser-design-popup {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            width: 900px;
            max-width: 100%;
        }

        #browser-design-popup * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        #browser-design-popup .browser-window {
            width: 100%;
            border-radius: 12px;
            box-shadow:
                0 25px 50px -12px rgba(0, 0, 0, 0.5),
                0 0 0 1px rgba(255, 255, 255, 0.05);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            background: #fafafa;
            height: 600px; /* Fixed height for popup consistency */
        }

        /* Generic Window Header */
        #browser-design-popup .window-header {
            background: rgb(9, 33, 77);
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            border-bottom: 1px solid rgba(122, 162, 212, 0.2);
            flex-shrink: 0;
        }

        #browser-design-popup .window-title {
            color: #c0d4eb;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #browser-design-popup .window-controls {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        #browser-design-popup .control-icon {
            color: #7aa2d4;
            cursor: pointer;
            font-size: 14px;
            transition: color 0.2s;
            display: flex;
            align-items: center;
        }

        #browser-design-popup .control-icon:hover { color: #fff; }
        #browser-design-popup .control-icon.close:hover { color: #ff5f57; }

        /* Tab Bar */
        #browser-design-popup .tab-bar {
            display: flex;
            align-items: flex-end;
            padding: 4px 8px 0 8px;
            background: rgb(9, 33, 77);
            height: 38px;
        }

        #browser-design-popup .tab {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 16px;
            border-radius: 8px 8px 0 0;
            cursor: pointer;
            max-width: 200px;
            margin-right: 2px;
            position: relative;
        }

        #browser-design-popup .tab.active {
            background: rgb(20, 55, 115);
        }

        #browser-design-popup .tab.inactive {
            background: rgb(12, 38, 85);
        }

        #browser-design-popup .tab.inactive:hover {
            background: rgb(18, 48, 105);
        }

        #browser-design-popup .tab-icon {
            color: #7aa2d4;
            font-size: 14px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
        }

        #browser-design-popup .tab.inactive .tab-icon {
            color: #5a7a9a;
        }

        #browser-design-popup .tab-title {
            font-size: 12px;
            color: #c0d4eb;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        #browser-design-popup .tab.inactive .tab-title {
            color: #8aa4be;
        }

        #browser-design-popup .tab-close {
            width: 16px;
            height: 16px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.15s ease, background 0.15s ease;
            color: #8aa4be;
            font-size: 12px;
        }

        #browser-design-popup .tab:hover .tab-close {
            opacity: 1;
        }

        #browser-design-popup .tab-close:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        #browser-design-popup .new-tab-btn {
            width: 24px;
            height: 24px;
            border-radius: 6px;
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 4px;
            margin-bottom: 4px;
            transition: background 0.15s ease;
            color: #5a7a9a;
            font-size: 14px;
        }

        #browser-design-popup .new-tab-btn:hover {
            background: rgba(255, 255, 255, 0.08);
            color: #8aa4be;
        }

        /* Navigation Bar */
        #browser-design-popup .nav-bar {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 16px;
            background: rgb(20, 55, 115);
            border-bottom: 1px solid rgba(122, 162, 212, 0.35);
        }

        #browser-design-popup .nav-buttons {
            display: flex;
            gap: 4px;
        }

        #browser-design-popup .nav-btn {
            width: 28px;
            height: 28px;
            border-radius: 6px;
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.15s ease;
            color: #888;
            font-size: 16px;
        }

        #browser-design-popup .nav-btn:hover {
            background: rgba(255, 255, 255, 0.08);
            color: #aaa;
        }

        /* URL Bar */
        #browser-design-popup .url-bar {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 6px;
            padding: 6px 14px;
            border: 1px solid rgba(122, 162, 212, 0.35);
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        #browser-design-popup .url-bar:focus-within {
            border-color: rgba(122, 162, 212, 0.55);
            box-shadow: 0 0 0 3px rgba(122, 162, 212, 0.18);
        }

        #browser-design-popup .lock-icon {
            color: #6b9;
            font-size: 14px;
            flex-shrink: 0;
        }

        #browser-design-popup .url-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: #c0d4eb;
            font-size: 13px;
            letter-spacing: 0.2px;
        }

        #browser-design-popup .url-input::placeholder {
            color: #666;
        }

        /* Action Buttons */
        #browser-design-popup .action-buttons {
            display: flex;
            gap: 4px;
        }

        #browser-design-popup .action-btn {
            width: 28px;
            height: 28px;
            border-radius: 6px;
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.15s ease;
            color: #888;
            font-size: 16px;
        }

        #browser-design-popup .action-btn:hover {
            background: rgba(255, 255, 255, 0.08);
            color: #aaa;
        }

        /* Content Area - Email */
        #browser-design-popup .content-area {
            flex: 1;
            background: #fafafa;
            padding: 0;
            overflow-y: auto;
        }

        /* Email Design */
        #browser-design-popup .email-container {
            max-width: 100%;
            background: #fff;
            min-height: 100%;
        }

        #browser-design-popup .email-header {
            padding: 24px 32px;
            border-bottom: 1px solid #eee;
        }

        #browser-design-popup .tag-list {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
        }

        #browser-design-popup .header-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 8px;
        }

        #browser-design-popup .tag {
            padding: 4px 8px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 13px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        #browser-design-popup .tag.critical {
            background: rgba(255, 80, 80, 0.12);
            color: #a80000;
            border: 1px solid rgba(255, 80, 80, 0.18);
        }

        #browser-design-popup .tag.external {
            background: rgba(200, 200, 200, 0.12);
            color: #555;
            border: 1px solid rgba(0, 0, 0, 0.04);
        }

        #browser-design-popup .warning-banner {
            margin-top: 16px;
            background: rgba(255, 77, 77, 0.06);
            border: 1px solid rgba(255, 77, 77, 0.18);
            color: #9b1a1a;
            font-size: 12px;
            font-weight: 300;
            padding: 12px 16px;
            border-radius: 8px;
            display: flex;
            gap: 12px;
            align-items: center;
        }

        #browser-design-popup .warning-banner i {
            color: #9b1a1a;
            font-size: 18px;
            flex-shrink: 0;
        }

        #browser-design-popup .warning-banner .message {
            font-weight: 600;
        }

        #browser-design-popup .email-actions {
            display: flex;
            gap: 8px;
            margin: 0;
        }

        #browser-design-popup .email-action-btn {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            background: #f5f5f5;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 18px;
            transition: background 0.15s ease, color 0.15s ease;
        }

        #browser-design-popup .email-action-btn:hover {
            background: #eee;
            color: #333;
        }

        #browser-design-popup .email-subject {
            font-size: 22px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 16px;
            line-height: 1.3;
        }

        #browser-design-popup .email-meta {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }

        #browser-design-popup .sender-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgb(15, 45, 100) 0%, rgb(9, 33, 77) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            flex-shrink: 0;
        }

        #browser-design-popup .sender-info {
            flex: 1;
        }

        #browser-design-popup .sender-name {
            font-size: 14px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 2px;
        }

        #browser-design-popup .sender-email {
            font-size: 12px;
            color: #888;
        }

        #browser-design-popup .email-date {
            font-size: 12px;
            color: #888;
            flex-shrink: 0;
        }

        #browser-design-popup .email-body {
            padding: 32px;
            line-height: 1.7;
            color: #333;
            font-size: 14px;
        }

        #browser-design-popup .email-body p {
            margin-bottom: 16px;
        }

        #browser-design-popup .email-body p:last-child {
            margin-bottom: 0;
        }

        #browser-design-popup .email-signature {
            margin-top: 24px;
            color: #555;
        }
      `}</style>
      <div className="browser-window">
        {/* Generic Window Header */}
        <div className="window-header">
            <div className="window-title">
                <i className="ph ph-globe"></i>
                Web Browser
            </div>
            <div className="window-controls">
                <div className="control-icon zoom-out"><i className="ph ph-minus"></i></div>
                <div className="control-icon zoom-in"><i className="ph ph-plus"></i></div>
                <div className="control-icon close" onClick={onClose}><i className="ph ph-x"></i></div>
            </div>
        </div>

        {/* Tab Bar */}
        <div className="tab-bar">
            <div className="tab active">
                <div className="tab-icon">
                    <i className="ph ph-envelope-simple"></i>
                </div>
                <span className="tab-title">Inbox</span>
                <div className="tab-close">
                    <i className="ph ph-x"></i>
                </div>
            </div>
            <button className="new-tab-btn">
                <i className="ph ph-plus"></i>
            </button>
        </div>

        {/* Navigation Bar */}
        <div className="nav-bar">
            <div className="nav-buttons">
                <button className="nav-btn">
                    <i className="ph ph-caret-left"></i>
                </button>
                <button className="nav-btn">
                    <i className="ph ph-caret-right"></i>
                </button>
                <button className="nav-btn">
                    <i className="ph ph-arrow-clockwise"></i>
                </button>
            </div>

            <div className="url-bar">
                <i className="ph ph-lock-simple lock-icon"></i>
                <input type="text" className="url-input" value="email.com" readOnly />
            </div>

            <div className="action-buttons">
                <button className="action-btn">
                    <i className="ph ph-share"></i>
                </button>
                <button className="action-btn">
                    <i className="ph ph-dots-three-vertical"></i>
                </button>
            </div>
        </div>

        {/* Content Area - Email Message */}
        <div className="content-area">
            <div className="email-container">
                <div className="email-header">
                    <div className="header-top">
                        <div className="tag-list">
                            <div className="tag critical">Critical</div>
                            <div className="tag external">External</div>
                        </div>

                        <div className="email-actions">
                            <button className="email-action-btn">
                                <i className="ph ph-arrow-left"></i>
                            </button>
                            <button className="email-action-btn">
                                <i className="ph ph-archive"></i>
                            </button>
                            <button className="email-action-btn">
                                <i className="ph ph-trash"></i>
                            </button>
                            <button className="email-action-btn">
                                <i className="ph ph-folder"></i>
                            </button>
                        </div>
                    </div>

                    <h1 className="email-subject">[COMPANY NAME] — Security Incident</h1>

                    <div className="email-meta">
                        <div className="sender-avatar">M</div>
                        <div className="sender-info">
                            <div className="sender-name">DarkShadow Collective</div>
                            <div className="sender-email">&lt;no-reply@temporarymail-x7k9.onion.ly&gt;</div>
                        </div>
                        <div className="email-date">9:14 AM (3 hours ago)</div>
                    </div>

                    <div className="warning-banner">
                        <i className="ph ph-warning" role="img" aria-label="Warning"></i>
                        <div className="message">Warning: This email appears suspicious. Be cautious with links and
                            attachments.</div>
                    </div>
                </div>

                <div className="email-body">
                    <p>[COMPANY NAME],</p>

                    <p>We inform you that your network infrastructure has been <strong>penetrated</strong> and all
                        critical
                        systems have been <strong>encrypted</strong> using military-grade encryption algorithms. This
                        includes:</p>

                    <ul>
                        <li>All database servers (production, staging, and backup)</li>
                        <li>File storage systems and network-attached storage</li>
                        <li>Employee workstations and laptops</li>
                        <li>Cloud infrastructure and virtual machines</li>
                        <li>Email servers and communication systems</li>
                    </ul>

                    <p><strong>We have also exfiltrated approximately 2.4 TB of sensitive data including:</strong></p>

                    <ul>
                        <li>Customer personal information and payment data</li>
                        <li>Proprietary source code and intellectual property</li>
                        <li>Financial records and banking information</li>
                    </ul>

                    <p>If you would like me to add a payment demand / next steps copy here, I can — but for now the
                        content above mirrors the sample you provided.</p>

                    <div className="email-signature">
                        <p>— DarkShadow Collective</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserPopup;
