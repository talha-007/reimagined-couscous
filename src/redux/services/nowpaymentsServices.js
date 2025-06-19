import { callAPi } from "./http-comman";

const generateInvoice = () => callAPi.post("/api/payments/invoice");

const nowPayments = {
  generateInvoice,
};

export default nowPayments;
