import React from 'react';

function TableItem(props) {
  return (
      <tr>
        <td width="200px">{props.item.name}</td>
        <td width="100px">{props.item.creator}</td>
        <td width="300px">{props.item.created_at}</td>
      </tr>
  );
}

export default TableItem;
