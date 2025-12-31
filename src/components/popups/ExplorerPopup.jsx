import React from 'react';

const ExplorerPopup = ({ onClose }) => {
  return (
    <div id="explorer-popup">
      <style>{`
        #explorer-popup {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            width: 900px;
            max-width: 100%;
        }
        
        #explorer-popup * { margin: 0; padding: 0; box-sizing: border-box; }

        #explorer-popup .finder-window {
            width: 100%;
            height: 600px;
            background: #f5f5f7;
            border-radius: 12px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        /* Generic Window Header */
        #explorer-popup .window-header {
            background: rgb(9, 33, 77);
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            border-bottom: 1px solid rgba(122, 162, 212, 0.2);
            flex-shrink: 0;
        }

        #explorer-popup .window-title {
            color: #c0d4eb;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #explorer-popup .window-controls {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        #explorer-popup .control-icon {
            color: #7aa2d4;
            cursor: pointer;
            font-size: 14px;
            transition: color 0.2s;
            display: flex;
            align-items: center;
        }

        #explorer-popup .control-icon:hover { color: #fff; }
        #explorer-popup .control-icon.close:hover { color: #ff5f57; }

        /* Toolbar */
        #explorer-popup .toolbar {
            height: 46px;
            background: #f0f0f0;
            border-bottom: 1px solid #d1d1d1;
            display: flex;
            align-items: center;
            padding: 0 16px;
            gap: 16px;
        }

        #explorer-popup .view-controls {
            display: flex;
            background: rgba(0,0,0,0.05);
            border-radius: 6px;
            padding: 2px;
        }

        #explorer-popup .view-btn {
            padding: 4px 8px;
            border-radius: 4px;
            border: none;
            background: transparent;
            color: #555;
            font-size: 16px;
        }
        #explorer-popup .view-btn.active { background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }

        #explorer-popup .path-display {
            font-size: 13px;
            font-weight: 600;
            color: #444;
            flex: 1;
            text-align: center;
        }

        #explorer-popup .search {
            position: relative;
        }
        #explorer-popup .search input {
            padding: 4px 8px 4px 28px;
            border-radius: 6px;
            border: 1px solid #ccc;
            background: #fff;
            width: 150px;
            font-size: 12px;
        }
        #explorer-popup .search i {
            position: absolute;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
            color: #888;
            font-size: 12px;
        }

        /* Content Layout */
        #explorer-popup .main-view {
            flex: 1;
            display: flex;
        }

        #explorer-popup .sidebar {
            width: 180px;
            background: rgba(236, 236, 236, 0.5);
            backdrop-filter: blur(20px);
            border-right: 1px solid #d1d1d1;
            padding: 20px 0;
        }

        #explorer-popup .sidebar-group { margin-bottom: 20px; }
        #explorer-popup .group-label {
            padding: 0 16px;
            font-size: 11px;
            font-weight: 600;
            color: #888;
            margin-bottom: 4px;
        }
        #explorer-popup .sidebar-item {
            padding: 4px 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: #444;
        }
        #explorer-popup .sidebar-item.active { background: rgba(0,0,0,0.08); color: #000; }
        #explorer-popup .sidebar-item i { font-size: 16px; width: 16px; text-align: center; }

        #explorer-popup .file-grid {
            flex: 1;
            background: #fff;
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            grid-auto-rows: 110px;
            gap: 10px;
            overflow-y: auto;
        }

        #explorer-popup .file-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            border-radius: 4px;
            text-align: center;
        }
        
        #explorer-popup .file-item:hover { background: #f0f0f0; }
        #explorer-popup .file-item.selected { background: #e0e0e0; border: 1px solid #ccc; }

        #explorer-popup .icon-wrapper {
            position: relative;
            width: 48px;
            height: 56px; /* Rough aspect ratio */
            margin-bottom: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #explorer-popup .file-icon {
            font-size: 48px;
            color: #7aa2d4; /* Default blueish folder/file color */
        }
        
        #explorer-popup .file-icon.locked {
            color: #999; /* Greyed out */
        }

        #explorer-popup .lock-badge {
            position: absolute;
            bottom: -2px;
            right: -6px;
            background: #ff3b30;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        #explorer-popup .file-name {
            font-size: 12px;
            color: #333;
            word-break: break-word;
            line-height: 1.3;
            max-width: 100%;
        }

        #explorer-popup .file-ext {
            color: #ff3b30; /* Highlight the extension */
            font-weight: 600;
        }
      `}</style>
      <div className="finder-window">
        {/* Generic Window Header */}
        <div className="window-header">
            <div className="window-title">
                <i className="ph ph-folder-open"></i>
                File Manager
            </div>
            <div className="window-controls">
                <div className="control-icon zoom-out"><i className="ph ph-minus"></i></div>
                <div className="control-icon zoom-in"><i className="ph ph-plus"></i></div>
                <div className="control-icon close" onClick={onClose}><i className="ph ph-x"></i></div>
            </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
            <div className="view-controls">
                <button className="view-btn active"><i className="ph ph-squares-four"></i></button>
                <button className="view-btn"><i class="ph ph-list-dashes"></i></button>
            </div>

            <div className="path-display">
                Documents {'>'} Financials {'>'} 2025 {'>'} Q1
            </div>

            <div className="search">
                <i className="ph ph-magnifying-glass"></i>
                <input type="text" placeholder="Search" />
            </div>
        </div>

        <div className="main-view">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-group">
                    <div className="group-label">Favorites</div>
                    <div className="sidebar-item"><i className="ph ph-house" style={{color: '#007aff'}}></i> Home</div>
                    <div className="sidebar-item"><i className="ph ph-desktop" style={{color: '#007aff'}}></i> Desktop</div>
                    <div className="sidebar-item active"><i className="ph ph-file-text" style={{color: '#007aff'}}></i> Documents</div>
                    <div className="sidebar-item"><i className="ph ph-download-simple" style={{color: '#007aff'}}></i> Downloads</div>
                </div>
                <div className="sidebar-group">
                    <div className="group-label">Locations</div>
                    <div className="sidebar-item"><i className="ph ph-hard-drives"></i> Macintosh HD</div>
                    <div className="sidebar-item"><i className="ph ph-cloud"></i> iCloud Drive</div>
                    <div className="sidebar-item"><i className="ph ph-wifi-high"></i> Server-01</div>
                </div>
                <div className="sidebar-group">
                    <div className="group-label">Tags</div>
                    <div className="sidebar-item"><i className="ph ph-circle" style={{color: '#ff3b30'}}></i> Red</div>
                    <div className="sidebar-item"><i className="ph ph-circle" style={{color: '#ff9500'}}></i> Orange</div>
                </div>
            </div>

            {/* File Grid */}
            <div className="file-grid">
                {/* Ransom Note (Prominent) */}
                <div className="file-item selected">
                    <div className="icon-wrapper">
                        <i className="ph ph-file-text" style={{fontSize: '48px', color: '#ff3b30'}}></i>
                    </div>
                    <div className="file-name" style={{fontWeight: 700, color: '#ff3b30'}}>README_TO_DECRYPT.txt</div>
                </div>

                {/* Encrypted Files */}
                <div className="file-item">
                    <div className="icon-wrapper">
                        <i className="ph ph-file-pdf file-icon locked"></i>
                        <div className="lock-badge"><i className="ph ph-lock-key"></i></div>
                    </div>
                    <div className="file-name">budget_q1<span className="file-ext">.lock</span></div>
                </div>

                <div className="file-item">
                    <div className="icon-wrapper">
                        <i className="ph ph-file-xls file-icon locked"></i>
                        <div className="lock-badge"><i className="ph ph-lock-key"></i></div>
                    </div>
                    <div className="file-name">payroll_jan<span className="file-ext">.lock</span></div>
                </div>

                <div className="file-item">
                    <div className="icon-wrapper">
                        <i className="ph ph-image file-icon locked"></i>
                        <div className="lock-badge"><i className="ph ph-lock-key"></i></div>
                    </div>
                    <div className="file-name">scan_001<span className="file-ext">.lock</span></div>
                </div>

                 <div className="file-item">
                    <div className="icon-wrapper">
                        <i className="ph ph-folder file-icon locked"></i>
                        <div className="lock-badge"><i className="ph ph-lock-key"></i></div>
                    </div>
                    <div className="file-name">Archive 2024</div>
                </div>

                <div className="file-item">
                    <div className="icon-wrapper">
                        <i className="ph ph-file-doc file-icon locked"></i>
                        <div className="lock-badge"><i className="ph ph-lock-key"></i></div>
                    </div>
                    <div className="file-name">contract_v2<span className="file-ext">.lock</span></div>
                </div>

                <div className="file-item">
                    <div className="icon-wrapper">
                        <i className="ph ph-file-ppt file-icon locked"></i>
                        <div className="lock-badge"><i className="ph ph-lock-key"></i></div>
                    </div>
                    <div className="file-name">presentation<span className="file-ext">.lock</span></div>
                </div>
            </div>
        </div>
        
        {/* Bottom Status */}
        <div style={{height: '24px', borderTop: '1px solid #d1d1d1', display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: '11px', color: '#666', background: '#ececec'}}>
            7 items, 24.5 GB available
        </div>
      </div>
    </div>
  );
};

export default ExplorerPopup;
