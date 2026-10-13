# 🫀 Demo 2D & 3D Human Anatomy Atlas

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](LICENSE)
[![Models](https://img.shields.io/badge/3D_Models-2%2C234_Meshes-blue.svg)](models/)
[![Blender](https://img.shields.io/badge/Blender-v3.0_%26_v3.5-orange.svg)](templates/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-green.svg)](requirements.txt)
[![Git LFS](https://img.shields.io/badge/Git_LFS-Tracked-informational.svg)](.gitattributes)

A comprehensive, medical-grade 3D & 2D anatomical atlas and data repository derived from **BodyParts3D (Release 4.0)** and the **Z-Anatomy Atlas Project**. This repository packages **2,234 high-fidelity 3D anatomical meshes**, complete **Terminologia Anatomica 2 (TA2)** multilingual lexicons, master **Blender application templates**, and automated Python lookup and catalog tools in a clean, sorted, production-ready structure.

---

## 📂 Repository Structure (Sorted & Organized Format)

```text
demo-2d-anatomy/
├── .gitattributes                # Git LFS tracking rules (*.blend)
├── README.md                     # Master documentation & project guide
├── LICENSE                       # Creative Commons Attribution-ShareAlike 4.0 terms
├── requirements.txt              # Python requirements (pandas, scipy, trimesh, etc.)
├── package.json                  # Node.js npm scripts for CLI tool execution
│
├── docs/                         # Documentation & Visual Guides
│   ├── ANATOMICAL_ANALYSIS_REPORT.md  # Deep technical & statistical analysis report
│   ├── SHORTCUTS_CHEATSHEET.md        # Complete keyboard shortcut reference guide
│   ├── TO_DO_LIST.md                  # Project roadmap & research goals
│   ├── CheatSheet.png                 # Keyboard layout cheatsheet diagram
│   └── icon.ico                       # High-resolution application icon
│
├── data/                         # Anatomical Terminology & Datasets
│   ├── models_catalog.csv             # Sorted catalog of all 2,234 models with FMA/BP IDs & metrics
│   ├── models_catalog.json            # Machine-readable JSON catalog for API integration
│   ├── bodyparts3d_partof_parts_list_e.csv # BP3D hierarchical part-of relations (1,368 pairs)
│   └── TA2.csv                        # Official Terminologia Anatomica 2 in 7 languages (7,315 entries)
│
├── models/                       # 3D Anatomical Wavefront OBJ Meshes (Sorted FJ1252 -> FJ3659)
│   ├── FJ1252.obj ... FJ3659.obj      # 2,234 3D meshes with embedded anatomical metadata headers
│
├── templates/                    # Blender Application Templates
│   ├── Z-Anatomy/                # Full Human Anatomical Atlas workspace (Blender 3.5)
│   └── Human-Anatomy-Atlas/      # Standalone Human Atlas environment (Blender 3.0)
│
├── viewer/                       # Interactive Anatomy 3D Atlas Web Application
│   ├── src/                      # React Three Fiber, PBR shaders, Zustand store, clinical drawer
│   ├── public/models/            # 59 calibrated BodyParts3D OBJ meshes across all 5 body regions
│   ├── public/models_manifest.json # Trilingual metadata (English, Latin, Hindi), volume & bounds
│   └── package.json              # Web app dependencies & build scripts

│   │   ├── Startup.blend         # Master 3D anatomical scene file (292.6 MB, via Git LFS)
│   │   ├── __init__.py           # Blender Python add-on (labels, cross-sections, Wikipedia API)
│   │   ├── Anatomy-shortcuts.py  # Custom Blender shortcut keymap configuration
│   │   ├── Anatomy_Bright.xml    # High-contrast light UI theme
│   │   ├── Anatomy_Dark.xml      # High-contrast dark UI theme
│   │   └── splash.png            # Application splash screen
│   │
│   └── Z-Biomechanics/           # Biomechanics & Musculoskeletal Motion workspace (Blender 3.0)
│       ├── Startup.blend         # Master biomechanics rigged scene file (131.8 MB, via Git LFS)
│       ├── __init__.py           # Biomechanics add-on
│       ├── Anatomy-shortcuts.py  # Specialized keymap for motion & muscle coloring
│       ├── Anatomy_Bright.xml    # Light UI theme
│       ├── Anatomy_Dark.xml      # Dark UI theme
│       ├── desktop.ini           # Folder icon settings
│       └── splash.png            # Biomechanics splash screen
│
└── tools/                        # Automation & Inspection CLI Utilities
    ├── fma_lookup.py             # Instant search by FMA ID, BP ID, or anatomical keyword
    ├── catalog_builder.py        # Automated parser & catalog regenerator from OBJ headers
    └── verify_integrity.py       # Mesh and template integrity verification script
```

---

## 📊 Anatomical Catalog & Statistical Breakdown

Across the **2,234 individual 3D models**, the total geometric volume is **37,894.87 cm³** and uncompressed mesh data accounts for **457.39 MB**.

| Anatomical System | Model Count | % Distribution | Example Included Structures |
| :--- | :---: | :---: | :--- |
| **Cardiovascular System** | 942 | 42.2% | Aorta, coronary arteries, circle of Willis, venae cavae, cardiac chambers |
| **Skeletal System** | 345 | 15.4% | Complete axial & appendicular skeleton: cranium, vertebrae, ribs, limbs |
| **Respiratory System** | 104 | 4.7% | Larynx, trachea, bronchial arborization, lungs, pleura |
| **Digestive & Dental System** | 101 | 4.5% | Complete adult dentition, gingiva, stomach, intestines, liver, pancreas |
| **Nervous System** | 64 | 2.9% | Cranial nerves (I–XII), brainstem, cerebrum, cerebellum, spinal pathways |
| **Muscular System** | 35 | 1.6% | Superficial & deep muscle groups, tendons, aponeuroses |
| **Sensory & Integumentary** | 15 | 0.7% | Eye components, inner ear cochlea, ossicles, skin layers |
| **Urinary & Reproductive** | 14 | 0.6% | Kidneys, ureters, bladder, urethra, reproductive organs |
| **Lymphatic & Endocrine** | 12 | 0.5% | Spleen, thymus, thyroid gland, suprarenal glands, lymph nodes |
| **Other / General Anatomy** | 602 | 26.9% | Connective tissues, organ sub-segments, fascial planes |

---

## 🚀 Quick Start Guide

### 1. Requirements & Installation

Clone the repository with **Git LFS** enabled (required for `.blend` master workspaces):

```bash
# Ensure Git LFS is installed
git lfs install

# Clone the repository
git clone https://github.com/sheevu/demo-2d-anatomy.git
cd demo-2d-anatomy

# Pull large Git LFS binary files (Startup.blend)
git lfs pull
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### 2. Querying Anatomical Models (CLI Tool)

Use `tools/fma_lookup.py` to search any organ, bone, vessel, or nerve:

```bash
# Search by anatomical keyword
python tools/fma_lookup.py aorta

# Search by FMA Concept ID
python tools/fma_lookup.py FMA3734

# Filter by anatomical system
python tools/fma_lookup.py femur --system "Skeletal System"

# View dataset summary
python tools/fma_lookup.py --summary
```

### 3. Verifying Integrity

```bash
python tools/verify_integrity.py
```

### 4. Installing Blender Application Templates

To open the full interactive atlas inside Blender:
1. Open Blender (v3.0 or v3.5+).
2. Click the Blender icon in the top-left corner $\rightarrow$ **Install Application Template**.
3. Point to the `templates/Z-Anatomy` folder (or compress `Z-Anatomy` into a zip and install).
4. Select `File > New > Z-Anatomy`.
5. Enjoy fully parented 3D anatomical navigation, dynamic cross-sections, and bilingual labeling.

### 5. Running the Interactive 3D Web Viewer

To launch the real-time Anatomy 3D Atlas browser application:

```bash
cd viewer
npm install
npm run dev
```

Then navigate to `http://localhost:5173` in any modern web browser.
Features include:
- **Level 1 Body Region Filtering**: All Body, Head, Trunk, Upper Limbs, Lower Limbs
- **Level 2 Macro System Filtering**: Skeletal, Muscular, Cardiovascular, Nervous, Respiratory, Digestive, Urogenital, Endocrine, Lymphatic
- **PBR Surgical Lighting & Realistic Textures**: Subsurface scatter simulation, bone translucency, and organ shaders
- **Clinical Inspection Drawer**: High-detail physiological descriptions, clinical significance, and component breakdown
- **Trilingual Nomenclature**: English, Latin (*Terminologia Anatomica*), and Hindi (देवनागरी)
- **Interactive Tools**: Exploded view mode, anatomical layer transparency, isolate/hide controls, and multi-angle camera presets (Front, Back, Left, Right, Top)

---


## 📜 Licensing & Attributions

This project is distributed under the [Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0)](LICENSE).

### Attributions
- **BodyParts3D**: Database Center for Life Science (DBCLS), Japan ([CC BY-SA 2.1 Japan](http://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html)).
- **Z-Anatomy Project**: Gauthier Kervyn (Design, 3D, Anatomy), Marcin Zielinski (Blender add-on & Python keymaps), Lluis Vinent (App development).
- **Terminologia Anatomica 2 (TA2)**: FIPAT / IFAA international nomenclature.
- **Medical Definitions**: Wikipedia / Wikimedia Commons contributors ([CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)).