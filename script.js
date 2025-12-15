const searchBtn = document.getElementById("searchBtn");
const nameInput = document.getElementById("nameInput");
const result = document.getElementById("result");

searchBtn.addEventListener("click", fetchGuest);

async function fetchGuest() {
  const name = nameInput.value.trim().toLowerCase();
  result.textContent = "Searching...";

  try {
    const response = await fetch("guest.json");
    const guests = await response.json();

    if (!name) {
      result.textContent = "⚠️ Please enter a name.";
      return;
    }

    const guest = guests.find(
      g => g.name.toLowerCase().includes(name)
    );

    if (guest) {
      result.innerHTML = `
        💖 Welcome, <strong>${guest.title} ${guest.name}</strong><br>
        Your table number is <strong>${guest.category}Table ${guest.table}</strong>
      `;
    } else {
      result.textContent = "❌ Name not found. Please check spelling.";
    }

  } catch (error) {
    result.textContent = "⚠️ Unable to load guest list.";
  }
}
