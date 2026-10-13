// Comprehensive Human Anatomy Dataset
// Derived from BodyParts3D 4.0 catalog (2,234 anatomical models)
// FMA IDs from Foundational Model of Anatomy, BP IDs from BodyParts3D

export interface AnatomicalStructure {
  id: string;
  name: string;
  nameHindi: string;
  nameLatin: string;
  fileId: string;
  conceptId: string;
  system: AnatomicalSystem;
  volume_cm3: number;
  description: string;
  function: string;
  location: string;
  color: string;
  highlightColor: string;
  position: [number, number, number]; // normalized 3D position
  scale: [number, number, number];
  relatedStructures: string[];
  subStructures?: string[];
}

export type AnatomicalSystem =
  | 'Skeletal'
  | 'Muscular'
  | 'Cardiovascular'
  | 'Nervous'
  | 'Respiratory'
  | 'Digestive'
  | 'Urinary'
  | 'Endocrine'
  | 'Integumentary'
  | 'Reproductive';

export const SYSTEM_COLORS: Record<AnatomicalSystem, string> = {
  Skeletal:       '#E8E0D0',
  Muscular:       '#C0392B',
  Cardiovascular: '#E74C3C',
  Nervous:        '#F39C12',
  Respiratory:    '#5DADE2',
  Digestive:      '#8E44AD',
  Urinary:        '#F0B27A',
  Endocrine:      '#1ABC9C',
  Integumentary:  '#F5CBA7',
  Reproductive:   '#EC407A',
};

export const SYSTEM_DESCRIPTIONS: Record<AnatomicalSystem, string> = {
  Skeletal: 'The skeletal system provides the structural framework of the human body, protecting vital organs, enabling movement, and producing blood cells.',
  Muscular: 'The muscular system enables movement, maintains posture, and generates body heat through controlled contraction and relaxation of muscle tissue.',
  Cardiovascular: 'The cardiovascular system circulates blood, oxygen, and nutrients throughout the body via the heart, arteries, veins, and capillaries.',
  Nervous: 'The nervous system coordinates body functions through electrical signals, enabling sensation, movement, cognition, and autonomic regulation.',
  Respiratory: 'The respiratory system facilitates gas exchange, delivering oxygen to the blood and expelling carbon dioxide from the lungs.',
  Digestive: 'The digestive system breaks down food into nutrients, absorbs them into the bloodstream, and eliminates waste products.',
  Urinary: 'The urinary system filters blood, removes metabolic waste, regulates fluid balance, and excretes urine.',
  Endocrine: 'The endocrine system produces hormones that regulate metabolism, growth, reproduction, and homeostasis.',
  Integumentary: 'The integumentary system (skin) protects the body, regulates temperature, and provides sensory information.',
  Reproductive: 'The reproductive system enables sexual reproduction through specialized gonads, ducts, and accessory structures.',
};

// Positioned in normalized anatomical space (-1 to 1 in Y, -0.5 to 0.5 in X/Z)
// Y=1 = top of head, Y=-1 = feet
export const ANATOMY_STRUCTURES: AnatomicalStructure[] = [
  // === CARDIOVASCULAR SYSTEM ===
  {
    id: 'heart',
    name: 'Heart',
    nameHindi: 'हृदय',
    nameLatin: 'Cor',
    fileId: 'FJ1931',
    conceptId: 'FMA7088',
    system: 'Cardiovascular',
    volume_cm3: 524.0,
    description: 'The heart is a muscular organ that pumps blood through the circulatory system. It consists of four chambers: two atria and two ventricles.',
    function: 'Pumps oxygenated blood to the body and deoxygenated blood to the lungs via systemic and pulmonary circulation.',
    location: 'Mediastinum, between the lungs, slightly left of center',
    color: '#C0392B',
    highlightColor: '#FF6B6B',
    position: [0.05, 0.25, 0.1],
    scale: [0.09, 0.09, 0.09],
    relatedStructures: ['aorta', 'pulmonary_trunk', 'coronary_arteries'],
    subStructures: ['Left Ventricle', 'Right Ventricle', 'Left Atrium', 'Right Atrium', 'Mitral Valve', 'Tricuspid Valve'],
  },
  {
    id: 'aorta',
    name: 'Aorta',
    nameHindi: 'महाधमनी',
    nameLatin: 'Aorta',
    fileId: 'FJ3427',
    conceptId: 'FMA3784',
    system: 'Cardiovascular',
    volume_cm3: 88.1,
    description: 'The aorta is the main and largest artery in the human body, originating from the left ventricle of the heart.',
    function: 'Distributes oxygenated blood from the heart to all parts of the body.',
    location: 'Thorax and abdomen, anterior to the vertebral column',
    color: '#E74C3C',
    highlightColor: '#FF8A80',
    position: [0.02, 0.22, 0.06],
    scale: [0.05, 0.18, 0.05],
    relatedStructures: ['heart', 'descending_aorta', 'arch_of_aorta'],
    subStructures: ['Ascending Aorta', 'Arch of Aorta', 'Descending Thoracic Aorta', 'Abdominal Aorta'],
  },
  {
    id: 'descending_aorta',
    name: 'Descending Aorta',
    nameHindi: 'अवरोही महाधमनी',
    nameLatin: 'Aorta descendens',
    fileId: 'FJ1931',
    conceptId: 'FMA87217',
    system: 'Cardiovascular',
    volume_cm3: 77.3,
    description: 'The descending aorta travels down through the thorax and abdomen, supplying blood to the trunk and lower extremities.',
    function: 'Supplies blood to thoracic and abdominal organs and lower extremities.',
    location: 'Posterior mediastinum and retroperitoneal space',
    color: '#E74C3C',
    highlightColor: '#FF8A80',
    position: [0.02, 0.05, 0.0],
    scale: [0.04, 0.22, 0.04],
    relatedStructures: ['aorta', 'renal_arteries'],
    subStructures: ['Thoracic Aorta', 'Abdominal Aorta'],
  },

  // === RESPIRATORY SYSTEM ===
  {
    id: 'lungs',
    name: 'Lungs',
    nameHindi: 'फेफड़े',
    nameLatin: 'Pulmones',
    fileId: 'FJ2541',
    conceptId: 'FMA7195',
    system: 'Respiratory',
    volume_cm3: 1200.0,
    description: 'The lungs are the primary organs of respiration, responsible for gas exchange between the atmosphere and the bloodstream.',
    function: 'Exchange oxygen and carbon dioxide between air and blood via millions of alveoli.',
    location: 'Thoracic cavity, on either side of the mediastinum',
    color: '#5DADE2',
    highlightColor: '#87CEEB',
    position: [0, 0.3, 0.0],
    scale: [0.2, 0.2, 0.1],
    relatedStructures: ['trachea', 'bronchi', 'diaphragm'],
    subStructures: ['Right Upper Lobe', 'Right Middle Lobe', 'Right Lower Lobe', 'Left Upper Lobe', 'Left Lower Lobe', 'Alveoli'],
  },
  {
    id: 'trachea',
    name: 'Trachea',
    nameHindi: 'श्वासनली',
    nameLatin: 'Trachea',
    fileId: 'FJ2541',
    conceptId: 'FMA7195',
    system: 'Respiratory',
    volume_cm3: 25.6,
    description: 'The trachea (windpipe) is a cartilaginous tube that connects the larynx to the bronchi of the lungs.',
    function: 'Conducts air between the larynx and the lungs.',
    location: 'Midline of the neck and superior mediastinum',
    color: '#3498DB',
    highlightColor: '#5DADE2',
    position: [0, 0.48, 0.12],
    scale: [0.035, 0.1, 0.035],
    relatedStructures: ['lungs', 'larynx', 'bronchi'],
    subStructures: ['Cervical Trachea', 'Thoracic Trachea', 'Cartilaginous Rings', 'Carina'],
  },

  // === DIGESTIVE SYSTEM ===
  {
    id: 'liver',
    name: 'Liver',
    nameHindi: 'यकृत',
    nameLatin: 'Hepar',
    fileId: 'FJ2820',
    conceptId: 'FMA7197',
    system: 'Digestive',
    volume_cm3: 1500.0,
    description: 'The liver is the largest internal organ, performing over 500 vital functions including detoxification, protein synthesis, and bile production.',
    function: 'Detoxification, metabolism, bile production, glycogen storage, blood protein synthesis.',
    location: 'Right upper quadrant of the abdomen, beneath the diaphragm',
    color: '#8E44AD',
    highlightColor: '#BB8FCE',
    position: [0.1, 0.05, 0.08],
    scale: [0.18, 0.1, 0.12],
    relatedStructures: ['gallbladder', 'stomach', 'pancreas'],
    subStructures: ['Right Lobe', 'Left Lobe', 'Caudate Lobe', 'Quadrate Lobe', 'Portal Vein', 'Hepatic Artery'],
  },
  {
    id: 'stomach',
    name: 'Stomach',
    nameHindi: 'आमाशय',
    nameLatin: 'Ventriculus',
    fileId: 'FJ2564',
    conceptId: 'FMA7148',
    system: 'Digestive',
    volume_cm3: 562.8,
    description: 'The stomach is a muscular organ that receives food from the esophagus and begins the digestion process using acid and enzymes.',
    function: 'Mechanical and chemical digestion of food, producing chyme for the small intestine.',
    location: 'Left upper quadrant of the abdomen, beneath the diaphragm',
    color: '#9B59B6',
    highlightColor: '#C39BD3',
    position: [-0.05, 0.08, 0.1],
    scale: [0.12, 0.09, 0.1],
    relatedStructures: ['esophagus', 'duodenum', 'liver'],
    subStructures: ['Fundus', 'Body', 'Antrum', 'Pylorus', 'Cardia', 'Greater Curvature', 'Lesser Curvature'],
  },
  {
    id: 'large_intestine',
    name: 'Large Intestine',
    nameHindi: 'बड़ी आंत',
    nameLatin: 'Intestinum crassum',
    fileId: 'FJ2567',
    conceptId: 'FMA7211',
    system: 'Digestive',
    volume_cm3: 945.4,
    description: 'The large intestine absorbs water and electrolytes from indigestible food matter and stores waste before excretion.',
    function: 'Water absorption, electrolyte absorption, and fecal formation.',
    location: 'Abdominopelvic cavity, surrounding the small intestine',
    color: '#8E44AD',
    highlightColor: '#A569BD',
    position: [0, -0.1, 0.05],
    scale: [0.22, 0.18, 0.1],
    relatedStructures: ['small_intestine', 'rectum'],
    subStructures: ['Ascending Colon', 'Transverse Colon', 'Descending Colon', 'Sigmoid Colon', 'Cecum', 'Appendix', 'Rectum'],
  },

  // === SKELETAL SYSTEM ===
  {
    id: 'skull',
    name: 'Skull',
    nameHindi: 'खोपड़ी',
    nameLatin: 'Cranium',
    fileId: 'FJ3259',
    conceptId: 'FMA46560',
    system: 'Skeletal',
    volume_cm3: 1250.0,
    description: 'The skull is a bony structure that forms the head, enclosing and protecting the brain while forming the facial skeleton.',
    function: 'Protection of the brain, housing sense organs, and providing attachment points for facial muscles.',
    location: 'Superior end of the vertebral column',
    color: '#E8E0D0',
    highlightColor: '#FDFEFE',
    position: [0, 0.78, 0],
    scale: [0.12, 0.13, 0.12],
    relatedStructures: ['cervical_spine', 'mandible'],
    subStructures: ['Frontal Bone', 'Parietal Bones', 'Temporal Bones', 'Occipital Bone', 'Mandible', 'Maxilla', 'Nasal Bones'],
  },
  {
    id: 'spine',
    name: 'Vertebral Column',
    nameHindi: 'मेरुदण्ड',
    nameLatin: 'Columna vertebralis',
    fileId: 'FJ3259',
    conceptId: 'FMA13478',
    system: 'Skeletal',
    volume_cm3: 480.0,
    description: 'The vertebral column (spine) consists of 33 vertebrae stacked in a curved column, forming the central axis of the skeleton.',
    function: 'Supports body weight, protects the spinal cord, and provides attachment for muscles and ribs.',
    location: 'Posterior midline of the trunk',
    color: '#E8E0D0',
    highlightColor: '#FDFEFE',
    position: [0, 0.1, -0.06],
    scale: [0.04, 0.55, 0.04],
    relatedStructures: ['skull', 'ribs', 'pelvis'],
    subStructures: ['7 Cervical Vertebrae (C1-C7)', '12 Thoracic Vertebrae (T1-T12)', '5 Lumbar Vertebrae (L1-L5)', 'Sacrum', 'Coccyx'],
  },
  {
    id: 'pelvis',
    name: 'Pelvis',
    nameHindi: 'श्रोणि',
    nameLatin: 'Pelvis',
    fileId: 'FJ3152',
    conceptId: 'FMA9578',
    system: 'Skeletal',
    volume_cm3: 625.0,
    description: 'The pelvis is a basin-shaped bony structure formed by the hip bones, sacrum, and coccyx, connecting the trunk to the lower limbs.',
    function: 'Supports body weight, protects pelvic organs, and provides attachment for lower limb muscles.',
    location: 'Inferior trunk, between the lumbar vertebrae and femora',
    color: '#E8E0D0',
    highlightColor: '#FDFEFE',
    position: [0, -0.2, 0],
    scale: [0.2, 0.12, 0.12],
    relatedStructures: ['spine', 'femur', 'hip_joint'],
    subStructures: ['Ilium', 'Ischium', 'Pubis', 'Sacrum', 'Acetabulum', 'Pubic Symphysis'],
  },
  {
    id: 'femur',
    name: 'Femur (Thigh Bone)',
    nameHindi: 'जाँघ की हड्डी',
    nameLatin: 'Femur',
    fileId: 'FJ3259',
    conceptId: 'FMA9611',
    system: 'Skeletal',
    volume_cm3: 497.0,
    description: 'The femur is the longest, heaviest, and strongest bone in the human body, forming the thigh.',
    function: 'Transmits body weight from pelvis to tibia, and serves as the site for major muscle attachments.',
    location: 'Thigh, between the hip and knee joints',
    color: '#E8E0D0',
    highlightColor: '#FDFEFE',
    position: [0.1, -0.4, 0],
    scale: [0.05, 0.25, 0.05],
    relatedStructures: ['pelvis', 'tibia', 'knee'],
    subStructures: ['Head of Femur', 'Neck of Femur', 'Greater Trochanter', 'Lesser Trochanter', 'Shaft', 'Medial Condyle', 'Lateral Condyle'],
  },
  {
    id: 'ribs',
    name: 'Ribcage',
    nameHindi: 'पसलियाँ',
    nameLatin: 'Costae',
    fileId: 'FJ3259',
    conceptId: 'FMA7272',
    system: 'Skeletal',
    volume_cm3: 350.0,
    description: 'The ribcage consists of 12 pairs of ribs that form a protective cage around the thoracic organs.',
    function: 'Protects the heart and lungs, supports respiratory mechanics, and provides muscle attachment points.',
    location: 'Thorax, encircling the thoracic cavity',
    color: '#E8E0D0',
    highlightColor: '#FDFEFE',
    position: [0, 0.3, 0],
    scale: [0.2, 0.25, 0.12],
    relatedStructures: ['spine', 'sternum', 'lungs'],
    subStructures: ['True Ribs (1-7)', 'False Ribs (8-10)', 'Floating Ribs (11-12)', 'Sternum', 'Costal Cartilage'],
  },

  // === NERVOUS SYSTEM ===
  {
    id: 'brain',
    name: 'Brain',
    nameHindi: 'मस्तिष्क',
    nameLatin: 'Encephalon',
    fileId: 'FJ1781',
    conceptId: 'FMA50801',
    system: 'Nervous',
    volume_cm3: 1300.0,
    description: 'The brain is the central organ of the nervous system, controlling cognition, emotion, sensory processing, and motor function.',
    function: 'Higher cognitive functions, motor control, sensory integration, autonomic regulation, and homeostasis.',
    location: 'Within the cranial cavity of the skull',
    color: '#F39C12',
    highlightColor: '#F8C471',
    position: [0, 0.78, 0],
    scale: [0.11, 0.1, 0.12],
    relatedStructures: ['spinal_cord', 'skull', 'cranial_nerves'],
    subStructures: ['Cerebrum', 'Cerebellum', 'Brainstem', 'Thalamus', 'Hypothalamus', 'Frontal Lobe', 'Parietal Lobe', 'Temporal Lobe', 'Occipital Lobe'],
  },
  {
    id: 'spinal_cord',
    name: 'Spinal Cord',
    nameHindi: 'मेरुरज्जु',
    nameLatin: 'Medulla spinalis',
    fileId: 'FJ1782',
    conceptId: 'FMA7647',
    system: 'Nervous',
    volume_cm3: 30.0,
    description: 'The spinal cord is the main conduit for information between the brain and the rest of the body.',
    function: 'Conducts sensory and motor nerve impulses between brain and periphery; mediates spinal reflexes.',
    location: 'Within the vertebral canal of the vertebral column',
    color: '#F39C12',
    highlightColor: '#F8C471',
    position: [0, 0.1, -0.04],
    scale: [0.025, 0.5, 0.025],
    relatedStructures: ['brain', 'spine', 'peripheral_nerves'],
    subStructures: ['Cervical Segments', 'Thoracic Segments', 'Lumbar Segments', 'Sacral Segments', 'Conus Medullaris', 'Cauda Equina'],
  },

  // === URINARY SYSTEM ===
  {
    id: 'kidneys',
    name: 'Kidneys',
    nameHindi: 'वृक्क (गुर्दे)',
    nameLatin: 'Renes',
    fileId: 'FJ3147',
    conceptId: 'FMA7203',
    system: 'Urinary',
    volume_cm3: 209.3,
    description: 'The kidneys are paired bean-shaped organs that filter blood, produce urine, and regulate fluid/electrolyte balance.',
    function: 'Blood filtration, urine production, hormone secretion (EPO, renin), and blood pressure regulation.',
    location: 'Retroperitoneal, posterior abdomen, at the level of T12-L3',
    color: '#F0B27A',
    highlightColor: '#F8C471',
    position: [0.12, 0.0, -0.05],
    scale: [0.08, 0.1, 0.07],
    relatedStructures: ['ureters', 'bladder', 'adrenal_glands'],
    subStructures: ['Cortex', 'Medulla', 'Renal Pelvis', 'Nephrons', 'Glomeruli', 'Collecting Ducts'],
  },
  {
    id: 'bladder',
    name: 'Urinary Bladder',
    nameHindi: 'मूत्राशय',
    nameLatin: 'Vesica urinaria',
    fileId: 'FJ3149',
    conceptId: 'FMA15900',
    system: 'Urinary',
    volume_cm3: 73.1,
    description: 'The urinary bladder is a hollow muscular organ that collects and stores urine from the kidneys before micturition.',
    function: 'Storage and controlled release of urine.',
    location: 'Pelvis, posterior to the pubic symphysis',
    color: '#F0B27A',
    highlightColor: '#F8C471',
    position: [0, -0.27, 0.1],
    scale: [0.08, 0.07, 0.08],
    relatedStructures: ['kidneys', 'ureters', 'urethra'],
    subStructures: ['Detrusor Muscle', 'Trigone', 'Ureteral Orifices', 'Neck', 'Internal Urethral Sphincter'],
  },

  // === ENDOCRINE SYSTEM ===
  {
    id: 'spleen',
    name: 'Spleen',
    nameHindi: 'तिल्ली',
    nameLatin: 'Lien',
    fileId: 'FJ2561',
    conceptId: 'FMA7196',
    system: 'Endocrine',
    volume_cm3: 112.0,
    description: 'The spleen filters blood, destroys old red blood cells, stores platelets, and mounts immune responses.',
    function: 'Blood filtration, immune response, red blood cell destruction, platelet storage.',
    location: 'Left upper quadrant of the abdomen, beneath the diaphragm',
    color: '#1ABC9C',
    highlightColor: '#48C9B0',
    position: [-0.15, 0.05, 0.0],
    scale: [0.09, 0.07, 0.07],
    relatedStructures: ['liver', 'stomach', 'pancreas'],
    subStructures: ['Red Pulp', 'White Pulp', 'Splenic Capsule', 'Trabeculae', 'Splenic Artery'],
  },
  {
    id: 'pancreas',
    name: 'Pancreas',
    nameHindi: 'अग्न्याशय',
    nameLatin: 'Pancreas',
    fileId: 'FJ2564',
    conceptId: 'FMA7198',
    system: 'Endocrine',
    volume_cm3: 85.0,
    description: 'The pancreas is a glandular organ with both exocrine (digestive enzymes) and endocrine (insulin, glucagon) functions.',
    function: 'Produces digestive enzymes and hormones (insulin, glucagon) regulating blood sugar.',
    location: 'Retroperitoneal, behind the stomach, in the curve of the duodenum',
    color: '#1ABC9C',
    highlightColor: '#48C9B0',
    position: [-0.05, 0.0, 0.02],
    scale: [0.14, 0.04, 0.04],
    relatedStructures: ['liver', 'duodenum', 'spleen'],
    subStructures: ['Head', 'Body', 'Tail', 'Islets of Langerhans', 'Acinar Cells', 'Pancreatic Duct'],
  },

  // === MUSCULAR SYSTEM ===
  {
    id: 'diaphragm',
    name: 'Diaphragm',
    nameHindi: 'मध्यच्छद',
    nameLatin: 'Diaphragma',
    fileId: 'FJ1451M',
    conceptId: 'FMA13176',
    system: 'Muscular',
    volume_cm3: 180.0,
    description: 'The diaphragm is the primary muscle of respiration, a dome-shaped sheet of muscle separating the thorax from the abdomen.',
    function: 'Primary muscle of inhalation; also assists in exhalation, defecation, and childbirth.',
    location: 'Between the thoracic and abdominal cavities',
    color: '#C0392B',
    highlightColor: '#E74C3C',
    position: [0, 0.13, 0],
    scale: [0.22, 0.03, 0.14],
    relatedStructures: ['lungs', 'heart', 'liver'],
    subStructures: ['Central Tendon', 'Sternal Part', 'Costal Part', 'Lumbar Part', 'Aortic Hiatus', 'Esophageal Hiatus'],
  },
  {
    id: 'biceps',
    name: 'Biceps Brachii',
    nameHindi: 'द्विशिर पेशी',
    nameLatin: 'Musculus biceps brachii',
    fileId: 'FJ1500',
    conceptId: 'FMA37670',
    system: 'Muscular',
    volume_cm3: 210.0,
    description: 'The biceps brachii is a two-headed muscle located on the anterior aspect of the upper arm.',
    function: 'Flexion of the elbow and forearm supination.',
    location: 'Anterior compartment of the upper arm',
    color: '#C0392B',
    highlightColor: '#E74C3C',
    position: [0.22, 0.28, 0.05],
    scale: [0.05, 0.15, 0.05],
    relatedStructures: ['humerus', 'radius'],
    subStructures: ['Long Head', 'Short Head', 'Bicipital Aponeurosis'],
  },
];

// Flatten to id-based map for fast lookup
export const ANATOMY_MAP: Record<string, AnatomicalStructure> = Object.fromEntries(
  ANATOMY_STRUCTURES.map(s => [s.id, s])
);

// Get all structures for a specific system
export function getStructuresBySystem(system: AnatomicalSystem): AnatomicalStructure[] {
  return ANATOMY_STRUCTURES.filter(s => s.system === system);
}

// Search structures by text
export function searchStructures(query: string): AnatomicalStructure[] {
  const q = query.toLowerCase().trim();
  if (!q) return ANATOMY_STRUCTURES;
  return ANATOMY_STRUCTURES.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.nameHindi.includes(q) ||
    s.nameLatin.toLowerCase().includes(q) ||
    s.system.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q)
  );
}

export const ALL_SYSTEMS: AnatomicalSystem[] = [
  'Skeletal', 'Muscular', 'Cardiovascular', 'Nervous',
  'Respiratory', 'Digestive', 'Urinary', 'Endocrine', 'Integumentary', 'Reproductive'
];
