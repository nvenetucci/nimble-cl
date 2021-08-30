const CategoryDropdown = (props) => {
  return (
    <select
      value={props.category}
      onChange={(e) => props.changeCategory(e.target.value)}
    >
      <option value="cto">Cars</option>
      <option value="pts">Parts</option>
      <option value="wto">Wheels</option>
    </select>
  );
};

export default CategoryDropdown;
