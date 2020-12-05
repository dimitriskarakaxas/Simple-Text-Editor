const formattedText = document.getElementById('text-output');
document.getElementById('left-align').classList.add('active');

let highlightedTextList = [];


// UPDATE #text-output whenever something is written in #text-input
function updateText(){
  let [...text] = document.getElementById('text-input').value;
  let outputSpans = "";
  for (let i = 0; i < text.length; i++) {
    outputSpans += `<span class="pos-${i}">${text[i]}</span>`
  }
  formattedText.innerHTML = outputSpans;
}


function getIndicesOf(searchStr, str) {
  let searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  let startIndex = 0, index, indices = []; 
  while ((index = str.indexOf(searchStr, startIndex)) != -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}


function makeBold(elem){
  elem.classList.toggle('active');
  
  // get the existing text from #text-input text-area
  const text = document.getElementById('text-input').value;
  const highlightedText = highlightedTextList[highlightedTextList.length-1];
  
  let indices = getIndicesOf(highlightedText, text).length;

  if (indices === 1) {
    const highlightedTextStart = text.indexOf(highlightedText);
    const highlightedTextEnd = highlightedTextStart + highlightedText.length;
    for (let i = highlightedTextStart; i < highlightedTextEnd; i++) {
      document.querySelector(`.pos-${i}`).classList.toggle('bold');
    }
  } else {
    console.log(`There is multiple instances of "${highlightedText}"`);
  }

  
}


function makeItalic(elem){
  elem.classList.toggle('active');
  formattedText.classList.toggle('italic');
}


function makeUnderline(elem){
  elem.classList.toggle('active');
  if (formattedText.classList.contains('underline')) {
    formattedText.classList.remove('underline');
  } else {
    formattedText.classList.add('underline');
  }
}


function alignText(elem, alignType){
  formattedText.style.textAlign = alignType; // Style input
  
  let buttonList = document.getElementsByClassName('align'); // Style buttons
  for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].classList.remove('active');
  }
  elem.classList.add('active');
}


function getSelectionText() {
  var text = "";
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (activeElTagName === "textarea") {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    console.log(activeEl.selectionStart, activeEl.selectionEnd);
  }
  return text;
}

document.getElementById('text-input').addEventListener("mouseup", function(){
  let markedText = getSelectionText();
  if (markedText != "") {
    highlightedTextList.push(markedText);
  }
})
