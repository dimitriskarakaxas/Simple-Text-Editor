const formattedText = document.getElementById('text-output');
document.getElementById('left-align').classList.add('active');

let startOfHighlighting, endOfHighlighting;


// UPDATE #text-output whenever something is written in #text-input
updateText = () => {
  let [...text] = document.getElementById('text-input').value;
  console.log(text);
  let outputSpans = "";
  for (let i = 0; i < text.length; i++) {
    outputSpans += `<span class="pos-${i}">${text[i]}</span>`
  }
  formattedText.innerHTML = outputSpans;
}

checkClassExistence = (className) => {
  let classExists, classNonExists;
  classExists = classNonExists = false;

  for (let i = startOfHighlighting; i < endOfHighlighting; i++) {
    if (document.querySelector(`.pos-${i}`).classList.contains(`${className}`)) {
      classExists = true;
    } else {
      classNonExists = true;
    }
  }
  console.log(classExists, classNonExists);
  
  return [classExists, classNonExists];
}


makeBold = (elem) => { 
  let [boldClassExists, boldClassNonExists] = checkClassExistence("bold");
  if (boldClassExists && boldClassNonExists) {
    for (let i = startOfHighlighting; i < endOfHighlighting; i++) {
      document.querySelector(`.pos-${i}`).classList.add('bold');
    }
  } else {
    for (let i = startOfHighlighting; i < endOfHighlighting; i++) {
      document.querySelector(`.pos-${i}`).classList.toggle('bold');
    }
  }
}

makeItalic = (elem) => {
  let [italicClassExists, italicClassNonExists] = checkClassExistence("italic");
  if (italicClassExists && italicClassNonExists) {
    for (let i = startOfHighlighting; i < endOfHighlighting; i++) {
      document.querySelector(`.pos-${i}`).classList.add('italic');
    }
  } else {
    for (let i = startOfHighlighting; i < endOfHighlighting; i++) {
      document.querySelector(`.pos-${i}`).classList.toggle('italic');
    }
  }
}


makeUnderline = (elem) => {
  let [underlineClassExists, underlineClassNonExists] = checkClassExistence("underline");
  if (underlineClassExists && underlineClassNonExists) {
    for (let i = startOfHighlighting; i < endOfHighlighting; i++) {
      document.querySelector(`.pos-${i}`).classList.add('underline');
    }
  } else {
    for (let i = startOfHighlighting; i < endOfHighlighting; i++) {
      document.querySelector(`.pos-${i}`).classList.toggle('underline');
    }
  }
}


alignText = (elem, alignType) => {
  formattedText.style.textAlign = alignType; // Style input
  
  let buttonList = document.getElementsByClassName('align'); // Style buttons
  for (button of buttonList) {
    buttonList[i].classList.remove('active');
  }
  elem.classList.add('active');
}



getSelectionRange = () => {
  let startOfHighlighting, endOfHighlighting;
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (activeElTagName === "textarea") {
    startOfHighlighting = activeEl.selectionStart;
    endOfHighlighting = activeEl.selectionEnd;
  }
  return [startOfHighlighting, endOfHighlighting];
}

document.getElementById('text-input').addEventListener('mouseup', function() {
  [startOfHighlighting, endOfHighlighting] = getSelectionRange(); 
})