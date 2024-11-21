d3.csv("data.csv").then(data => {
  // Populate Book and Chapter Select dropdowns dynamically
  const bookSelect = document.getElementById("book-select");
  const chapterSelect = document.getElementById("chapter-select");

  // Get unique books and chapters
  const books = [...new Set(data.map(row => row.book))];
  const chapters = [...new Set(data.map(row => row.chapter))];

  // Populate the book dropdown
  books.forEach(book => {
    const option = document.createElement("option");
    option.value = book;
    option.textContent = book;
    bookSelect.appendChild(option);
  });

  // Populate the chapter dropdown
  chapters.forEach(chapter => {
    const option = document.createElement("option");
    option.value = chapter;
    option.textContent = chapter;
    chapterSelect.appendChild(option);
  });

  // Function to filter data by selected book and chapter
  const filterData = (book, chapter) => {
    return data.filter(row => {
      const matchBook = book ? row.book === book : true;
      const matchChapter = chapter ? row.chapter === chapter : true;
      return matchBook && matchChapter;
    });
  };

  // Function to update the table with filtered data
  const updateTable = (filteredData) => {
    const columns = [
      { id: 'book', name: 'Book', editable: false, width: 150 },
      { id: 'chapter', name: 'Chapter', editable: false, width: 100 },
      { id: 'verse', name: 'Verse', editable: false, width: 100 },
      { id: 'letter', name: 'Letter', editable: false, width: 100 },
      { id: 'word', name: 'Word', editable: false, width: 100 },
      { id: 'word_index', name: 'Word Index', editable: false, width: 100 },
      { id: 'original_book', name: 'Original Book', editable: false, width: 150 },
      { id: 'original_chapter', name: 'Original Chapter', editable: false, width: 150 },
      { id: 'reverse_ref', name: 'Reverse Ref', editable: false, width: 150 },
      { id: 'cross_ref_text', name: 'Cross Ref Text', editable: false, width: 150 },
      { id: 'testament', name: 'Testament', editable: false, width: 150 },
      { id: 'all_refs', name: 'All Refs', editable: false, width: 200 },
    ];

    // Reinitialize the Frappe DataTable with filtered data
    new DataTable('#tree-table-container', {
      columns: columns,
      data: filteredData,
      layout: 'fluid', // Responsive layout
      inlineFilters: true, // Allow filtering
    });
  };

  // Listen to the submit button click event
  document.getElementById("submit-btn").addEventListener("click", () => {
    const selectedBook = bookSelect.value;
    const selectedChapter = chapterSelect.value;

    // Filter data based on selected book and chapter
    const filteredData = filterData(selectedBook, selectedChapter);

    // Update the table with the filtered data
    updateTable(filteredData);
  });
});

////////////////////////////////////
/**
d3.csv("data.csv").then(data => {
  // Populate Book and Chapter Select dropdowns dynamically
  const bookSelect = document.getElementById("book-select");
  const chapterSelect = document.getElementById("chapter-select");

  // Get unique books and chapters
  const books = [...new Set(data.map(row => row.book))];
  const chapters = [...new Set(data.map(row => row.chapter))];

  // Populate the book dropdown
  books.forEach(book => {
    const option = document.createElement("option");
    option.value = book;
    option.textContent = book;
    bookSelect.appendChild(option);
  });

  // Populate the chapter dropdown (for now, for all chapters)
  chapters.forEach(chapter => {
    const option = document.createElement("option");
    option.value = chapter;
    option.textContent = chapter;
    chapterSelect.appendChild(option);
  });

  // Function to filter data by selected book and chapter
  const filterData = (book, chapter) => {
    return data.filter(row => {
      const matchBook = book ? row.book === book : true;
      const matchChapter = chapter ? row.chapter === chapter : true;
      return matchBook && matchChapter;
    });
  };

  // Function to update the table with filtered data
  const updateTable = (filteredData) => {
    const treeData = buildTreeData(filteredData);

    // Create columns for the table
    const columns = [
      { id: 'Book', name: 'Book', editable: false, width: 300 },
      { id: 'Chapter', name: 'Chapter', editable: false, width: 100 },
      { id: 'Verse', name: 'Verse', editable: false, width: 100 },
      { id: 'Letter', name: 'Letter', editable: false, width: 100 },
      { id: 'Word', name: 'Word', editable: false, width: 100 },
      { id: 'Word Index', name: 'Word Index', editable: false, width: 100 },
      { id: 'Original Book', name: 'Original Book', editable: false, width: 100 },
      { id: 'Original Chapter', name: 'Original Chapter', editable: false, width: 100 },
      { id: 'Reverse Ref', name: 'Reverse Ref', editable: false, width: 100 },
      { id: 'Cross Ref Text', name: 'Cross Ref Text', editable: false, width: 100 },
      { id: 'Testament', name: 'Testament', editable: false, width: 100 },
      { id: 'All Refs', name: 'All Refs', editable: false, width: 100 },
    ];

    // Initialize the Frappe DataTable
    new DataTable('#tree-table-container', {
      columns: columns,
      data: treeData,
      treeView: true, // Enable tree view mode
      layout: 'fluid', // Responsive layout
      inlineFilters: true, // Allow filtering
    });
  };

  // Build hierarchical data structure
  const buildTreeData = (rows, parentId = '') =>
    rows
      .filter(row => row.parent === parentId)
      .map(row => ({
        id: row.id,
        name: row.word, // You can adjust this to any other field
        value: row.value,
        children: buildTreeData(rows, row.id), // Recursive call to build children
      }));

  // Listen to the submit button click event
  document.getElementById("submit-btn").addEventListener("click", () => {
    const selectedBook = bookSelect.value;
    const selectedChapter = chapterSelect.value;

    // Filter data based on selected book and chapter
    const filteredData = filterData(selectedBook, selectedChapter);

    // Update the table with the filtered data
    updateTable(filteredData);
  });

});
*/
////////////////////////////////////////////////////////////////////
/**d3.csv("data.csv").then(data => {
  // Create a hierarchical structure from CSV data
  const buildTreeData = (rows, parentId = '', processedIds = new Set()) => {
    // Prevent infinite recursion by checking if the parentId has already been processed
    if (processedIds.has(parentId)) return [];
    processedIds.add(parentId); // Mark this parentId as processed

    return rows
      .filter(row => row.parent === parentId)
      .map(row => ({
        id: row.id,
        name: row.word, // You can adjust this to any other field
        value: row.value,
        children: buildTreeData(rows, row.id, processedIds), // Recursive call to build children
      }));
  };

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
*/
