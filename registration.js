document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = this;
  
  // Get values
  const firstName = form.querySelector('input[type="text"]').value;
  const ticketType = form.querySelector('input[name="ticket-type"]:checked')?.nextSibling?.textContent.trim();
  const ticketCount = form.querySelector('input[type="number"]').value;
  
  // Show confirmation
  document.body.insertAdjacentHTML('beforeend', `
    <div class="confirmation-box" style="
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ffebee, #fff0f5);
      padding: 2rem; border-radius: 15px; box-shadow: 0 0 25px rgba(139, 69, 19, 0.4);
      border: 2px solid #ff69b4; z-index: 1000; max-width: 500px;
      text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif;
    ">
      <h3 style="color: #c02121;">🎉 Registration Successful! 🎉</h3>
      <div style="background: rgba(255, 215, 0, 0.2); padding: 1rem; border-radius: 10px; margin: 1rem 0; text-align: left;">
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Tickets:</strong> ${ticketCount} × ${ticketType || 'General'}</p>
        
      </div>
      <div style="color: #138808; font-weight: bold; margin: 1rem 0; display: flex; align-items: center; justify-content: center; gap: 10px;">
        <span style="color: #ff69b4; font-size: 1.5rem;">✓</span>
        Your registration completed successfully!
      </div>
      <button style="padding: 0.6rem 1.2rem; background-color: #4e342e; color: white; border: none; border-radius: 5px; cursor: pointer;"
        onclick="this.parentElement.remove(); form.reset();">
        Close
      </button>
    </div>
  `);
  
  // Auto-reset after display
  form.reset();
});