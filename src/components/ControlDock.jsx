import React from 'react';

/**
 * ControlDock
 * A centralized, premium control system for experience toggles and support.
 * Unified design language with clear visual hierarchy.
 */
const ControlDock = ({ 
    voiceEnabled, onToggleVoice, 
    zenMode, onToggleZen, 
    motionEnabled, onToggleMotion,
    onOpenHelp
}) => {
    return (
        <>
            {/* Top-Right Experience Toggles: Environment-level settings */}
            <nav className="control-dock top-right" aria-label="Experience Settings">
                <button 
                    onClick={onToggleVoice}
                    className={`control-pill ${voiceEnabled ? 'active' : ''}`}
                    aria-pressed={voiceEnabled}
                    title={voiceEnabled ? "Mute AI Narration" : "Enable AI Narration"}
                >
                    <span className="control-label-full">Voice Narration</span>
                    <span className="control-label-short" aria-hidden="true">Voice</span>
                    <span className="state-badge" aria-hidden="true">{voiceEnabled ? 'ON' : 'OFF'}</span>
                </button>

                <button 
                    onClick={onToggleZen}
                    className={`control-pill zen ${zenMode ? 'active' : ''}`}
                    aria-pressed={zenMode}
                    title={zenMode ? "Disable Zen Mode" : "Enable Zen Mode"}
                >
                    <span className="control-label-full">Zen Mode</span>
                    <span className="control-label-short" aria-hidden="true">Zen</span>
                    <span className="state-badge" aria-hidden="true">{zenMode ? 'ON' : 'OFF'}</span>
                </button>

                <button 
                    onClick={onToggleMotion}
                    className={`control-pill ${motionEnabled ? 'active' : ''}`}
                    aria-pressed={motionEnabled}
                    title={motionEnabled ? "Disable decorative motion" : "Enable decorative motion"}
                >
                    <span className="control-label-full">Motion</span>
                    <span className="control-label-short" aria-hidden="true">Motion</span>
                    <span className="state-badge" aria-hidden="true">{motionEnabled ? 'ON' : 'OFF'}</span>
                </button>
            </nav>

            {/* Bottom-Left Support Control: Secondary actions */}
            <div className="control-dock bottom-left">
                <button 
                    onClick={onOpenHelp}
                    className="control-pill support"
                    aria-label="Open help and accessibility documentation"
                >
                    <span className="control-label-full">Help & Accessibility</span>
                    <span className="control-label-short" aria-hidden="true">Help</span>
                </button>
            </div>
        </>
    );
};

export default React.memo(ControlDock);
