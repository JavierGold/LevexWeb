import './technical-table.css'

export default function TechnicalTable({ rows }) {
  return (
    <div className="technical-table__viewport">
      <table className="technical-table">
        <thead role="rowgroup">
          <tr role="row">
            <th scope="col" role="columnheader">Especificación</th>
            <th scope="col" role="columnheader">Métrico</th>
            <th scope="col" role="columnheader">US</th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {rows.map(([specification, metric, us]) => (
            <tr key={specification} role="row">
              <th scope="row" role="rowheader">{specification}</th>
              <td data-label="Métrico" role="cell">{metric}</td>
              <td data-label="US" role="cell">{us}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
