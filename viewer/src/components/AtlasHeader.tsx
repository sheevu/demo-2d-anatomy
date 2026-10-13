import { useAnatomyStore } from '../store/anatomyStore';
import type { CameraView } from '../store/anatomyStore';

export function AtlasHeader() {
  const {
    cameraView,
    setCameraView,
    explodedView,
    setExplodedView,
    skinOpacity,
    setSkinOpacity,
    searchQuery,
    setSearchQuery,
    resetAll,
  } = useAnatomyStore();

  const cameraButtons: { id: CameraView; label: string }[] = [
    { id: 'front', label: 'Front' },
    { id: 'back', label: 'Back' },
    { id: 'left', label: 'Left' },
    { id: 'right', label: 'Right' },
    { id: 'top', label: 'Top' },
  ];

  return (
    <header
      style={{
        height: '56px',
        background: 'rgba(13, 17, 23, 0.95)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Brand & Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            boxShadow: '0 0 12px rgba(245, 158, 11, 0.4)',
          }}
        >
          🫀
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.8px', color: '#F8FAFC' }}>
            ANATOMY <span style={{ color: '#F59E0B' }}>3D ATLAS</span>
          </div>
          <div style={{ fontSize: '10px', color: '#64748B', letterSpacing: '0.5px' }}>
            Interactive Human Body Systems • BodyParts3D & TA2
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', width: '280px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search organ, bone, or term..."
          style={{
            width: '100%',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '8px',
            padding: '7px 12px 7px 32px',
            color: '#F8FAFC',
            fontSize: '12px',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#F59E0B')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)')}
        />
        <span
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '13px',
            color: '#64748B',
            pointerEvents: 'none',
          }}
        >
          🔍
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Camera & Tool Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Camera Preset Group */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '7px',
            padding: '2px',
            border: '1px solid rgba(148, 163, 184, 0.15)',
          }}
        >
          {cameraButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setCameraView(btn.id)}
              style={{
                background: cameraView === btn.id ? '#F59E0B' : 'transparent',
                color: cameraView === btn.id ? '#0F172A' : '#94A3B8',
                border: 'none',
                borderRadius: '5px',
                padding: '4px 9px',
                fontSize: '11px',
                fontWeight: cameraView === btn.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Exploded View Toggle */}
        <button
          onClick={() => setExplodedView(!explodedView)}
          style={{
            background: explodedView ? 'rgba(245, 158, 11, 0.2)' : 'rgba(30, 41, 59, 0.6)',
            border: `1px solid ${explodedView ? '#F59E0B' : 'rgba(148, 163, 184, 0.2)'}`,
            borderRadius: '7px',
            padding: '6px 12px',
            color: explodedView ? '#F59E0B' : '#CBD5E1',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>💥</span> Exploded
        </button>

        {/* Skin Opacity Slider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            borderRadius: '7px',
            padding: '4px 10px',
          }}
        >
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Skin:</span>
          <input
            type="range"
            min="0"
            max="0.8"
            step="0.05"
            value={skinOpacity}
            onChange={(e) => setSkinOpacity(parseFloat(e.target.value))}
            style={{ width: '60px', accentColor: '#F59E0B', cursor: 'pointer' }}
          />
        </div>

        {/* Reset View Button */}
        <button
          onClick={resetAll}
          style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '7px',
            padding: '6px 12px',
            color: '#CBD5E1',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.background = 'rgba(51, 65, 85, 0.8)')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.background = 'rgba(30, 41, 59, 0.6)')}
        >
          ↺ Reset
        </button>
      </div>
    </header>
  );
}
