// Inputs
const loanAmount = document.querySelector('#loan-amount');
const tenure = document.querySelector('#tenure');
const interestRate = document.querySelector('#interest-rate');

// InputSliders
const loanAmountSlider = document.querySelector('#loan-amount-slider');
const tenureSlider = document.querySelector('#tenure-slider');
const interestRateSlider = document.querySelector('#interest-rate-slider');

// Outputs
const monthlyEMI = document.querySelector('#monthly-emi');
const principalAmount = document.querySelector('#principal-amount');
const interestAmount = document.querySelector('#interest-amount');
const totalAmount = document.querySelector('#total-amount');

loadEventListeners();
calculateResults();

function loadEventListeners() {
  loanAmount.addEventListener('change', updateLoanSlider);
  tenure.addEventListener('change', updateTenureSlider);
  interestRate.addEventListener('change', updateInterestRateSlider);

  loanAmountSlider.addEventListener('change', updateLoanAmount);
  tenureSlider.addEventListener('change', updateTenure);
  interestRateSlider.addEventListener('change', updateInterestRate);
}

function calculateResults() {
  const P = parseFloat(loanAmount.value);
  const N = parseFloat(tenure.value) * 12;
  const R = parseFloat(interestRate.value) / 100 / 12;

  const X = Math.pow(1 + R, N);
  const monthlyEMICalculated = Math.round((P * X * R) / (X - 1));

  monthlyEMI.value = formatNumber(monthlyEMICalculated);
  principalAmount.value = formatNumber(loanAmount.value);
  interestAmount.value = formatNumber(monthlyEMICalculated * N - P);
  totalAmount.value = formatNumber(monthlyEMICalculated * N);

  renderChart(loanAmount.value, monthlyEMICalculated * N - P);
}

function formatNumber(num) {
  num = num.toString();
  let afterPoint = '';
  if (num.indexOf('.') > 0) {
    afterPoint = num.substring(num.indexOf('.'), num.length);
  }
  num = Math.floor(num);
  num = num.toString();
  let lastThree = num.substring(num.length - 3);
  let otherNumbers = num.substring(0, num.length - 3);
  if (otherNumbers != '') {
    lastThree = ',' + lastThree;
  }
  let res =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;

  return res;
}

// Update inputs
function updateLoanAmount(e) {
  loanAmount.value = e.target.value;
  calculateResults();
}

function updateTenure(e) {
  tenure.value = e.target.value;
  calculateResults();
}

function updateInterestRate(e) {
  interestRate.value = e.target.value;
  calculateResults();
}

// Update sliders
function updateLoanSlider(e) {
  loanAmountSlider.value = e.target.value;
  calculateResults();
}

function updateTenureSlider(e) {
  tenureSlider.value = e.target.value;
  calculateResults();
}

function updateInterestRateSlider(e) {
  interestRateSlider.value = e.target.value;
  calculateResults();
}

function renderChart(principal, interest) {
  let chart = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(chart, {
    type: 'pie',
    data: {
      labels: ['Principal Amount', 'Interest Amount'],
      datasets: [
        {
          label: '# of Votes',
          data: [`${principal}`, `${interest}`],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}
