import React from 'react';

const SiemPopup = ({ onClose }) => {
  return (
    <div id="siem-dashboard-popup">
      <style>{`
        #siem-dashboard-popup {
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            width: 1100px;
            max-width: 100%;
        }
        
        #siem-dashboard-popup * { margin: 0; padding: 0; box-sizing: border-box; }

        #siem-dashboard-popup .dashboard-window {
            width: 100%;
            height: 700px;
            background: #0f1218;
            border-radius: 12px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            color: #ccc;
        }

        /* Generic Window Header */
        #siem-dashboard-popup .window-header {
            background: rgb(9, 33, 77);
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            border-bottom: 1px solid rgba(122, 162, 212, 0.2);
            flex-shrink: 0;
        }

        #siem-dashboard-popup .window-title {
            color: #c0d4eb;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #siem-dashboard-popup .window-controls {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        #siem-dashboard-popup .control-icon {
            color: #7aa2d4;
            cursor: pointer;
            font-size: 14px;
            transition: color 0.2s;
            display: flex;
            align-items: center;
        }

        #siem-dashboard-popup .control-icon:hover { color: #fff; }
        #siem-dashboard-popup .control-icon.close:hover { color: #ff5f57; }


        /* Top Bar */
        #siem-dashboard-popup .top-bar {
            height: 50px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            padding: 0 20px;
            justify-content: space-between;
            background: #161b22;
        }

        #siem-dashboard-popup .logo {
            font-weight: 700;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 8px;
            letter-spacing: 1px;
        }

        #siem-dashboard-popup .logo i { color: #58a6ff; }

        #siem-dashboard-popup .status-indicator {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px;
            background: rgba(255, 50, 50, 0.15);
            border: 1px solid rgba(255, 50, 50, 0.3);
            border-radius: 4px;
            color: #ff5555;
            font-size: 12px;
            font-weight: 600;
            animation: siemPulseRed 2s infinite;
        }

        @keyframes siemPulseRed {
            0% { box-shadow: 0 0 0 0 rgba(255, 85, 85, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(255, 85, 85, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 85, 85, 0); }
        }

        /* Grid Layout */
        #siem-dashboard-popup .grid-container {
            padding: 20px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 20px;
            height: calc(100% - 50px);
        }

        #siem-dashboard-popup .panel {
            background: #161b22;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 16px;
            display: flex;
            flex-direction: column;
        }

        #siem-dashboard-popup .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            font-size: 13px;
            font-weight: 600;
            color: #8b949e;
            text-transform: uppercase;
        }

        /* Map (Abstract) */
        #siem-dashboard-popup .map-container {
            flex: 1;
            background: radial-gradient(circle at 50% 50%, #1c2128 0%, #161b22 100%);
            border-radius: 4px;
            position: relative;
            overflow: hidden;
        }

        #siem-dashboard-popup .map-grid {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 20px 20px;
        }

        #siem-dashboard-popup .threat-point {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #ff5555;
            border-radius: 50%;
            box-shadow: 0 0 10px #ff5555;
        }
        #siem-dashboard-popup .tp-1 { top: 30%; left: 70%; animation: siemPing 1.5s infinite; }
        #siem-dashboard-popup .tp-2 { top: 45%; left: 20%; animation: siemPing 2s infinite; }
        #siem-dashboard-popup .tp-3 { top: 25%; left: 80%; animation: siemPing 1s infinite; }

        #siem-dashboard-popup .threat-line {
            position: absolute;
            height: 1px;
            background: linear-gradient(90deg, transparent, #ff5555, transparent);
            transform-origin: left center;
            opacity: 0.6;
        }

        @keyframes siemPing {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
        }

        /* Alerts List */
        #siem-dashboard-popup .alert-list {
            flex: 1;
            overflow-y: hidden;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        #siem-dashboard-popup .alert-item {
            display: flex;
            align-items: center;
            padding: 10px;
            background: rgba(255, 255, 255, 0.03);
            border-left: 3px solid #333;
            border-radius: 4px;
            font-size: 13px;
        }

        #siem-dashboard-popup .alert-item.critical {
            background: rgba(255, 50, 50, 0.1);
            border-left-color: #ff5555;
        }

        #siem-dashboard-popup .alert-item.warning {
            background: rgba(255, 180, 50, 0.1);
            border-left-color: #ffb432;
        }

        #siem-dashboard-popup .alert-time {
            color: #8b949e;
            width: 60px;
            font-size: 11px;
            font-family: monospace;
        }

        #siem-dashboard-popup .alert-msg {
            flex: 1;
            font-weight: 500;
        }

        /* Server Grid */
        #siem-dashboard-popup .server-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 8px;
            flex: 1;
            align-content: start;
        }

        #siem-dashboard-popup .server-node {
            aspect-ratio: 1;
            background: #21262d;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #8b949e;
            border: 1px solid rgba(255,255,255,0.05);
            transition: all 0.2s;
        }

        #siem-dashboard-popup .server-node.offline {
            background: rgba(255, 85, 85, 0.15);
            border-color: rgba(255, 85, 85, 0.3);
            color: #ff5555;
            box-shadow: 0 0 8px rgba(255, 85, 85, 0.1);
        }

        /* Traffic Graph */
        #siem-dashboard-popup .traffic-bars {
            display: flex;
            align-items: flex-end;
            gap: 4px;
            height: 100%;
            padding-top: 20px;
        }

        #siem-dashboard-popup .bar {
            flex: 1;
            background: #3fb950;
            opacity: 0.7;
            border-radius: 2px 2px 0 0;
            transition: height 0.5s ease;
        }

        #siem-dashboard-popup .bar.spike {
            background: #ff5555;
            opacity: 1;
            box-shadow: 0 0 15px rgba(255, 85, 85, 0.4);
        }

        #siem-dashboard-popup .stat-value {
            font-size: 24px;
            font-weight: 300;
            color: #fff;
            margin-bottom: 4px;
        }
        
        #siem-dashboard-popup .stat-label {
            font-size: 12px;
            color: #8b949e;
        }
      `}</style>
      <div className="dashboard-window">
        {/* Generic Window Header */}
        <div className="window-header">
            <div className="window-title">
                <i className="ph ph-monitor"></i>
                Security Operations Center
            </div>
            <div className="window-controls">
                <div className="control-icon zoom-out"><i className="ph ph-minus"></i></div>
                <div className="control-icon zoom-in"><i className="ph ph-plus"></i></div>
                <div className="control-icon close" onClick={onClose}><i className="ph ph-x"></i></div>
            </div>
        </div>

        {/* Top Bar */}
        <div className="top-bar">
            <div className="logo">
                <i className="ph ph-shield-check"></i>
                SENTINEL // OVERWATCH
            </div>
            <div className="status-indicator">
                <i className="ph ph-warning-circle"></i>
                ACTIVE INCIDENT DETECTED
            </div>
        </div>

        <div className="grid-container">
            {/* Map Panel */}
            <div className="panel" style={{gridRow: '1 / 3'}}>
                <div className="panel-header">
                    <span>Global Threat Vectors</span>
                    <i className="ph ph-globe"></i>
                </div>
                <div className="map-container">
                    <div className="map-grid"></div>
                    {/* Abstract continent shapes could go here, simplified with dots for now */}
                    <div className="threat-point tp-1"></div>
                    <div className="threat-point tp-2"></div>
                    <div className="threat-point tp-3"></div>
                    
                    <div style={{position: 'absolute', bottom: '20px', left: '20px'}}>
                        <div className="stat-value" style={{color: '#ff5555'}}>24.5 GB/s</div>
                        <div className="stat-label">OUTBOUND TRAFFIC (ANOMALOUS)</div>
                    </div>
                </div>
                <div style={{marginTop: '15px', height: '100px'}}>
                    <div className="panel-header" style={{marginBottom: '10px'}}>Exfiltration Bandwidth</div>
                    <div className="traffic-bars">
                        <div className="bar" style={{height: '20%'}}></div>
                        <div className="bar" style={{height: '25%'}}></div>
                        <div className="bar" style={{height: '15%'}}></div>
                        <div className="bar" style={{height: '22%'}}></div>
                        <div className="bar" style={{height: '18%'}}></div>
                        <div className="bar" style={{height: '30%'}}></div>
                        <div className="bar" style={{height: '25%'}}></div>
                        <div className="bar" style={{height: '20%'}}></div>
                        <div className="bar spike" style={{height: '95%'}}></div>
                        <div className="bar spike" style={{height: '88%'}}></div>
                        <div className="bar spike" style={{height: '100%'}}></div>
                        <div className="bar spike" style={{height: '92%'}}></div>
                    </div>
                </div>
            </div>

            {/* Alerts Panel */}
            <div className="panel">
                <div className="panel-header">
                    <span>Live Alert Feed</span>
                    <span style={{background: '#ff5555', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px'}}>99+ NEW</span>
                </div>
                <div className="alert-list">
                    <div className="alert-item critical">
                        <span className="alert-time">09:14</span>
                        <span className="alert-msg">Mass file encryption detected on /vol/data-01</span>
                    </div>
                    <div className="alert-item critical">
                        <span className="alert-time">09:14</span>
                        <span className="alert-msg">Ransomware signature match: "DarkShadow"</span>
                    </div>
                    <div className="alert-item critical">
                        <span className="alert-time">09:13</span>
                        <span className="alert-msg">Privilege escalation: user 'www-data' to 'root'</span>
                    </div>
                    <div className="alert-item warning">
                        <span className="alert-time">09:12</span>
                        <span className="alert-msg">Port 445 (SMB) traffic spike detected</span>
                    </div>
                    <div className="alert-item warning">
                        <span className="alert-time">09:11</span>
                        <span className="alert-msg">Failed login attempts: 4500 (Source: IP 192.168.x.x)</span>
                    </div>
                </div>
            </div>

            {/* Infrastructure Status */}
            <div className="panel">
                <div className="panel-header">
                    <span>Infrastructure Health</span>
                    <span style={{color: '#ff5555'}}>CRITICAL</span>
                </div>
                <div className="server-grid">
                    {/* Generating a grid where most are offline */}
                    <div className="server-node offline"><i className="ph ph-database"></i></div>
                    <div className="server-node offline"><i className="ph ph-database"></i></div>
                    <div className="server-node offline"><i className="ph ph-database"></i></div>
                    <div className="server-node offline"><i className="ph ph-database"></i></div>
                    <div className="server-node offline"><i className="ph ph-database"></i></div>
                    <div className="server-node offline"><i className="ph ph-hard-drives"></i></div>
                    
                    <div className="server-node offline"><i className="ph ph-cpu"></i></div>
                    <div className="server-node offline"><i className="ph ph-cpu"></i></div>
                    <div className="server-node offline"><i className="ph ph-cpu"></i></div>
                    <div className="server-node"><i className="ph ph-cpu"></i></div>
                    <div className="server-node offline"><i className="ph ph-cpu"></i></div>
                    <div className="server-node offline"><i className="ph ph-cpu"></i></div>

                    <div className="server-node offline"><i className="ph ph-globe"></i></div>
                    <div className="server-node offline"><i className="ph ph-globe"></i></div>
                    <div className="server-node"><i className="ph ph-globe"></i></div>
                    <div className="server-node"><i className="ph ph-globe"></i></div>
                    <div className="server-node offline"><i className="ph ph-globe"></i></div>
                    <div className="server-node offline"><i className="ph ph-globe"></i></div>
                </div>
                <div style={{marginTop: '10px', fontSize: '11px', color: '#8b949e', display: 'flex', justifyContent: 'spaceBetween'}}>
                    <span>Online: 3/48</span>
                    <span style={{color: '#ff5555'}}>Compromised: 45</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SiemPopup;
