const puppeteer = require('puppeteer');

const WIDTH = 1920
const HEIGHT = 900

isDebugging = () => {
    const debuggingMode = {
      headless : true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
      // args: [`--window-size=${WIDTH},${HEIGHT}`]
    }
    return process.env.NODE_ENV === 'debug' ? debuggingMode : {}
 }
 var browser, page
 beforeAll( async () => {
   browser =  await puppeteer.launch( isDebugging() )
   page = await browser.newPage()
   page.setExtraHTTPHeaders({ 'upgrade-insecure-requests': '0' });
   await page.on('console', msg => console.log('PAGE LOG:', msg.text() ));

  //  page.setViewport({ width: 1680 , height:900})
  
   await page.goto('http://localhost:3000/home')
   
 },50000)

let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('NEXT Puppeteer', () => {
  test('home page test', async() => {
    await page.waitForSelector('.home')
    var html = await page.$eval('.home', (element) => element.textContent);
    expect(html).toBe('Home')
  },15000)
  
})

afterAll( async () => {
    if(isDebugging()){
      browser.close()
    }
})