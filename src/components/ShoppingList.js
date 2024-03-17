import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchItem, setSearchItem] = useState("");
  const [addItems, setAddItem] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  const itemsToDisplay = addItems
    .filter((item) => {
      if (selectedCategory === "All") return true;
        return item.category === selectedCategory;
      })
    .filter((item) => {
      if (!searchItem) return true;
      return item.name.toLowerCase().includes(searchItem.toLocaleLowerCase());
    })
  function handleOnItemFormSubmit (newItem) {
      setAddItem([...addItems, newItem]);
    }
     

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleOnItemFormSubmit} />
      <Filter 
      search={searchItem} 
      onSearchChange={setSearchItem} 
      onCategoryChange={handleCategoryChange} 
      selectedCategory={selectedCategory} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
