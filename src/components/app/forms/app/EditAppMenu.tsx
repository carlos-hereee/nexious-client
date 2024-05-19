import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button, Form, ItemDetail, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { MenuProp } from "app-types";
import { AuthContext } from "@context/auth/AuthContext";
import { formatAppMenuValues } from "@formatters/formatInitialFormValues";

const EditAppMenu = () => {
  const { appMenuForm } = useContext(AdminContext);
  const { isLoading, appName, menu } = useContext(AppContext);
  const { theme } = useContext(AuthContext);
  const { desiredOrder } = appMenuForm;

  const [initialValues, setInitialValues] = useState(formatAppMenuValues({ values: menu[0], desiredOrder }));
  const [activeMenu, setActiveMenu] = useState(menu[0]);
  // console.log("menu :>> ", menu);

  // const initialValues = ;
  const handleClick = (menuItem: MenuProp) => {
    const menuInitialValue = formatAppMenuValues({ values: menuItem, desiredOrder });
    console.log("menuInitialValue :>> ", menuInitialValue);
    setActiveMenu(menuItem);
  };
  console.log("initialValues :>> ", initialValues);
  // const formDataList = { language: languageList, locale: languageList, icon: iconList, theme: themeList };
  if (isLoading || !activeMenu.uid) return <Loading message="Loading app menu data" />;
  return (
    <div className="primary-container">
      <h2 className="heading">Editing app menu: {appName}</h2>
      <div className="g-center">
        <div />
        <div>
          <ItemDetail label="Menu item">
            <div className="flex-row">
              {menu.map((m) => (
                <Button
                  key={m.uid}
                  onClick={() => handleClick(m)}
                  theme={activeMenu.uid === m.uid ? `${theme} highlight` : `alt-${theme} highlight`}
                  label={m.label || "no value"}
                />
              ))}
            </div>
          </ItemDetail>
          <Form
            initialValues={initialValues}
            labels={appMenuForm.labels}
            placeholders={appMenuForm.placeholders}
            types={appMenuForm.types}
            fieldHeading={appMenuForm.fieldHeading}
            onSubmit={(values: MenuProp) => console.log("values", values)}
            submitLabel="Save and continue"
            theme="flex-center"
          />
        </div>
        <div />
      </div>
    </div>
  );
};
export default EditAppMenu;
