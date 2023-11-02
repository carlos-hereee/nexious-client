export const toggleMenuItemLogin = (menu, accessToken) => {
  // find auth menu item
  const idx = menu.findIndex((m) => m.isPrivate);
  const { alternatives, active } = menu[idx];
  const alt = alternatives.filter((alt) => alt.menuItemId !== active.menuItemId)[0];

  // access grandted and menu is stuck on login
  if (accessToken && active.name === "login") {
    // swap memu items
    menu[idx].active = alt;
    // menu[idx].name = alt.name;
  }
  // access denied and menu stuck on dashboard
  if (!accessToken && active.name === "dashboard") {
    menu[idx].active = alt;
    // menu[idx].name = alt.name;
  }
  return { altMenu: menu, idx };
};
