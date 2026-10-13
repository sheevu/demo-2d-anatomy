# Deep Technical & Anatomical Analysis Report
## Detailed Examination of `Models-of-human-anatomy` Assets

**Repository:** `https://github.com/sheevu/demo-2d-anatomy.git`  
**Dataset Source:** BodyParts3D (Release 4.0, DBCLS Japan) & Z-Anatomy Atlas Project  
**Author / Contributor Attribution:** Gauthier Kervyn, Marcin Zielinski, Kousaku Okubo, Lluis Vinent  
**Report Generated:** October 2026  

---

## 1. Executive Summary

The directory `D:\CODEX2025-2026\RAHUL-SIR\Asstes\Models-of-human-anatomy` comprises a medical-grade, open-source 3D and 2D anatomical database and interactive atlas system. It unites:

1. **2,234 High-Fidelity 3D Wavefront OBJ Meshes** representing the complete male human anatomy, derived from BodyParts3D 4.0.
2. **Two Master Blender Application Templates** (`Z-Anatomy` and `Z-Biomechanics`) with pre-assembled scenes, rigging, and specialized Python add-ons (`Startup.blend` at ~292.6 MB and ~131.8 MB).
3. **Comprehensive Ontological Datasets**:
   - `bodyparts3d_partof_parts_list_e.csv` (1,368 part-whole anatomical relations).
   - `TA2.csv` (7,315 international Terminologia Anatomica 2 official terms in 7 languages: Latin, English, French, Spanish, Portuguese, Italian, and Parsi).
4. **Custom Keymaps and Add-on Scripts** (`__init__.py`, `Anatomy-shortcuts.py`) enabling real-time navigation, hierarchical selection, Wikipedia definition fetching, and dynamic cross-section clipping.

Total uncompressed asset size across the source directory is **~885 MB**.

---

## 2. File-by-File Technical Analysis

### 2.1 Root Documentation & Metadata Files

#### `Readme.md` (4.2 KB)
- **Purpose:** Primary project orientation and installation manual for Z-Anatomy.
- **Key Contents:**
  - Explains the origins of the project (BodyParts3D + Wikipedia medical definitions).
  - Authorship credits: Gauthier Kervyn (design/3D), Marcin Zielinski (Blender add-on Python code), Lluis Vinent (Unity app), and international translation contributors.
  - Step-by-step Blender template installation guide (`File > New > Z-Anatomy`).
  - Desktop shortcut setup with `--app-template Z-Anatomy`.
  - Video tutorial links on YouTube for navigational shortcuts and usage.
  - Dual licensing declaration under CC-BY-SA 4.0 (Z-Anatomy) and CC-BY-SA 2.1 Japan (BodyParts3D).

#### `License.txt` (2.8 KB)
- **Purpose:** Formal licensing terms.
- **Key Terms:**
  - Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA 4.0).
  - Explicit terms granting freedom to access, redistribute, modify, and distribute derivative works provided attribution is preserved and derivatives remain under CC-BY-SA.

#### `TO DO List` (2.9 KB)
- **Purpose:** Active technical and anatomical roadmap.
- **Roadmap Highlights:**
  - *Short-Term:* English definition summarization, alignment to latest TA2 nomenclature, synonym indexing, parenthood relationship reordering, mesh renaming to anatomical IDs.
  - *Mid-Term:* Development of a full 3D female human model using whole-body surface scans, CT/MRI segmentation via TotalSegmentator and 3DSlicer.
  - *Long-Term:* Veterinary anatomy atlas (horse, pig, cow, dog, cat, chicken, rat) and embryological human 3D development atlas.

#### `CheatSheet.png` (276.1 KB) & `icon.ico` (264.1 KB)
- **Purpose:** Visual ergonomics and desktop application theming.
- `CheatSheet.png` provides an intuitive keyboard shortcut layout mapped over a physical keyboard for quick reference.
- `icon.ico` provides multi-resolution Windows icons (up to 256x256 RGBA) for executable shortcuts.

---

### 2.2 Anatomical Ontologies and Lexicons

#### `bodyparts3d_partof_parts_list_e.csv` (60.7 KB)
- **Structure:** 3 Columns: `concept id`, `representation id`, `en`
- **Total Records:** 1,368 part-of relational pairs.
- **Function:** Defines the hierarchical decomposition of complex human structures into sub-parts. For instance:
  - `FMA3734` (`BP10374`, aorta) decomposes into `FMA3736` (`BP10408`, ascending aorta), `FMA3768` (`BP10404`, arch of aorta), and `FMA3784` (`BP10373`, descending aorta).

#### `TA2.csv` (1.52 MB)
- **Structure:** Semicolon-delimited, UTF-8 with BOM.
- **Columns:** `TA2ID`, `English`, `Latin`, `Français`, `Español`, `Portugues`, `Italiano`, `Parsi`
- **Total Records:** 7,315 standardized anatomical terms.
- **Function:** Direct representation of *Terminologia Anatomica 2* (FIPAT / IFAA standard), providing standardized naming across 7 global languages. Serves as the backbone for internationalization in the 3D atlas UI.

---

### 2.3 The 3D Mesh Library (`isa_BP3D_4.0_obj_99` / `models/`)

- **Total OBJ Files:** 2,234 models
- **Total Storage Size:** 457.39 MB (Average ~209 KB per model; range: 5 KB to 887 KB)
- **Coordinate Reference System:** Millimeters (mm), registered to standard human anatomical coordinate space where:
  - $X$: Medial-Lateral axis (negative = right, positive = left)
  - $Y$: Anterior-Posterior axis (negative = anterior/ventral, positive = posterior/dorsal)
  - $Z$: Superior-Inferior axis (origin near feet/pelvis, superior structures extending to ~1800mm)
- **Total Geometric Anatomical Volume:** 37,894.87 cm³

#### Standard Embedded Metadata Format
Every OBJ file begins with an 11-line standardized header:
```obj
# Compatibility version : 4.0
# File ID : FJ3593
# Representation ID : BP10299
# Build-up logic : FMA 3.0 is_a
# Concept ID : FMA20818
# English name : Right dorsal artery of penis
# Bounds(mm): (-8.301500,-189.435000,733.401000)-(-3.034600,-134.526000,787.780000)
# Volume(cm3): 0.070200
v -3.23443 -189.281 738.472
...
f 1 2 3
```

#### Anatomical Systems Breakdown across the 2,234 Models

| Anatomical System | Model Count | Percentage | Key Structures Included |
| :--- | :---: | :---: | :--- |
| **Cardiovascular System** | 942 | 42.2% | Aorta, coronary arteries, carotid branches, cerebral circulation, pulmonary trunk, systemic veins, capillary plexuses |
| **Skeletal System** | 345 | 15.4% | Cranium, vertebrae (cervical, thoracic, lumbar), ribs, pelvis, femur, tibia, fibula, humerus, radius, ulna, phalanges |
| **Respiratory System** | 104 | 4.7% | Trachea, bronchial tree, segmental bronchi, larynx, epiglottis, lungs |
| **Digestive & Dental System** | 101 | 4.5% | Secondary dentition (incisors, canines, premolars, molars), gingiva, esophagus, stomach, duodenum, colon, liver, pancreas |
| **Nervous System** | 64 | 2.9% | Cranial nerves (I-XII), spinal nerves, brainstem, cerebellum, thalamus, optic tract |
| **Muscular System** | 35 | 1.6% | Major muscle groups, facial expression muscles, mastication, limb flexors/extensors |
| **Sensory & Integumentary** | 15 | 0.7% | Eyeball, cornea, lens, cochlea, semicircular canals, auditory ossicles |
| **Urinary & Reproductive** | 14 | 0.6% | Kidneys, renal pelvis, ureters, bladder, urethra, testes, penis, prostate |
| **Lymphatic & Endocrine** | 12 | 0.5% | Spleen, thymus, thyroid gland, suprarenal glands, regional lymph nodes |
| **Other / General & Visceral** | 602 | 26.9% | Connective fascias, anatomical spaces, membranes, sub-segmental organs |

---

### 2.4 Blender Application Templates

#### Directory: `templates/Z-Anatomy/`
- `Startup.blend` (292.62 MB):
  - Binary format: `BLENDER-v305` (Blender 3.5 native file).
  - Contains the entire assembly of human anatomy: hundreds of parented collections representing systems, hierarchical collections, lighting rigs, and cross-section clipping planes.
  - Managed via **Git LFS** due to exceeding the 100 MB threshold.
- `__init__.py` (60.2 KB, 1,551 lines):
  - Defines 21 Blender operators and UI panels:
    - `OBJECT_OT_hide_wrapper` & `OBJECT_OT_hide_view_clear_wrapper`: Custom visibility toggles maintaining hierarchical parent-child states.
    - `OBJECT_OT_make_label` & `OBJECT_OT_label_delta`: Automated generation of 3D leader lines and billboard text labels pinned to anatomical origins.
    - `TEXT_OT_wiki_download`: Direct asynchronous HTTP request to MediaWiki API to fetch and render verified medical definitions inside Blender's UI text buffer.
    - `OBJECT_OT_collection_x_section`: Adds dynamic clipping planes for real-time sagittal, coronal, and transverse anatomical slicing.
    - `ZANATOMY_PT_languages`: Multilingual panel connecting structures to their TA2 counterparts.
- `Anatomy-shortcuts.py` (292.2 KB):
  - Custom keyconfig (version 3.5.10) configuring rapid single-key navigation, isolation modes, and label authoring.
- `Anatomy_Bright.xml` & `Anatomy_Dark.xml` (46.7 KB each):
  - Custom UI theme configurations optimized for anatomical visualization, providing high contrast between bone, muscle, and vascular materials.
- `splash.png` (689.6 KB):
  - Custom splash screen displaying the Z-Anatomy logo and anatomical render.

#### Directory: `templates/Z-Biomechanics/`
- `Startup.blend` (131.76 MB):
  - Binary format: `BLENDER-v300` (Blender 3.0 native file).
  - Contains bone armatures, inverse kinematics (IK) rigging, and muscle action deformation rigs for biomechanical simulation.
  - Managed via **Git LFS**.
- `Anatomy-shortcuts.py` (294.2 KB):
  - Includes 76 extra lines of specialized shortcut mappings for biomechanical analysis, including `object.muscle_key_color` (`Shift + Alt + Z`) and `object.select_parent_children` (`Down Arrow`).
- `__init__.py`, `splash.png`, and themes identical in architecture to Z-Anatomy.

---

## 3. Automation Tools & Utility Enhancements

To make this repository directly actionable for developers and researchers, three custom tools have been created:

1. **`tools/fma_lookup.py`**:
   - High-speed command-line search utility allowing instant lookup by FMA ID, BP ID, or anatomical keyword.
   - Example: `python tools/fma_lookup.py aorta` prints matching files, coordinates, bounding boxes, and volume in cm³.
2. **`tools/catalog_builder.py`**:
   - Automatically re-scans `models/`, parses header metadata comments, categorizes by system, and rebuilds both `data/models_catalog.csv` and `data/models_catalog.json`.
3. **`tools/verify_integrity.py`**:
   - Integrity checker verifying that all 2,234 meshes exist, are non-empty, and confirms the presence and size of the Blender template workspaces.

---

## 4. Requirements & Environment Specification

The project dependencies have been verified and installed:
- **Python:** 3.10+ (tested on Python 3.14)
- **Core Libraries:** `pandas`, `scipy`, `trimesh`, `fast_simplification`, `requests`, `pillow`, `numpy`, `python-dateutil`
- **3D Modeling & CAD:** Blender 3.0+ (recommended: Blender 3.5 LTS or newer)
- **Version Control:** Git with **Git LFS 3.8.0+** enabled for tracking `*.blend` files.
