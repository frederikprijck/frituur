import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Snack {
  id: number;
  name: string;
  price: number;
  isGlutenFree: boolean;
}

export const Snacks = () => {
  const [snacks, setSnacks] = useState<Snack[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        'http://frituur.westeurope.azurecontainer.io/api/Snacks'
      );
      const data = await response.json();
      console.log(data);
      setSnacks(data);
    }

    getData();
  }, []);

  const deleteSnack = async (id: number) => {
    await fetch('http://frituur.westeurope.azurecontainer.io/api/Snacks/' + id, {
      method: 'DELETE'
    });
  };
  return (
    <div>
      <table>
        <tbody>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Gluten Free</th>
          <th></th>
        </tr>
        {snacks.map((snack) => (
          <tr key={snack.id}>
            <td>{snack.name}</td>
            <td>{snack.price}</td>
            <td>{snack.isGlutenFree ? 'Yes' : 'No'}</td>
            <td>
              <Link to={`/${snack.id}`}>Edit</Link>
              <button onClick={() => deleteSnack(snack.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>


      <Link to={`/add`}>Add</Link>
    </div>
  );
};
