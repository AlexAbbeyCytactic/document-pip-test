import React from 'react';

const CompanyPopup = ({ onClose }) => {
  return (
    <div id="company-popup">
      <style>{`
        #company-popup {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            width: 900px;
            max-width: 100%;
        }

        #company-popup * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        #company-popup .browser-window {
            width: 100%;
            border-radius: 12px;
            box-shadow:
                0 25px 50px -12px rgba(0, 0, 0, 0.5),
                0 0 0 1px rgba(255, 255, 255, 0.05);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            background: #fafafa;
            height: 600px;
        }

        /* Generic Window Header */
        #company-popup .window-header {
            background: rgb(9, 33, 77);
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            border-bottom: 1px solid rgba(122, 162, 212, 0.2);
            flex-shrink: 0;
        }

        #company-popup .window-title {
            color: #c0d4eb;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #company-popup .window-controls {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        #company-popup .control-icon {
            color: #7aa2d4;
            cursor: pointer;
            font-size: 14px;
            transition: color 0.2s;
            display: flex;
            align-items: center;
        }

        #company-popup .control-icon:hover { color: #fff; }
        #company-popup .control-icon.close:hover { color: #ff5f57; }

        /* Navigation Bar */
        #company-popup .nav-bar {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 16px;
            background: rgb(20, 55, 115);
            border-bottom: 1px solid rgba(122, 162, 212, 0.35);
        }

        #company-popup .nav-buttons {
            display: flex;
            gap: 4px;
        }

        #company-popup .nav-btn {
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

        #company-popup .url-bar {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 6px;
            padding: 6px 14px;
            border: 1px solid rgba(122, 162, 212, 0.35);
        }

        #company-popup .url-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: #c0d4eb;
            font-size: 13px;
            letter-spacing: 0.2px;
        }

        /* Content Area */
        #company-popup .content-area {
            flex: 1;
            background: #ffffff;
            padding: 0;
            overflow-y: auto;
        }

        /* Crunchbase-like Design */
        #company-popup .profile-header {
            background: #fff;
            padding: 24px 32px;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            align-items: flex-start;
            gap: 24px;
        }

        #company-popup .company-logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #2196f3 0%, #1565c0 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 32px;
            font-weight: bold;
            flex-shrink: 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        #company-popup .header-content {
            flex: 1;
            position: relative;
        }

        #company-popup .company-name {
            font-size: 28px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        #company-popup .verified-badge {
            color: #2196f3;
            font-size: 20px;
        }

        #company-popup .short-description {
            font-size: 16px;
            color: #555;
            margin-bottom: 16px;
            line-height: 1.4;
            max-width: 65%; /* Prevent overlap with buttons */
        }

        #company-popup .action-bar {
            display: flex;
            gap: 12px;
            position: absolute;
            top: 0;
            right: 0;
        }

        #company-popup .btn {
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            border: 1px solid transparent;
            transition: all 0.2s;
        }

        #company-popup .btn-primary {
            background: #42a5f5;
            color: #fff;
        }
        
        #company-popup .btn-primary:hover {
            background: #2196f3;
        }

        #company-popup .btn-outline {
            background: #fff;
            border-color: #d0d0d0;
            color: #333;
        }
        
        #company-popup .btn-outline:hover {
            background: #f5f5f5;
            border-color: #bbb;
        }

        #company-popup .main-layout {
            display: flex;
            flex-direction: column;
            padding: 24px 32px;
            gap: 24px;
            max-width: 100%;
        }

        #company-popup .section-card {
            background: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 24px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        #company-popup .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        #company-popup .section-title i {
            color: #42a5f5;
            font-size: 20px;
        }

        #company-popup .data-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        #company-popup .data-item {
            margin-bottom: 8px;
        }

        #company-popup .data-label {
            font-size: 12px;
            color: #666;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 4px;
        }

        #company-popup .data-value {
            font-size: 14px;
            color: #1a1a1a;
            font-weight: 500;
        }

        #company-popup .process-list {
            list-style: none;
        }

        #company-popup .process-item {
            display: flex;
            gap: 12px;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        #company-popup .process-item:last-child {
            border-bottom: none;
        }
        
        #company-popup .process-content h4 {
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-bottom: 2px;
        }
        
        #company-popup .process-content p {
            font-size: 12px;
            color: #666;
            line-height: 1.4;
        }

        #company-popup .link-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        #company-popup .link-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #1565c0;
            font-size: 13px;
            text-decoration: none;
            font-weight: 500;
        }
        
        #company-popup .link-item:hover {
            text-decoration: underline;
        }
      `}</style>
      
      <div className="browser-window">
        {/* Generic Window Header */}
        <div className="window-header">
            <div className="window-title">
                <i className="ph ph-globe"></i>
                Web Browser - Company Profile
            </div>
            <div className="window-controls">
                <div className="control-icon zoom-out"><i className="ph ph-minus"></i></div>
                <div className="control-icon zoom-in"><i className="ph ph-plus"></i></div>
                <div className="control-icon close" onClick={onClose}><i className="ph ph-x"></i></div>
            </div>
        </div>

        {/* Navigation Bar */}
        <div className="nav-bar">
            <div className="nav-buttons">
                <button className="nav-btn"><i className="ph ph-caret-left"></i></button>
                <button className="nav-btn"><i className="ph ph-caret-right"></i></button>
                <button className="nav-btn"><i className="ph ph-arrow-clockwise"></i></button>
            </div>

            <div className="url-bar">
                <i className="ph ph-lock-simple" style={{color: '#6b9', fontSize: '14px'}}></i>
                <input type="text" className="url-input" value="crunchbase.com/organization/apex-innovations" readOnly />
            </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
            
            <div className="profile-header">
                <div className="company-logo">
                    <i className="ph ph-rocket-launch"></i>
                </div>
                <div className="header-content">
                    <h1 className="company-name">
                        Apex Innovations
                        <i className="ph ph-seal-check verified-badge"></i>
                        <div style={{display: 'flex', gap: '8px', marginLeft: '12px', color: '#666'}}>
                            <i className="ph ph-twitter-logo" style={{fontSize: '20px', cursor: 'pointer'}}></i>
                            <i className="ph ph-linkedin-logo" style={{fontSize: '20px', cursor: 'pointer'}}></i>
                        </div>
                    </h1>
                    <p className="short-description">
                        Pioneering the future of autonomous systems and neural network optimization for enterprise-scale applications.
                    </p>
                    <div className="action-bar">
                        <button className="btn btn-primary">Follow</button>
                        <button className="btn btn-outline">View Website</button>
                        <button className="btn btn-outline">Save</button>
                    </div>
                </div>
            </div>

            <div className="main-layout">
                <div className="section-card">
                    <div className="section-title">
                        <i className="ph ph-info"></i>
                        About
                    </div>
                    <div className="data-grid">
                        <div className="data-item">
                            <div className="data-label">
                                <i className="ph ph-map-pin" style={{marginRight: '6px', fontSize: '14px', verticalAlign: 'text-bottom'}}></i>
                                Headquarters
                            </div>
                            <div className="data-value">San Francisco, California</div>
                        </div>
                        <div className="data-item">
                            <div className="data-label">
                                <i className="ph ph-factory" style={{marginRight: '6px', fontSize: '14px', verticalAlign: 'text-bottom'}}></i>
                                Industry
                            </div>
                            <div className="data-value">Artificial Intelligence, Robotics</div>
                        </div>
                        <div className="data-item">
                            <div className="data-label">
                                <i className="ph ph-users" style={{marginRight: '6px', fontSize: '14px', verticalAlign: 'text-bottom'}}></i>
                                Employees
                            </div>
                            <div className="data-value">150 - 250</div>
                        </div>
                        <div className="data-item">
                            <div className="data-label">
                                <i className="ph ph-buildings" style={{marginRight: '6px', fontSize: '14px', verticalAlign: 'text-bottom'}}></i>
                                Company Type
                            </div>
                            <div className="data-value">For Profit</div>
                        </div>
                        <div className="data-item">
                            <div className="data-label">
                                <i className="ph ph-chart-line-up" style={{marginRight: '6px', fontSize: '14px', verticalAlign: 'text-bottom'}}></i>
                                Publicly Traded
                            </div>
                            <div className="data-value">No</div>
                        </div>
                        <div className="data-item">
                            <div className="data-label">
                                <i className="ph ph-currency-dollar" style={{marginRight: '6px', fontSize: '14px', verticalAlign: 'text-bottom'}}></i>
                                Estimated Revenue
                            </div>
                            <div className="data-value">$50M - $100M</div>
                        </div>
                    </div>
                </div>

                <div className="section-card">
                    <div className="section-title">
                        <i className="ph ph-gear-six"></i>
                        Key Processes & Services
                    </div>
                    <div className="process-list">
                        <div className="process-item">
                            <div className="process-content">
                                <h4>Neural Network Optimization</h4>
                                <p>Proprietary algorithms that reduce computational load by up to 40% while maintaining accuracy.</p>
                            </div>
                        </div>
                        <div className="process-item">
                            <div className="process-content">
                                <h4>Autonomous Navigation Systems</h4>
                                <p>L4/L5 autonomy stacks for industrial drones and logistics robots.</p>
                            </div>
                        </div>
                        <div className="process-item">
                            <div className="process-content">
                                <h4>Predictive Analytics Platform</h4>
                                <p>Enterprise dashboard for forecasting supply chain disruptions using AI.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPopup;
