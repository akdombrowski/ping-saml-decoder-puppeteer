const puppeteer = require("puppeteer");

(async () => {
  // if URL exists in the env, use that, otherwise, fallback to the hardcoded url here for the SAML decoder on Ping Identity's developer site.
  const URL =
    process.env.URL ||
    "https://developer.pingidentity.com/en/tools/saml-decoder.html";

  // new browser
  console.log();
  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch();

  // new browser tab
  console.log(`Opening page ${URL}...`);
  const page = await browser.newPage();

  // set viewport to get a nice screenshot with width 1920, height will be different since we're doing a full-page screenshot
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  // navigate to the SAML decoder tool page
  await page.goto(URL);

  // drop a line when page is loaded
  page.once("load", () => console.log("Page loaded!"));

  // get the title of the page
  const title = await page.title();
  console.log(`Title of the page "${URL}" is "${title}".`);

  const encodedSAML =
    process.argv[2] ||
    "fVNNj9MwFLwj8R8s35s42X4oVltUWgGVlt2oCRy4IGO/UEvxB7azW/49TrZdBQlysmTPzJt573ntmWot3XXhrE/wqwMf0EW12tPhYYM7p6lhXnqqmQJPA6fV7vM9zRNCrTPBcNPiEWWawbwHF6TRGB0PG1weHz5+J6RYkVVDyB1hC0HIMie8EIVoilWzzFesgUJwns8x+grOR+4GRymMSmeepAD3EKtscFWiEM1HXe87OGofmA4RSbL5jKxm2bLO7+gip/PFN4wOESk1C4PYOQRL01QKm8CFKdtCwo1Kq+qxAvckOST2bIdyQ9j3Ugupf07n/PEC8vRTXZez8rGqMdrdsu+N9p0Cd5X/crp/NeH/9iBAmSyNWnDpTbxj3OPt2zcIrftW0yGq205xFQQmWGA9fZ2OWa8ylvYdPB5K00r+G30wTrHw/3hZkg03UsyaAUpBMdnuhHDgfYzZtuZ574CFOJXgOsDpuNZ1yUAMKxdbEeAS0N4oy5z0/TxiCB5eYt6CjrH7Ni7RCZrt5J5xyntcvC7j8Wyc6OcHPBauHdPeGheu/fin+OA4nbAcEbf38efZ/gE=";

  // another example
  // "PHNhbWxwOlJlc3BvbnNlIElEPSJpZC05ZTY1MGFhYy05ZjVkLTRjNDgtYWNlOC01MTRkM2RhOGNjOGIiIFZlcnNpb249IjIuMCIgSXNzdWVJbnN0YW50PSIyMDIyLTAxLTIzVDExOjQ2OjI5LjAyM1oiIERlc3RpbmF0aW9uPSJodHRwczovL2h0dHBiaW4ub3JnL2FueXRoaW5nIiB4bWxuczpzYW1scD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIj48c2FtbDpJc3N1ZXIgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+aHR0cHM6Ly9hdXRoLnBpbmdvbmUuY29tLzMzM2Q2NmI1LWQyZjAtNDhkMC04ZWMwLWNmNGNhZmQzNWQyNTwvc2FtbDpJc3N1ZXI+PHNhbWxwOlN0YXR1cz48c2FtbHA6U3RhdHVzQ29kZSBWYWx1ZT0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnN0YXR1czpTdWNjZXNzIi8+PC9zYW1scDpTdGF0dXM+PHNhbWw6QXNzZXJ0aW9uIElEPSJpZC1lNzU4NmIyOC02ZDAyLTRhODktYWM5Yy1mOGI5ZjFmOTBiMDUiIFZlcnNpb249IjIuMCIgSXNzdWVJbnN0YW50PSIyMDIyLTAxLTIzVDExOjQ2OjI5LjAyM1oiIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPjxzYW1sOklzc3Vlcj5odHRwczovL2F1dGgucGluZ29uZS5jb20vMzMzZDY2YjUtZDJmMC00OGQwLThlYzAtY2Y0Y2FmZDM1ZDI1PC9zYW1sOklzc3Vlcj48ZHM6U2lnbmF0dXJlIHhtbG5zOmRzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjIj4KPGRzOlNpZ25lZEluZm8+CjxkczpDYW5vbmljYWxpemF0aW9uTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+CjxkczpTaWduYXR1cmVNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2Ii8+CjxkczpSZWZlcmVuY2UgVVJJPSIjaWQtZTc1ODZiMjgtNmQwMi00YTg5LWFjOWMtZjhiOWYxZjkwYjA1Ij4KPGRzOlRyYW5zZm9ybXM+CjxkczpUcmFuc2Zvcm0gQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjZW52ZWxvcGVkLXNpZ25hdHVyZSIvPgo8ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+CjwvZHM6VHJhbnNmb3Jtcz4KPGRzOkRpZ2VzdE1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMDQveG1sZW5jI3NoYTI1NiIvPgo8ZHM6RGlnZXN0VmFsdWU+anFIekg3MGt1bXUyR1dZTDljTy9henBQczR4ZjJRMVJlQTA3T3Zlb0FZYz08L2RzOkRpZ2VzdFZhbHVlPgo8L2RzOlJlZmVyZW5jZT4KPC9kczpTaWduZWRJbmZvPgo8ZHM6U2lnbmF0dXJlVmFsdWU+VnpCVzZqbGpjV0V5eVpxVllwS2ZZQ2d2ZFlIUW9MeXV2STNrdFVXVHdrL0NaOVN1bzB3WUU4NG5UZk5JelZ4d2EzZUo3QWx4VHdyM2N2SmJlZ3YxTnF0WFNkRExwaVJDZW5aVUdVUE1VcG52SDFRcFVCQmZEN2J2Vy9MYThhem9obGNMTlBVQnRoQWI4eTl5dTB6MmpBaGk1VkxlaXdBZkNUSGJFQ0c2WGpjTkhiVjkvT2NrekRVaUJqS3FqYkRZUmhtVXZUOVcxeU1OUDlONDRCYzVvb0xPUGlYd0EwMkYyL1FXRk5CTDZrRjBBa2l3ak5DaW5uMTF3RDBYVG5iRnRWQlIxcEFFVEk5WElrR2wxNHBrOFZ0STl4R2FaSXV1NWU3dlN0T1RqN1pTVUNTODV4SHlKVUQ3TkM2M3BRbmdCMTBlNkJVMHZLS2tVZEJ4TFY2Y25BPT08L2RzOlNpZ25hdHVyZVZhbHVlPgo8ZHM6S2V5SW5mbz4KPGRzOlg1MDlEYXRhPgo8ZHM6WDUwOUNlcnRpZmljYXRlPgpNSUlETURDQ0FoaWdBd0lCQWdJR0FYZTdhbUZzTUEwR0NTcUdTSWIzRFFFQkN3VUFNRmt4RURBT0JnTlZCQU1NQjFOcFoyNXBibWN4JiMxMzsKQ1RBSEJnTlZCQXNNQURFV01CUUdBMVVFQ2d3TmNHbHVaMlJwY21WamRHOXllVEVKTUFjR0ExVUVCd3dBTVFrd0J3WURWUVFJREFBeCYjMTM7CkREQUtCZ05WQkFZVEEzVnpZVEFlRncweU1UQXlNVGt4TnpVd05EZGFGdzB5TWpBeU1Ua3hOelV3TkRkYU1Ga3hFREFPQmdOVkJBTU0mIzEzOwpCMU5wWjI1cGJtY3hDVEFIQmdOVkJBc01BREVXTUJRR0ExVUVDZ3dOY0dsdVoyUnBjbVZqZEc5eWVURUpNQWNHQTFVRUJ3d0FNUWt3JiMxMzsKQndZRFZRUUlEQUF4RERBS0JnTlZCQVlUQTNWellUQ0NBU0l3RFFZSktvWklodmNOQVFFQkJRQURnZ0VQQURDQ0FRb0NnZ0VCQUtPOSYjMTM7Ck03WUJNMm10S0hyenN2bGdsREpYcUk2ZURBeDZNOUpkWlhtamZBMS9NbU9ZMTVRc1hjUHB1UjdrZnJDMG12UkdvUk5XSWlHb0VSREomIzEzOwpUOFpVL2pISUpZN0Y1WWhIL0lBYWNuTlVYUXBJdUg4TzFGUWtlcUdwUXJwZm1Sc2pGQmNuMWE2cnBkSHRBS3pUSFVXQm9IajdsQnpUJiMxMzsKWE4zN1JFa1lvMkVSSnpPdllQSHNrLzlyUmtRQ2JyV2hSQ3RyVjczY0hHQWsrWG4xdkVNYVZLbXVYNGU4QnFIWTZkM0ZvSk5BdW5BUSYjMTM7Cjd5dGdxOVFNRHlUVHBrVWZST2k1SUhBTXRzdkcvNWVrZEhJeFUzdVdOZXlySTdRSENKa2dEWHJpMEtObENRRDRtZmtZcmhaRW9nYVQmIzEzOwpyVzk1cG9jaFFzUngzbnYvQ1A2OXRHYkJkODNtY0ZhcVVmOENBd0VBQVRBTkJna3Foa2lHOXcwQkFRc0ZBQU9DQVFFQU5QR2lYWk1YJiMxMzsKSnlvTTZ5V1BaL1JuYlJ0TmE5VWpZb1dNL3Q2WUZqckpKMmhNRC9xbGlkMmVEbEY5RkdpT0g1YlZxRm1kb2RXaUNaWDVrSDRJY3hkcyYjMTM7CjF5RHViYlhJVUZBRCswWHJGRzdYeDVWMU9sTGhFUGVLaUxKVnl2UXk1MlB0c3NWQTFPZGp2Qk8wbzhraGRLUFhFTGdOWXZKajFtalAmIzEzOwo5TngwbUNWNCtyM3JPaTNLODBFSWJFcFNiMW8rcXpnYjFyNkg5cm04OElxS0dsa2NxQjhNTXNNZ0VmYXIwQTk5VEdaaXNqOUV4a1RuJiMxMzsKSEFXSGRWLzd5clV6Z3hZZU8zL2dGZ2taeHhsMmU5K2I0TEpwQlBhZG1LakY2ZWY0TXFHYTd1MEFNQ1ZUaitFT1dGRWRUSGR3S1BsOCYjMTM7ClZKMlV4OU5ucmU4WUNlU2pQT3UwVnhaY2JjU1VPZz09CjwvZHM6WDUwOUNlcnRpZmljYXRlPgo8L2RzOlg1MDlEYXRhPgo8ZHM6S2V5VmFsdWU+CjxkczpSU0FLZXlWYWx1ZT4KPGRzOk1vZHVsdXM+bzcwenRnRXphYTBvZXZPeStXQ1VNbGVvanA0TURIb3owbDFsZWFOOERYOHlZNWpYbEN4ZHcrbTVIdVIrc0xTYTlFYWhFMVlpSWFnUiYjMTM7CkVNbFB4bFQrTWNnbGpzWGxpRWY4Z0JweWMxUmRDa2k0Znc3VVZDUjZvYWxDdWwrWkd5TVVGeWZWcnF1bDBlMEFyTk1kUllHZ2VQdVUmIzEzOwpITk5jM2Z0RVNSaWpZUkVuTTY5ZzhleVQvMnRHUkFKdXRhRkVLMnRYdmR3Y1lDVDVlZlc4UXhwVXFhNWZoN3dHb2RqcDNjV2drMEM2JiMxMzsKY0JEdksyQ3IxQXdQSk5PbVJSOUU2TGtnY0F5Mnk4Yi9sNlIwY2pGVGU1WTE3S3NqdEFjSW1TQU5ldUxRbzJVSkFQaVorUml1RmtTaSYjMTM7CkJwT3RiM21taHlGQ3hISGVlLzhJL3IyMFpzRjN6ZVp3VnFwUi93PT08L2RzOk1vZHVsdXM+CjxkczpFeHBvbmVudD5BUUFCPC9kczpFeHBvbmVudD4KPC9kczpSU0FLZXlWYWx1ZT4KPC9kczpLZXlWYWx1ZT4KPC9kczpLZXlJbmZvPgo8L2RzOlNpZ25hdHVyZT48c2FtbDpTdWJqZWN0PjxzYW1sOk5hbWVJRD5hMTc1MzNkOC1hMzRjLTQyNTktYjIwYS01OTU5MmRjNTRlOWQ8L3NhbWw6TmFtZUlEPjxzYW1sOlN1YmplY3RDb25maXJtYXRpb24gTWV0aG9kPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6Y206YmVhcmVyIj48c2FtbDpTdWJqZWN0Q29uZmlybWF0aW9uRGF0YSBOb3RPbk9yQWZ0ZXI9IjIwMjItMDEtMjNUMTI6NDY6MjkuMDIzWiIgUmVjaXBpZW50PSJodHRwczovL2h0dHBiaW4ub3JnL2FueXRoaW5nIi8+PC9zYW1sOlN1YmplY3RDb25maXJtYXRpb24+PC9zYW1sOlN1YmplY3Q+PHNhbWw6Q29uZGl0aW9ucyBOb3RCZWZvcmU9IjIwMjItMDEtMjNUMTE6NDU6MjkuMDIzWiIgTm90T25PckFmdGVyPSIyMDIyLTAxLTIzVDEyOjQ2OjI5LjAyM1oiPjxzYW1sOkF1ZGllbmNlUmVzdHJpY3Rpb24+PHNhbWw6QXVkaWVuY2U+c3NzYW1sPC9zYW1sOkF1ZGllbmNlPjwvc2FtbDpBdWRpZW5jZVJlc3RyaWN0aW9uPjwvc2FtbDpDb25kaXRpb25zPjxzYW1sOkF1dGhuU3RhdGVtZW50IEF1dGhuSW5zdGFudD0iMjAyMi0wMS0yM1QxMTo0NjoyOS4wMjNaIiBTZXNzaW9uTm90T25PckFmdGVyPSIyMDIyLTAxLTIzVDEyOjQ2OjI5LjAyM1oiIFNlc3Npb25JbmRleD0iNmFiOTc2ZWMtMWQ4YS00MzlkLWFiYmYtMjUxYzBkM2QyZWZlIj48c2FtbDpBdXRobkNvbnRleHQ+PHNhbWw6QXV0aG5Db250ZXh0Q2xhc3NSZWY+dXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFjOmNsYXNzZXM6dW5zcGVjaWZpZWQ8L3NhbWw6QXV0aG5Db250ZXh0Q2xhc3NSZWY+PHNhbWw6QXV0aGVudGljYXRpbmdBdXRob3JpdHk+aHR0cHM6Ly9hdXRoLnBpbmdvbmUuY29tLzMzM2Q2NmI1LWQyZjAtNDhkMC04ZWMwLWNmNGNhZmQzNWQyNTwvc2FtbDpBdXRoZW50aWNhdGluZ0F1dGhvcml0eT48L3NhbWw6QXV0aG5Db250ZXh0Pjwvc2FtbDpBdXRoblN0YXRlbWVudD48c2FtbDpBdHRyaWJ1dGVTdGF0ZW1lbnQ+PHNhbWw6QXR0cmlidXRlIE5hbWU9InNhbWxfc3ViamVjdCIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDpiYXNpYyI+PHNhbWw6QXR0cmlidXRlVmFsdWUgeHNpOnR5cGU9InhzOnN0cmluZyIgeG1sbnM6eHM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hIiB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIj5hMTc1MzNkOC1hMzRjLTQyNTktYjIwYS01OTU5MmRjNTRlOWQ8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iZW1BZGRyIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OmJhc2ljIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIiB4bWxuczp4cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiPmFudGhvbnlkb21icm93c2tpK2FwMTRjQHBpbmdpZGVudGl0eS5jb208L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48L3NhbWw6QXR0cmlidXRlU3RhdGVtZW50Pjwvc2FtbDpBc3NlcnRpb24+PC9zYW1scDpSZXNwb25zZT4="

  // Log the encoded saml that we're decoding
  console.log();
  console.log("Decoding SAML: ");
  console.log(encodedSAML);
  console.log();

  // Fill form fields
  console.log("Fill in encoded SAML");
  await page.type("#saml", encodedSAML);

  // Submit the form and wait
  console.log("Submit to decode SAML");
  await page.click('.MuiButton-contained, [type="submit"]');

  // wait for decoded saml to load
  page
    .waitForSelector(".MuiBox-root > pre > code", { timeout: 10000 })
    .then(() => console.log("decoded saml ready!"));

  // Take screenshot of result
  await page.screenshot({
    path: "./screenshots/samlDecoded.png",
    fullPage: true,
  });

  // Obtain decoded SAML
  const decodedSAML = await page.$$eval(
    ".MuiBox-root > pre > code",
    (codes) => {
      // should only be one in the codes array using the selector chosen, the decoded saml output
      if (codes[0]) {
        return codes[0].innerText;
      }
    }
  );

  if (!decodedSAML) {
    const errorHandle = await page.$(
      ".MuiPopover-root > .MuiPopover-paper > p"
    );
    const errorMsg = await page.evaluate((p) => p.innerText, errorHandle);
    await errorHandle.dispose();
    if (errorMsg) {
      throw new Error("Couldn't decode the SAML: " + errorMsg);
    } else {
      throw new Error("Didn't receive decoded saml for some unknown reason");
    }
  }

  console.log("Decoded SAML: ", decodedSAML);

  console.log("Closing Puppeteer...");
  await browser.close();

  console.log("Done.");
})();
