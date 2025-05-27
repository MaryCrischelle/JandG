document.addEventListener('DOMContentLoaded', () => {
    const tableFinderForm = document.getElementById('tableFinder');
    const resultSection = document.getElementById('resultSection');
    const toggleDebugBtn = document.getElementById('toggleDebug');
    const debugInfo = document.getElementById('debugInfo');
    const availableNames = document.getElementById('availableNames');
    
    // Sample guest list with table assignments
    // In a real application, this could be loaded from a JSON file or API
    const guestList = {
        // Table 1
        "jeslee gloriane": 1,
        "jeslee": 1,
        "gloriane": 1,
        "mary crischelle": 1,
        "mary": 1,
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
    
    // Add all names in uppercase and without spaces for more flexible matching
    const normalizedGuestList = {};
    for (const guest in guestList) {
        const tableNumber = guestList[guest];
        // Add normalized versions (uppercase, no spaces)
        const normalized = guest.toUpperCase().replace(/\s+/g, '');
        normalizedGuestList[normalized] = tableNumber;
    }
    
    // Populate debug panel with available names
    function populateDebugPanel() {
        const nameListDiv = document.createElement('div');
        nameListDiv.className = 'name-list';
        
        Object.keys(guestList).sort().forEach(name => {
            const nameItem = document.createElement('div');
            nameItem.className = 'name-item';
            nameItem.textContent = `${name} (Table ${guestList[name]})`;
            nameItem.addEventListener('click', () => {
                document.getElementById('guestName').value = name;
            });
            nameListDiv.appendChild(nameItem);
        });
        
        availableNames.innerHTML = '';
        availableNames.appendChild(nameListDiv);
    }
    
    // Toggle debug panel visibility
    toggleDebugBtn.addEventListener('click', () => {
        debugInfo.classList.toggle('hidden');
        toggleDebugBtn.textContent = debugInfo.classList.contains('hidden') ? 
            'Show Debug Info' : 'Hide Debug Info';
        
        if (!debugInfo.classList.contains('hidden')) {
            populateDebugPanel();
        }
    });
    
    tableFinderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const guestNameInput = document.getElementById('guestName');
        const guestName = guestNameInput.value.trim().toLowerCase();
        
        if (guestName) {
            findTable(guestName);
        }
    });
    
    function findTable(guestName) {
        console.log("Searching for:", guestName);
        
        // First try exact match
        let tableNumber = guestList[guestName];
        let matchedName = guestName;
        let matchMethod = "exact";
        
        console.log("Exact match result:", tableNumber);
        
        // If no exact match, try normalized match
        if (!tableNumber) {
            const normalizedInput = guestName.toUpperCase().replace(/\s+/g, '');
            tableNumber = normalizedGuestList[normalizedInput];
            matchMethod = "normalized";
            
            console.log("Normalized match result:", tableNumber);
            
            // If still no match, try each word in the input separately
            if (!tableNumber) {
                const nameWords = guestName.split(/\s+/);
                console.log("Trying individual words:", nameWords);
                
                for (const word of nameWords) {
                    if (word.length < 2) continue; // Skip very short words
                    
                    console.log("Checking word:", word);
                    
                    // Try exact matches for each word
                    if (guestList[word]) {
                        tableNumber = guestList[word];
                        matchedName = word;
                        matchMethod = "word-exact";
                        console.log("Found word exact match:", word, tableNumber);
                        break;
                    }
                    
                    // Try partial matches
                    for (const guest in guestList) {
                        if (guest.includes(word)) {
                            tableNumber = guestList[guest];
                            matchedName = guest;
                            matchMethod = "word-partial";
                            console.log("Found word partial match:", word, "in", guest, tableNumber);
                            break;
                        }
                    }
                    
                    if (tableNumber) break; // Stop if we found a match
                }
                
                // If still no match, try fuzzy matching
                if (!tableNumber) {
                    console.log("Trying fuzzy matching");
                    
                    // Try if any guest name contains the input or vice versa
                    for (const guest in guestList) {
                        if (guest.includes(guestName) || guestName.includes(guest)) {
                            tableNumber = guestList[guest];
                            matchedName = guest;
                            matchMethod = "fuzzy-contains";
                            console.log("Found fuzzy match (contains):", guest, tableNumber);
                            break;
                        }
                    }
                    
                    // Last resort: character by character similarity
                    if (!tableNumber) {
                        let bestMatch = null;
                        let highestSimilarity = 0;
                        
                        for (const guest in guestList) {
                            const similarity = calculateSimilarity(guestName, guest);
                            console.log("Similarity between", guestName, "and", guest, "is", similarity);
                            
                            if (similarity > highestSimilarity && similarity > 0.4) { // 40% similarity threshold
                                highestSimilarity = similarity;
                                bestMatch = guest;
                            }
                        }
                        
                        if (bestMatch) {
                            tableNumber = guestList[bestMatch];
                            matchedName = bestMatch;
                            matchMethod = "fuzzy-similarity";
                            console.log("Found best fuzzy match:", bestMatch, tableNumber, "with similarity", highestSimilarity);
                        }
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
            console.log("Found table", tableNumber, "for", guestName, "using method:", matchMethod);
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
            console.log("No match found for:", guestName);
        }
        
        // Show the result section with animation
        resultSection.classList.add('visible');
        
        // Scroll to results if needed
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Helper function to calculate string similarity (Levenshtein distance based)
    function calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        // If the longer string is empty, both are empty, so similarity is 1
        if (longer.length === 0) return 1.0;
        
        // Calculate edit distance using Levenshtein distance
        const editDistance = levenshteinDistance(longer, shorter);
        
        // Calculate similarity as a ratio
        return (longer.length - editDistance) / parseFloat(longer.length);
    }
    
    // Levenshtein distance calculation
    function levenshteinDistance(str1, str2) {
        const m = str1.length;
        const n = str2.length;
        
        // Create a matrix of size (m+1) x (n+1)
        const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
        
        // Fill the first row and column
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        
        // Fill the rest of the matrix
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,      // deletion
                    dp[i][j - 1] + 1,      // insertion
                    dp[i - 1][j - 1] + cost // substitution
                );
            }
        }
        
        return dp[m][n];
    }
}); 