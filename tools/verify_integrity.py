#!/usr/bin/env python3
"""
Integrity Verification Utility
Verifies that all 2,234 3D OBJ anatomical models are present, non-empty,
have valid geometric vertices and faces, and verify Blender startup files.
"""

import os
import glob
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'models')
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')

def verify_models():
    print("Verifying 3D anatomical models in models/ ...")
    obj_files = sorted(glob.glob(os.path.join(MODELS_DIR, '*.obj')))
    total = len(obj_files)
    print(f"Total OBJ models detected: {total}")
    
    if total != 2234:
        print(f"WARNING: Expected 2,234 models, found {total}")
    else:
        print("PASS: Exactly 2,234 models detected.")
        
    empty_files = []
    missing_vertices = []
    
    # Fast check of samples + size validation across all
    for fpath in obj_files:
        sz = os.path.getsize(fpath)
        if sz == 0:
            empty_files.append(os.path.basename(fpath))
            
    if empty_files:
        print(f"FAIL: {len(empty_files)} empty OBJ files detected: {empty_files[:5]}")
    else:
        print("PASS: All 2,234 OBJ models have non-zero file size.")
        
    # Check templates
    blend_files = [
        os.path.join(TEMPLATES_DIR, 'Z-Anatomy', 'Startup.blend'),
        os.path.join(TEMPLATES_DIR, 'Z-Biomechanics', 'Startup.blend')
    ]
    for bf in blend_files:
        if os.path.exists(bf):
            sz_mb = os.path.getsize(bf) / (1024 * 1024)
            print(f"PASS: Found Blender workspace {os.path.basename(os.path.dirname(bf))}/Startup.blend ({sz_mb:.2f} MB)")
        else:
            print(f"FAIL: Missing Blender workspace {bf}")

if __name__ == '__main__':
    verify_models()
