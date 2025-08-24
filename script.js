const display = document.getElementById("display");

function appendValue(value) {
  display.value += value;
  liveResult();
}

function clearDisplay() {
  display.value = "";
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
  liveResult();
}

function calculateResult() {
  try {
    display.value = eval(display.value.replace('÷', '/').replace('×', '*'));
  } catch {
    display.value = "Error";
  }
}

// Live result as you type
function liveResult() {
  try {
    let exp = display.value.replace('÷', '/').replace('×', '*');
    if (exp !== "" && !/[^0-9+\-*/%.]/.test(exp)) {
      let result = eval(exp);
      if (result !== undefined) {
        // Temporary preview result (without replacing full input)
        display.setAttribute("data-result", result);
      }
    } else {
      display.removeAttribute("data-result");
    }
  } catch {
    display.removeAttribute("data-result");
  }
}

// Keyboard Support
document.addEventListener("keydown", function(event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/.%".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    deleteChar();
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  } else if (key === ".") {
    appendValue(".");
  }
});
