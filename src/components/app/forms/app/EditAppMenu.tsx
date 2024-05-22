import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button, CopyButton, Form, ItemDetail, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { MenuProp, StringObjProp } from "app-types";
import { formatAppMenuValues } from "@formatters/formatInitialFormValues";
import { hints } from "@data/nexious.json";
import { homeUrl } from "@config";

const EditAppMenu = () => {
  const { appMenuForm, iconList, deleteMenuItem, editMenuItem } = useContext(AdminContext);
  const { isLoading, appName, menu, appId } = useContext(AppContext);
  const { desiredOrder } = appMenuForm;

  const [initialValues, setInitialValues] = useState(formatAppMenuValues({ values: menu[0], desiredOrder }));
  const [activeMenu, setActiveMenu] = useState(menu[0]);

  const handleClick = (menuItem: MenuProp) => {
    const menuInitialValue = formatAppMenuValues({ values: menuItem, desiredOrder });
    setInitialValues(menuInitialValue);
    setActiveMenu(menuItem);
  };
  if (isLoading || !activeMenu || !activeMenu.uid) return <Loading message="Loading app menu data" />;

  return (
    <div className="primary-container">
      <h2 className="heading">Editing app menu: {appName}</h2>
      <div className="g-center">
        <div />
        <div className="container">
          <ItemDetail label="Menu page name:" labelLayout="bolden" hint={hints.appMenuButton}>
            <div className="flex-row">
              {menu.map((m) => (
                <Button
                  key={m.uid}
                  onClick={() => handleClick(m)}
                  theme={activeMenu.uid === m.uid ? `btn-active highlight` : `highlight`}
                  label={m.label}
                />
              ))}
            </div>
          </ItemDetail>
          {activeMenu.value ? (
            <>
              <ItemDetail label="Page url:" labelLayout="bolden" hint={hints.appMenuUrlDontMatch}>
                <CopyButton data={homeUrl + activeMenu.link} />
              </ItemDetail>
              <ItemDetail label="Category:" labelLayout="bolden">
                {activeMenu.category}
              </ItemDetail>
              <Form
                initialValues={initialValues}
                labels={appMenuForm.labels}
                placeholders={appMenuForm.placeholders}
                types={appMenuForm.types}
                fieldHeading={appMenuForm.fieldHeading}
                dataList={{ icon: iconList }}
                onSubmit={(values: StringObjProp) => editMenuItem(appId, activeMenu.uid, values)}
                submitLabel="Save and continue"
              />
            </>
          ) : (
            <ItemDetail label="Something went wrong:" labelLayout="bolden" hint={hints.appMenuRemoveButton}>
              <Button label="Remove from menu" onClick={() => deleteMenuItem(appId, activeMenu.uid)} />
            </ItemDetail>
          )}
        </div>
        <div />
      </div>
    </div>
  );
};
export default EditAppMenu;
