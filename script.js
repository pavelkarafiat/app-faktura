const poradi = document.querySelector('#poradi');
const polozka = document.querySelector('#polozka');
const castka = document.querySelector('#castka');
const odberatel = document.querySelector('#odberatel');
const nazev = document.querySelector('#nazev');
const page = document.querySelector('page');
const body = document.querySelector('body');
const button = document.querySelector('button');
const printElement = document.getElementById('toPrint');
const date = document.querySelector('input[type="date"]');
const accountID = '670100-2201688103/6210';
const accountPrefix = '670100';
const accountNumber = '2201688103';
const bankCode = '6210';

const dodavatel = `Ing. Pavel Karafiát
Krynická 493/5
181 00, Praha 8
neplátce DPH
IČ: 02181762
DIČ: CZ8205060952`;

body.addEventListener('change', renderPage);
window.addEventListener('load', renderPage);
button.addEventListener('click', printDiv);

function renderPage() {
  let templatePlatbaCredentialsLeft = `Datum vystavení:<br>
<b>Datum splatnosti:</b><br>
Bankovní účet:<br>`;

  let templatePlatbaCredentialsRight = `${parseDate(date).czShort}<br>
<b>${parseDate(date).czShortPlus14}</b><br>
${accountID}`;

  let templateFooter = `Vystavil Pavel Karafiát | +420 604 651788 | pk@pavelkarafiat.cz | ${
    parseDate(date).czLong
  }`;

  let template = `<h1>Faktura ${parseDate(date).code}</h1>



<div class="polozka">
${polozka.value}
</div>

<div class="castka">
<b>Celkem k úhradě: ${castka.value} Kč.</b>
</div>

<img src="https://api.paylibo.com/paylibo/generator/czech/image?accountPrefix=${accountPrefix}&accountNumber=${accountNumber}&bankCode=${bankCode}&amount=${
    castka.value
  }&currency=CZK&message=${nazev.value}"  class="qrcode">



<div class="flexwrapp">
<div>${templatePlatbaCredentialsLeft}</div>
<div>${templatePlatbaCredentialsRight}</div>
</div>
  
<div class="flexwrapp textwrap">
<p>ODBĚRATEL:<br>${odberatel.value}</p>
<p>DODAVATEL:<br>${dodavatel}</p>
</div>

<div class="footer">
${templateFooter}
</div>`;
  page.innerHTML = template;
}

function parseDate(str) {
  let date = new Date(str.value);
  let code = str.value.replace(/-/g, '') + poradi.value;

  //using moment library for easy results
  /*moment = date;*/
  moment.locale('cs');
  let czLong = moment(date).format('LL');
  let czShort = moment(date).format('l');
  let czShortPlus14 = moment(date).add(14, 'days').format('l');

  return { code, czLong, czShort, czShortPlus14 };
}

/* https://momentjs.com/ */
/* https://www.superfaktura.cz/blog/nalezitosti-faktury-co-musi-obsahovat-faktura/ */

function printDiv() {
  let originalContents = document.body.innerHTML;
  document.body.innerHTML = printElement.innerHTML;
  window.print();
  document.body.innerHTML = originalContents;
  location.reload();
}
