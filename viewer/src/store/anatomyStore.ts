import { create } from 'zustand';
import type { ModelMeta } from '../components/RealAnatomyMesh';

export type BodyRegion = 'All' | 'Head' | 'Trunk' | 'Upper Limbs' | 'Lower Limbs';

export type MacroSystem =
  | 'All'
  | 'Musculoskeletal'
  | 'Skeletal'
  | 'Cardiovascular'
  | 'Nervous'
  | 'Respiratory'
  | 'Digestive'
  | 'Urogenital'
  | 'Endocrine'
  | 'Lymphatic'
  | 'Sense Organs';

export type AnatomicalLayer = 'Skeletal' | 'Muscular' | 'Visceral' | 'Vascular' | 'Nervous' | 'Skin';

export type CameraView = 'front' | 'back' | 'left' | 'right' | 'top' | 'free';

export interface ClinicalInfo {
  description: string;
  function: string;
  clinicalSignificance: string;
  substructures: string[];
}

export const CLINICAL_DATABASE: Record<string, ClinicalInfo> = {
  // Skull & Brain
  'FJ3200': {
    description: 'The frontal bone forms the forehead, the superior rims of the orbits, and the anterior cranial fossa housing the frontal lobes.',
    function: 'Protects the frontal lobes of the brain and provides structural anchorage for muscles of facial expression and mastication.',
    clinicalSignificance: 'Subject to depressed fractures in frontal trauma. Houses the frontal sinuses which can be involved in sinusitis.',
    substructures: ['Squamous Part', 'Orbital Plate', 'Nasal Part', 'Frontal Sinuses', 'Supraorbital Margin']
  },
  'FJ3274': {
    description: 'The parietal bones form the superior and lateral roof of the cranium, articulating at the sagittal and coronal sutures.',
    function: 'Encloses and shields the parietal and superior cerebral cortices.',
    clinicalSignificance: 'Trauma over the pterion can rupture the underlying middle meningeal artery, leading to life-threatening epidural hematoma.',
    substructures: ['Sagittal Border', 'Squamosal Border', 'Parietal Foramen', 'Superior Temporal Line']
  },
  'FJ3309': {
    description: 'The occipital bone forms the posteroinferior aspect of the skull, containing the foramen magnum through which the spinal cord exits.',
    function: 'Protects the cerebellum and brainstem; articulates with atlas (C1) at occipital condyles for nodding movements.',
    clinicalSignificance: 'Occipital condyle fractures can cause lower cranial nerve deficits (IX, X, XI, XII). Basilar skull fractures may present with Battle sign.',
    substructures: ['Foramen Magnum', 'Occipital Condyles', 'Basilar Part', 'External Occipital Protuberance', 'Squama Occipitalis']
  },
  'FJ1781': {
    description: 'The cerebellum occupies the posterior cranial fossa, dorsal to the pons and medulla oblongata.',
    function: 'Coordinates voluntary motor movements, posture, balance, and motor learning through Purkinje cell circuits.',
    clinicalSignificance: 'Cerebellar lesions present with ataxia, dysmetria, intention tremor, dysdiadochokinesia, and nystagmus.',
    substructures: ['Cerebellar Hemispheres', 'Vermis', 'Flocculonodular Lobe', 'Dentate Nucleus', 'Purkinje Layer']
  },
  'FJ1822': {
    description: 'The pons is the middle portion of the brainstem, connecting the medulla to the midbrain and the cerebral cortex to the cerebellum.',
    function: 'Contains respiratory rhythmicity centers (pneumotaxic & apneustic), motor relay nuclei, and cranial nerve nuclei (V, VI, VII, VIII).',
    clinicalSignificance: 'Pontine stroke can produce "locked-in syndrome" with intact consciousness but quadriplegia and aphonia.',
    substructures: ['Basilar Sulcus', 'Middle Cerebellar Peduncle', 'Trigeminal Nucleus', 'Abducens Nucleus', 'Facial Motor Nucleus']
  },

  // Spine & Thorax
  'FJ3393': {
    description: 'The sacrum is a large triangular bone formed by the fusion of five sacral vertebrae (S1-S5) at the base of the spine.',
    function: 'Transmits the weight of the vertebral column to the pelvic girdle via the sacroiliac joints.',
    clinicalSignificance: 'Sacroiliitis is a hallmark of ankylosing spondylitis. Sacral fractures require careful evaluation of S1-S4 nerve roots.',
    substructures: ['Sacral Promontory', 'Sacral Canal', 'Anterior Sacral Foramina', 'Median Sacral Crest', 'Auricular Surface']
  },
  'FJ3344': {
    description: 'The 6th rib is a true vertebrosternal rib with its anterior costal cartilage attaching directly to the sternum.',
    function: 'Expands the thoracic volume during inhalation and protects pulmonary and cardiac tissue.',
    clinicalSignificance: 'Common site of rib fractures; costochondritis can cause acute anterior chest pain mimicking myocardial infarction.',
    substructures: ['Head', 'Neck', 'Tubercle', 'Costal Angle', 'Costal Groove']
  },

  // Pelvis & Limbs
  'FJ3152': {
    description: 'The hip bone (os coxae) is a large, irregularly shaped bone formed by the embryological fusion of the ilium, ischium, and pubis.',
    function: 'Provides the deep acetabulum socket for the hip joint and broad surfaces for pelvic and gluteal muscle attachment.',
    clinicalSignificance: 'Acetabular fractures often result from high-energy dashboard trauma. Iliac crest is a standard site for bone marrow biopsy.',
    substructures: ['Iliac Crest', 'Ischial Tuberosity', 'Pubic Symphysis', 'Acetabulum', 'Obturator Foramen']
  },
  'FJ3259': {
    description: 'The femur is the longest, strongest, and heaviest tubular bone in the human body, forming the skeletal framework of the thigh.',
    function: 'Transmits body weight from the pelvic acetabulum down to the tibia and serves as the lever arm for locomotion.',
    clinicalSignificance: 'Femoral neck fractures in osteoporotic elderly patients carry risk of avascular necrosis of the femoral head due to retinacular artery disruption.',
    substructures: ['Femoral Head', 'Femoral Neck', 'Greater Trochanter', 'Lesser Trochanter', 'Shaft', 'Medial & Lateral Condyles']
  },
  'FJ3282': {
    description: 'The tibia (shinbone) is the primary weight-bearing bone of the lower leg, second only to the femur in size.',
    function: 'Transfers body weight from the femoral condyles to the talus bone of the ankle foot complex.',
    clinicalSignificance: 'Open tibial shaft fractures are frequent in traffic accidents due to the subcutaneous anterior tibial crest.',
    substructures: ['Tibial Plateau', 'Tibial Tuberosity', 'Shaft', 'Medial Malleolus', 'Fibular Notch']
  },
  'FJ3262': {
    description: 'The humerus is the single long bone of the brachium (upper arm), articulating with the glenoid cavity of the scapula.',
    function: 'Provides skeletal foundation for shoulder elevation, abduction, rotation, and elbow flexion/extension.',
    clinicalSignificance: 'Midshaft spiral fractures endanger the radial nerve in the spiral groove, potentially causing wrist drop.',
    substructures: ['Humeral Head', 'Anatomical Neck', 'Surgical Neck', 'Deltoid Tuberosity', 'Trochlea', 'Capitulum', 'Medial Epicondyle']
  },

  // Cardiovascular
  'FJ2428': {
    description: 'The thick muscular wall of the left and right ventricles, composed of specialized cardiac myocytes arranged in helical bands.',
    function: 'Generates systolic blood pressure (120 mmHg systemic in left ventricle; 25 mmHg pulmonary in right ventricle).',
    clinicalSignificance: 'Left ventricular hypertrophy (LVH) occurs in chronic hypertension. Transmural infarction leads to wall motion abnormalities.',
    substructures: ['Interventricular Septum', 'Myocardium', 'Endocardium', 'Epicardium', 'Trabeculae Carneae']
  },
  'FJ3427': {
    description: 'The descending aorta is the largest systemic arterial trunk, traversing from the aortic arch (T4) down through the diaphragm into the abdomen.',
    function: 'Delivers high-pressure, oxygen-saturated blood to the thoracic wall, thoracic viscera, abdominal organs, and lower extremities.',
    clinicalSignificance: 'Aortic dissection (Stanford Type B) involves a tear in the intima of the descending aorta. Thoracoabdominal aneurysms require vascular stenting.',
    substructures: ['Thoracic Aorta', 'Abdominal Aorta', 'Bronchial Branches', 'Intercostal Arteries', 'Celiac Trunk Origin']
  },

  // Respiratory
  'FJ2541': {
    description: 'The trachea is a 10-12 cm flexible cartilaginous tube kept patent by 16-20 C-shaped hyaline cartilage rings.',
    function: 'Conducts inspired air toward the lungs, humidifying and filtering particles via pseudostratified ciliated columnar epithelium.',
    clinicalSignificance: 'Site for emergency tracheostomy and endotracheal intubation. Tracheomalacia causes dynamic airway collapse during expiration.',
    substructures: ['Tracheal Cartilage Rings', 'Trachealis Muscle', 'Carina', 'Mucosa', 'Adventitia']
  },

  // Digestive
  'FJ2564': {
    description: 'The stomach is a J-shaped muscular reservoir positioned between the esophagus and the duodenum in the left upper quadrant.',
    function: 'Secretes hydrochloric acid (pH 1.5-2.0), pepsinogen, and intrinsic factor; mechanically churns bolus into chyme.',
    clinicalSignificance: 'Helicobacter pylori infection causes peptic ulcer disease. Gastric adenocarcinoma frequently metastasizes to Virchow node.',
    substructures: ['Cardia', 'Fundus', 'Corpus (Body)', 'Pyloric Antrum', 'Pyloric Sphincter', 'Greater Curvature', 'Lesser Curvature']
  },
  'FJ2820': {
    description: 'Hepatic Segment IV (Quadrate Lobe / Medial Left Lobe) according to the Couinaud anatomical segmentation system.',
    function: 'Major site for carbohydrate metabolism, bile production, detoxification of portal venous blood, and albumin synthesis.',
    clinicalSignificance: 'Couinaud segmentation enables anatomical liver resections (hepatectomies) without disrupting vascular pedicles of adjacent segments.',
    substructures: ['Segment IVa (Superior)', 'Segment IVb (Inferior)', 'Portal Triad Branch', 'Hepatic Vein Drainage']
  },
  'FJ2566': {
    description: 'The ascending colon is the retroperitoneal second part of the large intestine, extending from the cecum to the right colic flexure.',
    function: 'Absorbs water, sodium, and short-chain fatty acids from residual liquid chyme.',
    clinicalSignificance: 'Site of primary adenocarcinoma and angiodysplasia causing painless lower gastrointestinal bleeding.',
    substructures: ['Taeniae Coli', 'Haustra', 'Epiploic Appendages', 'Ileocecal Valve', 'Hepatic Flexure']
  },

  // Urinary
  'FJ3145': {
    description: 'The left kidney is a retroperitoneal bean-shaped parenchymal organ lying between T12 and L3 vertebral levels.',
    function: 'Filters ~180 L of plasma daily via 1 million nephrons, producing 1.5 L of urine; regulates erythropoiesis and renin-angiotensin balance.',
    clinicalSignificance: 'Renal cell carcinoma typically arises from proximal tubule cells. Nephrolithiasis (kidney stones) causes severe flank colic.',
    substructures: ['Renal Cortex', 'Renal Medulla', 'Renal Pyramids', 'Minor & Major Calyces', 'Renal Pelvis', 'Renal Artery & Vein']
  },
  'FJ3149': {
    description: 'The urinary bladder is a hollow extraperitoneal muscular organ with a distensible detrusor muscle wall.',
    function: 'Stores up to 400-600 mL of urine under low pressure and contracts coordinated with sphincter relaxation during micturition.',
    clinicalSignificance: 'Urothelial (transitional cell) carcinoma presents with painless gross hematuria. Neurogenic bladder results from spinal injury.',
    substructures: ['Detrusor Muscle', 'Trigone', 'Ureteral Orifices', 'Internal Urethral Orifice', 'Bladder Neck']
  },

  // Lymphatic & Muscular
  'FJ2561': {
    description: 'The spleen is the largest lymphoid organ, located in the left hypochondrium under the 9th to 11th ribs.',
    function: 'Red pulp filters senescent erythrocytes and stores platelets; white pulp generates adaptive humoral and cellular immune responses.',
    clinicalSignificance: 'Splenic rupture from blunt abdominal trauma can cause catastrophic hemoperitoneum requiring emergency splenectomy.',
    substructures: ['Red Pulp', 'White Pulp', 'Splenic Capsule', 'Trabeculae', 'Splenic Artery & Vein']
  },
  'FJ1442': {
    description: 'The vastus lateralis is the largest and most powerful component of the quadriceps femoris muscle complex.',
    function: 'Extends the knee joint during walking, running, stair climbing, and rising from a seated position.',
    clinicalSignificance: 'Common intramuscular injection site in pediatric and adult medicine due to distance from major neurovascular trunks.',
    substructures: ['Proximal Attachment (Greater Trochanter)', 'Muscle Belly', 'Quadriceps Tendon Insertion', 'Femoral Nerve Innervation']
  }
};

export interface AnatomyState {
  // Navigation filters
  bodyRegion: BodyRegion;
  macroSystem: MacroSystem;
  activeLayers: Set<AnatomicalLayer>;

  // Selection & Hover
  selectedModel: ModelMeta | null;
  hoveredModel: ModelMeta | null;
  isolatedModelId: string | null;
  hiddenModelIds: Set<string>;

  // View parameters
  skinOpacity: number;
  explodedView: boolean;
  cameraView: CameraView;
  showLabels: boolean;
  searchQuery: string;
  clinicalDrawerOpen: boolean;

  // Actions
  setBodyRegion: (region: BodyRegion) => void;
  setMacroSystem: (system: MacroSystem) => void;
  toggleLayer: (layer: AnatomicalLayer) => void;
  selectModel: (model: ModelMeta | null) => void;
  hoverModel: (model: ModelMeta | null) => void;
  toggleHideModel: (fileId: string) => void;
  setIsolatedModel: (fileId: string | null) => void;
  setSkinOpacity: (opacity: number) => void;
  setExplodedView: (exploded: boolean) => void;
  setCameraView: (view: CameraView) => void;
  setShowLabels: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  setClinicalDrawerOpen: (open: boolean) => void;
  resetAll: () => void;
}

const defaultLayers = new Set<AnatomicalLayer>([
  'Skeletal',
  'Muscular',
  'Visceral',
  'Vascular',
  'Nervous',
]);

export const useAnatomyStore = create<AnatomyState>((set) => ({
  bodyRegion: 'All',
  macroSystem: 'All',
  activeLayers: defaultLayers,

  selectedModel: null,
  hoveredModel: null,
  isolatedModelId: null,
  hiddenModelIds: new Set<string>(),

  skinOpacity: 0.15,
  explodedView: false,
  cameraView: 'front',
  showLabels: true,
  searchQuery: '',
  clinicalDrawerOpen: false,

  setBodyRegion: (region) => set({
    bodyRegion: region,
    isolatedModelId: null,
  }),

  setMacroSystem: (system) => set({
    macroSystem: system,
    isolatedModelId: null,
  }),

  toggleLayer: (layer) => set((state) => {
    const next = new Set(state.activeLayers);
    if (next.has(layer)) next.delete(layer);
    else next.add(layer);
    return { activeLayers: next };
  }),

  selectModel: (model) => set({
    selectedModel: model,
    clinicalDrawerOpen: model !== null,
  }),

  hoverModel: (model) => set({ hoveredModel: model }),

  toggleHideModel: (fileId) => set((state) => {
    const next = new Set(state.hiddenModelIds);
    if (next.has(fileId)) next.delete(fileId);
    else next.add(fileId);
    return { hiddenModelIds: next };
  }),

  setIsolatedModel: (fileId) => set({
    isolatedModelId: fileId,
    clinicalDrawerOpen: fileId !== null,
  }),

  setSkinOpacity: (opacity) => set({ skinOpacity: opacity }),
  setExplodedView: (exploded) => set({ explodedView: exploded }),
  setCameraView: (view) => set({ cameraView: view }),
  setShowLabels: (show) => set({ showLabels: show }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setClinicalDrawerOpen: (open) => set({ clinicalDrawerOpen: open }),

  resetAll: () => set({
    bodyRegion: 'All',
    macroSystem: 'All',
    activeLayers: new Set<AnatomicalLayer>(defaultLayers),
    selectedModel: null,
    hoveredModel: null,
    isolatedModelId: null,
    hiddenModelIds: new Set<string>(),
    skinOpacity: 0.15,
    explodedView: false,
    cameraView: 'front',
    showLabels: true,
    searchQuery: '',
    clinicalDrawerOpen: false,
  }),
}));
