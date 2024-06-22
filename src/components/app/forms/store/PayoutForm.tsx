import { Form } from "nexious-library";

interface Amount {
  amount: string;
}
interface Payout {
  onSubmit: (value: Amount) => void;
  max: number;
  min: number;
}
const PayoutForm = ({ onSubmit, max, min }: Payout) => {
  return (
    <Form
      theme="form-center"
      initialValues={{ amount: "" }}
      labels={{ amount: "Amount" }}
      types={{ amount: "price-dollars-cents" }}
      schema={{ count: { amount: { max, min } }, require: ["amount"] }}
      onSubmit={(data: Amount) => onSubmit(data)}
    />
  );
};

export default PayoutForm;
