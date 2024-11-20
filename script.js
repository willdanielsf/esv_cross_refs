d3.csv("data.csv").then(data => {
  const tableBody = d3.select("#tree-table tbody");

  // Convert flat data into a hierarchy
  const root = d3.stratify()
    .id(d => d.id)
    .parentId(d => d.parent)(data);

  // Create rows for the table
  const createRows = (node, depth = 0) => {
    const row = tableBody.append("tr")
      .attr("data-id", node.id)
      .attr("data-parent", node.parent ? node.parent.id : "")
      .attr("data-expanded", "false")
      .style("display", depth === 0 ? "" : "none");

    // Indent based on depth
    row.append("td")
      .style("padding-left", `${depth * 20}px`)
      .text(node.children ? `▶ ${node.id}` : node.id)
      .on("click", () => toggleRow(node.id));

    row.append("td").text(node.data.value);

    if (node.children) {
      node.children.forEach(child => createRows(child, depth + 1));
    }
  };

  createRows(root);

  // Toggle rows' visibility
  const toggleRow = id => {
    const row = d3.select(`[data-id='${id}']`);
    const isExpanded = row.attr("data-expanded") === "true";

    row.attr("data-expanded", !isExpanded);
    row.select("td").text(`${isExpanded ? "▶" : "▼"} ${id}`);

    d3.selectAll(`[data-parent='${id}']`)
      .style("display", isExpanded ? "none" : "")
      .attr("data-expanded", "false");
  };
});
