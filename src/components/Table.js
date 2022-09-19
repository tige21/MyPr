import React from 'react'
import neeet from '../stores/vampirStore'
import "./Table.css"


const Table = ({data}) => {
    return(
      <table>
        <thead>
          <tr>
            <th><h3>Name/Surname</h3></th>
            <th><h3>Superpower</h3></th>
            <th><h3>Age</h3></th>
          </tr>
        </thead>
        <tbody>
        {data.map(i => {
          return(
            <tr key={i.id}>
              <td>{i.names[0]} {i.names[1]}</td>
              <td>{i.superpower}</td>
              <td>{i.age}</td>
              <button className='btn' onClick={() => neeet.remover(i.id)}>Delete</button>
            </tr>


          );


        })}
        </tbody>
      </table>

    );

}

export default Table;