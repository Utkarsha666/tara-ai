// components/Dashboard/SelectRelation.js
import React from "react";
import Select from "react-select";

const SelectRelation = ({ relations, selectedRelation, onSelectRelation }) => {
  const options = relations.map((relation) => ({
    value: relation,
    label: relation,
  }));

  return (
    <Select
      options={options}
      value={options.find((option) => option.value === selectedRelation)}
      onChange={(selectedOption) => onSelectRelation(selectedOption.value)}
      placeholder="Select Relationship"
    />
  );
};

export default SelectRelation;
