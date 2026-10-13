import { useEffect, useState, useRef, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Grid,
  GizmoHelper,
  GizmoViewport,
  ContactShadows,
  Html,
} from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import * as THREE from 'three';
import { RealAnatomyMesh } from './RealAnatomyMesh';
import type { ModelMeta } from './RealAnatomyMesh';
import { useAnatomyStore } from '../store/anatomyStore';

function SceneLighting() {
  return (
    <>
      {/* Surgical Key Light */}
      <directionalLight position={[3, 8, 5]} intensity={1.8} castShadow shadow-mapSize={[2048, 2048]} />
      {/* Cool Secondary Fill */}
      <directionalLight position={[-4, 4, 3]} intensity={0.9} color="#93C5FD" />
      {/* Deep Rim Light for Anatomical Definition */}
      <directionalLight position={[0, 3, -6]} intensity={0.8} color="#38BDF8" />
      {/* Ambient */}
      <ambientLight intensity={0.5} />
      {/* Sub-pelvic warm fill */}
      <pointLight position={[0, -2, 1.5]} intensity={0.4} color="#F59E0B" />
    </>
  );
}

function CameraController() {
  const controlsRef = useRef<OrbitControlsType>(null);
  const { cameraView, selectedModel } = useAnatomyStore();

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const views: Record<string, [number, number, number]> = {
      front: [0, 0.2, 2.4],
      back: [0, 0.2, -2.4],
      left: [-2.4, 0.2, 0],
      right: [2.4, 0.2, 0],
      top: [0, 3.4, 0.001],
      free: [0, 0.2, 2.4],
    };

    const targetPos = views[cameraView] || [0, 0.2, 2.4];
    controls.object.position.set(...targetPos);
    controls.target.set(0, 0.15, 0);
    controls.update();
  }, [cameraView]);

  return (
    <OrbitControls
      ref={controlsRef}
      target={[0, 0.15, 0]}
      minDistance={0.5}
      maxDistance={4.5}
      enablePan={true}
      enableDamping={true}
      dampingFactor={0.06}
      rotateSpeed={0.7}
      zoomSpeed={1.2}
      maxPolarAngle={Math.PI * 0.96} // Prevents flipping upside down
    />
  );
}

function AnatomyScene({ models }: { models: ModelMeta[] }) {
  const {
    bodyRegion,
    macroSystem,
    selectedModel,
    hoveredModel,
    isolatedModelId,
    hiddenModelIds,
    explodedView,
    searchQuery,
    selectModel,
    hoverModel,
  } = useAnatomyStore();

  // Filter models based on current navigation state
  const visibleModels = useMemo(() => {
    return models.filter((m) => {
      // Isolate mode
      if (isolatedModelId && m.fileId !== isolatedModelId) return false;
      // Hidden
      if (hiddenModelIds.has(m.fileId)) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          m.name.toLowerCase().includes(q) ||
          m.latin.toLowerCase().includes(q) ||
          m.hindi.includes(q) ||
          m.system.toLowerCase().includes(q) ||
          m.region.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Body Region filter
      if (bodyRegion !== 'All' && m.region !== bodyRegion) {
        return false;
      }

      // Macro System filter
      if (macroSystem !== 'All') {
        if (macroSystem === 'Musculoskeletal') {
          if (m.system !== 'Musculoskeletal' && m.system !== 'Skeletal') return false;
        } else if (m.system !== macroSystem) {
          return false;
        }
      }

      return true;
    });
  }, [models, bodyRegion, macroSystem, isolatedModelId, hiddenModelIds, searchQuery]);

  return (
    <>
      <SceneLighting />
      <CameraController />
      <Environment preset="night" />

      {/* Grid Floor */}
      <ContactShadows position={[0, -1.05, 0]} opacity={0.5} scale={3} blur={2.5} far={3} />
      <Grid
        args={[6, 6]}
        position={[0, -1.06, 0]}
        cellSize={0.2}
        cellThickness={0.4}
        cellColor="#1E293B"
        sectionSize={1}
        sectionThickness={1.2}
        sectionColor="#334155"
        fadeDistance={5}
        fadeStrength={1.5}
      />

      {/* 3D Anatomical Meshes */}
      {visibleModels.map((m) => (
        <RealAnatomyMesh
          key={m.fileId}
          meta={m}
          isSelected={selectedModel?.fileId === m.fileId}
          isHovered={hoveredModel?.fileId === m.fileId}
          exploded={explodedView}
          onSelect={selectModel}
          onHover={hoverModel}
        />
      ))}

      {/* Orientation Gizmo */}
      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport axisColors={['#EF4444', '#10B981', '#3B82F6']} labelColor="white" />
      </GizmoHelper>
    </>
  );
}

function LoadingSpinner() {
  return (
    <Html center>
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          padding: '24px 32px',
          color: '#F8FAFC',
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🫀</div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#F59E0B' }}>
          Loading Authentic 3D Models...
        </div>
        <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
          Parsing BodyParts3D meshes & anatomical coordinate transforms
        </div>
      </div>
    </Html>
  );
}

export function AtlasViewport() {
  const [models, setModels] = useState<ModelMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/models_manifest.json')
      .then((res) => res.json())
      .then((data: ModelMeta[]) => {
        setModels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load models manifest:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          logarithmicDepthBuffer: true,
        }}
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 2.4], fov: 50, near: 0.1, far: 50 }}
        style={{ background: '#090D16' }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          {!loading && <AnatomyScene models={models} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
