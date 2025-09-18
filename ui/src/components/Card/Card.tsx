import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { api } from '../../utils/axios';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from '@mui/material';
import type { DeviceCardProps, DeviceValuesInterface } from './CardProps.type';

export default function BasicCard({
  id,
  name,
  location,
  sn,
  updated_at,
  description,
  telemetry,
  onUpdate,
}: DeviceCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const resp = await api.delete(`api/v1/devices/${id}/`);
      console.log(resp);
      toast.success('Dispositivo deletado com sucesso!');
      setOpenConfirm(false);
      navigate('/devices');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err?.response?.request.response) {
          toast.error(
            `Não foi possível deletar: ${err.response.request.response}`
          );
        } else {
          toast.error('Não foi possível deletar o dispositivo');
        }
      }
    }
  };

  const handleEdit = async (values: DeviceValuesInterface) => {
    try {
      const resp = await api.patch(`api/v1/devices/${id}/`, values);
      console.log(resp);
      setIsEditing(false);
      toast.success('Dispositivo atualizado com sucesso!');
      navigate('/devices');

      const controller = new AbortController();
      const signal = controller.signal;
      onUpdate?.(signal);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err?.response?.request.response) {
          toast.error(
            `Não foi possível editar: ${err.response.request.response}`
          );
        } else {
          toast.error('Não foi possível editar o dispositivo');
        }
      }
    }
  };

  return (
    <Grid>
      <Card>
        <CardContent>
          {!isEditing && (
            <>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    sx={{ color: 'black', fontSize: 16 }}
                  >
                    Dispositivo: {name}
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ color: 'black', fontSize: 16 }}
                  >
                    Localização: {location}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    sx={{ color: 'black', fontSize: 16 }}
                  >
                    Número de série: {sn}
                  </Typography>
                  {description && (
                    <Typography
                      gutterBottom
                      sx={{ color: 'black', fontSize: 16 }}
                    >
                      Descrição: {description}
                    </Typography>
                  )}
                  <Typography
                    gutterBottom
                    sx={{ color: 'black', fontSize: 16 }}
                  >
                    Última Atualização: {updated_at}
                  </Typography>
                </Grid>
              </Grid>

              <Grid mt={2}>
                <Typography gutterBottom sx={{ color: 'black', fontSize: 16 }}>
                  Última Telemetria:
                </Typography>
                <Grid container sx={{ justifyContent: 'space-between' }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Uso do CPU:{' '}
                    {telemetry?.cpu_usage ? `${telemetry.cpu_usage} %` : ''}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Uso da memória:{' '}
                    {telemetry?.ram_usage ? `${telemetry.ram_usage} %` : ''}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Temperatura:{' '}
                    {telemetry?.temperature ? `${telemetry.temperature}` : ''}{' '}
                    c°
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </Button>

                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={() => setOpenConfirm(true)}
                >
                  Apagar
                </Button>
              </Grid>
              <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Tem certeza que deseja apagar este item? Esta ação não pode
                    ser desfeita.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenConfirm(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={(e) => {
                      handleDelete(e);
                    }}
                    color="error"
                    variant="contained"
                  >
                    Apagar
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}

          {isEditing && (
            <Formik
              initialValues={{
                name,
                location,
                sn,
                description: description ?? '',
              }}
              onSubmit={(values) => {
                handleEdit(values);
              }}
            >
              {() => (
                <Form>
                  <Grid container spacing={2} direction="column">
                    <Grid>
                      <Field
                        as={TextField}
                        name="name"
                        label="Dispositivo"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{ style: { fontSize: 16 } }}
                      />
                      <Field
                        as={TextField}
                        name="location"
                        label="Localização"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{ style: { fontSize: 16 } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        name="sn"
                        label="Número de série"
                        fullWidth
                        variant="standard"
                        size="small"
                        InputProps={{ style: { fontSize: 16 } }}
                      />
                      <Field
                        as={TextField}
                        name="description"
                        label="Descrição"
                        fullWidth
                        multiline
                        rows={3}
                      />
                      <Typography
                        gutterBottom
                        sx={{ color: 'black', fontSize: 16 }}
                      >
                        Última Atualização: {updated_at}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mt={2}>
                    <Button type="submit" variant="contained">
                      Salvar
                    </Button>

                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => {
                        setIsEditing(false);
                      }}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
