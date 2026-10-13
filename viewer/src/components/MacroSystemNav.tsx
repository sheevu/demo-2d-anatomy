import { useAnatomyStore } from '../store/anatomyStore';
import type { MacroSystem } from '../store/anatomyStore';

interface SystemItem {
  id: MacroSystem;
  label: string;
  icon: string;
  color: string;
  count: number;
}

export function MacroSystemNav() {
  const { macroSystem, setMacroSystem } = useAnatomyStore();

  const systems: SystemItem[] = [
    { id: 'All', label: 'All Systems', icon: '🌐', color: '#94A3B8', count: 59 },
    { id: 'Musculoskeletal', label: 'Musculoskeletal', icon: '💪', color: '#EF4444', count: 8 },
    { id: 'Skeletal', label: 'Skeletal system', icon: '🦴', color: '#E2E8F0', count: 20 },
    { id: 'Cardiovascular', label: 'Cardiovascular', icon: '❤️', color: '#DC2626', count: 10 },
    { id: 'Nervous', label: 'Nervous system', icon: '🧠', color: '#F59E0B', count: 6 },
    { id: 'Respiratory', label: 'Respiratory', icon: '🫁', color: '#0EA5E9', count: 3 },
    { id: 'Digestive', label: 'Digestive system', icon: '🍏', color: '#A855F7', count: 5 },
    { id: 'Urogenital', label: 'Urogenital', icon: '💧', color: '#F97316', count: 3 },
    { id: 'Endocrine', label: 'Endocrine system', icon: '⚡', color: '#10B981', count: 1 },
    { id: 'Lymphatic', label: 'Lymphatic system', icon: '🛡️', color: '#14B8A6', count: 3 },
  ];

  return (
    <div
      style={{
        background: 'rgba(15, 23, 42, 0.88)',
        borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
        padding: '10px 20px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <span style={{ fontSize: '10px', color: '#F59E0B', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
            LEVEL 2 — MACRO SYSTEM
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC', marginLeft: '12px' }}>
            Select by macro system
          </span>
          <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '8px' }}>
            Ten systems, from musculoskeletal to lymphatic. Follow one apparatus across the whole body.
          </span>
        </div>
      </div>

      {/* Horizontal System Cards */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {systems.map((s) => {
          const isActive = macroSystem === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setMacroSystem(s.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: isActive ? `${s.color}22` : 'rgba(30, 41, 59, 0.45)',
                border: `1.5px solid ${isActive ? s.color : 'rgba(71, 85, 105, 0.25)'}`,
                borderRadius: '8px',
                color: isActive ? '#F8FAFC' : '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? `0 0 12px ${s.color}33` : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.4)');
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.25)');
              }}
            >
              <span style={{ fontSize: '14px' }}>{s.icon}</span>
              <span style={{ fontSize: '11px', fontWeight: isActive ? 700 : 500 }}>
                {s.label}
              </span>
              <span
                style={{
                  fontSize: '9px',
                  background: isActive ? s.color : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#0F172A' : '#94A3B8',
                  padding: '1px 5px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  marginLeft: '2px',
                }}
              >
                {s.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
