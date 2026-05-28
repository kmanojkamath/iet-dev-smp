export function searchItems(
  items,
  searchText,
  selectedCategory,
  selectedPrice,
) {
  const search = searchText.toLowerCase();

  const score = (item) => {
    const name = item.name.toLowerCase();
    const category = item.category.toLowerCase();
    const description = item.description.toLowerCase();

    if (search === "") return 0;

    if (name.startsWith(search)) return 1;

    if (name.split(" ").some((word) => word.startsWith(search))) return 2;

    if (name.includes(search)) return 3;

    if (category.includes(search)) return 4;

    if (description.startsWith(search)) return 5;

    if (description.split(" ").some((word) => word.startsWith(search)))
      return 6;

    if (description.includes(search)) return 7;

    return 8;
  };

  return items
    .filter((item) => {
      const matchesSearch =
        search === "" ||
        item.name.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search);

      const matchesCategory =
        item.category === selectedCategory ||
        selectedCategory === "all";

      const matchesPrice =
        selectedPrice === "all" ||
        (selectedPrice === "-20" && item.price < 20) ||
        (selectedPrice === "20-40" &&
          item.price >= 20 &&
          item.price <= 40) ||
        (selectedPrice === "40-" && item.price > 40);

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => score(a) - score(b));
}

export function countItems(
  items,
  searchText,
  selectedCategory,
  selectedPrice,
) {
  const search = searchText.toLowerCase();

  return items.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.name.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search);

    const matchesCategory =
      item.category === selectedCategory ||
      selectedCategory === "all";

    const matchesPrice =
      selectedPrice === "all" ||
      (selectedPrice === "-20" && item.price < 20) ||
      (selectedPrice === "20-40" &&
        item.price >= 20 &&
        item.price <= 40) ||
      (selectedPrice === "40-" && item.price > 40);

    return matchesSearch && matchesCategory && matchesPrice;
  }).length;
}