import React from 'react';

function PipContent() {
  return (
    <div className="pip-wrapper">
      <style>{`
        :root {
          --primary-purple: #6200ee;
          --text-main: #2c3e50;
          --text-muted: #95a5a6;
          --bg-dark: #0a1128;
          --card-bg: #ffffff;
          --section-bg: #f8faff;
          --border-color: #e1e8f0;
        }

        body {
          margin: 0;
          padding: 0;
          background-color: var(--bg-dark);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          overflow-x: hidden;
        }

        .pip-wrapper {
          padding: 15px 15px 15px 35px;
          min-height: 100vh;
          box-sizing: border-box;
          position: relative;
        }

        .timeline-dots {
          position: absolute;
          left: 12px;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          opacity: 0.5;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34495e;
          position: relative;
          z-index: 1;
        }

        .dot.active {
          background: var(--primary-purple);
          box-shadow: 0 0 0 4px rgba(98, 0, 238, 0.3);
        }

        .dot.outline {
          background: transparent;
          border: 2px solid var(--primary-purple);
          width: 6px;
          height: 6px;
        }

        .main-card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          width: 100%;
          box-sizing: border-box;
        }

        .header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
          position: relative;
        }

        .step-num {
          width: 44px;
          height: 44px;
          background: var(--primary-purple);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
        }

        .title-container {
          flex: 1;
        }

        .main-title {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-main);
          margin: 0 0 8px 0;
          line-height: 1.2;
          padding-right: 25px;
        }

        .time-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0f2f5;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          color: #7f8c8d;
          border: 1px solid #e0e0e0;
        }

        .info-btn {
          position: absolute;
          right: -5px;
          top: -5px;
          color: var(--text-muted);
          font-size: 22px;
          cursor: pointer;
        }

        .story-section {
          background: var(--section-bg);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 16px;
        }

        .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          color: var(--text-main);
          font-size: 16px;
        }

        .content-box-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1.5px solid var(--primary-purple);
          color: var(--primary-purple);
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .actions-header {
          font-size: 11px;
          font-weight: 900;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 18px;
        }

        .action-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .action-row {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .custom-checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid #bdc3c7;
          border-radius: 5px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .action-content {
          flex: 1;
          font-size: 15px;
          line-height: 1.5;
          color: var(--text-main);
          font-weight: 500;
        }

        .action-content b, .purple-link {
          color: var(--primary-purple);
          font-weight: 700;
          text-decoration: none;
        }

        .chevron {
          color: #bdc3c7;
          font-size: 18px;
          cursor: pointer;
        }

        .discussion-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 14px 20px;
          margin-bottom: 16px;
        }

        .content-box-btn.muted {
          border-color: var(--text-main);
          color: var(--text-main);
        }

        .notes-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--primary-purple);
          font-weight: 700;
          font-size: 15px;
          padding: 5px;
          cursor: pointer;
        }
      `}</style>

      <div className="timeline-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot active"></div>
        <div className="dot outline"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      <div className="main-card">
        <div className="header">
          <div className="step-num">4</div>
          <div className="title-container">
            <h1 className="main-title">Forensics Confirms Bluff</h1>
            <div className="time-badge">
              <i className="ph ph-clock"></i>
              3d·5h
            </div>
          </div>
          <i className="ph ph-info info-btn"></i>
        </div>

        <div className="story-section">
          <div className="section-head">
            <div className="section-label">
              <i className="ph ph-caret-up"></i>
              Story
            </div>
            <button className="content-box-btn">
              <i className="ph ph-eye"></i>
              Content Box
            </button>
          </div>

          <div className="actions-header">Actions:</div>

          <div className="action-list">
            <div className="action-row">
              <div className="custom-checkbox"></div>
              <div className="action-content">
                Read instructions in the <span className="purple-link">Response plan</span> - "Draft and Distribute a Public Statement on the Incident"
              </div>
              <i className="ph ph-caret-down chevron"></i>
            </div>

            <div className="action-row">
              <div className="custom-checkbox"></div>
              <div className="action-content">
                Analyze the message from the attacker
              </div>
              <i className="ph ph-caret-down chevron"></i>
            </div>

            <div className="action-row">
              <div className="custom-checkbox"></div>
              <div className="action-content">
                Complete task in <span className="purple-link">Tasks</span>
              </div>
              <i className="ph ph-caret-down chevron"></i>
            </div>
          </div>
        </div>

        <div className="discussion-bar">
          <div className="section-label">
            <i className="ph ph-caret-down"></i>
            Discussion
          </div>
          <button className="content-box-btn muted">
            <i className="ph ph-eye"></i>
            Content Box
          </button>
        </div>

        <div className="notes-trigger">
          Notes <i className="ph ph-caret-down"></i>
        </div>
      </div>
    </div>
  );
}

export default PipContent;