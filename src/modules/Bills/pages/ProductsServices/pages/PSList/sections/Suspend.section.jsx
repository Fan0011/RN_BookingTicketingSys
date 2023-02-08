import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { performProductActionsByID } from 'store';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),
});

export const Suspend = ({ show, setShow, record }) => {
  const initialValues = {
    id: record?.id,
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.products);

  return (
    <Modal
      heading="Suspend Product"
      customBody={
        <div className="mb-[32px]">
          Are you sure you wish to suspend this product?
        </div>
      }
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={loading}
      submitText="Suspend Product"
      handleSubmit={async (values) => {
        await dispatch(performProductActionsByID(values?.id, 'SUSPEND'));
        setShow(false);
      }}
      show={show}
      setShow={setShow}
    />
  );
};
