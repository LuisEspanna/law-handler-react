/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox({onSelect, data}) {

  return (
    <Autocomplete
      onChange={onSelect}
      id="combo-box-demo"
      options={data}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Área de profesión" variant="outlined" />}
    />
  );
}


