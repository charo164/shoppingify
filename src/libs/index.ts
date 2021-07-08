import { itemsType, listType, shopCategoriesType, sweetAlertType } from '@/types';
import { toast } from 'react-toastify';

export const isValidName = (name) => !(!name || name.length < 2);

const organismItems = (shoppingCart: shopCategoriesType) => {
  const values: itemsType[] = Object.values(shoppingCart).reduce((p, c, i) => p.concat(c));
  if (!values?.length) return { count: 0, items: [] };
  const items = { count: values.length, items: [] };
  const shortItems = {};
  values.forEach((item) => {
    if (!shortItems[item.name]) shortItems[item.name] = [item];
    else shortItems[item.name].push(item);
  });
  items.items = Object.keys(shortItems).map((name) => ({
    name,
    count: shortItems[name].length,
  }));
  return items;
};

export const countItems = (data: shopCategoriesType | listType[]) => {
  if (!data) return { count: 0, items: [] };
  if (Array.isArray(data)) {
    const count = { total: 0, items: [] };
    data.map((list, index) => {
      if (index === 0) {
        count.items = organismItems(list.content).items;
        count.total = organismItems(list.content).count;
      } else {
        organismItems(list.content).items.forEach((item) => {
          const isItem: any = count.items.filter((item2) => item.name === item2.name);
          if (isItem.length) {
            const newItems = count.items.filter((item2) => item.name !== item2.name);
            isItem[0].count += item.count;
            count.total += isItem[0].count;
            newItems.push(isItem[0]);
            count.items = newItems;
          } else {
            count.items.push(item);
            count.total += item.count;
          }
        });
      }
    });

    return count;
  } else {
    return organismItems(data);
  }
};

export const convertShoppingCart = (shoppingCart) => {
  if (!shoppingCart) return;
  return Object.keys(shoppingCart).map((name) => ({
    name,
    items: shoppingCart[name],
  }));
};

export const countCategories = (savedLists: listType[]) => {
  const categoriesCount = {
    'Fruit and vegetables': 0,
    'Meat and Fish': 0,
    Beverages: 0,
    Pets: 0,
  };

  savedLists.forEach((list) => {
    const categories = Object.keys(list.content);
    categories.forEach((category) => {
      if (list.content[category].length) {
        categoriesCount[category] += 1;
      }
    });
  });

  const categories = Object.keys(categoriesCount).map((category) => ({
    name: category,
    count: categoriesCount[category],
  }));

  const items: any = categories.filter((category) => category.count);
  if (!items.length) return { total: 0, items: [] };
  if (items.length === 1) return { total: items[0].count, items };

  const total = items.reduce((p, c, i) => {
    if (i === 1) return p.count + c.count;
    return p + c.count;
  });

  return { items, total };
};

export const filterBySearchContent = (items: itemsType[], query: string) =>
  items.filter((item) => item.name.toLowerCase().search(query.toLowerCase()) !== -1);

export const getActivePath = (routerPath) => {
  let activePathLetters = routerPath.split('?')[0].split('/')[1].split('');
  activePathLetters.unshift('/');
  return activePathLetters.join('');
};

export const getItem = (items: itemsType[], name: string) =>
  items.filter((item) => item.name.toLowerCase() === name.toLowerCase());

export const sweetAlert: sweetAlertType = (msg, type, time) => {
  msg = msg.length > 32 ? msg.slice(0, 29) + '...' : msg;
  toast[type](msg, {
    position: 'bottom-center',
    autoClose: parseInt(time) * 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const getTopItems = (items: any[]) => items.sort((a, b) => b.count - a.count).slice(0, 3);

export const organizeByMonthAndYear = (savedLists: listType[]) => {
  if (!savedLists || !Array.isArray(savedLists) || !savedLists.length) return;
  const newSavedLists = {};
  savedLists.forEach((list) => {
    const date = new Date(list?.date);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();
    const formattedDate = `${month} ${year}`;

    if (formattedDate in newSavedLists) newSavedLists[formattedDate].push(list);
    else {
      newSavedLists[formattedDate] = [];
      newSavedLists[formattedDate].push(list);
    }
  });

  return Object.keys(newSavedLists)
    .map((date) => ({ date, list: newSavedLists[date].reverse() }))
    .reverse();
};

/**
 * COOKIE
 */
export const setCookie = (name, value) => {
  if (!window?.document) return;
  document.cookie = `${name}=${JSON.stringify(value)}`;
};

export const getCookie = (name) => {
  if (!window?.document || document.cookie.search(name) === -1) return;
  const cookies = document.cookie.split('; ');
  const cookie = cookies.filter((cookie) => cookie.search(name) != -1)[0];
  if (!cookie) return;
  let value = cookie.split('=')[1];
  try {
    value = JSON.parse(value);
    return value;
  } catch (error) {
    return value;
  }
};
