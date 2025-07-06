import { ServiceCategory, Service, ServiceProvider } from '../types';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'home-services',
    name: 'Home Services',
    description: 'Professional home maintenance and cleaning services',
    icon: '🏠',
    services: [
      {
        id: 'cleaning',
        name: 'House Cleaning',
        description: 'Professional residential and commercial cleaning services',
        category: {} as ServiceCategory,
        price: { min: 5000, max: 25000, currency: 'XAF', type: 'fixed' },
        duration: 120,
        image: '/api/placeholder/300/200?text=Cleaning'
      },
      {
        id: 'plumbing',
        name: 'Plumbing',
        description: 'Expert plumbing repairs and installations',
        category: {} as ServiceCategory,
        price: { min: 8000, max: 50000, currency: 'XAF', type: 'quote' },
        duration: 90,
        image: '/api/placeholder/300/200?text=Plumbing'
      },
      {
        id: 'electrical',
        name: 'Electrical Repairs',
        description: 'Safe and reliable electrical repairs and installations',
        category: {} as ServiceCategory,
        price: { min: 10000, max: 40000, currency: 'XAF', type: 'quote' },
        duration: 60,
        image: '/api/placeholder/300/200?text=Electrical'
      },
      {
        id: 'carpentry',
        name: 'Carpentry',
        description: 'Custom woodwork and furniture repairs',
        category: {} as ServiceCategory,
        price: { min: 15000, max: 80000, currency: 'XAF', type: 'quote' },
        duration: 180,
        image: '/api/placeholder/300/200?text=Carpentry'
      }
    ]
  },
  {
    id: 'personal-services',
    name: 'Personal Services',
    description: 'Beauty, wellness, and personal care services',
    icon: '💆',
    services: [
      {
        id: 'hairdressing',
        name: 'Hairdressing',
        description: 'Professional hair styling and treatment at home',
        category: {} as ServiceCategory,
        price: { min: 3000, max: 15000, currency: 'XAF', type: 'fixed' },
        duration: 90,
        image: '/api/placeholder/300/200?text=Hairdressing'
      },
      {
        id: 'makeup',
        name: 'Makeup Services',
        description: 'Professional makeup for events and special occasions',
        category: {} as ServiceCategory,
        price: { min: 8000, max: 35000, currency: 'XAF', type: 'fixed' },
        duration: 60,
        image: '/api/placeholder/300/200?text=Makeup'
      },
      {
        id: 'massage',
        name: 'Home Massage',
        description: 'Relaxing massage therapy in your home',
        category: {} as ServiceCategory,
        price: { min: 12000, max: 30000, currency: 'XAF', type: 'hourly' },
        duration: 60,
        image: '/api/placeholder/300/200?text=Massage'
      },
      {
        id: 'personal-training',
        name: 'Personal Training',
        description: 'Custom fitness training sessions',
        category: {} as ServiceCategory,
        price: { min: 15000, max: 25000, currency: 'XAF', type: 'hourly' },
        duration: 60,
        image: '/api/placeholder/300/200?text=Fitness'
      }
    ]
  },
  {
    id: 'repair-maintenance',
    name: 'Repair & Maintenance',
    description: 'Device repairs and maintenance services',
    icon: '🔧',
    services: [
      {
        id: 'phone-repair',
        name: 'Mobile Phone Repair',
        description: 'Fast and reliable smartphone repairs',
        category: {} as ServiceCategory,
        price: { min: 5000, max: 30000, currency: 'XAF', type: 'quote' },
        duration: 45,
        image: '/api/placeholder/300/200?text=Phone+Repair'
      },
      {
        id: 'computer-repair',
        name: 'Computer Repair',
        description: 'Laptop and desktop computer repairs',
        category: {} as ServiceCategory,
        price: { min: 10000, max: 50000, currency: 'XAF', type: 'quote' },
        duration: 120,
        image: '/api/placeholder/300/200?text=Computer+Repair'
      },
      {
        id: 'appliance-repair',
        name: 'Appliance Repair',
        description: 'Repair services for home appliances',
        category: {} as ServiceCategory,
        price: { min: 8000, max: 40000, currency: 'XAF', type: 'quote' },
        duration: 90,
        image: '/api/placeholder/300/200?text=Appliance+Repair'
      }
    ]
  },
  {
    id: 'business-support',
    name: 'Business Support',
    description: 'Professional services for small businesses',
    icon: '💼',
    services: [
      {
        id: 'graphic-design',
        name: 'Graphic Design',
        description: 'Creative design services for your business',
        category: {} as ServiceCategory,
        price: { min: 20000, max: 100000, currency: 'XAF', type: 'quote' },
        duration: 240,
        image: '/api/placeholder/300/200?text=Graphic+Design'
      },
      {
        id: 'social-media',
        name: 'Social Media Management',
        description: 'Professional social media management services',
        category: {} as ServiceCategory,
        price: { min: 50000, max: 200000, currency: 'XAF', type: 'quote' },
        duration: 480,
        image: '/api/placeholder/300/200?text=Social+Media'
      },
      {
        id: 'admin-support',
        name: 'Administrative Support',
        description: 'Professional administrative assistance',
        category: {} as ServiceCategory,
        price: { min: 3000, max: 8000, currency: 'XAF', type: 'hourly' },
        duration: 60,
        image: '/api/placeholder/300/200?text=Admin+Support'
      }
    ]
  }
];

// Update service categories references
serviceCategories.forEach(category => {
  category.services.forEach(service => {
    service.category = category;
  });
});

export const cities = [
  'Douala',
  'Yaoundé',
  'Bamenda',
  'Bafoussam',
  'Garoua',
  'Maroua',
  'Ngaoundéré',
  'Bertoua',
  'Ebolowa',
  'Kumba'
];

export const paymentMethods = [
  { id: 'mtn_money', name: 'MTN Mobile Money', icon: '📱' },
  { id: 'orange_money', name: 'Orange Money', icon: '📱' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'cash', name: 'Cash on Delivery', icon: '💵' }
];