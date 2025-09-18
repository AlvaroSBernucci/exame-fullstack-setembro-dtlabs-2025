import { Formik, Form, Field } from 'formik';
import { Grid, Button, TextField, Typography } from '@mui/material';
import { api } from '../../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import type {
  DeviceValuesInterface,
  NewDeviceFormProps,
} from './NewDeviceForm.types';

function NewDeviceForm({ onClose }: NewDeviceFormProps) {
  const navigate = useNavigate();

  const handleCreate = async (values: DeviceValuesInterface) => {
    try {
      const resp = await api.post('api/v1/devices/', values);
      console.log(resp);
      console.log(values);
      toast.success('Dispositivo atualizado com sucesso!');
      onClose(false);
      navigate('/devices');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err?.response?.request.response) {
          toast.error(
            `Não foi possível criar: ${err.response.request.response}`
          );
        } else {
          toast.error('Não foi possível criar dispositivo');
        }
      }
    }
  };

  return (
    <Grid>
      <Formik
        initialValues={{ name: '', location: '', description: '' }}
        onSubmit={handleCreate}
      >
        {() => (
          <Form>
            <Grid
              m={4}
              container
              direction={'column'}
              minWidth={400}
              spacing={3}
            >
              <Typography fontSize={18} fontWeight={500}>
                Novo dispositivo
              </Typography>
              <Field
                as={TextField}
                name="name"
                label="Nome do Dispositivo"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ style: { fontSize: 18 } }}
                required
              />
              <Field
                as={TextField}
                name="location"
                label="Localização do Dispositivo"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ style: { fontSize: 18 } }}
                required
              />
              <Field
                as={TextField}
                name="description"
                label="Descrição do Dispositivo"
                fullWidth
                variant="outlined"
                size="small"
                multiline
                rows={4}
                InputProps={{ style: { fontSize: 18 } }}
              />
              <Grid container spacing={2} justifyContent="space-between">
                <Grid size="grow">
                  <Button
                    type="button"
                    variant="text"
                    sx={{
                      width: '100%',
                      color: 'black',
                    }}
                    onClick={() => {
                      console.log('teste');
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid size="grow">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: '100%' }}
                  >
                    Criar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
}

export default NewDeviceForm;
