let selectedSectionId = null;
let selectedItemId = null;
var primaryWeights = [0,[0,0,0,0,0,0]];
var secondaryWeights = [0,[0,0,0,0,0,0]];
var tertiaryWeights = [0,[0,0,0,0,0,0]];

// List of restricted weapons
const restrictedWeapons = [
    "TFC_W_c6", 
    "TFC_W_c6a1", 
    "TFC_W_c20", 
    "TFC_launch_CarlG_M3", 
    "rhs_weap_maaws"
];

// List of restricted attachments
const restrictedAttachments = [
    // Special Sights

    // All Suppressors
    "TFC_WA_huxwrx_556",
    "TFC_WA_556_Ops_painted",
    "TFC_WA_opsinc_556",
    "TFC_WA_556_Ops_painted_tw",
    "TFC_WA_556_Ops_painted_wo",
    "TFC_WA_c20_suppressor"
];

// Load data globally
fetch('weapons.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        window.weaponsData = data
        renderWeaponSections(data);
        populateWeaponDropdown('primaryWeapon', data.sections.find(s => s.id === "primary").weapons);
        populateWeaponDropdown('secondaryWeapon', data.sections.find(s => s.id === "secondary").weapons);
        populateWeaponDropdown('tertiaryWeapon', data.sections.find(s => s.id === "tertiary").weapons);
        attachWeaponEventListeners(data);
        attachEventListenersForAll();
        attachWeaponWarnings();
    })
    .catch((error) => {
        console.error('Error loading weapons.json:', error);
    });

fetch('gear.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        window.gearData = data
        renderFillableGearSections(data);
        renderHeadGearSections(data);
        renderOtherGearSections(data);
        attachEventListenersForAll();
    })
    .catch((error) => {
        console.error('Error loading gear.json:', error);
    });

fetch('items.json')
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

// Function to check if the selected weapon is a restricted weapon
function checkRestrictedWeapon(selectElement) {
    // Remove any existing warning
    const existingWarning = selectElement.nextElementSibling;
    if (existingWarning && existingWarning.classList.contains('warning-message')) {
        existingWarning.remove();
    }

    const selectedValue = selectElement.value;

    if (restrictedWeapons.includes(selectedValue)) {
        // Create warning message
        const warningMessage = document.createElement('div');
        warningMessage.classList.add('warning-message');
        warningMessage.textContent = "⚠ Warning: Ensure this weapon is part of your orders!";
        warningMessage.style.color = "#ff0000";
        warningMessage.style.fontWeight = "bold";
        warningMessage.style.marginBottom = "5px";

        // Insert warning below the dropdown
        selectElement.parentNode.insertBefore(warningMessage, selectElement.nextSibling);
    }
}

// Attach the weapon warning event listener to all weapon dropdowns
function attachWeaponWarnings() {
    document.querySelectorAll('select[id$="Weapon"]').forEach(select => {
        select.addEventListener('change', function() {
            checkRestrictedWeapon(this);
        });
    });
}

// Function to copy output string to clipboard
function copyFunction() {
    var copyText = document.getElementById("textbox");
    copyText.select();
    navigator.clipboard.writeText(copyText.value).then(() => {
        showPopup();
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Function to show the copy popup
function showPopup() {
    var popup = document.getElementById("customPopup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000); // Hide after 2 seconds
}

// Function to add dropdown groups
function populateWeaponDropdown(dropdownId, weapons) {
    const selectElement = document.getElementById(dropdownId);
    if (!selectElement) return;
    selectElement.innerHTML = '';  // Clear existing options

    // Add "None" option at the top of the dropdown
    const noneOption = document.createElement('option');
    noneOption.value = "";
    noneOption.textContent = "-- None --";
    noneOption.style.color = "white"
    selectElement.appendChild(noneOption);

    // Create optgroup elements for normal and restricted weapons
    const normalGroup = document.createElement('optgroup');
    normalGroup.label = "⟶ Unrestricted Weapons ⟵";

    const restrictedGroup = document.createElement('optgroup');
    restrictedGroup.label = "⟶ On Order ⟵";
    restrictedGroup.style.color = "#007888";

    weapons.forEach(weapon => {
        const option = document.createElement('option');
        option.value = weapon.id;
        option.textContent = weapon.name;

        // Check if the weapon is restricted and add to the respective group
        if (restrictedWeapons.includes(weapon.id)) {
            option.style.color = "#007888";
            restrictedGroup.appendChild(option);
        } else {
            normalGroup.appendChild(option);
        }
    });

    // Add groups to dropdown only if they have options
    if (normalGroup.children.length > 0) {
        selectElement.appendChild(normalGroup);
    }
    if (restrictedGroup.children.length > 0) {
        selectElement.appendChild(restrictedGroup);
    }
}

// Function to generate import string
function generateImportString() {
    let loadout = [
        [
            ["", "", "", "", ["", 1000], ["", 1000], ""], // Primary weapon
            ["", "", "", "", ["", 1000], ["", 1000], ""], // Secondary weapon
            ["", "", "", "", ["", 1000], ["", 1000], ""], // Tertiary weapon
            ["", []], // Uniform
            ["", []], // Vest
            ["", []], // Backpack
            "", // Headgear
            "", // Facewear
            ["", "", "", "", ["", 1000], [], ""], // Binoculars
            ["", "", "", "", "", ""] // Map, Terminal, Communication, Navigation, Watch, NVGs
        ],
        [
            ["", ""], // Insignia
            ["ace_earplugs", true] // Earplugs
        ]
    ];

    // Map dropdown selections to loadout
    document.querySelectorAll('select').forEach(select => {
        const selectedValue = select.value; // Use the value for ID mapping
        const selectId = select.id;

        // Primary Weapon
        if (selectId.includes("primaryWeapon")) loadout[0][0][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("primarymuzzlesAttachment")) loadout[0][0][1] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("primaryrailsAttachment")) loadout[0][0][2] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("primarysightsAttachment")) loadout[0][0][3] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("primaryprimaryMagazinesAttachment")) loadout[0][0][4][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("primarysecondaryMagazinesAttachment")) loadout[0][0][5][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("primaryundermountsAttachment")) loadout[0][0][6] = selectedValue !== "None" ? selectedValue : "";

        // Secondary Weapon
        else if (selectId.includes("secondaryWeapon")) loadout[0][1][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("secondarymuzzlesAttachment")) loadout[0][1][1] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("secondaryrailsAttachment")) loadout[0][1][2] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("secondarysightsAttachment")) loadout[0][1][3] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("secondaryprimaryMagazinesAttachment")) loadout[0][1][4][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("secondarysecondaryMagazinesAttachment")) loadout[0][1][5][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("secondaryundermountsAttachment")) loadout[0][1][6] = selectedValue !== "None" ? selectedValue : "";

        // Tertiary Weapon
        else if (selectId.includes("tertiaryWeapon")) loadout[0][2][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("tertiarymuzzlesAttachment")) loadout[0][2][1] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("tertiaryrailsAttachment")) loadout[0][2][2] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("tertiarysightsAttachment")) loadout[0][2][3] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("tertiaryprimaryMagazinesAttachment")) loadout[0][2][4][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("tertiarysecondaryMagazinesAttachment")) loadout[0][2][5][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("tertiaryundermountsAttachment")) loadout[0][2][6] = selectedValue !== "None" ? selectedValue : "";

        // Uniform, Vest, Backpack
        else if (selectId.includes("uniform")) loadout[0][3][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("vest")) loadout[0][4][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("backpack")) loadout[0][5][0] = selectedValue !== "None" ? selectedValue : "";

        // Other Gear
        else if (selectId.includes("headgear")) loadout[0][6] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("facewear")) loadout[0][7] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("binoculars")) loadout[0][8][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("map")) loadout[0][9][0] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("terminal")) loadout[0][9][1] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("communication")) loadout[0][9][2] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("navigation")) loadout[0][9][3] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("watch")) loadout[0][9][4] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("nvgs")) loadout[0][9][5] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("insignia")) loadout[1][0][1] = selectedValue !== "None" ? selectedValue : "";
        else if (selectId.includes("earplugs")) loadout[1][1][1] = selectedValue !== "None" ? selectedValue : "";
    });

    // Add items to uniform, vest, backpack
    ["uniform", "vest", "backpack"].forEach((gearType, index) => {
        const list = document.getElementById(`${gearType}ItemList`);
        if (list) {
            const items = Array.from(list.querySelectorAll(".item-list")).map(item => {
                const itemId = item.id;
                const quantity = parseInt(item.querySelector(".item-quantity").textContent, 10) || 1;
                if (item.dataset.section === "magazines" || item.dataset.section === "throwables" || item.dataset.section === "explosives") {
                    return [itemId, quantity, 1000];
                }
                else {
                    return [itemId, quantity];
                }
            });
            loadout[0][3 + index][1] = items;
        }
    });

    // Convert loadout to JSON format
    const importString = JSON.stringify(loadout);

    // Update the textarea
    document.getElementById("textbox").textContent = importString;
}

// Function to render weapon sections
function renderWeaponSections(data) {
    const weaponSections = document.getElementById('weaponSections');

    data.sections.forEach((section) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('section');

        const header = document.createElement('h3');
        header.textContent = section.name;
        header.style.width = "calc(100% + 2 * 15px)";
        header.style.marginLeft = "-15px";
        header.style.marginRight = "-15px";
        header.style.marginTop = "0px";
        sectionDiv.appendChild(header);

        const weaponLabel = document.createElement('itemlabel');
        weaponLabel.setAttribute('for', `${section.id}Weapon`);
        weaponLabel.textContent = `Select ${section.name}:`;
        sectionDiv.appendChild(weaponLabel);

        const weaponSelect = document.createElement('select');
        weaponSelect.id = `${section.id}Weapon`;
        const weaponOptions = [`<option value="None">-- None --</option>`];
        section.weapons.forEach((weapon) => {
            weaponOptions.push(`<option value="${weapon.id}">${weapon.name}</option>`);
        });
        weaponSelect.innerHTML = weaponOptions.join('');
        sectionDiv.appendChild(weaponSelect);

        // Placeholder dropdowns for attachments
        [
            'sights', 
            'rails', 
            'muzzles', 
            'undermounts', 
            'primaryMagazines', 
            'secondaryMagazines'
        ].forEach((type) => {
            const label = document.createElement('itemlabel');
            label.setAttribute('for', `${section.id}${type}Attachment`);
            label.textContent = `${type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Attachment:`;
            sectionDiv.appendChild(label);

            const select = document.createElement('select');
            select.id = `${section.id}${type}Attachment`;
            select.innerHTML = `<option value="None">-- None --</option>`;
            sectionDiv.appendChild(select);
        });

        weaponSections.appendChild(sectionDiv);
    });
}

// Function to render fillable gear sections with modal
function renderFillableGearSections(data) {
    const fillableGearSections = document.getElementById('fillableGearSections');

    data.sections.forEach(section => {
        if (section.id === "uniform" || section.id === "vest" || section.id === "backpack") {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');

            // Section header
            const header = document.createElement('h3');
            header.style.width = "calc(100% + 2 * 15px)";
            header.style.marginLeft = "-15px";
            header.style.marginRight = "-15px";
            header.style.marginTop = "0px";
            header.textContent = section.name;
            sectionDiv.appendChild(header);

            // Dropdown for selecting gear
            const select = document.createElement('select');
            select.id = section.id;
            select.innerHTML = `<option value="">-- Select ${section.name} --</option>`;
            section.options.forEach(option => {
                select.innerHTML += `<option value="${option.id}">${option.name}</option>`;
            });
            sectionDiv.appendChild(select);

            // Progress bar section
            const progressContainer = document.createElement('div');
            progressContainer.classList.add('progress-container');
            progressContainer.id = `${section.id}ProgressContainer`;

            const progress = document.createElement('progress');
            progress.id = `${section.id}Progress`;
            progress.min = 0;
            progress.max = 100;
            progress.value = 0;
            progressContainer.appendChild(progress);

            const progressText = document.createElement('div');
            progressText.classList.add('progress-text');
            progressText.id = `${section.id}ProgressText`;
            progressText.textContent = '0.00 / 0.00 lbs';
            progressContainer.appendChild(progressText);
            sectionDiv.appendChild(progressContainer);

            // Update text content based on value and max
            function updateProgressText() {
                const value = parseFloat(progress.value).toFixed(2);
                const max = parseFloat(progress.max).toFixed(2);
                progressText.textContent = value + ' / ' + max + ' lbs';
            }

            // Item list
            const itemList = document.createElement('ul');
            itemList.classList.add('scrollable-ul');
            itemList.id = `${section.id}ItemList`;
            sectionDiv.appendChild(itemList);

            // Add item button (centered)
            const addItemContainer = document.createElement('div');
            addItemContainer.classList.add('centered-button');

            const addItemButton = document.createElement('button');
            addItemButton.textContent = '+ Add Item';
            addItemButton.classList.add('add-item-btn');
            addItemButton.style.opacity = '0.5';
            addItemButton.addEventListener('click', (event) => {
                if (addItemButton.style.opacity === '0.5') {
                    var popup = document.getElementById("customPopup3");
                    popup.style.display = "block";
                    setTimeout(() => {
                        popup.style.display = "none";
                    }, 2000);
                } else {
                    showCategoryModal(section.id);
                }
            });
            addItemContainer.appendChild(addItemButton);

            sectionDiv.appendChild(addItemContainer);

            // Append everything to the main container
            fillableGearSections.appendChild(sectionDiv);

            // Enable the Add Item button when gear is selected
            select.addEventListener('change', () => {
                if (select.value) {
                    addItemButton.style.opacity = '1';
                    progress.max = parseFloat(section.options.find(option => option.id === select.value).load).toFixed(2);
                    updateProgressText();
                } else {
                    addItemButton.style.opacity = '0.5';
                    progress.value = 0;
                    progressText.textContent = '0.00 / 0.00 lbs';
                }
            });

            // Create a modal for item selection
            const modalDiv = document.createElement('div');
            modalDiv.id = `${section.id}Modal`;
            modalDiv.classList.add('modal');
            modalDiv.innerHTML = `
                <div id="modal-view" class="modal-content">
                    <h3 style="width: calc(100% + 2 * 20px);margin-left: -20px;margin-right: -20px;margin-top: -20px">Select an Item Category for ${section.name}</h3>
                    <ul id="${section.id}ModalCategoryList" class="scrollable-list"></ul>
                    <div id="${section.id}ModalButtons" style="display: flex; justify-content: center;">
                        <button id="${section.id}BackButton" class="modal-btns" onclick="">Back</button>
                        <button id="${section.id}ConfirmSelectionBtn" class="modal-btns" onclick="">Confirm</button>
                    </div>
                    <button style="margin-bottom: -5px" class="modal-btns" onclick="closeModal('${section.id}')">Cancel</button>
                </div>
            `;
            document.body.appendChild(modalDiv);
        }
    });
}

// Function to show the category selection modal
function showCategoryModal(sectionId) {
    selectedSectionId = sectionId;
    const modal = document.getElementById(`${sectionId}Modal`);
    modal.style.display = 'block';

    const categoryList = document.getElementById(`${sectionId}ModalCategoryList`);
    categoryList.innerHTML = ''; // Clear previous categories

    let modalButtons = document.getElementById(`${sectionId}ModalButtons`);
    modalButtons.style.display = 'none';

    // Load categories dynamically
    window.itemsData.sections.forEach(section => {
        const listItem = document.createElement('li');
        listItem.textContent = section.name;
        listItem.onclick = () => showItemSelection(sectionId, section, section.id);
        categoryList.appendChild(listItem);
    });
}

// Function to show items within the selected category
function showItemSelection(sectionId, category, itemSectionId) {
    const categoryList = document.getElementById(`${sectionId}ModalCategoryList`);
    categoryList.innerHTML = ''; // Clear previous content

    let modalButtons = document.getElementById(`${sectionId}ModalButtons`);
    modalButtons.style.display = 'flex';

    if (category.options) {
        category.options.forEach(option => {
            const listItem = document.createElement('li');
            listItem.textContent = option.name;
            listItem.dataset.id = option.id;
            listItem.onclick = () => selectItem(option.id, option.name, itemSectionId);
            categoryList.appendChild(listItem);
        });
    }

    if (category.groupings) {
        category.groupings.forEach(group => {
            const groupHeader = document.createElement('h4');
            groupHeader.textContent = group.name;
            categoryList.appendChild(groupHeader);

            group.options.forEach(option => {
                const listItem = document.createElement('li');
                listItem.textContent = option.name;
                listItem.dataset.id = option.id;
                listItem.onclick = () => selectItem(option.id, option.name, itemSectionId);
                categoryList.appendChild(listItem);
            });
        });
    }

    // Handle button behaviours
    const backButton = document.getElementById(`${sectionId}BackButton`);
    backButton.onclick = () => showCategoryModal(sectionId);
    const confirmButton = document.getElementById(`${sectionId}ConfirmSelectionBtn`);
    confirmButton.onclick = () => confirmItemSelection(sectionId, itemSectionId);
}

// Function to select an item
function selectItem(itemId, itemName, itemSectionId) {
    selectedItemId = itemId;

    // Highlight the selected item
    document.querySelectorAll(`#${selectedSectionId}ModalCategoryList li`).forEach(item => {
        item.style.backgroundColor = '';
    });

    event.target.style.backgroundColor = '#ffcc00'; // Highlight selected item

    // Check if a confirm button exists, and create it dynamically if not
    let confirmBtn = document.getElementById(`${selectedSectionId}-confirmSelectionBtn`);
    if (!confirmBtn) {
        confirmBtn = document.createElement('button');
        confirmBtn.id = `${selectedSectionId}-confirmSelectionBtn`; // Unique ID per section
        confirmBtn.textContent = 'Confirm';
        confirmBtn.classList.add('modal-btns');
        confirmBtn.onclick = () => confirmItemSelection(selectedSectionId, itemSectionId);
        document.getElementById(`${sectionId}ModalButtons`).appendChild(confirmBtn);
    } else {
        confirmBtn.hidden = false;
    }
}

// Function to confirm and add the selected item to the list
function confirmItemSelection(sectionId, itemSectionId) {
    if (!selectedItemId) {
        var popup = document.getElementById("customPopup4");
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 2000);
        return;
    }

    const selectedItemText = document.querySelector(`[data-id="${selectedItemId}"]`).textContent;
    const itemList = document.getElementById(`${sectionId}ItemList`);

    // Check if the item already exists in the list
    const existingItem = itemList.querySelector(`#${CSS.escape(selectedItemId)}`);
    if (existingItem) {
        var popup = document.getElementById("customPopup2");
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 2000);
        return;
    }

    // Retrieve the current progress and max weight
    const progress = document.getElementById(`${sectionId}Progress`);
    const progressText = document.getElementById(`${sectionId}ProgressText`);
    const currentWeight = parseFloat(progress.value);
    const maxWeight = parseFloat(progress.max);

    // Get the weight of the selected item (assuming weight is stored in itemsData)
    var itemData = null;
    if (itemSectionId === "throwables" || itemSectionId === "magazines") {
        const section = window.itemsData.sections.find(section => section.id === itemSectionId);
        const group = section?.groupings.find(group => group.options.some(option => option.id === selectedItemId));
        itemData = group?.options.find(option => option.id === selectedItemId);
    } else {
        itemData = window.itemsData.sections
        .find(section => section.id === itemSectionId)
        ?.options.find(option => option.id === selectedItemId);
    }
    const itemWeight = itemData ? itemData.weight : 0;

    // Check if adding the item would exceed the weight limit
    const newWeight = currentWeight + itemWeight;
    if (newWeight > maxWeight) {
        var popup = document.getElementById("customPopup5");
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 2000);
        return;
    }

    // Create the item row
    const listItem = document.createElement('li');
    listItem.classList.add('item-list');
    listItem.id = selectedItemId;
    listItem.dataset.section = itemSectionId;

    const itemName = document.createElement('span');
    itemName.textContent = selectedItemText;
    listItem.appendChild(itemName);

    // Quantity controls
    const controls = document.createElement('div');
    controls.classList.add('item-controls');

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    minusBtn.onclick = () => adjustItemQuantity(quantitySpan, -1);
    controls.appendChild(minusBtn);

    const quantitySpan = document.createElement('span');
    quantitySpan.textContent = '1';
    quantitySpan.classList.add('item-quantity');
    controls.appendChild(quantitySpan);

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.onclick = () => adjustItemQuantity(quantitySpan, 1);
    controls.appendChild(plusBtn);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeItem(listItem, itemList);
    controls.appendChild(removeBtn);

    listItem.appendChild(controls);
    itemList.appendChild(listItem);

    // Update the progress bar and text
    progress.value = newWeight;
    progressText.textContent = `${newWeight.toFixed(2)} / ${maxWeight.toFixed(2)} lbs`;

    // Dispatch custom event
    const event = new CustomEvent('itemAdded', { detail: { itemId: selectedItemId, section: itemSectionId } });
    itemList.dispatchEvent(event);

    // Close modal and reset
    closeModal(sectionId);
    selectedItemId = null; // Reset selection
}

// Close modal function
function closeModal(sectionId) {
    const modal = document.getElementById(`${sectionId}Modal`);
    modal.style.display = 'none';

    // Reset the modal content
    const categoryList = document.getElementById(`${sectionId}ModalCategoryList`);
    categoryList.innerHTML = ''; // Clear the list for reuse
    selectedItemId = null; // Reset the selected item
}

// Function to adjust item quantity
function adjustItemQuantity(element, change) {
    const listItem = element.closest('.item-list');
    const sectionId = listItem.closest('.scrollable-ul').id.replace('ItemList', '');
    const progress = document.getElementById(`${sectionId}Progress`);
    const progressText = document.getElementById(`${sectionId}ProgressText`);
    const currentWeight = parseFloat(progress.value);
    const maxWeight = parseFloat(progress.max);

    // Get the item weight (assuming weight is stored in itemsData)
    const itemId = listItem.id;
    const itemSectionId = listItem.dataset.section;
    var itemData = null;
    if (itemSectionId === "throwables" || itemSectionId === "magazines") {
        const section = window.itemsData.sections.find(section => section.id === itemSectionId);
        const group = section?.groupings.find(group => group.options.some(option => option.id === itemId));
        itemData = group?.options.find(option => option.id === itemId);
    } else {
        itemData = window.itemsData.sections
        .find(section => section.id === itemSectionId)
        ?.options.find(option => option.id === itemId);
    }
    const itemWeight = itemData ? itemData.weight : 0;

    // Calculate the new quantity and weight
    let quantity = parseInt(element.textContent, 10);
    const newQuantity = quantity + change;
    const newWeight = currentWeight + itemWeight * change;

    // Prevent decreasing below 1 or exceeding the weight limit
    if (newQuantity < 1) {
        quantity = 1; // Ensure the minimum quantity is 1
    } else if (newWeight > maxWeight) {
        // Show popup if the weight exceeds the limit
        var popup = document.getElementById("customPopup5");
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 2000);
        return;
    } else {
        quantity = newQuantity; // Update quantity only if valid
        progress.value = newWeight; // Update progress bar
    }

    // Update the quantity and progress text
    element.textContent = quantity;
    progressText.textContent = `${parseFloat(progress.value).toFixed(2)} / ${maxWeight.toFixed(2)} lbs`;

    // Dispatch a custom event for quantity change
    const itemList = listItem.closest('.scrollable-ul');
    const event = new CustomEvent('quantityChanged', {
        detail: { itemId: listItem.id, newQuantity: quantity },
    });
    itemList.dispatchEvent(event);
}

// Function to remove an item from the list
function removeItem(listItem, itemList) {
    const sectionId = itemList.id.replace('ItemList', ''); // Get the section ID (e.g., "uniform", "vest")
    const progress = document.getElementById(`${sectionId}Progress`);
    const progressText = document.getElementById(`${sectionId}ProgressText`);
    const currentWeight = parseFloat(progress.value);

    // Get the item weight (assuming weight is stored in itemsData)
    const itemId = listItem.id;
    const itemSectionId = listItem.dataset.section;
    var itemData = null;
    if (itemSectionId === "throwables" || itemSectionId === "magazines") {
        const section = window.itemsData.sections.find(section => section.id === itemSectionId);
        const group = section?.groupings.find(group => group.options.some(option => option.id === itemId));
        itemData = group?.options.find(option => option.id === itemId);
    } else {
        itemData = window.itemsData.sections
        .find(section => section.id === itemSectionId)
        ?.options.find(option => option.id === itemId);
    }
    const itemWeight = itemData ? itemData.weight : 0;

    // Get the quantity of the item
    const quantity = parseInt(listItem.querySelector('.item-quantity').textContent, 10);

    // Calculate the total weight to subtract
    const totalWeightToRemove = itemWeight * quantity;

    // Update the progress bar
    const newWeight = Math.max(0, currentWeight - totalWeightToRemove); // Ensure weight doesn't go below 0
    progress.value = newWeight;
    progressText.textContent = `${newWeight.toFixed(2)} / ${parseFloat(progress.max).toFixed(2)} lbs`;

    // Remove the item from the list
    itemList.removeChild(listItem);

    // Dispatch a custom event for item removal
    const event = new CustomEvent('itemRemoved', { detail: { itemId: listItem.id } });
    itemList.dispatchEvent(event);
}

// Function to render head gear sections
function renderHeadGearSections(data) {
    const headGearSections = document.getElementById('headGearSections');

    data.sections.forEach((section) => {
        if (section.id == "headgear" || section.id == "facewear" || section.id == "nvgs") {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');

            const header = document.createElement('h3');
            header.textContent = section.name;
            header.style.width = "calc(100% + 2 * 15px)";
            header.style.marginLeft = "-15px";
            header.style.marginRight = "-15px";
            header.style.marginTop = "0px";
            sectionDiv.appendChild(header);

            const label = document.createElement('itemlabel');
            label.setAttribute('for', section.id);
            label.textContent = `Select ${section.name}:`;
            sectionDiv.appendChild(label);

            const select = document.createElement('select');
            select.id = section.id;
            const options = [`<option value="None">-- None --</option>`];
            section.options.forEach((option) => {
                options.push(`<option value="${option.id}">${option.name}</option>`);
            });
            select.innerHTML = options.join('');
            sectionDiv.appendChild(select);

            headGearSections.appendChild(sectionDiv);
        }
    });
}

// Function to render other gear sections
function renderOtherGearSections(data) {
    const otherGearSections = document.getElementById('otherGearSections');
    otherGearSections.style.display = 'flex';
    otherGearSections.style.flexWrap = 'wrap';
    otherGearSections.style.gap = '20px';

    data.sections.forEach((section) => {
        if (section.id == "binoculars" || section.id == "map" || section.id == "terminal" || section.id == "communication") {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');
            sectionDiv.style.flex = '1 1 25%';
            sectionDiv.style.order = '0';

            const header = document.createElement('h3');
            header.textContent = section.name;
            header.style.width = "calc(100% + 2 * 15px)";
            header.style.marginLeft = "-15px";
            header.style.marginRight = "-15px";
            header.style.marginTop = "0px";
            sectionDiv.appendChild(header);

            const label = document.createElement('itemlabel');
            label.setAttribute('for', section.id);
            label.textContent = `Select ${section.name}:`;
            sectionDiv.appendChild(label);

            const select = document.createElement('select');
            select.id = section.id;
            const options = [];
            if (section.id == "communication") {
                options.push(`<option value="None">Option Not Available</option>`);
                select.style.pointerEvents = 'none';
                select.style.opacity = '0.5';
            }
            else {
                options.push(`<option value="None">-- None --</option>`);
            }
            section.options.forEach((option) => {
                options.push(`<option value="${option.id}">${option.name}</option>`);
            });
            select.innerHTML = options.join('');
            sectionDiv.appendChild(select);

            otherGearSections.appendChild(sectionDiv);
        }
        else if (section.id == "navigation" || section.id == "watch" || section.id == "insignia" || section.id == "earplugs") {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');
            sectionDiv.style.flex = '1 1 25%';
            sectionDiv.style.order = '1';

            const header = document.createElement('h3');
            header.textContent = section.name;
            header.style.width = "calc(100% + 2 * 15px)";
            header.style.marginLeft = "-15px";
            header.style.marginRight = "-15px";
            header.style.marginTop = "0px";
            sectionDiv.appendChild(header);

            const label = document.createElement('itemlabel');
            label.setAttribute('for', section.id);
            if (section.id == "earplugs") {
                label.textContent = `${section.name}:`;
            }
            else {
                label.textContent = `Select ${section.name}:`;
            }
            sectionDiv.appendChild(label);

            const select = document.createElement('select');
            select.id = section.id;
            const options = [];
            if (section.id == "earplugs") {}
            else {
                options.push(`<option value="None">-- None --</option>`);
            }
            section.options.forEach((option) => {
                options.push(`<option value="${option.id}">${option.name}</option>`);
            });
            select.innerHTML = options.join('');
            sectionDiv.appendChild(select);

            otherGearSections.appendChild(sectionDiv);
        }
    });
}

// Update attachment dropdowns based on selected weapon
function updateAttachments(weapon, sectionId, data) {
    const selectedWeapon = weapon.value;
    const sectionData = data.sections.find(section => section.id === sectionId);
    const weaponData = sectionData ? sectionData.weapons.find(w => w.id === selectedWeapon) : null;

    if (!weaponData || !weaponData.attachments) {
        return;
    }

    // Update each attachment type (sights, rails, muzzles, undermounts, etc.)
    Object.keys(weaponData.attachments).forEach(type => {
        const select = document.getElementById(`${sectionId}${type}Attachment`);
        if (!select) return;

        select.innerHTML = ''; // Clear existing options

        // Add "None" option
        const noneOption = document.createElement('option');
        noneOption.value = "None";
        noneOption.textContent = `-- None --`;
        noneOption.style.color = "white"
        select.appendChild(noneOption);

        // Create optgroups for normal and restricted attachments
        const normalGroup = document.createElement('optgroup');
        normalGroup.label = `⟶ Unrestricted ${type.charAt(0).toUpperCase() + type.slice(1)} ⟵`;

        const restrictedGroup = document.createElement('optgroup');
        restrictedGroup.label = `⟶ On Order ${type.charAt(0).toUpperCase() + type.slice(1)} ⟵`;
        restrictedGroup.style.color = "#007888"; // Highlight restricted attachments

        weaponData.attachments[type].forEach(attachment => {
            const option = document.createElement('option');
            option.value = attachment.id;
            option.textContent = attachment.name;

            // Check if attachment is restricted and add to the respective group
            if (restrictedAttachments.includes(attachment.id)) {
                option.style.color = "#007888";  // Highlight restricted attachment
                restrictedGroup.appendChild(option);
            } else {
                normalGroup.appendChild(option);
            }
        });

        // Append groups to the dropdown if they contain options
        if (normalGroup.children.length > 0) {
            select.appendChild(normalGroup);
        }
        if (restrictedGroup.children.length > 0) {
            select.appendChild(restrictedGroup);
        }
    });
}

// Attach change event listeners to weapon dropdowns
function attachWeaponEventListeners(data) {
    data.sections.forEach(section => {
        const weaponSelect = document.getElementById(`${section.id}Weapon`);
        weaponSelect.addEventListener('change', (event) => updateAttachments(event.target, section.id, data));
    });
}

// Function to update import string when any option is changed
function attachEventListenersForAll() {
    // Attach a change event listener to each select element
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', generateImportString);
    });

    // Attach listeners for item changes in uniform, vest, and backpack lists
    ['uniform', 'vest', 'backpack'].forEach(sectionId => {
        const itemList = document.getElementById(`${sectionId}ItemList`);
        if (itemList) {
            // Listen for item addition
            itemList.addEventListener('itemAdded', generateImportString);

            // Listen for item removal
            itemList.addEventListener('itemRemoved', generateImportString);

            // Listen for item quantity changes
            itemList.addEventListener('quantityChanged', generateImportString);
        }
    });
}