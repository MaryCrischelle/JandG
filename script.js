document.addEventListener('DOMContentLoaded', () => {
    const tableFinderForm = document.getElementById('tableFinder');
    const resultSection = document.getElementById('resultSection');
    
    // Sample guest list with table assignments
    // In a real application, this could be loaded from a JSON file or API
    const guestList = {
        // Table 1
        "john smith": 1,
        "jane smith": 1,
        "michael johnson": 1,
        "sarah johnson": 1,
        
        // Table 2
        "robert williams": 2,
        "emily williams": 2,
        "david brown": 2,
        "jennifer brown": 2,
        
        // Table 3
        "james davis": 3,
        "mary davis": 3,
        "william miller": 3,
        "patricia miller": 3,
        
        // Table 4
        "richard wilson": 4,
        "linda wilson": 4,
        "thomas moore": 4,
        "barbara moore": 4,
        
        // Table 5
        "joseph taylor": 5,
        "elizabeth taylor": 5,
        "charles anderson": 5,
        "margaret anderson": 5,
        
        // Table 6
        "christopher thomas": 6,
        "susan thomas": 6,
        "daniel jackson": 6,
        "nancy jackson": 6,
        
        // Table 7
        "matthew white": 7,
        "lisa white": 7,
        "anthony harris": 7,
        "karen harris": 7,
        
        // Table 8
        "mark martin": 8,
        "betty martin": 8,
        "donald thompson": 8,
        "dorothy thompson": 8
    };
    
    tableFinderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const guestNameInput = document.getElementById('guestName');
        const guestName = guestNameInput.value.trim().toLowerCase();
        
        if (guestName) {
            findTable(guestName);
        }
    });
    
    function findTable(guestName) {
        // First try exact match
        let tableNumber = guestList[guestName];
        
        // If no exact match, try to find a partial match
        if (!tableNumber) {
            // Check if the entered name is part of any guest name in the list
            for (const guest in guestList) {
                if (guest.includes(guestName) || guestName.includes(guest)) {
                    tableNumber = guestList[guest];
                    break;
                }
            }
        }
        
        // Clear previous results
        resultSection.innerHTML = '';
        
        if (tableNumber) {
            // Guest found - display table assignment
            const resultHTML = `
                <div class="table-result">
                    <p>We're delighted to have you join us!</p>
                    <p>Your table number is:</p>
                    <span class="table-number">${tableNumber}</span>
                    <p>We look forward to celebrating with you!</p>
                </div>
            `;
            resultSection.innerHTML = resultHTML;
        } else {
            // Guest not found - display error message
            const errorHTML = `
                <div class="error-message">
                    <p>We couldn't find your name in our guest list.</p>
                    <p>Please check your spelling or speak with the wedding party for assistance.</p>
                    <p>Try entering your full name (first and last name).</p>
                </div>
            `;
            resultSection.innerHTML = errorHTML;
        }
        
        // Show the result section with animation
        resultSection.classList.add('visible');
        
        // Scroll to results if needed
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}); 