document.addEventListener("DOMContentLoaded", () => {
  initializeCalculators();
});

function initializeCalculators() {
  const forms = document.querySelectorAll(".calculator-form");
  if (!forms.length) {
    return;
  }

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const resultBox = form.nextElementSibling;
      if (!resultBox) {
        return;
      }

      clearMessage(resultBox);
      clearFields(resultBox);

      const calculatorType = form.dataset.calculator;

      try {
        if (calculatorType === "sip") {
          calculateSip(form, resultBox);
        } else if (calculatorType === "stepup") {
          calculateStepUpSip(form, resultBox);
        } else if (calculatorType === "lumpsum") {
          calculateLumpSum(form, resultBox);
        } else if (calculatorType === "swp") {
          calculateSwp(form, resultBox);
        } else {
          setMessage(resultBox, "Unsupported calculator type.");
        }
      } catch (error) {
        setMessage(resultBox, "Unable to calculate. Please verify your inputs.");
      }
    });
  });
}

function calculateSip(form, resultBox) {
  const monthly = getValue(form, "monthly");
  const annualReturn = getValue(form, "annualReturn");
  const years = getValue(form, "years");

  if (!(monthly > 0) || !(years > 0) || annualReturn < 0 || !isFiniteNumber(annualReturn)) {
    setMessage(resultBox, "Enter valid values for SIP calculation.");
    return;
  }

  const months = Math.round(years * 12);
  const monthlyRate = annualReturn / 12 / 100;
  const totalInvestment = monthly * months;

  let finalValue = totalInvestment;
  if (monthlyRate > 0) {
    finalValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  }

  const totalReturns = finalValue - totalInvestment;

  setFields(resultBox, {
    totalInvestment: formatCurrency(totalInvestment),
    totalReturns: formatCurrency(totalReturns),
    finalValue: formatCurrency(finalValue)
  });
}

function calculateStepUpSip(form, resultBox) {
  const initialMonthly = getValue(form, "initialMonthly");
  const stepUp = getValue(form, "stepUp");
  const annualReturn = getValue(form, "annualReturn");
  const years = getValue(form, "years");

  if (!(initialMonthly > 0) || !(years > 0) || stepUp < 0 || annualReturn < 0 || !isFiniteNumber(stepUp) || !isFiniteNumber(annualReturn)) {
    setMessage(resultBox, "Enter valid values for Step-Up SIP calculation.");
    return;
  }

  const months = Math.round(years * 12);
  const monthlyRate = annualReturn / 12 / 100;
  const yearlyStepFactor = 1 + stepUp / 100;

  let corpus = 0;
  let totalInvestment = 0;

  for (let month = 1; month <= months; month += 1) {
    const yearIndex = Math.floor((month - 1) / 12);
    const monthlyContribution = initialMonthly * Math.pow(yearlyStepFactor, yearIndex);
    corpus = corpus * (1 + monthlyRate) + monthlyContribution;
    totalInvestment += monthlyContribution;
  }

  setFields(resultBox, {
    totalInvestment: formatCurrency(totalInvestment),
    finalValue: formatCurrency(corpus)
  });
}

function calculateLumpSum(form, resultBox) {
  const amount = getValue(form, "amount");
  const annualReturn = getValue(form, "annualReturn");
  const years = getValue(form, "years");

  if (!(amount > 0) || !(years > 0) || annualReturn < 0 || !isFiniteNumber(annualReturn)) {
    setMessage(resultBox, "Enter valid values for Lump Sum calculation.");
    return;
  }

  const finalInvestmentValue = amount * Math.pow(1 + annualReturn / 100, years);
  const totalGain = finalInvestmentValue - amount;

  setFields(resultBox, {
    totalGain: formatCurrency(totalGain),
    finalInvestmentValue: formatCurrency(finalInvestmentValue)
  });
}

function calculateSwp(form, resultBox) {
  const initialInvestment = getValue(form, "initialInvestment");
  const monthlyWithdrawal = getValue(form, "monthlyWithdrawal");
  const annualReturn = getValue(form, "annualReturn");
  const years = getValue(form, "years");

  if (!(initialInvestment > 0) || !(years > 0) || monthlyWithdrawal < 0 || annualReturn < 0 || !isFiniteNumber(monthlyWithdrawal) || !isFiniteNumber(annualReturn)) {
    setMessage(resultBox, "Enter valid values for SWP calculation.");
    return;
  }

  const months = Math.round(years * 12);
  const monthlyRate = annualReturn / 12 / 100;

  let balance = initialInvestment;
  let totalAmountWithdrawn = 0;

  for (let month = 1; month <= months; month += 1) {
    balance *= 1 + monthlyRate;
    const withdrawal = Math.min(monthlyWithdrawal, balance);
    balance -= withdrawal;
    totalAmountWithdrawn += withdrawal;

    if (balance <= 0) {
      balance = 0;
      break;
    }
  }

  setFields(resultBox, {
    totalAmountWithdrawn: formatCurrency(totalAmountWithdrawn),
    remainingBalance: formatCurrency(balance)
  });
}

function getValue(form, name) {
  const input = form.querySelector(`[name="${name}"]`);
  if (!input) {
    return NaN;
  }
  return Number.parseFloat(input.value);
}

function setFields(resultBox, values) {
  Object.entries(values).forEach(([key, value]) => {
    const field = resultBox.querySelector(`[data-field="${key}"]`);
    if (field) {
      field.textContent = value;
    }
  });
}

function clearFields(resultBox) {
  resultBox.querySelectorAll("strong[data-field]").forEach((field) => {
    field.textContent = "-";
  });
}

function setMessage(resultBox, message) {
  const messageNode = resultBox.querySelector('[data-field="message"]');
  if (messageNode) {
    messageNode.textContent = message;
  }
}

function clearMessage(resultBox) {
  const messageNode = resultBox.querySelector('[data-field="message"]');
  if (messageNode) {
    messageNode.textContent = "";
  }
}

function formatCurrency(value) {
  const safeValue = Math.max(0, value);
<<<<<<< HEAD
  return `\u20B9${safeValue.toLocaleString("en-IN", {
=======
  return `?${safeValue.toLocaleString("en-IN", {
>>>>>>> 0ec26c944e581c14d8750868498e45eecffd771b
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}

function isFiniteNumber(value) {
  return Number.isFinite(value);
<<<<<<< HEAD
}

=======
}

>>>>>>> 0ec26c944e581c14d8750868498e45eecffd771b
