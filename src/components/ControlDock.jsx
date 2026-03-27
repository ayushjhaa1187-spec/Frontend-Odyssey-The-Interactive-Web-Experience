import React from 'react';

/**
 * ControlDock
 * A centralized, premium control system for experience toggles and support.
 * Unified design language with clear visual hierarchy.
 */
/**
 * ElectronAura
 * A moving particle design that orbits the button when active.
 */
const ElectronAura = () => (
    <svg className="electron-aura" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="electron-path" cx="50" cy="50" r="45" />
        <circle className="electron-particle" cx="50" cy="5" r="3" />
        <circle className="electron-particle" cx="5" cy="50" r="2" />
    </svg>
);

const ControlDock = ({ 
    voiceEnabled, onToggleVoice, 
    zenMode, onToggleZen, 
    motionEnabled, onToggleMotion,
    onOpenHelp
}) => {
    return (
        <>
            <nav className="control-dock top-right" aria-label="Experience Settings">
                <button 
                    onClick={onToggleVoice}
                    className={`control-pill ${voiceEnabled ? 'active' : ''}`}
                    aria-pressed={voiceEnabled}
                    title={voiceEnabled ? "Mute Voice" : "Enable Voice"}
                >
                    <ElectronAura />
                    <span className="control-label-full">Voice</span>
                    <span className="state-badge" aria-hidden="true">{voiceEnabled ? 'ON' : 'OFF'}</span>
                </button>

                <button 
                    onClick={onToggleZen}
                    className={`control-pill zen ${zenMode ? 'active' : ''}`}
                    aria-pressed={zenMode}
                    title={zenMode ? "Exit Minimal Mode" : "Enter Minimal Mode"}
                >
                    <span className="control-label-full">Minimal</span>
                    <span className="state-badge" aria-hidden="true">{zenMode ? 'ON' : 'OFF'}</span>
                </button>

                <button 
                    onClick={onToggleMotion}
                    className={`control-pill ${motionEnabled ? 'active' : ''}`}
                    aria-pressed={motionEnabled}
                    title={motionEnabled ? "Exit Dynamic Mode" : "Enter Dynamic Mode"}
                >
                    <span className="control-label-full">Dynamic</span>
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
