// Mock Data for Smart Chemist – Online Ordering and Product Returns System
// Community Service Learning Project | School of Science and Technology

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    price: 150,
    stock: 120,
    availability: 'In Stock',
    packaging: 'Pack of 20 Tablets',
    supplier: 'Cosmos Pharmaceuticals',
    description: 'Fast-acting analgesic and antipyretic for relief of mild to moderate pain and fever.',
    iconType: 'pill',
    popular: true
  },
  {
    id: 'prod-002',
    name: 'Vitamin C Tablets',
    category: 'Vitamins & Supplements',
    price: 450,
    stock: 45,
    availability: 'In Stock',
    packaging: 'Bottle of 60 Chewables (1000mg)',
    supplier: 'Harleys Ltd',
    description: 'High-potency ascorbic acid antioxidant formula supporting immune health.',
    iconType: 'shield',
    popular: true
  },
  {
    id: 'prod-003',
    name: 'Cough Syrup',
    category: 'Respiratory',
    price: 320,
    stock: 28,
    availability: 'In Stock',
    packaging: '150ml Expectorant Bottle',
    supplier: 'Laborex Kenya',
    description: 'Relieves chesty coughs and loosens bronchial phlegm for comfortable breathing.',
    iconType: 'bottle',
    popular: true
  },
  {
    id: 'prod-004',
    name: 'Hand Sanitizer',
    category: 'First Aid & Hygiene',
    price: 200,
    stock: 75,
    availability: 'In Stock',
    packaging: '500ml Pump Bottle (70% Alcohol)',
    supplier: 'Omaera Pharmaceuticals',
    description: 'Hospital-grade antimicrobial instant hand rub enriched with moisturising aloe.',
    iconType: 'sparkles',
    popular: false
  },
  {
    id: 'prod-005',
    name: 'Amoxicillin Capsules',
    category: 'Antibiotics',
    price: 550,
    stock: 8,
    availability: 'Low Stock',
    packaging: 'Box of 21 Capsules (500mg)',
    supplier: 'Cosmos Pharmaceuticals',
    description: 'Broad-spectrum penicillin antibiotic for certified bacterial infections.',
    iconType: 'capsule',
    popular: true
  },
  {
    id: 'prod-006',
    name: 'Antiseptic Solution',
    category: 'First Aid & Hygiene',
    price: 380,
    stock: 35,
    availability: 'In Stock',
    packaging: '250ml Liquid Disinfectant',
    supplier: 'Laborex Kenya',
    description: 'Topical antiseptic cleansing solution for wounds, cuts, abrasions, and bites.',
    iconType: 'flask',
    popular: false
  },
  {
    id: 'prod-007',
    name: 'Allergy Relief Tablets',
    category: 'Respiratory',
    price: 280,
    stock: 60,
    availability: 'In Stock',
    packaging: 'Cetirizine 10mg (30 Tablets)',
    supplier: 'Harleys Ltd',
    description: 'Non-drowsy antihistamine for hay fever, allergic rhinitis, and hives.',
    iconType: 'sun',
    popular: true
  },
  {
    id: 'prod-008',
    name: 'First Aid Bandages',
    category: 'First Aid & Hygiene',
    price: 180,
    stock: 0,
    availability: 'Out of Stock',
    packaging: 'Pack of 50 Assorted Plasters',
    supplier: 'Omaera Pharmaceuticals',
    description: 'Breathable, sterile adhesive wound plasters for minor cuts and abrasions.',
    iconType: 'bandage',
    popular: false
  },
  {
    id: 'prod-009',
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    price: 240,
    stock: 55,
    availability: 'In Stock',
    packaging: 'Pack of 20 Tablets',
    supplier: 'Cosmos Pharmaceuticals',
    description: 'Non-steroidal anti-inflammatory drug (NSAID) for muscle ache and dental pain.',
    iconType: 'pill',
    popular: false
  },
  {
    id: 'prod-010',
    name: 'Zinc Lozenges 20mg',
    category: 'Vitamins & Supplements',
    price: 350,
    stock: 6,
    availability: 'Low Stock',
    packaging: 'Roll of 24 Citrus Lozenges',
    supplier: 'Harleys Ltd',
    description: 'Soothes throat irritation and boosts immune defenses at early symptom onset.',
    iconType: 'shield',
    popular: false
  },
  {
    id: 'prod-011',
    name: 'Omeprazole 20mg',
    category: 'Gastrointestinal',
    price: 480,
    stock: 40,
    availability: 'In Stock',
    packaging: 'Strip of 14 Gastro-Resistant Capsules',
    supplier: 'Cosmos Pharmaceuticals',
    description: 'Proton pump inhibitor for heartburn, acid reflux, and gastric discomfort.',
    iconType: 'capsule',
    popular: true
  },
  {
    id: 'prod-012',
    name: 'Digital Oral Thermometer',
    category: 'First Aid & Hygiene',
    price: 650,
    stock: 14,
    availability: 'In Stock',
    packaging: '1 Unit (Beep Alert & LCD)',
    supplier: 'Omaera Pharmaceuticals',
    description: 'Accurate 30-second digital fever temperature reader with protective case.',
    iconType: 'thermometer',
    popular: false
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-1001',
    customerName: 'Amina Muthoni',
    customerPhone: '+254 722 101 202',
    items: [
      { productId: 'prod-001', productName: 'Paracetamol 500mg', quantity: 2, price: 150 },
      { productId: 'prod-003', productName: 'Cough Syrup', quantity: 1, price: 320 }
    ],
    totalAmount: 620,
    date: '2026-10-27',
    status: 'Pending',
    notes: 'Please pack in a discreet paper bag. Customer will collect at 5:00 PM.'
  },
  {
    id: 'ORD-1002',
    customerName: 'Brian Otieno',
    customerPhone: '+254 733 456 789',
    items: [
      { productId: 'prod-002', productName: 'Vitamin C Tablets', quantity: 1, price: 450 },
      { productId: 'prod-007', productName: 'Allergy Relief Tablets', quantity: 1, price: 280 }
    ],
    totalAmount: 730,
    date: '2026-10-27',
    status: 'Confirmed',
    notes: 'Call on arrival for counter pickup.'
  },
  {
    id: 'ORD-1003',
    customerName: 'Grace Wanjiku',
    customerPhone: '+254 711 890 123',
    items: [
      { productId: 'prod-005', productName: 'Amoxicillin Capsules', quantity: 1, price: 550 },
      { productId: 'prod-006', productName: 'Antiseptic Solution', quantity: 1, price: 380 }
    ],
    totalAmount: 930,
    date: '2026-10-26',
    status: 'Completed',
    notes: 'Prescription slip presented and verified by staff pharmacist.'
  },
  {
    id: 'ORD-1004',
    customerName: 'David Kiprono',
    customerPhone: '+254 720 999 888',
    items: [
      { productId: 'prod-004', productName: 'Hand Sanitizer', quantity: 3, price: 200 },
      { productId: 'prod-001', productName: 'Paracetamol 500mg', quantity: 1, price: 150 }
    ],
    totalAmount: 750,
    date: '2026-10-26',
    status: 'Pending',
    notes: 'School first-aid kit replenishment items.'
  },
  {
    id: 'ORD-1005',
    customerName: 'Fatuma Hassan',
    customerPhone: '+254 714 555 444',
    items: [
      { productId: 'prod-011', productName: 'Omeprazole 20mg', quantity: 2, price: 480 },
      { productId: 'prod-009', productName: 'Ibuprofen 400mg', quantity: 1, price: 240 }
    ],
    totalAmount: 1200,
    date: '2026-10-25',
    status: 'Completed',
    notes: 'Regular customer order fulfilled.'
  },
  {
    id: 'ORD-1006',
    customerName: 'Kevin Mwangi',
    customerPhone: '+254 701 223 344',
    items: [
      { productId: 'prod-003', productName: 'Cough Syrup', quantity: 2, price: 320 }
    ],
    totalAmount: 640,
    date: '2026-10-25',
    status: 'Cancelled',
    notes: 'Customer requested cancellation due to duplicate order.'
  },
  {
    id: 'ORD-1007',
    customerName: 'Lillian Cherono',
    customerPhone: '+254 724 678 910',
    items: [
      { productId: 'prod-012', productName: 'Digital Oral Thermometer', quantity: 1, price: 650 },
      { productId: 'prod-001', productName: 'Paracetamol 500mg', quantity: 2, price: 150 }
    ],
    totalAmount: 950,
    date: '2026-10-24',
    status: 'Completed',
    notes: 'Includes infant dosage instruction leaflet.'
  },
  {
    id: 'ORD-1008',
    customerName: 'Dennis Ochieng',
    customerPhone: '+254 718 332 110',
    items: [
      { productId: 'prod-002', productName: 'Vitamin C Tablets', quantity: 2, price: 450 },
      { productId: 'prod-010', productName: 'Zinc Lozenges 20mg', quantity: 1, price: 350 }
    ],
    totalAmount: 1250,
    date: '2026-10-24',
    status: 'Confirmed',
    notes: 'Awaiting customer arrival at front desk.'
  },
  {
    id: 'ORD-1009',
    customerName: 'Zainab Abdalla',
    customerPhone: '+254 726 778 899',
    items: [
      { productId: 'prod-006', productName: 'Antiseptic Solution', quantity: 2, price: 380 }
    ],
    totalAmount: 760,
    date: '2026-10-23',
    status: 'Completed',
    notes: 'Collected during afternoon shift.'
  },
  {
    id: 'ORD-1010',
    customerName: 'Samuel Ndung’u',
    customerPhone: '+254 715 443 221',
    items: [
      { productId: 'prod-007', productName: 'Allergy Relief Tablets', quantity: 2, price: 280 },
      { productId: 'prod-004', productName: 'Hand Sanitizer', quantity: 1, price: 200 }
    ],
    totalAmount: 760,
    date: '2026-10-23',
    status: 'Pending',
    notes: 'Customer requested order verification sms.'
  }
];

export const INITIAL_RETURNS = [
  {
    id: 'RET-201',
    productName: 'Cough Syrup 150ml',
    category: 'Respiratory',
    quantity: 12,
    issueType: 'Expired',
    dateIdentified: '2026-10-24',
    expiryDate: '2026-09-30',
    description: 'Batch CS-8802 reached expiry while stored in back shelf. Quarantined immediately.',
    supplierName: 'Laborex Kenya',
    requestedAction: 'Return to supplier',
    status: 'Supplier Escalated'
  },
  {
    id: 'RET-202',
    productName: 'Amoxicillin Capsules 500mg',
    category: 'Antibiotics',
    quantity: 5,
    issueType: 'Damaged packaging',
    dateIdentified: '2026-10-25',
    expiryDate: '2027-04-15',
    description: 'Moisture ingress noticed on carton during supplier carton unboxing. Seal degraded.',
    supplierName: 'Cosmos Pharmaceuticals',
    requestedAction: 'Request replacement',
    status: 'Under Review'
  },
  {
    id: 'RET-203',
    productName: 'Vitamin C 1000mg Chewables',
    category: 'Vitamins & Supplements',
    quantity: 8,
    issueType: 'Incorrect quantity',
    dateIdentified: '2026-10-22',
    expiryDate: '2027-08-30',
    description: 'Invoice listed 50 bottles but carton contained only 42 bottles upon intake audit.',
    supplierName: 'Harleys Ltd',
    requestedAction: 'Request credit',
    status: 'Resolved'
  },
  {
    id: 'RET-204',
    productName: 'Antiseptic Solution 250ml',
    category: 'First Aid & Hygiene',
    quantity: 4,
    issueType: 'Damaged packaging',
    dateIdentified: '2026-10-20',
    expiryDate: '2027-11-20',
    description: 'Leaking cap thread caused 4 units to soil outer secondary packaging.',
    supplierName: 'Laborex Kenya',
    requestedAction: 'Request replacement',
    status: 'Resolved'
  },
  {
    id: 'RET-205',
    productName: 'Paracetamol 500mg Blister Packs',
    category: 'Pain Relief',
    quantity: 30,
    issueType: 'Expired',
    dateIdentified: '2026-10-18',
    expiryDate: '2026-10-15',
    description: 'Routine monthly pharmacy stock audit flagged batch PR-2024 expired last week.',
    supplierName: 'Cosmos Pharmaceuticals',
    requestedAction: 'Return to supplier',
    status: 'Supplier Escalated'
  },
  {
    id: 'RET-206',
    productName: 'Hand Sanitizer 500ml',
    category: 'First Aid & Hygiene',
    quantity: 10,
    issueType: 'Other',
    dateIdentified: '2026-10-16',
    expiryDate: '2028-01-10',
    description: 'Defective dispenser pump heads stuck on multiple bottles. Cannot be dispensed.',
    supplierName: 'Omaera Pharmaceuticals',
    requestedAction: 'Request replacement',
    status: 'Under Review'
  },
  {
    id: 'RET-207',
    productName: 'Allergy Relief 10mg',
    category: 'Respiratory',
    quantity: 6,
    issueType: 'Wrong product',
    dateIdentified: '2026-10-14',
    expiryDate: '2027-06-30',
    description: 'Supplier delivered 5mg pediatric formulation instead of ordered 10mg adult stock.',
    supplierName: 'Harleys Ltd',
    requestedAction: 'Return to supplier',
    status: 'Resolved'
  },
  {
    id: 'RET-208',
    productName: 'Omeprazole 20mg Capsules',
    category: 'Gastrointestinal',
    quantity: 15,
    issueType: 'Expired',
    dateIdentified: '2026-10-10',
    expiryDate: '2026-09-15',
    description: 'Batch OP-441 expired. Moved to safety disposal quarantine area.',
    supplierName: 'Cosmos Pharmaceuticals',
    requestedAction: 'Review required',
    status: 'Recorded'
  },
  {
    id: 'RET-209',
    productName: 'Digital Oral Thermometer',
    category: 'First Aid & Hygiene',
    quantity: 3,
    issueType: 'Other',
    dateIdentified: '2026-10-08',
    expiryDate: 'N/A',
    description: 'LCD display flickering and showing incorrect calibration reading upon test check.',
    supplierName: 'Omaera Pharmaceuticals',
    requestedAction: 'Request replacement',
    status: 'Under Review'
  },
  {
    id: 'RET-210',
    productName: 'Zinc Lozenges 20mg',
    category: 'Vitamins & Supplements',
    quantity: 7,
    issueType: 'Damaged packaging',
    dateIdentified: '2026-10-05',
    expiryDate: '2027-02-28',
    description: 'Crushed rolls sustained during supplier transit courier delivery.',
    supplierName: 'Harleys Ltd',
    requestedAction: 'Request credit',
    status: 'Resolved'
  }
];

export const INITIAL_SUPPLIER_REQUESTS = [
  {
    id: 'SR-501',
    supplierName: 'Laborex Kenya',
    product: 'Cough Syrup 150ml (Batch CS-8802)',
    quantity: 12,
    requestType: 'Physical Return',
    dateSubmitted: '2026-10-25',
    status: 'Pending',
    returnReferenceId: 'RET-201',
    notes: 'Awaiting supplier field agent inspection schedule. Policy specifies 14-day turnaround.',
    contactEmail: 'returns@laborex.co.ke'
  },
  {
    id: 'SR-502',
    supplierName: 'Cosmos Pharmaceuticals',
    product: 'Amoxicillin Capsules 500mg',
    quantity: 5,
    requestType: 'Batch Replacement',
    dateSubmitted: '2026-10-25',
    status: 'Submitted',
    returnReferenceId: 'RET-202',
    notes: 'Sent photo evidence of damaged blister packaging. Awaiting quality assurance approval.',
    contactEmail: 'qa-claims@cosmos-pharm.com'
  },
  {
    id: 'SR-503',
    supplierName: 'Harleys Ltd',
    product: 'Vitamin C 1000mg Chewables',
    quantity: 8,
    requestType: 'Credit Note',
    dateSubmitted: '2026-10-23',
    status: 'Approved',
    returnReferenceId: 'RET-203',
    notes: 'Credit note #CR-9921 issued against next monthly wholesale invoice.',
    contactEmail: 'accounts@harleysltd.com'
  },
  {
    id: 'SR-504',
    supplierName: 'Cosmos Pharmaceuticals',
    product: 'Paracetamol 500mg (Batch PR-2024)',
    quantity: 30,
    requestType: 'Physical Return',
    dateSubmitted: '2026-10-19',
    status: 'Approved',
    returnReferenceId: 'RET-205',
    notes: 'Collection driver scheduled for Tuesday morning shift pickup.',
    contactEmail: 'returns@cosmos-pharm.com'
  },
  {
    id: 'SR-505',
    supplierName: 'Omaera Pharmaceuticals',
    product: 'Hand Sanitizer 500ml (Pump Head Defect)',
    quantity: 10,
    requestType: 'Batch Replacement',
    dateSubmitted: '2026-10-17',
    status: 'Pending',
    returnReferenceId: 'RET-206',
    notes: 'Supplier technical rep investigating pump manufacturer mould defects.',
    contactEmail: 'support@omaera.co.ke'
  },
  {
    id: 'SR-506',
    supplierName: 'Harleys Ltd',
    product: 'Allergy Relief 10mg (Shipment Discrepancy)',
    quantity: 6,
    requestType: 'Physical Return',
    dateSubmitted: '2026-10-15',
    status: 'Completed',
    returnReferenceId: 'RET-207',
    notes: 'Correct formulation delivered and erroneous batch safely reclaimed.',
    contactEmail: 'returns@harleysltd.com'
  }
];

export const SUPPLIERS_LIST = [
  'Cosmos Pharmaceuticals',
  'Laborex Kenya',
  'Harleys Ltd',
  'Omaera Pharmaceuticals',
  'Universal Corporation',
  'Bayer East Africa'
];

export const CATEGORIES_LIST = [
  'All Categories',
  'Pain Relief',
  'Vitamins & Supplements',
  'Respiratory',
  'First Aid & Hygiene',
  'Antibiotics',
  'Gastrointestinal'
];

export const INITIAL_SETTINGS = {
  chemistName: 'Smart Chemist Community Pharmacy',
  businessLocation: 'Nairobi West Health Plaza, Suite 4B, Nairobi, Kenya',
  contactPhone: '+254 712 345 678',
  email: 'support@smartchemist.co.ke',
  currency: 'KES',
  operatingHours: 'Mon - Sat: 8:00 AM – 9:00 PM | Sun: 10:00 AM – 6:00 PM',
  notificationsEnabled: true,
  orderAlerts: true,
  returnAlerts: true,
  darkMode: false,
  academicProjectInfo: {
    title: 'Community Service Learning (CSL) Project',
    institution: 'School of Science and Technology',
    leadDept: 'Department of Computing & Information Technology',
    year: '2026 Prototype',
    disclaimer: 'This software is an educational prototype developed for academic evaluation. It uses simulated mock records only and is not connected to live pharmacy point-of-sale or official supplier settlement portals.'
  }
};
