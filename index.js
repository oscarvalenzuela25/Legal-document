const mustache = require('mustache');
const puppeteer = require('puppeteer-core');
const { executablePath } = require('puppeteer');
const fs = require('fs/promises');
const chromium = require('@sparticuz/chromium-min');

const newAplicationData = {
  orderId: 32342,
  dynamicDocumentsData: {
    orderId: 32342,
    businessName: 'Empresa 77',
    dateString: '9 de noviembre de 2023',
    contractDate: '9 de noviembre de 2023',
    orderType: 'Operación de Factoraje',
    orderTypeAcronym: 'Factoraje',
    orderTypeAcronym2: 'Factoraje',
    orderInvoiceExpirationDates: [
      '8 de enero de 2024,',
      '7 de enero de 2024,',
      '7 de enero de 2024,',
      '7 de enero de 2024,',
      '7 de enero de 2024,',
      '7 de enero de 2024,',
      '7 de enero de 2024',
    ],
    amountType: 'los Derechos de Crédito Cedidos',
    netAmountString: '$779,925.90 M.N.',
    netAmountToWords:
      'setecientos setenta y nueve mil novecientos veinticinco Pesos 90/100 Moneda Nacional',
    netAmountCents: '90',
    signatories: {
      isPF: false,
      formatSignatories: [
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
        },
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
        },
      ],
    },
    // Siempre es 1 en FD
    bankAccounts: [
      {
        bankName: 'BBVA BANCOMER',
        bankFullName:
          'BBVA Bancomer, S.A., Institución de Banca Múltiple, Grupo Financiero BBVA Bancomer',
        accountHolder: 'Holder 6774',
        formatAccountNumber: '00114646320',
        // accountNumber => clabe
        accountNumber: '012290001146463201',
        agreement: '127384',
        reference: '1212937',
      },
    ],
  },
};

const newConfirmationData = {
  orderId: 32342,
  dynamicDocumentsData: {
    orderId: 32342,
    businessName: 'Empresa 77',
    dateString: '9 de noviembre de 2023',
    contractDate: '9 de noviembre de 2023',
    orderType: 'Operación de Factoraje',
    orderTypeAcronym: 'Factoraje',
    orderTypeAcronym2: 'Factoraje',
    orderInvoiceExpirationDates: [
      '8 de enero de 2024,',
      '8 de enero de 2024,',
      '8 de enero de 2024,',
      '8 de enero de 2024,',
      '8 de enero de 2024,',
      '8 de enero de 2024,',
      '8 de enero de 2024,',
      '8 de enero de 2024,',
      '8 de enero de 2024,',
      '8 de enero de 2024,',
      '8 de enero de 2024,',
      '8 de enero de 2024,',
      '8 de enero de 2024',
    ],
    amountType: 'los Derechos de Crédito Cedidos',
    netAmountString: '$779,925.90 M.N.',
    netAmountToWords:
      'setecientos setenta y nueve mil novecientos veinticinco Pesos 90/100 Moneda Nacional',
    netAmountCents: '90',
    signatories: {
      isPF: false,
      formatSignatories: [
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
        },
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
        },
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
        },
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
        },
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
        },
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
        },
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
        },
      ],
    },
    advancePct: '71.8017%',
    advanceAmountString: '$559,999.80 M.N.',
    advanceAmountToWords:
      'quinientos cincuenta y nueve mil novecientos noventa y nueve Pesos 80/100 Moneda Nacional',
    advanceAmountCents: '80',
    rateType: 'Descuento',
    annualRate: '28.32%',
    amountRateType: 'Descuento',
    interestAmountString: '$25,991.40 M.N.',
    interestAmountToWords:
      'veinticinco mil novecientos noventa y un Pesos 40/100 Moneda Nacional',
    interestAmountCents: '40',
    operationCostString: '$3,190.10 M.N.',
    operationCostToWords:
      'tres mil ciento noventa Pesos 10/100 Moneda Nacional',
    operationCostCents: '10',
    totalAmountType: '(Precio)',
    transferAmountString: '$559,999.80 M.N.',
    transferAmountToWords:
      'quinientos cincuenta y nueve mil novecientos noventa y nueve Pesos 80/100 Moneda Nacional',
    transferAmountCents: '80',
    relationType: 'Derechos de Crédito Cedidos',
    invoiceTable: [
      {
        uuid: '75179E49-4091-4924-A919-71039852E5D4',
        folio: '1708',
        invoiceStakeholderName: 'Empresa 1',
        amount: '$385,526.00 M.N.',
      },
      {
        uuid: '9AD63CF9-7818-412F-9B43-94A5109A4459',
        folio: '1709',
        invoiceStakeholderName: 'Empresa 1',
        amount: '$394,400.00 M.N.',
      },
      {
        uuid: '9AD63CF9-7818-412F-9B43-94A5109A4459',
        folio: '1709',
        invoiceStakeholderName: 'Empresa 1',
        amount: '$394,400.00 M.N.',
      },
      {
        uuid: '9AD63CF9-7818-412F-9B43-94A5109A4459',
        folio: '1709',
        invoiceStakeholderName: 'Empresa 1',
        amount: '$394,400.00 M.N.',
      },
    ],
  },
};

const newPromissoryNoteData = {
  orderId: 32342,
  dynamicDocumentsData: {
    orderId: 32342,
    businessName: 'Empresa 77',
    dateString: '9 de noviembre de 2023',
    contractDate: '9 de noviembre de 2023',
    orderType: 'Operación de Factoraje',
    orderTypeAcronym: 'Factoraje',
    orderTypeAcronym2: 'Factoraje',
    orderInvoiceExpirationDates: ['8 de enero de 2024', '7 de enero de 2024'],
    amountType: 'los Derechos de Crédito Cedidos',
    netAmountString: '$779,925.90 M.N.',
    netAmountToWords:
      'setecientos setenta y nueve mil novecientos veinticinco Pesos 90/100 Moneda Nacional',
    netAmountCents: '90',
    advanceAmountString: '$559,999.80 M.N.',
    advanceAmountToWords:
      'quinientos cincuenta y nueve mil novecientos noventa y nueve Pesos 80/100 Moneda Nacional',
    advanceAmountCents: '80',
    annualRate: '28.32%',
    annualRateToWords: 'veintiocho punto treinta y dos por ciento',
    lastExpirationDate: '8 de enero de 2024',
    paymentCalendarTable: [
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
      {
        number: 1,
        expirationDate: '4 de enero de 2024',
        amount:
          '$18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional) $18,888.28 M.N. (dieciocho mil ochocientos ochenta y ocho Pesos 28/100 Moneda Nacional)',
      },
    ],
    signatoriesWithAddress: {
      isPF: false,
      formatSignatories: [
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
          address: ' - ',
          addressLine:
            'Con Domicilio en DEL AGUILA REAL 19430 INT 08, BAJA MAQ EL AGUILA, TIJUANA, BAJA CALIFORNIA, C.P: 22215',
        },
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
          address: ' - ',
          addressLine:
            'Con Domicilio en DEL AGUILA REAL 19430 INT 08, BAJA MAQ EL AGUILA, TIJUANA, BAJA CALIFORNIA, C.P: 22215',
        },
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
          address: ' - ',
          addressLine:
            'Con Domicilio en DEL AGUILA REAL 19430 INT 08, BAJA MAQ EL AGUILA, TIJUANA, BAJA CALIFORNIA, C.P: 22215',
        },
      ],
    },
    endorsementSection: 'Por aval',
    endorsementSignatories: {
      isPF: false,
      formatSignatories: [
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
          address: ' - ',
          addressLine:
            'Con Domicilio en DEL AGUILA REAL 19430 INT 08, BAJA MAQ EL AGUILA, TIJUANA, BAJA CALIFORNIA, C.P: 22215',
          endorsementBusinessName: 'Lorem',
        },
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
          address: ' - ',
          addressLine:
            'Con Domicilio en DEL AGUILA REAL 19430 INT 08, BAJA MAQ EL AGUILA, TIJUANA, BAJA CALIFORNIA, C.P: 22215',
          endorsementBusinessName: undefined,
        },
        {
          firstLine: 'Por: xxxxxor manuel ',
          secondLine: 'Cargo: Apoderado',
          name: 'xxxxxor manuel ',
          address: ' - ',
          addressLine:
            'Con Domicilio en DEL AGUILA REAL 19430 INT 08, BAJA MAQ EL AGUILA, TIJUANA, BAJA CALIFORNIA, C.P: 22215',
          endorsementBusinessName: null,
        },
      ],
    },
  },
};

const newApplicationPath = './templates/mustache/newApplication.mustache';
const newConfirmationPath = './templates/mustache/newConfirmation.mustache';
const newPromissoryNotePath = './templates/mustache/newPromissoryNote.mustache';

const getBrowserConfig = async isTest => {
  return !isTest
    ? {
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
        defaultViewport: chromium.defaultViewport,
        args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      }
    : {
        headless: false,
        executablePath: executablePath(),
      };
};

const convertHtmlToPdf = async (templatePath, data, outputPdf, type) => {
  const joinData = {
    orderId: data.orderId,
    ...data.dynamicDocumentsData,
  };
  const options = {
    newApplication: {
      ...joinData,
      nextPage:
        type === 'newApplication' &&
        ((joinData.signatories.formatSignatories.length > 1 &&
          joinData.orderInvoiceExpirationDates.length > 8) ||
          joinData.signatories.formatSignatories.length > 2 ||
          joinData.orderInvoiceExpirationDates.length > 14),
    },
    newConfirmation: {
      ...joinData,
    },
    newPromissoryNote: {
      ...joinData,
      tableDataFirst:
        type === 'newPromissoryNote' &&
        joinData.paymentCalendarTable.length >= 2,
      tableDataSecond:
        type === 'newPromissoryNote' &&
        joinData.paymentCalendarTable.length >= 4,
      tableDataThird:
        type === 'newPromissoryNote' &&
        joinData.paymentCalendarTable.length >= 6,
      tableDataFourth:
        type === 'newPromissoryNote' &&
        joinData.paymentCalendarTable.length >= 8,
      tableDataFifth:
        type === 'newPromissoryNote' &&
        joinData.paymentCalendarTable.length >= 10,
      tableDataSixth:
        type === 'newPromissoryNote' &&
        joinData.paymentCalendarTable.length >= 12,
      tableDataSeventh:
        type === 'newPromissoryNote' &&
        joinData.paymentCalendarTable.length >= 14,
    },
  };

  const newData = options[type] || joinData;
  chromium.setHeadlessMode = true;
  chromium.setGraphicsMode = false;
  chromium.font(
    'https://github.com/google/fonts/blob/main/apache/tinos/Tinos-Regular.ttf'
  );
  const browser = await puppeteer.launch(await getBrowserConfig(true));
  const page = await browser.newPage();

  const templateContent = await fs.readFile(templatePath, 'utf-8');
  const htmlContent = mustache.render(templateContent, newData);

  // Set the HTML content of the page
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Generate a PDF from the loaded content
  const bufferPdf = await page.pdf({
    path: outputPdf,
    format: 'Letter',
    margin: {
      top: '20px',
      bottom: '50px',
    },
  });

  await browser.close();
  console.log(`PDF generated successfully: ${outputPdf}`);
};

const newApplicationOutputPdf = `newApplicationOutputPdf${+new Date()}.pdf`;
const newConfirmationOutputPdf = `newConfirmationOutputPdf${+new Date()}.pdf`;
const newPromissoryNoteOutputPdf = `newPromissoryNoteOutputPdf${+new Date()}.pdf`;

convertHtmlToPdf(
  newApplicationPath,
  newAplicationData,
  newApplicationOutputPdf,
  'newApplication'
);

// convertHtmlToPdf(
//   newConfirmationPath,
//   newConfirmationData,
//   newConfirmationOutputPdf,
//   'newConfirmation'
// );

// convertHtmlToPdf(
//   newPromissoryNotePath,
//   newPromissoryNoteData,
//   newPromissoryNoteOutputPdf,
//   'newPromissoryNote'
// );
