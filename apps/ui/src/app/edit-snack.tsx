
 import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const EditSnack = () => {

  const { id } = useParams<{id: string}>();

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      isGlutenFree: 'true',
    },
    onSubmit: async values => {
      alert(JSON.stringify(values, null, 2));
      const headers: Headers = new Headers();
      headers.set('Content-Type', 'application/json');

      await fetch('http://frituur.westeurope.azurecontainer.io/api/Snacks/' + id, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          id,
          name: values.name,
          price: Number(values.price),
          isGlutenFree: values.isGlutenFree === 'true' ? true : false
        })
      })
    },
  });

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        'http://frituur.westeurope.azurecontainer.io/api/Snacks/' + id
      );
      const data = await response.json();
      console.log(data);


      formik.setValues({
        name: data.name,
        price: data.price.toString(),
        isGlutenFree: data.isGlutenFree,
      }, false);
    }
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Name</label>
      <input name="name" onChange={formik.handleChange}
         value={formik.values.name}/>
      <label>Price</label>
      <input name="price" type="number" onChange={formik.handleChange}
         value={formik.values.price}/>

      <label>Gluten Free</label>
      <input name="isGlutenFree" type="checkbox" onChange={formik.handleChange}
         value={formik.values.isGlutenFree}/>

      <button>Save</button>
    </form>
  );
};
