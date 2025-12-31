import React from 'react';

const NewsPopup = ({ onClose }) => {
  return (
    <div id="news-popup">
      <style>{`
        #news-popup {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            width: 900px;
            max-width: 100%;
        }

        #news-popup * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        #news-popup .browser-window {
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
        #news-popup .window-header {
            background: rgb(9, 33, 77);
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            border-bottom: 1px solid rgba(122, 162, 212, 0.2);
            flex-shrink: 0;
        }

        #news-popup .window-title {
            color: #c0d4eb;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #news-popup .window-controls {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        #news-popup .control-icon {
            color: #7aa2d4;
            cursor: pointer;
            font-size: 14px;
            transition: color 0.2s;
            display: flex;
            align-items: center;
        }

        #news-popup .control-icon:hover { color: #fff; }
        #news-popup .control-icon.close:hover { color: #ff5f57; }

        /* Navigation Bar */
        #news-popup .nav-bar {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 16px;
            background: rgb(20, 55, 115);
            border-bottom: 1px solid rgba(122, 162, 212, 0.35);
        }

        #news-popup .nav-buttons {
            display: flex;
            gap: 4px;
        }

        #news-popup .nav-btn {
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

        #news-popup .url-bar {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 6px;
            padding: 6px 14px;
            border: 1px solid rgba(122, 162, 212, 0.35);
        }

        #news-popup .url-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: #c0d4eb;
            font-size: 13px;
            letter-spacing: 0.2px;
        }

        /* Content Area */
        #news-popup .content-area {
            flex: 1;
            background: #fafafa;
            padding: 0;
            overflow-y: auto;
        }

        /* News Template Styles */
        #news-popup .news-container {
            background: #fff;
            min-height: 100%;
            padding: 40px;
        }

        #news-popup .news-category {
          color: #d32f2f;
          text-transform: uppercase;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 1px;
          margin-bottom: 12px;
          display: block;
        }

        #news-popup .news-headline {
          font-size: 36px;
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        #news-popup .news-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 30px;
          color: #666;
          font-size: 13px;
        }

        #news-popup .author-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ddd;
        }

        #news-popup .news-lead {
          font-size: 18px;
          line-height: 1.6;
          color: #444;
          font-weight: 500;
          margin-bottom: 24px;
        }

        #news-popup .news-content {
          font-size: 16px;
          line-height: 1.8;
          color: #333;
        }

        #news-popup .news-image-placeholder {
          width: 100%;
          height: 300px;
          background: #f0f0f0;
          border-radius: 8px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-style: italic;
        }
      `}</style>
      
      <div className="browser-window">
        {/* Generic Window Header */}
        <div className="window-header">
            <div className="window-title">
                <i className="ph ph-globe"></i>
                Web Browser - News
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
                <input type="text" className="url-input" value="newsportal.com/tech-breach" readOnly />
            </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
            <div className="news-container">
                <span className="news-category">Technology & Security</span>
                <h1 className="news-headline">Massive Ransomware Attack Cripples Global Infrastructure</h1>
                <div className="news-meta">
                    <div className="author-img"></div>
                    <span>By <b>Sarah Jenkins</b></span>
                    <span>•</span>
                    <span>Updated 3 hours ago</span>
                </div>
                <div className="news-image-placeholder">
                    <i className="ph ph-image" style={{fontSize: '48px', marginBottom: '10px'}}></i>
                    <span>Headline News Graphic</span>
                </div>
                <p className="news-lead">
                  In what security experts are calling the most sophisticated cyber-attack of the decade, hundreds of organizations found their systems locked overnight.
                </p>
                <div className="news-content">
                  <p style={{marginBottom: '20px'}}>
                    The "DarkShadow" collective has claimed responsibility for a series of coordinated strikes that targeted critical database clusters and cloud infrastructure across three continents.
                  </p>
                  <p>
                    Internal communications from affected firms suggest that the attackers gained entry through a legacy VPN vulnerability, subsequently escalating privileges to gain domain administrative control within hours.
                  </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPopup;
