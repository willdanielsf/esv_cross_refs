d3.csv("data.csv").then(data => {
  // Create a hierarchical structure from CSV data
  const buildTreeData = (rows, parentId = '') =>
    rows
      .filter(row => row.parent === parentId)
      .map(row => ({
        id: row.id,
        name: row.id, // Display name
        value: row.value,
        children: buildTreeData(rows, row.id), // Recursive call to build children
      }));

  const treeData = buildTreeData(data);

  // Create columns for the table
  const columns = [
    { id: 'name', name: 'Category', editable: false, width: 300 },
    { id: 'value', name: 'Value', editable: false, width: 100 },
  ];

  // Initialize the Frappe DataTable
  new DataTable('#tree-table-container', {
    columns: columns,
    data: treeData,
    treeView: true, // Enable tree view mode
    layout: 'fluid', // Responsive layout
    inlineFilters: true, // Allow filtering
  });
});
