import { AdminContext } from "@context/admin/AdminContext";
import { useToggle } from "@hooks/useToggle";
import { Button, Form, Loading } from "nexious-library";
import { useContext, useEffect } from "react";
import { webhookForm } from "@data/forms.json";

const ViewWebhook = () => {
  const { webhooks, getWebhooks } = useContext(AdminContext);
  const { toggle, updateToggle } = useToggle();
  useEffect(() => {
    if (!webhooks) getWebhooks();
  }, [webhooks]);

  if (!webhooks) return <Loading />;
  const handleCreateWebhook = (val: any) => {
    console.log("val :>> ", val);
    updateToggle();
  };
  return (
    <div className="primary-container">
      <h1 className="heading">View webhooks</h1>
      {!toggle &&
        (webhooks.length > 0 ? (
          webhooks.map((webhook) => <p key={webhook.id}>WEbhooks</p>)
        ) : (
          <div className="container">
            <p>No webhook found</p>
            <Button label="Create first webhook" onClick={updateToggle} />
          </div>
        ))}
      {toggle && (
        <Form
          initialValues={webhookForm.initialValues}
          heading="Create webhook"
          labels={webhookForm.labels}
          dataList={webhookForm.dataList}
          types={webhookForm.types}
          onSubmit={handleCreateWebhook}
        />
      )}
    </div>
  );
};

export default ViewWebhook;
