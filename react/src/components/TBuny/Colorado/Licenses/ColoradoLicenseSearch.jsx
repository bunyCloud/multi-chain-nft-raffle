import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import axios from "axios";
import React, { useState, useEffect } from "react";

function ColoradoLicenseSearch(props) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const { data } = await axios.get("http://localhost:5000/api/company/");
      const results = [];
      // Store results in the results array
      data.forEach((value) => {
        results.push({
          key: value.name,
          value: value.id,
        });
      });
      // Update the options state
      setOptions([{ key: "Select a company", value: "" }, ...results]);
    }

    // Trigger the fetch
    fetchData();
  }, []);

  const { label, name, ...rest } = props;

  return (
    <Form.Group className="mb-2">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Field id={name} name={name} {...rest} as={Form.Select}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage className="text-danger" name={name} component={Form.Text} />
    </Form.Group>
  );
}

export default ColoradoLicenseSearch;
