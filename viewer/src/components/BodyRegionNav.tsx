import { useAnatomyStore } from '../store/anatomyStore';
import type { BodyRegion } from '../store/anatomyStore';

interface RegionItem {
  id: BodyRegion;
  label: string;
  iconSvg: React.ReactNode;
}

export function BodyRegionNav() {
  const { bodyRegion, setBodyRegion } = useAnatomyStore();

  const regions: RegionItem[] = [
    {
      id: 'All',
      label: 'All Body',
      iconSvg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="4" r="2" />
          <path d="M12 7v7M8 9l4 2 4-2M9 20l3-6 3 6" />
        </svg>
      ),
    },
    {
      id: 'Head',
      label: 'Head',
      iconSvg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.5 2 6 4.5 6 8.5c0 2.8 1.4 4.8 3.2 6.1.5.3.8.9.8 1.5V18h4v-1.9c0-.6.3-1.2.8-1.5C16.6 13.3 18 11.3 18 8.5 18 4.5 15.5 2 12 2z" opacity="0.9" />
          <path d="M9 19h6v2H9z" opacity="0.6" />
        </svg>
      ),
    },
    {
      id: 'Trunk',
      label: 'Trunk',
      iconSvg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4l5-2 5 2v3l-2 11H9L7 7V4z" opacity="0.9" />
          <path d="M10 8h4M10 12h4M11 16h2" stroke="#0F172A" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      id: 'Upper Limbs',
      label: 'Upper limbs',
      iconSvg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6c0-1.1.9-2 2-2s2 .9 2 2v6l-2 5-2-1V6zM16 6c0-1.1.9-2 2-2s2 .9 2 2v6l-2 5-2-1V6z" opacity="0.9" />
          <path d="M10 3h4v4h-4z" opacity="0.3" />
        </svg>
      ),
    },
    {
      id: 'Lower Limbs',
      label: 'Lower limbs',
      iconSvg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 3h4v9l-1 9H7l1-9V3zM13 3h4v9l1 9h-3l-1-9V3z" opacity="0.9" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        background: 'rgba(15, 23, 42, 0.92)',
        borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
        padding: '10px 20px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <span style={{ fontSize: '10px', color: '#F59E0B', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
            LEVEL 1 — BODY REGION
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC', marginLeft: '12px' }}>
            Select by body region
          </span>
          <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '8px' }}>
            Head, trunk, upper limbs and lower limbs.
          </span>
        </div>
      </div>

      {/* Horizontal Cards */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
        {regions.map((r) => {
          const isActive = bodyRegion === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setBodyRegion(r.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 16px',
                background: isActive ? 'rgba(245, 158, 11, 0.15)' : 'rgba(30, 41, 59, 0.5)',
                border: `1.5px solid ${isActive ? '#F59E0B' : 'rgba(71, 85, 105, 0.3)'}`,
                borderRadius: '10px',
                color: isActive ? '#F59E0B' : '#CBD5E1',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                minWidth: '130px',
                boxShadow: isActive ? '0 0 16px rgba(245, 158, 11, 0.2)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.5)');
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.3)');
              }}
            >
              <div
                style={{
                  color: isActive ? '#F59E0B' : '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {r.iconSvg}
              </div>
              <span style={{ fontSize: '12px', fontWeight: isActive ? 700 : 500 }}>
                {r.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
