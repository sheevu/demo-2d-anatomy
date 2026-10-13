import React from 'react';
import { AtlasHeader } from './components/AtlasHeader';
import { BodyRegionNav } from './components/BodyRegionNav';
import { MacroSystemNav } from './components/MacroSystemNav';
import { AtlasViewport } from './components/AtlasViewport';
import { ClinicalDrawer } from './components/ClinicalDrawer';
import { useAnatomyStore } from './store/anatomyStore';

function StatusBar() {
  const { selectedModel, hoveredModel, bodyRegion, macroSystem } = useAnatomyStore();
  const current = hoveredModel || selectedModel;

  return (
    <footer
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '34px',
        background: 'rgba(10, 15, 26, 0.94)',
        borderTop: '1px solid rgba(56, 189, 248, 0.15)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        fontSize: '12px',
        color: '#94A3B8',
        zIndex: 35,
        gap: '14px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 6px #10B981',
          }}
        />
        <strong style={{ color: '#F8FAFC', fontSize: '11px', letterSpacing: '0.4px' }}>
          BODYPARTS3D ATLAS ENGINE
        </strong>
      </div>

      <span style={{ color: 'rgba(148, 163, 184, 0.3)' }}>|</span>

      <span style={{ fontSize: '11px' }}>
        Region: <span style={{ color: '#F59E0B', fontWeight: 600 }}>{bodyRegion}</span>
      </span>

      <span style={{ color: 'rgba(148, 163, 184, 0.3)' }}>|</span>

      <span style={{ fontSize: '11px' }}>
        System: <span style={{ color: '#38BDF8', fontWeight: 600 }}>{macroSystem}</span>
      </span>

      {current && (
        <>
          <span style={{ color: 'rgba(148, 163, 184, 0.3)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '10px',
                padding: '1px 6px',
                borderRadius: '4px',
                background: hoveredModel ? 'rgba(56, 189, 248, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                color: hoveredModel ? '#38BDF8' : '#F59E0B',
                fontWeight: 700,
                border: `1px solid ${hoveredModel ? 'rgba(56, 189, 248, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
              }}
            >
              {hoveredModel ? 'HOVER' : 'SELECTED'}
            </span>
            <span style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '12px' }}>
              {current.name}
            </span>
            <span style={{ color: '#94A3B8', fontStyle: 'italic', fontSize: '11px' }}>
              ({current.latin})
            </span>
            <span style={{ color: '#F59E0B', fontSize: '11px' }}>
              • {current.hindi}
            </span>
            <span style={{ color: '#64748B', fontSize: '10px', marginLeft: '4px' }}>
              [{current.conceptId}]
            </span>
          </div>
        </>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px', color: '#64748B' }}>
        <span>🖱 Left Drag: Rotate</span>
        <span>🖱 Right Drag: Pan</span>
        <span>⚙ Wheel: Zoom</span>
        <span>👆 Click: Select & Inspect</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: '#090D16',
        color: '#F8FAFC',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Header Bar */}
      <AtlasHeader />

      {/* Level 1: Body Regions */}
      <BodyRegionNav />

      {/* Level 2: Macro Systems */}
      <MacroSystemNav />

      {/* 3D Viewport Area */}
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AtlasViewport />
        <ClinicalDrawer />
      </main>

      {/* Bottom Status & Diagnostic Bar */}
      <StatusBar />
    </div>
  );
}
