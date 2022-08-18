import pdfMake from "pdfmake";
import pdfFonts from "../assets/Font/Sarabun/Sarabun-fonts";
import axios from "axios";
import { apiConvertImg } from "../services/constants";
import JsBarcode from 'jsbarcode/bin/JsBarcode'
import moment from "moment";
// import { invoiceTemplat } from "../services/invoice"



const testNewprint = async (dataArr) => {
  const result = await axios.post('http://192.168.3.5:3000/pdf-mpp', dataArr);
  // console.log(result);
};





const testInsertImg = async (data) => {
  const Img = {
    imageBase64: data
  }
  const result = await axios.post('http://192.168.3.5:3000/test-insertImg', Img);
  return result.data;
}

const textToBase64Barcode = (text) => {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, text, { format: "CODE39" });
  return canvas.toDataURL("image/png");
}

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

const convertImg = async (data) => {
  // console.log('Backend', data)
  const result = await axios.post(apiConvertImg, { UrlIMG: data });
  return `data:image/jpeg;base64,${result.data.result}`;
}

const convertImgMppPrint = async (data) => {
  const result = await axios.post('http://192.168.3.5:3000/convertImgMppPrint', data);
  return result.data;
}

const printBillMaterial = async (data) => {
  const barcodeBill = textToBase64Barcode(data.Bill_ID);
  // console.log(barcodeBill)
  const logoHeader = await convertImg(
    "http://192.168.3.5:3000/picture/PICTURE2/Art%20Event%20Logo2.jpg"
  );
  const dataConvert = await convertImgMppPrint(data.product);
  // console.log("data : ", data);
  dataConvert.sort((a, b) =>
    a.ItemNo > b.ItemNo ? 1 : b.ItemNo > a.ItemNo ? -1 : 0
  );
  const borderColorHeader = ["#000000", "#000000", "#000000", "#000000"];

  var dataSumInv = [];
  dataSumInv.push([
    { text: "ลำดับที่", style: "bgColorHeaderPrintTable" },
    { text: "รหัสพลอย", style: "bgColorHeaderPrintTable" },

    { text: "จำนวน", style: "bgColorHeaderPrintTable" },
  ]);

  let dataBody = [
    [
      {
        text: "รายการที่",
        alignment: "center",
        rowSpan: 2,
        style: "bgColorHeaderPrintTable",
        borderColor: borderColorHeader,
        margin: [0, 10, 0, 0],
      },
      {
        text: "รหัสสินค้า",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        rowSpan: 2,
        borderColor: borderColorHeader,
        margin: [0, 10, 0, 0],
      },
      {
        text: "รายการพลอย",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        colSpan: 2,
        borderColor: borderColorHeader,
      },
      {},
    ],
    [
      {},
      {},
      {
        text: "รหัสพลอย",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "จำนวนที่โอน",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
    ],
  ];

  dataConvert.forEach((obj, index) => {
    var vertical_center = 24;
    // var vertical_center_pict = 0;
    // obj.stone.length == 1 ? vertical_center = 16 : vertical_center = (vertical_center * obj.stone.length) / 2  , vertical_center_pict = vertical_center - 15 ;
    obj.inventory.forEach((dataProduct, indexStone) => {
      dataBody.push([
        {
          text: obj.ItemNo,
          style: "text",
          alignment: "center",
          rowSpan: obj.inventory.length,
          margin: [0, vertical_center, 0, 0],
        }, // ItemNo
        {
          rowSpan: obj.inventory.length,
          stack: [
            {
              image: obj.PDFPict,
              alignment: "center",
              width: 60,
              style: "text",
            },
            {
              text: obj.ProductCode,
              alignment: "center",
              style: "text",
            },
            {
              text: obj.ProductID,
              alignment: "center",
              style: "text",
            },
          ],
        }, // รูป รหัสสินค้า
        {
          text: dataProduct.InvCode,
          alignment: "center",
          style: "text",
        }, // รหัสพลอย
        {
          text: dataProduct.SendQty.toLocaleString(),
          alignment: "center",
          style: "text",
        }, // จำนวนที่โอน
      ]);
    });
  });

  data.sumInv.forEach((dataSum, indexSumInv) => {
    dataSumInv.push([
      { text: indexSumInv + 1, style: "bgColorHeaderPrintTable2" },
      { text: dataSum.InvCode, style: "bgColorHeaderPrintTable2" },
      { text: dataSum.SumQty.toLocaleString(), style: "bgColorHeaderPrintTable2" },
    ]);
  });

  const docDefinition = {
    content: [
      //Header Logo และ JobNumber
      {
        columns: [
          {
            image: logoHeader,
            width: 150,
            alignment: "center",
          },

          { text: "", width: 230 },

          {
            table: {
              heights: [20, 5],
              body: [
                [
                  { text: "Barcode", alignment: "center", margin: [0, 10, 0, 0] },
                  { image: barcodeBill, height: 40, width: 80, alignment: "center" },
                ],

                [
                  {
                    text: `เลขที่เอกสาร :  ${data.BillNumber}  `,
                    colSpan: 2,
                    alignment: "center",
                    fontSize: 9,
                  },
                ],
              ],
            },
            alignment: "center",
          },
        ],
      },
      " ",
      " ",
      {
        columns: [
          {
            text: `ผู้ส่ง :  ${data.EmpNameSender}  `,
          },
        ],
      },
      {
        columns: [
          {
            text: `วันที่ส่ง :  ${moment(data.BillDate).format("L")}  `,
          },
        ],
      },
      {
        columns: [
          {
            text: `Order :  ${data.OrderNumber}  `,
          },
        ],
      },
      {
        columns: [
          {
            text: `Fac Team :  ${data.FactoryTeam}  `,
          },
        ],
      },
      " ",
      {
        table: {
          // headerRows: 2,
          // dontBreakRows:true,
          heights: [15, 15, 25, 25, 25, 25, 25, 25],
          widths: [30, 100, 100, 50],
          body: dataBody,
        },
      },
      " ",
      " ",
      " ",
      " ",
      {
        width: "*",
        table: {
          dontBreakRows: true,
          heights: [10, 10],
          widths: [30, 160, 99],
          body: dataSumInv,
        },
        alignment: "center",
      },
    ],
    defaultStyle: {
      font: "Sarabun",
    },
    styles: {
      fontTest: {
        font: "3OF9",
      },
      header: {
        fontSize: 24,
        bold: true,
        alignment: "center",
      },
      title: {
        fontSize: 14,
        bold: true,
        alignment: "left",
        margin: [0, 20, 0, 0],
      },
      textAlign: {
        fontSize: 12,
        alignment: "left",
        margin: [20, 0, 0, 0],
      },
      marginLeft: {
        margin: [20, 0, 0, 0],
      },
      text: {
        fontSize: 6,
      },
      bgColorHeaderPrintTable: {
        fillColor: "#E7FBBE",
        fontSize: 8,
        // bold: true,
        alignment: "center",
      },
      bgColorHeaderPrintTable2: {
        fillColor: "#FFFDDE",
        fontSize: 8,
        // bold: true,
        alignment: "center",
      },
    },
  };
  await createPDF(docDefinition);
};

const printReportRepairDoc = async (data) => {
  console.log(data);
  let rows = [
    [
      {
        text: "วันที่เเจ้ง",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
      {
        text: "ชั้น",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
      {
        text: "ห้อง",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
      {
        text: "ผู้เเจ้ง",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
      {
        text: "เบอร์",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
      {
        text: "อุปกรณ์ที่เสีย",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
      {
        text: "เลขเครื่อง",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
      {
        text: "อาการเสีย",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
      {
        text: "กำหนดเสร็จ (วัน)",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
      {
        text: "กำหนดเสร็จใน(วัน)",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
      {
        text: "เเก้เเล้ว",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
      {
        text: "วิธีเเก้ไข",
        style: "bgColorHeaderPrintTable",
        alignment: "center",

      },
    ]
  ];
  data.forEach((dataObj, index) => {
    rows.push([
      { text: `(${dataObj.dowJobDate}) ${moment(dataObj.JobDate).format("L")}`, style: "rowRecode", alignment: "center" },
      { text: dataObj.FloorName, style: "rowRecode", alignment: "center", alignment: "center" },
      { text: dataObj.RoomName, style: "rowRecode", alignment: "center" },
      { text: dataObj.ContactPersonName, style: "rowRecode", alignment: "center" },
      { text: dataObj.Tel, style: "rowRecode", alignment: "center" },
      { text: dataObj.CategoryName, style: "rowRecode", alignment: "center" },
      { text: dataObj.DeviceNo === 'null' ? '' : dataObj.DeviceNo, style: "rowRecode", alignment: "center" },
      { text: dataObj.BrokenDes, style: "rowRecode", alignment: "center" },
      { text: `(${dataObj.dowJobDate}) ${moment(dataObj.DueDate).format("L")}`, style: "rowRecode", alignment: "center" },
      {
        text: dataObj.DateWIP,
        style: "rowRecode",
        alignment: "center"
      },
      { text: "", style: "rowRecode" },
      {
        text: dataObj.RepairDes === null ? " " : dataObj.RepairDes,
        style: "rowRecode",
      },
    ]);
  });
  const docDefinition = {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [10, 10, 10, 10],
    content: [
      " ",
      {
        width: "*",
        table: {
          dontBreakRows: true,
          widths: [45, 30, 45, 50, 20, 65, 40, 150, 45, 45, 28, 150],
          body: rows,
        },
      },
    ],
    defaultStyle: {
      font: "Sarabun",
    },
    styles: {
      header: {
        fontSize: 10,
        bold: true,
        alignment: "center",
      },
      rowRecode: {
        fontSize: 8,
        // alignment: "center",
      },
      title: {
        fontSize: 14,
        bold: true,
        alignment: "left",
        margin: [0, 20, 0, 0],
      },
      textAlign: {
        fontSize: 12,
        alignment: "left",
        margin: [20, 0, 0, 0],
      },
      marginLeft: {
        margin: [20, 0, 0, 0],
      },
      fonSize10: {
        fontSize: 10,
      },
      fonSize8: {
        fontSize: 8,
      },
      bgColorHeaderPrintTable: {
        fillColor: "#FFC107",
        fontSize: 9,
        bold: true,
        alignment: "center",
      },
    },
  };
  await createPDF(docDefinition);
}

const printCastingByOrder = async (data) => {
  // console.log('data : ' , data)
  const borderColorHeader = ["#000000", "#000000", "#000000", "#000000"];
  let rows = [
    [
      {
        text: "OrderNumber",
        alignment: "center",
        style: "bgColorHeaderPrintTable",
        borderColor: borderColorHeader,
      },
      {
        text: "วันที่สร้าง Order",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "สั่งผลิตทั้งหมด",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "หล่อซ่อม",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "รับคืน",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "หล่อ",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "หล่ออื่นๆ",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "DIEF",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "สถานะ",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
    ],
  ];
  data.forEach((dataObj, index) => {
    rows.push([
      { text: dataObj.OrderNumber, style: "rowRecode", alignment: "center" },
      { text: `(${dataObj.thaiDate}) ${moment(dataObj.OrderDate).format("L")}`, style: "rowRecode", alignment: "center" },
      { text: dataObj.JobQty, style: "rowRecode", alignment: "center" },
      { text: dataObj.TotalBillRepairCasting, style: "rowRecode", alignment: "center" },
      { text: dataObj.TotalReturnRepairCasting, style: "rowRecode", alignment: "center" },
      { text: dataObj.TotalCastingNormal, style: "rowRecode", alignment: "center" },
      { text: dataObj.TotalCastingSample, style: "rowRecode", alignment: "center" },
      { text: dataObj.TotalBillRepairCasting - dataObj.TotalReturnRepairCasting, alignment: "center", style: dataObj.TotalBillRepairCasting - dataObj.TotalReturnRepairCasting === 0 ? "rowRecode" : "rowRecode bold", color: dataObj.TotalBillRepairCasting - dataObj.TotalReturnRepairCasting === 0 ? 'gray' : 'black' },
      { text: dataObj.Status, style: "rowRecode", alignment: "center" },
      //? "หล่อไม่ครบ" : "หล่อเกินจำนวน"
    ]);
  });



  const docDefinition = {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [10, 10, 10, 10],
    content: [
      // {
      //   text: `รายการหล่อของ Order : ${data[0].OrderNumber}`,
      //   alignment: "center",
      //   fontSize: 23,
      //   bold: true,
      // },
      " ",
      {
        width: "*",
        table: {
          dontBreakRows: true,
          widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
          body: rows,
        },
      },
    ],
    defaultStyle: {
      font: "Sarabun",
    },
    styles: {
      header: {
        fontSize: 10,
        bold: true,
        alignment: "center",
      },
      rowRecode: {
        fontSize: 8,
        // alignment: "center",
      },
      bold: {
        bold: true,
      },
      gray: {
        color: 'gray'
      },
      title: {
        fontSize: 14,
        bold: true,
        alignment: "left",
        margin: [0, 20, 0, 0],
      },
      textAlign: {
        fontSize: 12,
        alignment: "left",
        margin: [20, 0, 0, 0],
      },
      marginLeft: {
        margin: [20, 0, 0, 0],
      },
      fonSize10: {
        fontSize: 10,
      },
      fonSize8: {
        fontSize: 8,
      },
      bgColorHeaderPrintTable: {
        fillColor: "#40DFEF",
        fontSize: 10,
        bold: true,
        alignment: "center",
      },
    },
  };
  await createPDF(docDefinition);
}

const printCastingByItem = async (data) => {
  const dataConvert = await convertImgMppPrint(data);
  //console.log('เเปลงเเล้ว : ' , dataConvert)
  var vertical_center = 20

  const borderColorHeader = ["#000000", "#000000", "#000000", "#000000"];
  let rows = [
    [
      {
        text: "รายการที่",
        alignment: "center",
        style: "bgColorHeaderPrintTable",
        borderColor: borderColorHeader,
      },
      {
        text: "สินค้า",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "JobNumber",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "ผลิต",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "หล่อซ่อม",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "รับคืน",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "หล่อ",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "หล่ออื่นๆ",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "DIFF",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "สถานะ",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
    ],
  ];
  data.forEach((dataObj, index) => {
    rows.push([
      { text: dataObj.OrderItemNo, style: "rowRecode", alignment: "center", margin: [0, vertical_center, 0, 0] },
      { image: dataConvert[index].PDFPict, width: 80, alignment: "center" },
      { text: dataObj.JobNumber, style: "rowRecode", alignment: "center", margin: [0, vertical_center, 0, 0] },
      { text: dataObj.JobQty, style: "rowRecode", alignment: "center", margin: [0, vertical_center, 0, 0] },
      { text: dataObj.TotalRepairCasting, style: "rowRecode", alignment: "center", margin: [0, vertical_center, 0, 0] },
      { text: dataObj.TotalReturnRepairCasting, style: "rowRecode", alignment: "center", margin: [0, vertical_center, 0, 0] },
      { text: dataObj.TotalCastingNormal, style: "rowRecode", alignment: "center", margin: [0, vertical_center, 0, 0] },
      { text: dataObj.TotalCastingSample, style: "rowRecode", alignment: "center", margin: [0, vertical_center, 0, 0] },
      { text: dataObj.TotalRepairCasting - dataObj.TotalReturnRepairCasting, style: dataObj.TotalRepairCasting - dataObj.TotalReturnRepairCasting > 0 ? "rowRecode bold" : "rowRecode", alignment: "center", color: dataObj.TotalRepairCasting - dataObj.TotalReturnRepairCasting > 0 ? 'black' : 'gray', margin: [0, vertical_center, 0, 0] },
      { text: dataObj.TotalRepairCasting === 0 ? 'ไม่มีหล่อซ่อม' : dataObj.TotalRepairCasting > dataObj.TotalReturnRepairCasting ? 'ยังรับกลับไม่ครบ' : 'รับกลับครบแล้ว', style: "rowRecode", alignment: "center", margin: [0, vertical_center, 0, 0] },
    ]);
  });



  const docDefinition = {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [10, 10, 10, 10],
    content: [
      {
        text: `รายการหล่อของ Order : ${data[0].OrderNumber}`,
        alignment: "center",
        fontSize: 23,
        bold: true,
      },
      " ",
      {
        width: "*",
        table: {
          dontBreakRows: true,
          widths: [40, '*', 60, '*', '*', '*', '*', '*', '*', 60],
          body: rows,
        },
      },
    ],
    defaultStyle: {
      font: "Sarabun",
    },
    styles: {
      header: {
        fontSize: 10,
        bold: true,
        alignment: "center",
      },
      rowRecode: {
        fontSize: 8,
        // alignment: "center",
      },
      title: {
        fontSize: 14,
        bold: true,
        alignment: "left",
        margin: [0, 20, 0, 0],
      },
      textAlign: {
        fontSize: 12,
        alignment: "left",
        margin: [20, 0, 0, 0],
      },
      marginLeft: {
        margin: [20, 0, 0, 0],
      },
      fonSize10: {
        fontSize: 10,
      },
      fonSize8: {
        fontSize: 8,
      },
      bgColorHeaderPrintTable: {
        fillColor: "#40DFEF",
        fontSize: 10,
        bold: true,
        alignment: "center",
      },
    },
  };
  await createPDF(docDefinition);
}

const printSlip = async (data) => {
  const logoHeader = await convertImg(
    "http://192.168.3.5:3000/picture/PICTURE2/Art%20Event%20Logo2.jpg"
  );
  //console.log("data : ", data);
  const dataConvert = await convertImgMppPrint(data);
  var vertical_center = 10;

  const borderColorHeader = ["#40DFEF", "#40DFEF", "#40DFEF", "#40DFEF"];
  let rows = [
    [
      {
        text: "No.",
        alignment: "center",
        style: "bgColorHeaderPrintTable",
        borderColor: borderColorHeader,
      },
      {
        text: "Code/Order No.",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "จำนวน/นน.",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
      {
        text: "รูป",
        style: "bgColorHeaderPrintTable",
        alignment: "center",
        borderColor: borderColorHeader,
      },
    ],
  ];
  data.forEach((dataObj, index) => {
    rows.push([
      {
        text: index + 1,
        style: "rowRecode",
        alignment: "center",
        margin: [0, 10, 0, 0],
      },
      {
        stack: [
          {
            text: dataObj.OrderNumber,
            style: "rowRecode",
            alignment: "left",
          },
          { text: dataObj.JobNumber, style: "rowRecode", alignment: "left" },
          {
            text: dataObj.TotalCastingNormal,
            style: "rowRecode",
            alignment: "left",
          },
        ],
        margin: [0, 10, 0, 0],
      },
      {
        stack: [
          { text: dataObj.JobQty, style: "rowRecode", alignment: "right" },
          { text: dataObj.JobQty, style: "rowRecode", alignment: "right" },
        ],
        margin: [0, 10, 0, 0],
      },
      //{ image: logoHeader, width: 80, alignment: "center" },
      { image: dataConvert[index].PDFPict, width: 80, alignment: "center" },
    ]);
  });

  const docDefinition = {
    pageSize: {
      width: 300,
      height: 'auto'
    },
    pageOrientation: "portrait",
    pageMargins: [10, 10, 10, 10],
    content: [
      {
        image: logoHeader,
        width: 150,
        alignment: "center",
      },
      {
        text: `เลขที่ :      ${data[0].OrderNumber}`,
        //alignment: "center",
        fontSize: 10,
        //bold: true,
      },
      {
        columns: [
          {
            // text: `โอนจาก : ${data[0].ProductID}`,
            text: `โอนจาก :  เเต่ง`,
            //alignment: "center",
            fontSize: 10,
            //bold: true,
          },
          {
            text: '',
            width: 119,
          },
          {
            // text: `วันที่ : ${data[0].ProductID}`,
            text: `วันที่ :  27/05/2022`,
            //alignment: "center",
            fontSize: 10,
            //bold: true,
          },
        ],
      },
      {
        columns: [
          {
            // text: `โอนไป : ${data[0].ProductID}`,
            text: `โอนไป :     ขัด`,
            //alignment: "center",
            fontSize: 10,
            //bold: true,
          },
          {
            text: '',
            width: 118,
          },
          {
            // text: `เวลา : ${data[0].ProductID}`,
            text: `เวลา :  19:36`,
            //alignment: "center",
            fontSize: 10,
            //bold: true,
          },
        ],
      },
      " ",
      {
        width: "*",
        table: {
          headerRows: 1,
          //dontBreakRows: true,
          widths: [16, 90, 50, 80],
          body: rows,
        },
        layout: {
          hLineWidth: function (i, node) {
            return i === 0 || i === node.table.body.length ? 2 : 1;
          },
          vLineWidth: function (i, node) {
            return i === 0 || i === node.table.widths.length ? 2 : 1;
          },
          hLineColor: function (i, node) {
            return "gray";
          },
          vLineColor: function (i, node) {
            return "white";
          },
          hLineStyle: function (i, node) {
            if (i === 0 || i === node.table.body.length) {
              return null;
            }
            if (i === 1 || i === node.table.body.length) {
              return null;
            }
            return { dash: { length: 10, space: 4 } };
          },
          vLineStyle: function (i, node) {
            if (i === 0 || i === node.table.widths.length) {
              return null;
            }
            return { dash: { length: 4 } };
          },
          // paddingLeft: function(i, node) { return 4; },
          // paddingRight: function(i, node) { return 4; },
          // paddingTop: function(i, node) { return 2; },
          // paddingBottom: function(i, node) { return 2; },
          // fillColor: function (i, node) { return null; }
        },
      },
    ],
    defaultStyle: {
      font: "Sarabun",
    },
    styles: {
      header: {
        fontSize: 10,
        bold: true,
        alignment: "center",
      },
      rowRecode: {
        fontSize: 8,
        // alignment: "center",
      },
      title: {
        fontSize: 14,
        bold: true,
        alignment: "left",
        margin: [0, 20, 0, 0],
      },
      textAlign: {
        fontSize: 12,
        alignment: "left",
        margin: [20, 0, 0, 0],
      },
      marginLeft: {
        margin: [20, 0, 0, 0],
      },
      fonSize10: {
        fontSize: 10,
      },
      fonSize8: {
        fontSize: 8,
      },
      bgColorHeaderPrintTable: {
        fillColor: "#40DFEF",
        fontSize: 10,
        bold: true,
        alignment: "center",
      },
    },
  };
  await createPDF(docDefinition);
};






export default {
  createPDF,
  convertImg,
  convertImgMppPrint,
  printBillMaterial,
  textToBase64Barcode,
  printReportRepairDoc,
  testInsertImg,
  testNewprint,
  printCastingByOrder,
  printCastingByItem,
  printSlip
}