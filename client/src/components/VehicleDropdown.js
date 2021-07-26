const VehicleDropdown = (props) => {
  return (
    <select
      value={props.make}
      onChange={(e) => props.changeMake(e.target.value)}
    >
      <option value="alfa">Alfa Romeo</option>
      <option value="bmw">BMW</option>
      <option value="honda">Honda</option>
      <option value="infiniti">Infiniti</option>
      <option value="lexus">Lexus</option>
      <option value="mazda">Mazda</option>
      <option value="mercedes">Mercedes-Benz</option>
      <option value="nissan">Nissan</option>
      <option value="toyota">Toyota</option>
    </select>
  );
};

export default VehicleDropdown;
