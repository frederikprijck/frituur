
 import { useFormik } from 'formik';

export const AddSnack = () => {

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      isGlutenFree: 'true',
    },
    onSubmit: async values => {
      console.log(JSON.stringify(values, null, 2));
      const headers: Headers = new Headers();
      headers.set('Content-Type', 'application/json');

      await fetch('http://frituur.westeurope.azurecontainer.io/api/Snacks', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: values.name,
          price: Number(values.price),
          isGlutenFree: values.isGlutenFree
        })
      });
    },
  });

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

      <button>Add</button>
    </form>
  );
};
