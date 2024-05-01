export const handleChange = (e, setBelt, belt) => {
  const name = e.target.name;
  const value = e.target.value;
  setBelt({ ...belt, [name]: value });
};
