#!/usr/bin/env python3
"""
Catalog Builder Tool
Parses all 2,234 Wavefront OBJ anatomical models in models/, extracts metadata headers,
and generates sorted data/models_catalog.csv and data/models_catalog.json.
"""

import os
import glob
import re
import csv
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'models')
DATA_DIR = os.path.join(BASE_DIR, 'data')

def categorize(name):
    name_l = name.lower()
    if any(k in name_l for k in ['bone', 'vertebra', 'skull', 'rib', 'femur', 'tibia', 'patella', 'phalanx', 'clavicle', 'scapula', 'pelvis', 'sacrum', 'coccyx', 'radius', 'ulna', 'humerus', 'tarsal', 'carpal', 'mandible', 'maxilla', 'skeleton', 'cartilage', 'facet', 'trochanter', 'tuberosity', 'condyle', 'foramen', 'suture']):
        return 'Skeletal System'
    if any(k in name_l for k in ['muscle', 'tendon', 'aponeurosis', 'ligament', 'fascia']):
        return 'Muscular System'
    if any(k in name_l for k in ['artery', 'vein', 'aorta', 'atrium', 'ventricle', 'valve', 'vascular', 'sinus venosus', 'arterial', 'venous']):
        return 'Cardiovascular System'
    if any(k in name_l for k in ['nerve', 'brain', 'spinal cord', 'cerebrum', 'cerebellum', 'ganglion', 'plexus', 'cranial nerve', 'optic', 'olfactory', 'pons', 'medulla', 'thalamus', 'neural']):
        return 'Nervous System'
    if any(k in name_l for k in ['tooth', 'teeth', 'molar', 'premolar', 'incisor', 'canine', 'gingiva', 'stomach', 'intestine', 'liver', 'colon', 'pancreas', 'esophagus', 'tongue', 'palate', 'duodenum', 'jejunum', 'ileum', 'cecum', 'appendix', 'rectum', 'gallbladder', 'bile']):
        return 'Digestive & Dental System'
    if any(k in name_l for k in ['lung', 'bronchus', 'trachea', 'larynx', 'pleura', 'epiglottis', 'nasal', 'bronchial']):
        return 'Respiratory System'
    if any(k in name_l for k in ['kidney', 'ureter', 'bladder', 'urethra', 'penis', 'testis', 'prostate', 'epididymis', 'scrotum', 'vas deferens', 'ovary', 'uterus', 'fallopian']):
        return 'Urinary & Reproductive System'
    if any(k in name_l for k in ['lymph', 'spleen', 'thymus', 'thyroid', 'adrenal', 'pituitary', 'parathyroid', 'tonsil']):
        return 'Lymphatic & Endocrine System'
    if any(k in name_l for k in ['eye', 'ear', 'cochlea', 'tympanic', 'cornea', 'retina', 'lens', 'skin', 'iris', 'ossicle']):
        return 'Sensory & Integumentary System'
    return 'Other / General Anatomy'

def build_catalog():
    obj_files = sorted(glob.glob(os.path.join(MODELS_DIR, '*.obj')))
    print(f"Scanning {len(obj_files)} OBJ files in {MODELS_DIR}...")
    
    catalog = []
    for fpath in obj_files:
        fname = os.path.basename(fpath)
        sz = os.path.getsize(fpath)
        meta = {
            'file_name': fname,
            'file_id': os.path.splitext(fname)[0],
            'size_bytes': sz,
            'concept_id': '',
            'representation_id': '',
            'buildup_logic': '',
            'english_name': '',
            'bounds_min': '',
            'bounds_max': '',
            'volume_cm3': 0.0,
            'category': 'Other'
        }
        
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            for _ in range(30):
                line = f.readline()
                if not line or not line.startswith('#'):
                    break
                line_str = line[1:].strip()
                if ':' in line_str:
                    k, v = line_str.split(':', 1)
                    k = k.strip().lower()
                    v = v.strip()
                    if 'concept id' in k:
                        meta['concept_id'] = v
                    elif 'representation id' in k:
                        meta['representation_id'] = v
                    elif 'build-up logic' in k or 'buildup logic' in k:
                        meta['buildup_logic'] = v
                    elif 'english name' in k:
                        meta['english_name'] = v
                    elif 'volume' in k:
                        try:
                            meta['volume_cm3'] = float(v.split()[0])
                        except:
                            pass
                    elif 'bounds' in k:
                        m = re.findall(r'\(([^)]+)\)', v)
                        if len(m) >= 2:
                            meta['bounds_min'] = m[0]
                            meta['bounds_max'] = m[1]
                            
        meta['category'] = categorize(meta['english_name'])
        catalog.append(meta)
        
    catalog.sort(key=lambda x: x['file_name'])
    
    os.makedirs(DATA_DIR, exist_ok=True)
    csv_path = os.path.join(DATA_DIR, 'models_catalog.csv')
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=[
            'file_name', 'file_id', 'concept_id', 'representation_id',
            'english_name', 'category', 'volume_cm3', 'bounds_min',
            'bounds_max', 'size_bytes', 'buildup_logic'
        ])
        writer.writeheader()
        writer.writerows(catalog)
        
    json_path = os.path.join(DATA_DIR, 'models_catalog.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, indent=2)
        
    print(f"Catalog successfully rebuilt: {len(catalog)} entries written.")
    print(f"CSV:  {csv_path}")
    print(f"JSON: {json_path}")

if __name__ == '__main__':
    build_catalog()
