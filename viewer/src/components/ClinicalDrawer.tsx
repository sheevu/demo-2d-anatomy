import { useState } from 'react';
import { useAnatomyStore, CLINICAL_DATABASE } from '../store/anatomyStore';

export function ClinicalDrawer() {
  const {
    selectedModel,
    selectModel,
    clinicalDrawerOpen,
    setClinicalDrawerOpen,
    isolatedModelId,
    setIsolatedModel,
    toggleHideModel,
    hiddenModelIds,
  } = useAnatomyStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'function' | 'clinical' | 'components'>('overview');

  if (!selectedModel || !clinicalDrawerOpen) return null;

  const clinicalData = CLINICAL_DATABASE[selectedModel.fileId] || {
    description: `The ${selectedModel.name.toLowerCase()} (${selectedModel.latin}) forms an integral part of the ${selectedModel.system.toLowerCase()} within the ${selectedModel.region.toLowerCase()} region.`,
    function: `Contributes to the physiological and structural integrity of the ${selectedModel.system.toLowerCase()}.`,
    clinicalSignificance: `Important landmark in regional medical diagnosis, imaging (CT/MRI), and surgical approaches.`,
    substructures: ['Main Body', 'Regional Segments', 'Associated Fascia', 'Neurovascular Pedicle'],
  };

  const isIsolated = isolatedModelId === selectedModel.fileId;
  const isHidden = hiddenModelIds.has(selectedModel.fileId);

  return (
    <div
      style={{
        position: 'absolute',
        top: '56px',
        right: '0',
        bottom: '0',
        width: '380px',
        background: 'rgba(15, 23, 42, 0.96)',
        borderLeft: '1px solid rgba(56, 189, 248, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 40,
        backdropFilter: 'blur(16px)',
        boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.6)',
        animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '18px 20px 14px',
          borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
          background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, transparent 100%)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#F59E0B',
                  background: 'rgba(245, 158, 11, 0.15)',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                }}
              >
                {selectedModel.system}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#94A3B8',
                  background: 'rgba(51, 65, 85, 0.5)',
                  padding: '2px 7px',
                  borderRadius: '4px',
                }}
              >
                {selectedModel.region}
              </span>
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#F8FAFC', margin: 0, lineHeight: 1.2 }}>
              {selectedModel.name}
            </h2>
            <div style={{ fontSize: '12px', color: '#38BDF8', fontStyle: 'italic', marginTop: '2px' }}>
              {selectedModel.latin}
            </div>
            <div style={{ fontSize: '13px', color: '#F1F5F9', marginTop: '4px', fontWeight: 500 }}>
              {selectedModel.hindi}
            </div>
          </div>

          <button
            onClick={() => setClinicalDrawerOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '6px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Identifiers & Volume */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <div style={{ flex: 1, background: 'rgba(30, 41, 59, 0.5)', padding: '6px 10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '9px', color: '#64748B', textTransform: 'uppercase' }}>Volume</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F59E0B' }}>
              {selectedModel.volume_cm3.toFixed(1)} <span style={{ fontSize: '10px', color: '#94A3B8' }}>cm³</span>
            </div>
          </div>
          <div style={{ flex: 1, background: 'rgba(30, 41, 59, 0.5)', padding: '6px 10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '9px', color: '#64748B', textTransform: 'uppercase' }}>FMA ID</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>{selectedModel.conceptId}</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(30, 41, 59, 0.5)', padding: '6px 10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '9px', color: '#64748B', textTransform: 'uppercase' }}>BP ID</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>{selectedModel.representationId}</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
          background: 'rgba(15, 23, 42, 0.8)',
        }}
      >
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'function', label: 'Function' },
          { id: 'clinical', label: 'Clinical' },
          { id: 'components', label: 'Parts' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              flex: 1,
              padding: '10px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab.id ? '#F59E0B' : 'transparent'}`,
              color: activeTab === tab.id ? '#F59E0B' : '#94A3B8',
              fontSize: '11px',
              fontWeight: activeTab === tab.id ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', lineHeight: 1.6 }}>
        {activeTab === 'overview' && (
          <div>
            <div style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              📍 Anatomical Description & Boundaries
            </div>
            <p style={{ fontSize: '13px', color: '#CBD5E1', margin: 0 }}>
              {clinicalData.description}
            </p>

            <div style={{ marginTop: '16px', background: 'rgba(30, 41, 59, 0.4)', padding: '10px 12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '4px' }}>
                Structural Layer
              </div>
              <div style={{ fontSize: '12px', color: '#F8FAFC', fontWeight: 600 }}>
                {selectedModel.layer} Architecture
              </div>
            </div>
          </div>
        )}

        {activeTab === 'function' && (
          <div>
            <div style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              ⚙️ Physiological & Biomechanical Role
            </div>
            <p style={{ fontSize: '13px', color: '#CBD5E1', margin: 0 }}>
              {clinicalData.function}
            </p>
          </div>
        )}

        {activeTab === 'clinical' && (
          <div>
            <div style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              🩺 Clinical Pathology & Surgical Significance
            </div>
            <p style={{ fontSize: '13px', color: '#CBD5E1', margin: 0 }}>
              {clinicalData.clinicalSignificance}
            </p>
          </div>
        )}

        {activeTab === 'components' && (
          <div>
            <div style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>
              🧬 Anatomical Components & Landmarks
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {clinicalData.substructures.map((sub: string, i: number) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    border: '1px solid rgba(71, 85, 105, 0.3)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    color: '#E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: '#F59E0B', fontSize: '10px' }}>▸</span>
                  {sub}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Bar Footer */}
      <div
        style={{
          padding: '14px 20px',
          borderTop: '1px solid rgba(51, 65, 85, 0.4)',
          background: 'rgba(15, 23, 42, 0.9)',
          display: 'flex',
          gap: '8px',
        }}
      >
        <button
          onClick={() => setIsolatedModel(isIsolated ? null : selectedModel.fileId)}
          style={{
            flex: 1,
            background: isIsolated ? '#F59E0B' : 'rgba(245, 158, 11, 0.15)',
            border: '1px solid #F59E0B',
            color: isIsolated ? '#0F172A' : '#F59E0B',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {isIsolated ? '↩ Show All' : '🔍 Isolate 3D'}
        </button>

        <button
          onClick={() => toggleHideModel(selectedModel.fileId)}
          style={{
            flex: 1,
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            color: '#CBD5E1',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {isHidden ? '👁 Unhide' : '🙈 Hide'}
        </button>
      </div>
    </div>
  );
}
