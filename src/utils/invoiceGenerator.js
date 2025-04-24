import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export const generateBookingInvoice = async (bookingDetails) => {
  const { service, cleaner, customer, price, date } = bookingDetails;

  const htmlContent = `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h2 { text-align: center; color: #007BFF; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #007BFF; color: white; }
        .invoice-container { padding: 20px; border: 2px solid #ddd; border-radius: 10px; }
        .total-price { font-size: 18px; font-weight: bold; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <h2>Cleanzee</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Customer:</strong> ${customer}</p>
        <p><strong>Cleaner:</strong> ${cleaner}</p>

        <table>
          <tr>
            <th>Service</th>
            <th>Price</th>
          </tr>
          <tr>
            <td>${service}</td>
            <td>RM ${price}</td>
          </tr>
        </table>

        <p class="total-price">Total: RM ${price}</p>
      </div>
    </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    return uri;
  } catch (e) {
    console.error("Error generating invoice:", e);
  }
};
