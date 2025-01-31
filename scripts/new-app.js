// Load data globally
fetch('data/weapons.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        window.weaponsData = data;
        populateWeaponDropdowns();
    })
    .catch((error) => {
        console.error('Error loading weapons.json:', error);
    });

fetch('data/gear.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        window.gearData = data;
    })
    .catch((error) => {
        console.error('Error loading gear.json:', error);
    });

fetch('data/items.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        window.itemsData = data;
    })
    .catch((error) => {
        console.error('Error loading items.json:', error);
    });

// Function to populate weapon dropdowns
function populateWeaponDropdowns() {
    document.querySelectorAll('select').forEach(select => {
        if(select.id === "primaryWeaponSelect" || select.id === "secondaryWeaponSelect" || select.id === "tertiaryWeaponSelect") {
            // Clear existing options
            if (!select) return;
            select.innerHTML = '';

            // Add "None" option at the top of the dropdown
            const noneOption = document.createElement('option');
            noneOption.value = "";
            noneOption.textContent = "-- None --";
            noneOption.style.color = "white"
            select.appendChild(noneOption);
        }
    });
}