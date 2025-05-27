document.addEventListener('DOMContentLoaded', () => {
    const tableFinderForm = document.getElementById('tableFinder');
    const resultSection = document.getElementById('resultSection');
    
    // Sample guest list with table assignments
    // In a real application, this could be loaded from a JSON file or API
    const guestList = {
        // Table 1
        "jeslee gloriane": 1,
        "jeslee": 1,
        "gloriane": 1,
        "mary crischelle": 1,
        "crischelle": 1,
        
        // Table 2
        "grace rapada": 2,
        "grace": 2,
        "rapada": 2,
        "john doe": 2,
        "jane doe": 2,
        
        // Table 3
        "jerven gloriane": 3,
        "jerven": 3,
        "james smith": 3,
        "sarah johnson": 3,
        
        // Table 4
        "michael brown": 4,
        "jennifer davis": 4,
        "robert wilson": 4,
        "lisa moore": 4,
        
        // Table 5
        "william taylor": 5,
        "elizabeth thomas": 5,
        "david anderson": 5,
        "patricia white": 5
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
        let matchedName = guestName;
        
        // If no exact match, try more flexible matching
        if (!tableNumber) {
            // Try each word in the input separately
            const nameWords = guestName.split(/\s+/);
            for (const word of nameWords) {
                if (word.length < 3) continue; // Skip very short words
                
                for (const guest in guestList) {
                    if (guest.includes(word)) {
                        tableNumber = guestList[guest];
                        matchedName = guest;
                        break;
                    }
                }
                
                if (tableNumber) break; // Stop if we found a match
            }
            
            // If still no match, try more aggressive matching
            if (!tableNumber) {
                for (const guest in guestList) {
                    // Check if any part of the guest name matches any part of the input
                    if (guest.includes(guestName) || guestName.includes(guest)) {
                        tableNumber = guestList[guest];
                        matchedName = guest;
                        break;
                    }
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