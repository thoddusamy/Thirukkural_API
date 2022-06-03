let div = document.createElement('div')
div.className = 'container-content'

// ----------------- create HTML elements ---------------------
div.innerHTML = `
<header>
<nav>
    <div class="header-title">
        <p>THIRUKKURAL - திருக்குறள்</p>
    </div>
    <div class="search-box">
        <input type="number" id="input-txt" min="1" max="1330" placeholder="Enter a Number">
        <button type="button" onclick="check()"><i class="fa-solid fa-magnifying-glass"></i></button>
        <button type="button" onclick="reset()"><i class="fa-solid fa-rotate-right"></i> </button>
    </div>
</nav>
</header>

<div class="info-text">
<p>Hello User! Enter a number between 1 - 1330 to get THIRUKKURAL !!!</p>
</div>

<div class="response-content">
<div class="kural-tamil">
    <div class="kural-lang-title">
        <p>THIRUKKURAL IN தமிழ்</p>
    </div>
    <div class="kural-count">
        <p class="tam-count"></p>
    </div>
    <div class="kural-titles">
        <p class="tam-section"></p>
        <p class="tam-chap-grp"></p>
        <p class="tam-chap"></p>
    </div>
    <div class="kural">
        <p class="tam-line1"></p>
        <p class="tam-line2"></p>
    </div>
    <div class="kural-meaning">
        <p class="tam-meaning"></p>
    </div>
</div>
<div class="kural-english">
    <div class="kural-lang-title">
        <p>THIRUKKURAL IN ENGLISH</p>
    </div>
    <div class="kural-count">
        <p class="eng-count"></p>
    </div>
    <div class="kural-titles">
        <p class="eng-section"></p>
        <p class="eng-chap-grp"></p>
        <p class="eng-chap"></p>
    </div>
    <div class="kural">
        <p class="eng-line1"></p>
    </div>
    <div class="kural-meaning">
        <p class="eng-meaning"></p>
    </div>
</div>
</div>`

document.body.prepend(div)

// ------------------- check inputdata validation --------------------
function check() {
  let inputData = document.getElementById('input-txt').value
  if (inputData == '') {
    alert('Please Enter a number between 1 to 1330 !!!')
  } else if (inputData == 0) {
    alert('Only number allows 1 to 1330 !!!')
  } else if (inputData > 1330) {
    alert('Please enter number below 1330')
  } else {
    search()
  }
}

// ------------------- fetch data using async & await ---------------------------
async function search() {
  try {
  let inputData = document.getElementById('input-txt').value
  let req = await fetch(
    `https://api-thirukkural.vercel.app/api?num=${inputData}`
  )
  let req1 = await req.json()

  let leftSection = document.querySelector('.kural-tamil')
  leftSection.style = 'transform: translateX(0%); transition: .7s;'

  let rightSection = document.querySelector('.kural-english')
  rightSection.style = 'transform: translateX(0%); transition: .7s;'

  //   ---------------------------- Tamil-section --------------------------------
  let count = req1.number
  document.querySelector('.tam-count').innerText = `குறள் - ${count}`

  let tamSection = req1.sect_tam
  document.querySelector('.tam-section').innerText = `பால்: ${tamSection}`

  let tamChapGrp = req1.chapgrp_tam
  document.querySelector('.tam-chap-grp').innerText = `இயல்: ${tamChapGrp}`

  let tamChap = req1.chap_tam
  document.querySelector('.tam-chap').innerText = `அதிகாரம்: ${tamChap}`

  let tamLine1 = req1.line1
  document.querySelector('.tam-line1').innerText = `${tamLine1}`

  let tamLine2 = req1.line2
  document.querySelector('.tam-line2').innerText = `${tamLine2}`

  let tamMean = req1.tam_exp
  document.querySelector('.tam-meaning').innerText = `${tamMean}`

  //   ---------------------------- English-section --------------------------------
  let engCount = req1.number
  document.querySelector('.eng-count').innerText = `Kural - ${engCount}`

  let engSection = req1.sect_eng
  document.querySelector('.eng-section').innerText = `Section: ${engSection}`

  let engChapGrp = req1.chapgrp_eng
  document.querySelector(
    '.eng-chap-grp'
  ).innerText = `Chapter-group: ${engChapGrp}`

  let engChap = req1.chap_eng
  document.querySelector('.eng-chap').innerText = `Chapter: ${engChap}`

  let engLine1 = req1.eng
  document.querySelector('.eng-line1').innerText = `${engLine1}`

  let engMean = req1.eng_exp
  document.querySelector('.eng-meaning').innerText = `${engMean}`
  
} catch (error) {
    console.log(error)
}
}

// --------------------- reset button function -----------------------
function reset() {
  let inputData = (document.getElementById('input-txt').value = '')
}
