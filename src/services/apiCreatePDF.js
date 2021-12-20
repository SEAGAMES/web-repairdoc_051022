import pdfMake from "pdfmake";
import pdfFonts from "../assets/Font/Sarabun/Sarabun-fonts";
import axios from "axios";
import { apiConvertImg } from "../services/constants";
// import { invoiceTemplat } from "../services/invoice"





const createPDF = async (PdfForm) => {
    let docDefinition = PdfForm;
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      // download default Roboto font from cdnjs.com
      // Roboto: {
      //   normal:
      //     "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
      //   bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
      //   italics:
      //     "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
      //   bolditalics:
      //     "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
      // },
      Sarabun: {
        normal: "Sarabun-Regular.ttf",
        bold: "Sarabun-Medium.ttf",
        italics: "Sarabun-Italic.ttf",
        bolditalics: "Sarabun-MediumItalic.ttf",
      },
    };
    await pdfMake.createPdf(docDefinition).open();
  }

  const convertImg = async(data) => {
    console.log('Backend', data)
    const result = await axios.post(apiConvertImg, { UrlIMG : data});
    return result.data.result;
  }



  export default {createPDF, convertImg}