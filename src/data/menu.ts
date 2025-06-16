
export interface MenuItem {
  id: number;
  name: string;
  link: string;
}

import menuData from './json/menu.json';

type MenuJson = {
  mainMenu: MenuItem[];
  mobileMenu: MenuItem[];
};

const typedMenuData = menuData as MenuJson;

export const mainMenu: MenuItem[] = typedMenuData.mainMenu;
export const mobileMenu: MenuItem[] = typedMenuData.mobileMenu;
