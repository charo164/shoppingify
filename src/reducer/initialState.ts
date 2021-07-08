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
        name: 'Avocado',
        note: 'Nutrient-dense foods are those that provide substantial amounts of vitamins, minerals and other nutrients with relatively few calories. One-third of a medium avocado (50 g) has 80 calories and contributes nearly 20 vitamins and minerals, making it a great nutrient-dense food choice. ',
        img: '/items/avocado.jpg',
        emoji: '🥑',
        pcs: 0,
      },
      {
        name: 'Banana',
        note: 'Each banana has only about 105 calories and consists almost exclusively of water and carbs. Bananas hold very little protein and almost no fat.',
        img: '/items/banana.webp',
        emoji: '🍌',
        pcs: 0,
      },
      {
        name: 'carrots',
        note: 'The nutrition facts for two small-to-medium raw carrots (100 grams) are: Calories: 41. Water: 88%',
        img: '/items/carrot.webp',
        emoji: '🥕',
        pcs: 0,
      },
      {
        name: 'Watermelon',
        note: "Watermelon. A medium wedge of this summer treat has 17 grams of sugar. As its name suggests, it's loaded with water, and it has special minerals called electrolytes that are just what your body needs to recharge after some time in the sun. Just keep it to a slice or two.",
        img: '/items/watermelon.jpg',
        emoji: '🍉',
        pcs: 0,
      },
      {
        name: 'Apple',
        note: 'Apples are high in fiber, vitamin C, and various antioxidants. They are also very filling, considering their low calorie count. Studies show that eating apples can have multiple benefits for your healt',
        img: '/items/apple.png',
        emoji: '🍎',
        pcs: 0,
      },
    ],
    'Meat and Fish': [
      {
        name: 'Chicken leg box ',
        note: "Per 3.5 ounces (100 grams), chicken drumsticks have 172 calories, 28.3 grams of protein and 5.7 grams of fat (4). When it comes to calorie count, about 70% come from protein while 30% come from fat. One chicken drumstick has 76 calories, or 172 calories per 3.5 ounces (100 grams). It's 70% protein and 30% fat",
        img: '/items/legBox.jpg',
        emoji: '🍗',
        pcs: 0,
      },
      { name: 'Chicken 1kg ', note: '', img: '/items/chicken1kg.jpg', emoji: '🐓', pcs: 0 },
      {
        name: 'Pork fillets 450g',
        note: '',
        img: '/items/porkFillet.jpeg',
        emoji: '🥩',
        pcs: 0,
      },
      { name: 'Salmon 1kg', note: '', img: '/items/salmon.jpeg', emoji: '🐟', pcs: 0 },
    ],
    Beverages: [
      { name: 'Tea', note: '', img: '/items/tea.jpg', emoji: '🍵', pcs: 0 },
      { name: 'Beer', note: '', img: '/items/beer.webp', emoji: '🍺', pcs: 0 },
    ],
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
