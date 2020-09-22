import React from 'react';
import TableItem from './TableItem';

function Table(props) {
  const labels = props.labels.map((label, index) =>
      <th key={index}>{label}</th>,
  );

  const listItems = props.items ? props.items.map(
      (item, index) => <TableItem key={index} item={item} onItemClick={props.onItemClick}/>) : null;

  return (
      <table>
        <thead>
        <tr>{labels}</tr>
        </thead>

        <tbody>
        {listItems}
        </tbody>
      </table>
  );
}

export default Table;
