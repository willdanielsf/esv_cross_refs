d3.csv("data.csv").then(data => {
  // Create a hierarchical structure from CSV data
  const buildTreeData = (rows, parentId = '') =>
    rows
      .filter(row => row.parent === parentId)
      .map(row => ({
        id: row.id,
        name: row.id, // Display name (you can modify this to match the column name)
        value: row.value,
        children: buildTreeData(rows, row.id), // Recursive call to build children
      }));

  const treeData = buildTreeData(data);

  // Create columns for the table
  const columns = [
    { id: 'book', name: 'Book', editable: false, width: 150 },
    { id: 'chapter', name: 'Chapter', editable: false, width: 100 },
    { id: 'verse', name: 'Verse', editable: false, width: 100 },
    { id: 'letter', name: 'Letter', editable: false, width: 100 },
    { id: 'word', name: 'Word', editable: false, width: 150 },
    { id: 'wordIndex', name: 'Word Index', editable: false, width: 100 },
    { id: 'originalBook', name: 'Original Book', editable: false, width: 150 },
    { id: 'originalChapter', name: 'Original Chapter', editable: false, width: 100 },
    { id: 'reverseRef', name: 'Reverse Ref', editable: false, width: 150 },
    { id: 'crossRefText', name: 'Cross Ref Text', editable: false, width: 150 },
    { id: 'testament', name: 'Testament', editable: false, width: 100 },
    { id: 'allRefs', name: 'All Refs', editable: false, width: 200 },
  ];

  // Map data to match the columns structure
  const tableData = data.map(row => ({
    book: row.book,
    chapter: row.chapter,
    verse: row.verse,
    letter: row.letter,
    word: row.word,
    wordIndex: row.wordIndex,
    originalBook: row.originalBook,
    originalChapter: row.originalChapter,
    reverseRef: row.reverseRef,
    crossRefText: row.crossRefText,
    testament: row.testament,
    allRefs: row.allRefs,
  }));

  // Initialize the Frappe DataTable
  new DataTable('#tree-table-container', {
    columns: columns,
    data: tableData,
    treeView: true, // Enable tree view mode
    layout: 'fluid', // Responsive layout
    inlineFilters: true, // Allow filtering
  });
});
