import React from 'react';

const CloudPopup = ({ onClose }) => {
  return (
    <div id="cloud-console-popup">
      <style>{`
        #cloud-console-popup {
            font-family: 'Roboto', 'Segoe UI', sans-serif;
            width: 1200px;
            max-width: 100%;
        }
        
        #cloud-console-popup * { margin: 0; padding: 0; box-sizing: border-box; }

        #cloud-console-popup .console-window {
            width: 100%;
            height: 750px;
            background: #f8f9fa;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
        }

        /* Generic Window Header */
        #cloud-console-popup .window-header {
            background: rgb(9, 33, 77);
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            border-bottom: 1px solid rgba(122, 162, 212, 0.2);
            flex-shrink: 0;
        }

        #cloud-console-popup .window-title {
            color: #c0d4eb;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #cloud-console-popup .window-controls {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        #cloud-console-popup .control-icon {
            color: #7aa2d4;
            cursor: pointer;
            font-size: 14px;
            transition: color 0.2s;
            display: flex;
            align-items: center;
        }

        #cloud-console-popup .control-icon:hover { color: #fff; }
        #cloud-console-popup .control-icon.close:hover { color: #ff5f57; }

        /* App Header */
        #cloud-console-popup .header {
            height: 56px;
            background: #19222d; /* Slightly lighter than window header to distinguish */
            display: flex;
            align-items: center;
            padding: 0 20px;
            color: white;
            justify-content: space-between;
            border-bottom: 1px solid #333;
        }

        #cloud-console-popup .brand {
            font-size: 18px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        #cloud-console-popup .brand span { color: #ff9900; } /* Accent color */

        #cloud-console-popup .search-bar {
            background: #0f151c;
            border: 1px solid #444;
            border-radius: 4px;
            width: 400px;
            height: 32px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            color: #ccc;
            font-size: 14px;
        }

        /* Layout */
        #cloud-console-popup .layout {
            display: flex;
            flex: 1;
        }

        #cloud-console-popup .sidebar {
            width: 240px;
            background: #fff;
            border-right: 1px solid #ddd;
            padding: 20px 0;
        }

        #cloud-console-popup .nav-item {
            padding: 8px 20px;
            font-size: 14px;
            color: #555;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        #cloud-console-popup .nav-item:hover { background: #f2f2f2; color: #111; }
        #cloud-console-popup .nav-item.active { 
            border-left: 4px solid #ff9900; 
            background: #f8f8f8; 
            color: #d13212; /* Red for alert state */
            font-weight: 700;
        }

        /* Main Content */
        #cloud-console-popup .content {
            flex: 1;
            padding: 30px;
            overflow-y: auto;
        }

        #cloud-console-popup .page-header {
            margin-bottom: 20px;
        }

        #cloud-console-popup .breadcrumb { font-size: 12px; color: #666; margin-bottom: 8px; }
        #cloud-console-popup .page-title { font-size: 24px; color: #111; font-weight: 700; }

        #cloud-console-popup .alert-banner {
            background: #fdf7f7;
            border: 1px solid #d13212;
            border-left-width: 8px;
            padding: 16px;
            margin-bottom: 24px;
            display: flex;
            gap: 16px;
            color: #d13212;
        }

        /* Data Table */
        #cloud-console-popup .data-table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border: 1px solid #ddd;
            font-size: 13px;
        }

        #cloud-console-popup .data-table th {
            text-align: left;
            padding: 12px 16px;
            border-bottom: 1px solid #ddd;
            background: #fafafa;
            color: #666;
            font-weight: 700;
        }

        #cloud-console-popup .data-table td {
            padding: 12px 16px;
            border-bottom: 1px solid #eee;
            color: #333;
        }

        #cloud-console-popup .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 11px;
        }

        #cloud-console-popup .status-running { background: #e6f6e6; color: #1e8e3e; }
        #cloud-console-popup .status-error { background: #fce8e6; color: #d93025; }
        #cloud-console-popup .status-term { background: #f1f3f4; color: #5f6368; }

        #cloud-console-popup .cpu-bar {
            width: 100px;
            height: 6px;
            background: #eee;
            border-radius: 3px;
            overflow: hidden;
        }
        
        #cloud-console-popup .cpu-fill {
            height: 100%;
            background: #1a73e8;
        }
        #cloud-console-popup .cpu-fill.high { background: #d93025; }

        /* Cost Widget */
        #cloud-console-popup .cost-widget {
            position: absolute;
            bottom: 40px;
            right: 40px;
            width: 250px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
      `}</style>
      <div className="console-window">
        {/* Generic Window Header */}
        <div className="window-header">
            <div className="window-title">
                <i className="ph ph-cloud"></i>
                Cloud Management Console
            </div>
            <div className="window-controls">
                <div className="control-icon zoom-out"><i className="ph ph-minus"></i></div>
                <div className="control-icon zoom-in"><i className="ph ph-plus"></i></div>
                <div className="control-icon close" onClick={onClose}><i className="ph ph-x"></i></div>
            </div>
        </div>

        {/* Header */}
        <div className="header">
            <div className="brand">
                <i className="ph ph-cloud-warning"></i>
                Cloud<span>Console</span>
            </div>
            <div className="search-bar">
                <i className="ph ph-magnifying-glass" style={{marginRight: '8px'}}></i> Search resources, services, and docs
            </div>
            <div style={{fontSize: '14px'}}>admin@company.com</div>
        </div>

        <div className="layout">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="nav-item active"><i className="ph ph-cpu"></i> Instances (EC2)</div>
                <div className="nav-item"><i className="ph ph-database"></i> Databases (RDS)</div>
                <div className="nav-item"><i className="ph ph-hard-drives"></i> Storage (S3)</div>
                <div className="nav-item"><i className="ph ph-shield"></i> Security Groups</div>
                <div className="nav-item"><i className="ph ph-currency-dollar"></i> Billing</div>
                <div style={{marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '10px'}}>
                    <div className="nav-item"><i className="ph ph-gear"></i> Settings</div>
                </div>
            </div>

            {/* Content */}
            <div className="content">
                <div className="breadcrumb">Home {'>'} EC2 {'>'} Instances</div>
                <div className="page-header">
                    <div className="page-title">Instances</div>
                </div>

                <div className="alert-banner">
                    <i className="ph ph-warning-circle" style={{fontSize: '24px'}}></i>
                    <div>
                        <div style={{fontWeight: 700, fontSize: '14px', marginBottom: '4px'}}>Service Disruption Detected</div>
                        <div style={{fontSize: '13px'}}>Unusual activity detected in region us-east-1. Automated safeguards have isolated 42 instances to prevent spread. <a href="#" style={{color: 'inherit', textDecoration: 'underline'}}>View GuardDuty Report</a></div>
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{width: '30px'}}><input type="checkbox" /></th>
                            <th>Name</th>
                            <th>Instance ID</th>
                            <th>Status</th>
                            <th>CPU Usage</th>
                            <th>Public IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td style={{fontWeight: 500}}>prod-web-01</td>
                            <td style={{fontFamily: 'monospace'}}>i-0f9a8b7c</td>
                            <td><span className="status-badge status-error"><i className="ph ph-x-circle"></i> CHECK FAILED</span></td>
                            <td><div className="cpu-bar"><div className="cpu-fill high" style={{width: '100%'}}></div></div> 100%</td>
                            <td>54.211.xx.xx</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td style={{fontWeight: 500}}>prod-web-02</td>
                            <td style={{fontFamily: 'monospace'}}>i-1d2e3f4g</td>
                            <td><span className="status-badge status-error"><i className="ph ph-lock-key"></i> ENCRYPTED</span></td>
                            <td><div className="cpu-bar"><div className="cpu-fill high" style={{width: '100%'}}></div></div> 100%</td>
                            <td>54.211.xx.xx</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td style={{fontWeight: 500}}>prod-db-primary</td>
                            <td style={{fontFamily: 'monospace'}}>i-5h6i7j8k</td>
                            <td><span className="status-badge status-term"><i className="ph ph-stop"></i> STOPPED</span></td>
                            <td><div className="cpu-bar"><div className="cpu-fill" style={{width: '0%'}}></div></div> 0%</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td style={{fontWeight: 500}}>backup-server</td>
                            <td style={{fontFamily: 'monospace'}}>i-9l0m1n2o</td>
                            <td><span className="status-badge status-error"><i className="ph ph-warning"></i> COMPROMISED</span></td>
                            <td><div className="cpu-bar"><div className="cpu-fill high" style={{width: '98%'}}></div></div> 98%</td>
                            <td>3.12.xx.xx</td>
                        </tr>
                         <tr>
                            <td><input type="checkbox" /></td>
                            <td style={{fontWeight: 500}}>dev-sandbox</td>
                            <td style={{fontFamily: 'monospace'}}>i-3p4q5r6s</td>
                            <td><span className="status-badge status-running">RUNNING</span></td>
                            <td><div className="cpu-bar"><div className="cpu-fill" style={{width: '12%'}}></div></div> 12%</td>
                            <td>12.34.xx.xx</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Floating Cost Widget */}
            <div className="cost-widget">
                <div style={{fontSize: '12px', color: '#666', marginBottom: '4px'}}>Month-to-date Cost</div>
                <div style={{fontSize: '24px', fontWeight: 700, color: '#d93025'}}>$14,250.00</div>
                <div style={{fontSize: '11px', color: '#d93025', display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <i className="ph ph-trend-up"></i> +840% vs last month
                </div>
                <div style={{marginTop: '10px', fontSize: '11px', color: '#555'}}>
                    Abnormal compute usage detected (Crypto-mining signature).
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CloudPopup;
