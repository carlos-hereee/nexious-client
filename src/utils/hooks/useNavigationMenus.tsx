import { useEffect, useState } from "react";

interface NavigationMenus<I> {
  filterKey: string;
  items: I[];
}
interface NavigationReturn<I> {
  activeMenu: string;
  menus: string[];
  filteredItems: I[];
  updateActiveMenu: (m: string) => void;
}

export const useNavigationMenus = <T,>({ filterKey, items }: NavigationMenus<T>): NavigationReturn<T> => {
  const [activeMenu, setMenu] = useState<string>("");
  const [menus, setMenus] = useState<string[]>([]);
  const [filteredItems, setFiltered] = useState<T[]>([]);

  useEffect(() => {
    const navigationMenu = ["all", ...new Set(items.map((n) => n[filterKey]))];
    setMenus(navigationMenu);
    setMenu("all");
  }, []);

  useEffect(() => {
    if (items && items.length > 0) {
      if (activeMenu === "all") setFiltered(items);
      else {
        const filtered = items.filter((tier) => tier[filterKey] === activeMenu);
        setFiltered(filtered);
      }
    }
  }, [activeMenu, items]);

  const updateActiveMenu = (m: string) => setMenu(m);

  return { activeMenu, menus, filteredItems, updateActiveMenu };
};
