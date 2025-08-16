const paymentService = require("../Services/PaymentS");

const createPaymentLink = async (req, res) => {
  try {
    if (req.path === "/customize") {
      // ✅ Customize mode
      const { name, contact, email } = req.body;
      const paymentOrder = await paymentService.createPaymentLink(null, true, {
        name,
        contact,
        email
      });
      return res.status(200).send(paymentOrder);
    } else {
      // ✅ Normal order payment
      const { id } = req.params;
      const paymentOrder = await paymentService.createPaymentLink(id);
      return res.status(200).send(paymentOrder);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};

const updatePaymentInformation = async (req, res) => {
  try {
    await paymentService.updatePaymentInformation(req.query);
    return res.status(200).send({
      message: "Payment information updated",
      status: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation
};
