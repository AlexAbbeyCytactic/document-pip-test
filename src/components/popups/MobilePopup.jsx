import React from 'react';

const MobilePopup = ({ onClose }) => {
  return (
    <div id="mobile-lockscreen-popup">
      <style>{`
        #mobile-lockscreen-popup {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            width: auto;
            min-width: 400px; /* Ensure enough space for shadows */
            padding: 40px; /* Padding for shadows to not be clipped */
            max-width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        #mobile-lockscreen-popup * { margin: 0; padding: 0; box-sizing: border-box; }

        /* Emulator Window Wrapper - Transparent */
        #mobile-lockscreen-popup .emulator-window {
            background: transparent;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: auto;
        }

        #mobile-lockscreen-popup .phone-frame {
            width: 320px;
            height: 680px;
            background: #000;
            border-radius: 40px;
            /* Only bezel shadow, removed the outer drop shadow */
            box-shadow: 0 0 0 4px #333;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        /* Generic Window Header - MOVED INSIDE */
        #mobile-lockscreen-popup .window-header {
            width: 100%;
            background: rgb(9, 33, 77);
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            flex-shrink: 0;
            z-index: 30;
            border-bottom: 1px solid rgba(122, 162, 212, 0.2);
        }

        #mobile-lockscreen-popup .window-title {
            color: #c0d4eb;
            font-size: 11px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #mobile-lockscreen-popup .window-controls {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        #mobile-lockscreen-popup .control-icon {
            color: #7aa2d4;
            cursor: pointer;
            font-size: 14px;
            transition: color 0.2s;
            display: flex;
            align-items: center;
        }

        #mobile-lockscreen-popup .control-icon:hover { color: #fff; }
        #mobile-lockscreen-popup .control-icon.close:hover { color: #ff5f57; }

        /* Notch */
        #mobile-lockscreen-popup .notch {
            position: absolute;
            top: 36px; /* Below toolbar */
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 24px;
            background: #1a1a1a;
            border-bottom-left-radius: 14px;
            border-bottom-right-radius: 14px;
            z-index: 20;
        }

        /* Background Wallpaper */
        #mobile-lockscreen-popup .wallpaper {
            position: absolute;
            top: 36px; /* Starts below toolbar */
            left: 0;
            width: 100%;
            height: calc(100% - 36px);
            background: linear-gradient(135deg, #09214d 0%, #000000 100%);
            z-index: 1;
        }

        #mobile-lockscreen-popup .wallpaper::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(10px);
            background: rgba(0,0,0,0.2);
        }

        /* Status Bar */
        #mobile-lockscreen-popup .status-bar {
            position: relative;
            z-index: 10;
            height: 38px;
            margin-top: 36px; /* Offset for toolbar */
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            color: #fff;
            font-size: 12px;
            font-weight: 600;
        }

        /* Time & Date */
        #mobile-lockscreen-popup .lock-header {
            position: relative;
            z-index: 10;
            margin-top: 20px;
            text-align: center;
            color: #fff;
        }

        #mobile-lockscreen-popup .time {
            font-size: 64px;
            font-weight: 200;
            line-height: 1;
        }

        #mobile-lockscreen-popup .date {
            font-size: 16px;
            font-weight: 400;
            margin-top: 6px;
            opacity: 0.9;
        }

        /* Notification Stack */
        #mobile-lockscreen-popup .notification-stack {
            position: relative;
            z-index: 10;
            flex: 1;
            padding: 15px 10px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 15px;
        }

        #mobile-lockscreen-popup .notification {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border-radius: 12px;
            padding: 10px;
            color: #fff;
            display: flex;
            flex-direction: column;
            gap: 6px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            animation: mobileSlideIn 0.5s ease-out;
            cursor: pointer;
            transition: background 0.2s;
        }

        #mobile-lockscreen-popup .notification:active { background: rgba(255,255,255,0.25); }

        @keyframes mobileSlideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        #mobile-lockscreen-popup .notif-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            opacity: 0.8;
        }
        
        #mobile-lockscreen-popup .app-info {
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 500;
        }

        #mobile-lockscreen-popup .app-icon {
            width: 18px;
            height: 18px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
        }

        #mobile-lockscreen-popup .notif-content {
            font-size: 13px;
            line-height: 1.4;
        }

        #mobile-lockscreen-popup .notif-title { font-weight: 600; margin-bottom: 2px; }
        #mobile-lockscreen-popup .notif-body { opacity: 0.9; }

        /* Specific App Styles */
        #mobile-lockscreen-popup .icon-pd { background: #00b300; }
        #mobile-lockscreen-popup .icon-slack { background: #4a154b; }
        #mobile-lockscreen-popup .icon-auth { background: #1a73e8; }
        #mobile-lockscreen-popup .icon-msg { background: #34c759; }

        /* Footer */
        #mobile-lockscreen-popup .footer-actions {
            position: relative;
            z-index: 10;
            height: 70px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px;
            margin-bottom: 15px;
        }

        #mobile-lockscreen-popup .action-circle {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 18px;
            transition: background 0.2s;
        }

        #mobile-lockscreen-popup .action-circle:active { background: rgba(255, 255, 255, 0.3); }

        #mobile-lockscreen-popup .home-bar {
            position: absolute;
            bottom: 6px;
            left: 50%;
            transform: translateX(-50%);
            width: 110px;
            height: 4px;
            background: #fff;
            border-radius: 2px;
            z-index: 20;
        }
      `}</style>
      <div className="emulator-window">
        <div className="phone-frame">
          {/* Toolbar moved inside */}
          <div className="window-header">
            <div className="window-title">
              <i className="ph ph-device-mobile"></i>
              Mobile View
            </div>
            <div className="window-controls">
              <div className="control-icon zoom-out"><i className="ph ph-minus"></i></div>
              <div className="control-icon zoom-in"><i className="ph ph-plus"></i></div>
              <div className="control-icon close" onClick={onClose}><i className="ph ph-x"></i></div>
            </div>
          </div>

          <div className="notch"></div>
          <div className="wallpaper"></div>

          {/* Status Bar */}
          <div className="status-bar">
            <span>AT&T</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <i className="ph ph-signal-full"></i>
              <i className="ph ph-wifi-high"></i>
              <i className="ph ph-battery-warning-vertical"></i>
            </div>
          </div>

          {/* Lock Header */}
          <div className="lock-header">
            <div className="time">09:14</div>
            <div className="date">Wednesday, December 31</div>
          </div>

          {/* Notifications */}
          <div className="notification-stack">
            {/* PagerDuty (Critical) */}
            <div className="notification">
              <div className="notif-header">
                <div className="app-info">
                  <div className="app-icon icon-pd"><i className="ph ph-siren"></i></div>
                  <span>PagerDuty</span>
                </div>
                <span>now</span>
              </div>
              <div className="notif-content">
                <div className="notif-title">CRITICAL: Production Down</div>
                <div className="notif-body">Incident #9482: Multiple services unreachable. High severity. Acknowledge immediately.</div>
              </div>
            </div>

            {/* Authenticator */}
            <div className="notification">
              <div className="notif-header">
                <div className="app-info">
                  <div className="app-icon icon-auth"><i className="ph ph-shield-check"></i></div>
                  <span>Authenticator</span>
                </div>
                <span>2m ago</span>
              </div>
              <div className="notif-content">
                <div className="notif-title">Review Login Request</div>
                <div className="notif-body">Are you trying to sign in? Location: Pyongyang, KP. Device: Unknown.</div>
              </div>
            </div>

            {/* Slack Group */}
            <div className="notification" style={{ minHeight: '90px' }}>
              <div className="notif-header">
                <div className="app-info">
                  <div className="app-icon icon-slack"><i className="ph ph-slack-logo"></i></div>
                  <span>Slack</span>
                </div>
                <span>5m ago</span>
              </div>
              <div className="notif-content">
                <div className="notif-title">#incident-response (15 new)</div>
                <div className="notif-body">Sarah (CISO): @channel SHUT DOWN EVERYTHING.</div>
              </div>
            </div>

            {/* Messages */}
            <div className="notification">
              <div className="notif-header">
                <div className="app-info">
                  <div className="app-icon icon-msg"><i className="ph ph-chat-circle-dots"></i></div>
                  <span>Messages</span>
                </div>
                <span>10m ago</span>
              </div>
              <div className="notif-content">
                <div className="notif-title">Bank of America Fraud Alert</div>
                <div className="notif-body">Did you attempt a wire transfer of $150,000.00? Reply YES or NO.</div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="footer-actions">
            <div className="action-circle"><i className="ph ph-flashlight"></i></div>
            <div className="action-circle"><i className="ph ph-camera"></i></div>
          </div>

          <div className="home-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default MobilePopup;