export function searchItems(items, searchText) {
  const search = searchText.toLowerCase();

  const score = (item) => {
    const name = item.name.toLowerCase();
    const category = item.category.toLowerCase();
    const description = item.description.toLowerCase();

    if (search === "") return 0;

    if (name.startsWith(search)) return 1;

    if (
      name
        .split(" ")
        .some((word) => word.startsWith(search))
    )
      return 2;

    if (name.includes(search)) return 3;

    if (category.includes(search)) return 4;

    if (description.startsWith(search)) return 5;

    if (
      description
        .split(" ")
        .some((word) => word.startsWith(search))
    )
      return 6;

    if (description.includes(search)) return 7;

    return 8;
  };

  return items
    .filter((item) => {
      return (
        search === "" ||
        item.name.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => score(a) - score(b));
}

export function countItems(items, searchText) {
    const search = searchText.toLowerCase();
    return items.filter((item) => {
      return (
        search === "" ||
        item.name.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      );
    }).length;
}