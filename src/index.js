const puppeteer = require("puppeteer");

(async () => {
  const URL =
    process.env.URL ||
    "https://developer.pingidentity.com/en/tools/saml-decoder.html";

  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch();

  console.log(`Opening page ${URL}...`);
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  await page.goto(URL);

  page.once("load", () => console.log("Page loaded!"));

  const title = await page.title();
  console.log(`Title of the page "${URL}" is "${title}".`);

  const encodedSAML =
    "fVNNj9MwFLwj8R8s35s42X4oVltUWgGVlt2oCRy4IGO/UEvxB7azW/49TrZdBQlysmTPzJt573ntmWot3XXhrE/wqwMf0EW12tPhYYM7p6lhXnqqmQJPA6fV7vM9zRNCrTPBcNPiEWWawbwHF6TRGB0PG1weHz5+J6RYkVVDyB1hC0HIMie8EIVoilWzzFesgUJwns8x+grOR+4GRymMSmeepAD3EKtscFWiEM1HXe87OGofmA4RSbL5jKxm2bLO7+gip/PFN4wOESk1C4PYOQRL01QKm8CFKdtCwo1Kq+qxAvckOST2bIdyQ9j3Ugupf07n/PEC8vRTXZez8rGqMdrdsu+N9p0Cd5X/crp/NeH/9iBAmSyNWnDpTbxj3OPt2zcIrftW0yGq205xFQQmWGA9fZ2OWa8ylvYdPB5K00r+G30wTrHw/3hZkg03UsyaAUpBMdnuhHDgfYzZtuZ574CFOJXgOsDpuNZ1yUAMKxdbEeAS0N4oy5z0/TxiCB5eYt6CjrH7Ni7RCZrt5J5xyntcvC7j8Wyc6OcHPBauHdPeGheu/fin+OA4nbAcEbf38efZ/gE=";

  // Fill form fields and select desired search options
  console.log("Fill in encoded SAML");
  await page.type("#saml", encodedSAML);

  // Submit the form and wait
  console.log("Submit to decode SAML");
  await page.click('.MuiButton-contained, [type="submit"]');

  // wait for decoded saml to load
  page
    .waitForSelector(".MuiBox-root > pre > code")
    .then(() => console.log("decoded saml ready!"));

  await page.screenshot({
    path: "./screenshots/samlDecoded.png",
    fullPage: true,
  });

  // Obtain decoded SAML
  const decodedSAML = await page.$$eval(
    ".MuiBox-root > pre > code",
    (codes) =>
      // should only be one in the codes array using the selector chosen, the decoded saml output
      codes[0].innerText
  );

  if (!decodedSAML)
    throw new Error("Didn't receive decoded saml for some reason");

  console.log("Decoded SAML: ", decodedSAML);

  console.log("Closing Puppeteer...");
  await browser.close();

  console.log("Done.");
})();
