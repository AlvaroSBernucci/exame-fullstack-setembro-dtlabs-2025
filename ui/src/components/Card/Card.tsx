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
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import type { DeviceCardProps } from './CardProps.type';
import type { DeviceValuesInterface } from '../NewDeviceForm/NewDeviceForm.types';
import { cardIconStyle, cardTitle, lastTelemetryStyle } from './Card.styled';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';

export default function BasicCard({
  id,
  name,
  location,
  sn,
  updated_at,
  description,
  telemetry,
  home,
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
              <Grid container spacing={3} direction={'column'}>
                <Typography gutterBottom sx={cardTitle}>
                  <LaptopMacOutlinedIcon />
                  <strong>Dispositivo:</strong> {name}
                </Typography>
                <Typography gutterBottom sx={cardIconStyle}>
                  <FmdGoodOutlinedIcon />
                  <strong>Localização:</strong> {location}
                </Typography>
                <Typography gutterBottom sx={cardIconStyle}>
                  <strong>Número de série:</strong> {sn}
                </Typography>
                <Typography gutterBottom sx={cardIconStyle}>
                  <CalendarTodayOutlinedIcon />
                  <strong>Última Atualização:</strong> {updated_at}
                </Typography>
              </Grid>

              <Grid mt={2}>
                <Typography
                  gutterBottom
                  sx={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: '15px',
                  }}
                >
                  Última Telemetria:
                </Typography>
                <Grid container sx={{ justifyContent: 'space-between' }}>
                  <Typography sx={lastTelemetryStyle}>
                    <DeveloperBoardOutlinedIcon />
                    Uso do CPU: <br />
                    {telemetry?.cpu_usage ? `${telemetry.cpu_usage} %` : ''}
                  </Typography>
                  <Typography sx={lastTelemetryStyle}>
                    <MemoryOutlinedIcon />
                    Uso da memória: <br />
                    {telemetry?.ram_usage ? `${telemetry.ram_usage} %` : ''}
                  </Typography>
                  <Typography sx={lastTelemetryStyle}>
                    <DeviceThermostatOutlinedIcon />
                    Temperatura: <br />
                    {telemetry?.temperature
                      ? `${telemetry.temperature}`
                      : ''}{' '}
                    c°
                  </Typography>
                </Grid>
              </Grid>

              {!home && (
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
              )}
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
                        name="description"
                        label="Descrição"
                        fullWidth
                        multiline
                        rows={3}
                      />
                      <Typography
                        gutterBottom
                        sx={{ color: 'black', fontSize: 16 }}
                        mt={2}
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
