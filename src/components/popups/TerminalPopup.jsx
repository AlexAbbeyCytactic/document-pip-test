import React from 'react';

const TerminalPopup = ({ onClose }) => {
  return (
    <div id="terminal-popup">
      <style>{`
        #terminal-popup {
            font-family: 'JetBrains Mono', 'Fira Code', 'Roboto Mono', monospace;
            width: 900px;
            max-width: 100%;
        }
        
        #terminal-popup * { margin: 0; padding: 0; box-sizing: border-box; }

        #terminal-popup .terminal-window {
            width: 100%;
            height: 600px;
            border-radius: 12px;
            box-shadow:
                0 25px 50px -12px rgba(0, 0, 0, 0.5),
                0 0 0 1px rgba(255, 255, 255, 0.1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            background: #0d1117; /* Very dark background */
        }

        /* Generic Window Header */
        #terminal-popup .window-header {
            background: rgb(9, 33, 77);
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            border-bottom: 1px solid rgba(122, 162, 212, 0.2);
            flex-shrink: 0;
        }

        #terminal-popup .window-title {
            color: #c0d4eb;
            font-size: 12px;
            font-weight: 600;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #terminal-popup .window-controls {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        #terminal-popup .control-icon {
            color: #7aa2d4;
            cursor: pointer;
            font-size: 14px;
            transition: color 0.2s;
            display: flex;
            align-items: center;
        }

        #terminal-popup .control-icon:hover { color: #fff; }
        #terminal-popup .control-icon.close:hover { color: #ff5f57; }

        /* Terminal Content */
        #terminal-popup .terminal-content {
            flex: 1;
            padding: 20px;
            color: #e6edf3;
            font-size: 14px;
            line-height: 1.6;
            overflow-y: auto;
            position: relative;
        }

        /* Scan Line Effect */
        #terminal-popup .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0),
                rgba(255, 255, 255, 0) 50%,
                rgba(0, 0, 0, 0.05) 50%,
                rgba(0, 0, 0, 0.05)
            );
            background-size: 100% 4px;
            pointer-events: none;
            opacity: 0.15;
            z-index: 10;
        }

        #terminal-popup .prompt-line {
            display: flex;
            gap: 10px;
            margin-bottom: 4px;
        }

        #terminal-popup .prompt-user {
            color: #7ee787; /* Green for user */
            font-weight: 700;
        }

        #terminal-popup .prompt-path {
            color: #7aa2d4; /* Blue for path */
            font-weight: 700;
        }

        #terminal-popup .command {
            color: #fff;
        }

        #terminal-popup .output {
            color: #8b949e;
            margin-bottom: 16px;
            white-space: pre-wrap;
        }

        #terminal-popup .output.error {
            color: #ff7b72;
        }

        #terminal-popup .output.success {
            color: #7ee787;
        }

        #terminal-popup .output.info {
            color: #79c0ff;
        }

        #terminal-popup .cursor {
            display: inline-block;
            width: 8px;
            height: 16px;
            background: #a5d6ff;
            animation: terminalBlink 1s step-end infinite;
            vertical-align: middle;
            margin-left: 4px;
        }

        @keyframes terminalBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        /* Progress Bar style */
        #terminal-popup .progress-container {
            width: 300px;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            margin: 8px 0;
            overflow: hidden;
        }

        #terminal-popup .progress-bar {
            height: 100%;
            background: #27c93f;
            width: 75%;
        }

        /* Status badges */
        #terminal-popup .badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
        }

        #terminal-popup .badge.encrypted {
            background: rgba(255, 123, 114, 0.2);
            color: #ff7b72;
            border: 1px solid rgba(255, 123, 114, 0.4);
        }

      `}</style>
      <div className="terminal-window">
        <div className="scan-line"></div>
        
        {/* Generic Window Header */}
        <div className="window-header">
            <div className="window-title">
                <i className="ph ph-terminal-window"></i>
                admin@server-01: ~
            </div>
            <div className="window-controls">
                <div className="control-icon zoom-out"><i className="ph ph-minus"></i></div>
                <div className="control-icon zoom-in"><i className="ph ph-plus"></i></div>
                <div className="control-icon close" onClick={onClose}><i className="ph ph-x"></i></div>
            </div>
        </div>

        {/* Terminal Content */}
        <div className="terminal-content">
            {/* Command 1 */}
            <div className="prompt-line">
                <span className="prompt-user">admin@server-01</span>
                <span>:</span>
                <span className="prompt-path">~</span>
                <span>$</span>
                <span className="command"> syscheck --status --verbose</span>
            </div>
            <div className="output">System Integrity Check v2.4.1
---------------------------
Scanning file system...
[WARN]  Unexpected modification in /var/log/auth.log
[WARN]  Unrecognized process ID: 8942 (kworker/u12:0)
[INFO]  Network interfaces: active
            </div>

            {/* Command 2 */}
            <div className="prompt-line">
                <span className="prompt-user">admin@server-01</span>
                <span>:</span>
                <span className="prompt-path">~</span>
                <span>$</span>
                <span className="command"> tail -n 5 /var/log/syslog | grep "CRYPT"</span>
            </div>
            <div className="output error">Dec 31 09:12:44 server-01 kernel: [4423.112] CRYPT-FS: Volume header corruption detected
Dec 31 09:12:45 server-01 kernel: [4423.115] CRYPT-FS: Initiating military-grade lock sequence
Dec 31 09:12:45 server-01 kernel: [4423.118] CRYPT-FS: Access denied for user 'root'
Dec 31 09:13:01 server-01 daemon: [4423.201] CRYPT-WORM: Replica propagation complete
Dec 31 09:13:02 server-01 daemon: [4423.205] CRYPT-MSG: "Your files are encrypted. Contact DarkShadow."</div>

            {/* Command 3 */}
            <div className="prompt-line">
                <span className="prompt-user">admin@server-01</span>
                <span>:</span>
                <span className="prompt-path">~</span>
                <span>$</span>
                <span className="command"> ./decrypt_tool --check-status</span>
            </div>
            <div className="output">Analyzing volume encryption status...
Target: /dev/sda1 (Primary Partition)

Encryption Status: <span className="badge encrypted">LOCKED</span>
Algorithm: AES-256-GCM + RSA-4096

Progress:
<div className="progress-container"><div className="progress-bar" style={{width: '100%', background: '#ff7b72'}}></div></div>
100% Encrypted. No local keys found.
</div>

            {/* Active Prompt */}
            <div className="prompt-line">
                <span className="prompt-user">admin@server-01</span>
                <span>:</span>
                <span className="prompt-path">~</span>
                <span>$</span>
                <span className="command"> <span className="cursor"></span></span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPopup;
