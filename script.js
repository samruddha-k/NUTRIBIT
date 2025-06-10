document.addEventListener('DOMContentLoaded', () => {
  let cart = [];

  // Mobile Menu Toggle
  document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
  });

  // Meal Data (Hardcoded for GitHub Pages)
  const meals = [
    { id: 1, name: 'Vegan Glow Bowl', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', description: 'Quinoa, avocado, and kale ($12)' },
    { id: 2, name: 'Keto Steak Feast', image: 'https://images.unsplash.com/photo-1550305080-4e029753abcf', description: 'Steak with cauliflower ($15)' },
    { id: 3, name: 'Veggie Fiesta', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', description: 'Veggies with hummus ($10)' }
  ];

  // Display Meals
  const mealList = document.getElementById('meal-list');
  mealList.innerHTML = meals.map(meal => `
    <div class="meal-card">
      <img src="${meal.image}" alt="${meal.name}">
      <h3>${meal.name}</h3>
      <p>${meal.description}</p>
      <button class="btn" onclick="addToCart(${meal.id}, '${meal.name}')">Add to Cart</button>
    </div>
  `).join('');

  // Add to Cart
  window.addToCart = function(id, name) {
    cart.push({ id, name });
    document.getElementById('cart-count').textContent = cart.length;
    showConfetti();
  };

  // View Cart
  window.viewCart = function() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      alert('Your Cart: ' + cart.map(item => item.name).join(', '));
    }
  };

  // Mood Matcher
  document.getElementById('moodForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const diet = document.getElementById('diet-pref').value;
    const mood = document.getElementById('mood').value;
    const suggestions = {
      vegan: { happy: ['Vegan Glow Bowl'], cozy: ['Veggie Fiesta'], light: ['Vegan Glow Bowl'] },
      keto: { happy: ['Keto Steak Feast'], cozy: ['Keto Steak Feast'], light: ['Keto Steak Feast'] },
      vegetarian: { happy: ['Veggie Fiesta'], cozy: ['Veggie Fiesta'], light: ['Vegan Glow Bowl'] }
    };
    const result = suggestions[diet]?.[mood] || ['No meals found!'];
    document.getElementById('mood-results').textContent = `Try: ${result.join(', ')}`;
  });

  // Scroll to Section
  window.scrollToSection = function(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  // Confetti Animation
  function showConfetti() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(piece => {
        piece.y += piece.speed;
        ctx.fillStyle = piece.color;
        ctx.fillRect(piece.x, piece.y, piece.size, piece.size);
        if (piece.y > canvas.height) piece.y = -piece.size;
      });
      requestAnimationFrame(animate);
    }

    animate();
    setTimeout(() => canvas.remove(), 1500);
  }
});