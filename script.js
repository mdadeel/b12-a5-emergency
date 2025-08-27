let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];
document.addEventListener('DOMContentLoaded', function() {
    
    //elements 
    const heartCountElement = document.getElementById('heartCount');
    const coinCountElement = document.getElementById('coinCount');
    const copyCountElement = document.getElementById('copyCount');
    const callHistoryList = document.getElementById('callHistoryList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    
    // heart button
    const heartButtons = document.querySelectorAll('.heart-btn');
    
    // copy buttons
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    // call buttons
    const callButtons = document.querySelectorAll('.call-btn');
    
    // heart count
    function updateHeartCount() {
        heartCountElement.textContent = heartCount;
    }
    
    // coin count
    function updateCoinCount() {
        coinCountElement.textContent = coinCount;
    }
    
    // copy count
    function updateCopyCount() {
        copyCountElement.textContent = copyCount + ' Copy';
    }
    
    // current time (from online)
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return hours + ':' + minutes + ' ' + ampm;
    }
    
    // call history
    function addCallToHistory(serviceName, serviceNumber) {
        const currentTime = getCurrentTime();
        
        //  history
        const historyItem = {
            name: serviceName,
            number: serviceNumber,
            time: currentTime
        };
        
        callHistory.unshift(historyItem);
        
        updateCallHistoryDisplay();
    }
    
    // call history 
    function updateCallHistoryDisplay() {
        // Clear existing history
        callHistoryList.innerHTML = '';
        
        callHistory.forEach(function(item) {
            const listItem = document.createElement('li');
            listItem.className = 'text-xs sm:text-sm';
            
            listItem.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-semibold">${item.name}</p>
                        <p class="text-gray-500 text-xs">${item.number}</p>
                    </div>
                    <div>
                        <p class="text-xs">${item.time}</p>
                    </div>
                </div>
            `;
            
            callHistoryList.appendChild(listItem);
        });
    }
    
    // clear call history
    function clearCallHistory() {
        callHistory = [];
        updateCallHistoryDisplay();
        alert('Call history cleared successfully!');
    }
    
    // copy text to clipboard
    function copyToClipboard(text) {
        // Create a temporary textarea element
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        
        // Select copy 
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            return true;
        } catch (err) {
            console.log('Copy failed:', err);
            return false;
        } finally {
            document.body.removeChild(tempTextArea);
        }
    }
    
    // heart buttons
    heartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Change heart icon to filled
            const heartIcon = button.querySelector('i');
            
            if (heartIcon.classList.contains('fa-regular')) {
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
                button.classList.remove('text-gray-400');
                button.classList.add('text-red-500');
                heartCount++;
                updateHeartCount();
                
            } else {
                heartIcon.classList.remove('fa-solid');
                heartIcon.classList.add('fa-regular');
                button.classList.remove('text-red-500');
                button.classList.add('text-gray-400');
                heartCount--;
                updateHeartCount();
            }
        });
    });

    copyButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Find the parent card
            const card = button.closest('[data-service]');
            const serviceNumber = card.getAttribute('data-number');
            const serviceName = card.getAttribute('data-service');
            
            const copySuccess = copyToClipboard(serviceNumber);
            
            if (copySuccess) {
                copyCount++;
                updateCopyCount();
                
                // alert
                alert(`${serviceName} number (${serviceNumber}) copied to clipboard!`);
            } else {
                // error alert
                alert('Failed to copy number. Please try again.');
            }
        });
    });
    
    callButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const card = button.closest('[data-service]');
            const serviceNumber = card.getAttribute('data-number');
            const serviceName = card.getAttribute('data-service');
            
            if (coinCount < 20) {
                alert('Insufficient coins! You need at least 20 coins to make a call. Current balance: ' + coinCount + ' coins.');
                return;
            }
            
            // reduce 20 coins
            coinCount -= 20;
            updateCoinCount();

            alert(`Calling ${serviceName} at ${serviceNumber}... 20 coins deducted. Remaining coins: ${coinCount}`);
            
            // Add  call history
            addCallToHistory(serviceName, serviceNumber);
        });
    });
    
    clearHistoryBtn.addEventListener('click', function() {
        clearCallHistory();
    });

    updateHeartCount();
    updateCoinCount();
    updateCopyCount();
    updateCallHistoryDisplay();
    
    console.log('Emergency Service Directory JavaScript loaded successfully!');
});

function addNewService(serviceName, serviceNumber, category, iconPath) {
    console.log('Adding new service:', serviceName);
}


function getStatistics() {
    return {
        totalHearts: heartCount,
        totalCoins: coinCount,
        totalCopies: copyCount,
        totalCalls: callHistory.length
    };
}

function resetAllCounts() {
    heartCount = 0;
    coinCount = 100;
    copyCount = 0;
    callHistory = [];
    

    document.getElementById('heartCount').textContent = heartCount;
    document.getElementById('coinCount').textContent = coinCount;
    document.getElementById('copyCount').textContent = copyCount + ' Copy';

    const heartButtons = document.querySelectorAll('.heart-btn');
    heartButtons.forEach(function(button) {
        const heartIcon = button.querySelector('i');
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
        button.classList.remove('text-red-500');
        button.classList.add('text-gray-400');
    });
    
    // Clear history
    document.getElementById('callHistoryList').innerHTML = '';
    
    console.log('All counts reset successfully!');
}