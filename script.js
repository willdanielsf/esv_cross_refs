// Set dimensions
const width = 800;
const height = 400;
const margin = { top: 20, right: 90, bottom: 30, left: 90 };

// Append SVG
const svg = d3
  .select("#tree")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Create a tree layout
const treeLayout = d3.tree().size([height, width - 160]);

// Load the CSV file
d3.csv("data.csv").then(data => {
  // Convert flat CSV data into a hierarchy
  const root = d3.stratify()
    .id(d => d.id)       // Use `id` as the node name
    .parentId(d => d.parent)(data); // Use `parent` for relationships

  // Generate the tree
  treeLayout(root);

  // Links (connections)
  svg
    .selectAll(".link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3
      .linkHorizontal()
      .x(d => d.y)
      .y(d => d.x)
    )
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 2);

  // Nodes (circles and labels)
  const node = svg
    .selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.y},${d.x})`);

  // Draw circles
  node
    .append("circle")
    .attr("r", 5)
    .attr("fill", "steelblue");

  // Add labels
  node
    .append("text")
    .attr("dy", 3)
    .attr("x", d => (d.children ? -10 : 10))
    .style("text-anchor", d => (d.children ? "end" : "start"))
    .text(d => d.data.id);
});
