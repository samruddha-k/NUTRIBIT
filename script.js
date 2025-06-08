document.getElementById('mealForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('customer-name').value;
  const mealPlan = document.getElementById('meal-plan').value;
  const address = document.getElementById('delivery-address').value;

  const confirmation = document.getElementById('order-confirmation');
  confirmation.textContent = `Order placed, ${name}! Your ${mealPlan} will be delivered to ${address}.`;

  this.reset();
});