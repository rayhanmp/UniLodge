// components/TwoColumnTable.js

import React from 'react';

const TwoColumnTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Keluhan</th>
          <th>Solusi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id_keluhan}>
            <td>{item.keluhan}</td>
            <td>{item.respon_keluhan.solusi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TwoColumnTable;