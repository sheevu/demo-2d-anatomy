import { useEffect, useState, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export interface ModelMeta {
  fileId: string;
  fileName: string;
  name: string;
  latin: string;
  hindi: string;
  region: 'Head' | 'Trunk' | 'Upper Limbs' | 'Lower Limbs';
  system: string;
  layer: string;
  color: string;
  conceptId: string;
  representationId: string;
  volume_cm3: number;
  bounds_min: string;
  bounds_max: string;
  size_kb: number;
}

interface RealAnatomyMeshProps {
  meta: ModelMeta;
  isSelected: boolean;
  isHovered: boolean;
  exploded: boolean;
  opacity?: number;
  onSelect: (meta: ModelMeta) => void;
  onHover: (meta: ModelMeta | null) => void;
}

// Global cache for loaded OBJ objects to prevent re-fetching
const objCache = new Map<string, THREE.Group>();

export function RealAnatomyMesh({
  meta,
  isSelected,
  isHovered,
  exploded,
  opacity = 1.0,
  onSelect,
  onHover,
}: RealAnatomyMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [modelGroup, setModelGroup] = useState<THREE.Group | null>(null);
  const [centroid, setCentroid] = useState<THREE.Vector3>(new THREE.Vector3());

  useEffect(() => {
    let active = true;
    const url = `/models/${meta.fileName}`;

    if (objCache.has(meta.fileId)) {
      const cloned = objCache.get(meta.fileId)!.clone();
      if (active) {
        setModelGroup(cloned);
        computeCentroid(cloned);
      }
      return;
    }

    const loader = new OBJLoader();
    loader.load(
      url,
      (obj) => {
        // Cache the original
        objCache.set(meta.fileId, obj);
        if (active) {
          const cloned = obj.clone();
          setModelGroup(cloned);
          computeCentroid(cloned);
        }
      },
      undefined,
      (err) => {
        console.warn(`Failed to load ${url}:`, err);
      }
    );

    return () => {
      active = false;
    };
  }, [meta.fileId, meta.fileName]);

  const computeCentroid = (group: THREE.Group) => {
    const box = new THREE.Box3().setFromObject(group);
    const center = new THREE.Vector3();
    box.getCenter(center);
    setCentroid(center);
  };

  // Create PBR materials based on anatomical category
  const material = useMemo(() => {
    const baseColor = new THREE.Color(meta.color);
    const isSkeletal = meta.layer === 'Skeletal' || meta.system === 'Skeletal';
    const isMuscular = meta.layer === 'Muscular' || meta.system === 'Musculoskeletal';
    const isVascular = meta.layer === 'Vascular' || meta.system === 'Cardiovascular';
    const isNervous = meta.layer === 'Nervous' || meta.system === 'Nervous';

    let roughness = 0.45;
    let metalness = 0.05;

    if (isSkeletal) {
      roughness = 0.55;
      metalness = 0.02;
    } else if (isMuscular) {
      roughness = 0.6;
      metalness = 0.0;
    } else if (isVascular) {
      roughness = 0.25;
      metalness = 0.15;
    } else if (isNervous) {
      roughness = 0.4;
      metalness = 0.1;
    }

    return new THREE.MeshStandardMaterial({
      color: isSelected ? new THREE.Color('#F59E0B') : baseColor,
      roughness,
      metalness,
      transparent: opacity < 1.0,
      opacity,
      side: THREE.DoubleSide,
      emissive: isSelected ? new THREE.Color('#B45309') : isHovered ? new THREE.Color('#334155') : new THREE.Color(0x000000),
      emissiveIntensity: isSelected ? 0.6 : isHovered ? 0.3 : 0.0,
    });
  }, [meta.color, meta.layer, meta.system, isSelected, isHovered, opacity]);

  // Apply material to all meshes inside loaded group
  useEffect(() => {
    if (!modelGroup) return;
    modelGroup.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = material;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [modelGroup, material]);

  // Exploded view animation
  useFrame(() => {
    if (!groupRef.current) return;
    if (exploded) {
      // Offset outwards from origin (Z is anterior, X is lateral, Y is vertical)
      const targetX = centroid.x * 1.5;
      const targetY = centroid.y * 1.2;
      const targetZ = centroid.z * 1.6;
      groupRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.08);
    } else {
      groupRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.1);
    }
  });

  if (!modelGroup) return null;

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(meta);
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();
        onHover(meta);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        onHover(null);
        document.body.style.cursor = 'default';
      }}
    >
      {/* 
        BodyParts3D coordinate transformation:
        In BodyParts3D: 
          X = lateral (mm)
          Y = anterior/posterior (mm, negative = anterior)
          Z = vertical height (mm, 0 = feet, 1600 = head)
        Rotate -90 deg on X axis, scale by 0.001 (mm -> m), offset Y by -1.0 to center at origin
      */}
      <primitive
        object={modelGroup}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.001, 0.001, 0.001]}
        position={[0, -1.0, 0]}
      />

      {/* Interactive Leader-Line Label when selected or hovered */}
      {(isSelected || isHovered) && (
        <Html
          position={[
            centroid.x + (centroid.x >= 0 ? 0.18 : -0.18),
            centroid.y + 0.04,
            centroid.z + 0.08
          ]}
          center
          distanceFactor={3}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.94)',
              border: `1.5px solid ${isSelected ? '#F59E0B' : '#06B6D4'}`,
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              whiteSpace: 'nowrap',
              boxShadow: isSelected ? '0 0 16px rgba(245, 158, 11, 0.4)' : '0 4px 12px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              pointerEvents: 'none',
              animation: 'fadeIn 0.15s ease-out',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 700, color: isSelected ? '#F59E0B' : '#38BDF8' }}>
              {meta.name}
            </div>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontStyle: 'italic' }}>
              {meta.latin}
            </div>
            <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>
              {meta.hindi}
            </div>
            {/* Leader dot */}
            <div
              style={{
                position: 'absolute',
                bottom: '-5px',
                left: centroid.x >= 0 ? '12px' : 'calc(100% - 12px)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: isSelected ? '#F59E0B' : '#06B6D4',
                boxShadow: `0 0 8px ${isSelected ? '#F59E0B' : '#06B6D4'}`,
              }}
            />
          </div>
        </Html>
      )}
    </group>
  );
}
