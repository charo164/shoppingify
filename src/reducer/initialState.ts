import { stateType } from '@/types';

const initialState: stateType = {
  loadingState: true,
  sidebarToggled: true,
  sideBar: 'items',
  searchContent: '',
  cartCount: 0,
  shopCategories: {
    'Fruit and vegetables': [
      {
        name: 'Avocado ',
        note: 'Nutrient-dense foods are those that provide substantial amounts of vitamins, minerals and other nutrients with relatively few calories. One-third of a medium avocado (50 g) has 80 calories and contributes nearly 20 vitamins and minerals, making it a great nutrient-dense food choice. ',
        img: '',
        emoji: '🥑',
        pcs: 0,
      },
      { name: 'Banana ', note: '', img: '/', emoji: '🍌', pcs: 0 },
      { name: 'carrots ', note: '', img: '/', emoji: '🥕', pcs: 0 },
      { name: 'Watermelon ', note: '', img: '/', emoji: '🍉', pcs: 0 },
    ],
    'Meat and Fish': [
      { name: 'Chicken leg box ', note: '', img: '/', emoji: '🍗', pcs: 0 },
      { name: 'Chicken 1kg ', note: '', img: '/', emoji: '🐓', pcs: 0 },
      { name: 'Pork fillets 450g', note: '', img: '/', emoji: '🥩', pcs: 0 },
      { name: 'Salmon 1kg', note: '', img: '/', emoji: '🐟', pcs: 0 },
    ],
    Beverages: [{ name: 'Tea', note: '', img: '/', emoji: '🍵', pcs: 0 }],
    Pets: [],
  },
  shoppingCart: {
    'Fruit and vegetables': [],
    'Meat and Fish': [],
    Beverages: [],
    Pets: [],
  },
  savedLists: [],
  draft: '',
};

export { initialState };
