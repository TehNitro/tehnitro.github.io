const addItemButton = document.getElementById("add-button");
const newItemInput = document.getElementById("new-item");
const itemsContainer = document.querySelector(".items");
const removeButton = document.getElementById("remove-button");

addItemButton.addEventListener("click", () => {
    const newItemText = newItemInput.value.trim();
    if (newItemText !== "") {
        const newItem = createItem(newItemText);
        itemsContainer.appendChild(newItem);
        newItemInput.value = "";
    }
});

removeButton.addEventListener("click", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.remove();
    });
});

function createItem(text) {
    const item = document.createElement("div");
    item.classList.add("card");

    const itemText = document.createElement("p");
    itemText.textContent = text;
    item.appendChild(itemText);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa solid fa-check"></i>';
    deleteButton.addEventListener("click", () => {
        item.remove();
    });
    item.appendChild(deleteButton);

    return item;
}
