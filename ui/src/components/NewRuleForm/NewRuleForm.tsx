import { Formik, Form, Field, FieldArray } from 'formik';
import {
  Grid,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { api } from '../../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { RULE_COMPARISON_CHOICES, RULE_PARAMETER } from '../../utils/enums';
import type { NewRuleFormProps } from './NewRuleForm.types';
import type { CreateRuleInterface } from './NewRuleForm.types';

function NewRuleForm({ setOpenConfirm, devices, fetchData }: NewRuleFormProps) {
  const navigate = useNavigate();

  const handleCreate = async (values: CreateRuleInterface) => {
    try {
      await api.post('api/v1/notification-config/', values);
      toast.success('Regra criada com sucesso!');
      setOpenConfirm(false);

      const controller = new AbortController();
      await fetchData(controller.signal);

      navigate('/notifications');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err?.response?.request.response) {
          toast.error(
            `Não foi possível criar: ${err.response.request.response}`
          );
        } else {
          toast.error('Não foi possível criar a regra');
        }
      }
    }
  };

  return (
    <Grid>
      <Formik
        initialValues={{
          name: '',
          message: '',
          devices: [],
          parameter: '',
          comparison: '',
          threshold: 0,
        }}
        onSubmit={handleCreate}
      >
        {({ values }) => (
          <Form>
            <Grid
              m={4}
              container
              direction={'column'}
              minWidth={400}
              spacing={3}
            >
              <Typography fontSize={18} fontWeight={500}>
                Criar Nova Regra de Notificação
              </Typography>
              <Typography fontSize={12}>
                Configure os parâmetros para receber alertas automáticos
              </Typography>
              <Field
                as={TextField}
                name="name"
                label="Nome da Regra"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ style: { fontSize: 18 } }}
                required
              />
              <Field
                as={TextField}
                name="message"
                label="Descrição"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ style: { fontSize: 18 } }}
                required
                style={{ marginBottom: '30px' }}
              />

              <FieldArray name="devices">
                {({ push, remove, form }) => (
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    sx={{ position: 'relative' }}
                  >
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => push('')}
                      sx={{
                        mt: 1,
                        alignSelf: 'end',
                        position: 'absolute',
                        right: '0',
                        top: '-45px',
                        borderRadius: '8px',
                      }}
                    >
                      Adicionar Dispositivo
                    </Button>
                    {form.values.devices.map(
                      (device: string, index: number) => (
                        <Grid
                          item
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginTop: '20px',
                          }}
                        >
                          <FormControl variant="outlined" fullWidth>
                            <InputLabel id={`device-label-${index}`}>
                              Dispositivo
                            </InputLabel>
                            <Field
                              as={Select}
                              name={`devices.${index}`}
                              label="Dispositivo"
                              labelId={`device-label-${index}`}
                              fullWidth
                            >
                              {devices?.map((d) => (
                                <MenuItem key={d.uuid} value={d.uuid}>
                                  <em>{d.name}</em>
                                </MenuItem>
                              ))}
                            </Field>
                          </FormControl>

                          {index > 0 && (
                            <Button
                              variant="text"
                              color="error"
                              onClick={() => remove(index)}
                            >
                              Remover
                            </Button>
                          )}
                        </Grid>
                      )
                    )}
                  </Grid>
                )}
              </FieldArray>
              <Grid sx={{ display: 'flex', gap: '15px' }}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="parameter-label">Parâmetro</InputLabel>
                  <Field
                    as={Select}
                    name="parameter"
                    label="Parâmetro"
                    fullWidth
                  >
                    {RULE_PARAMETER?.map((parameter, index) => (
                      <MenuItem key={index} value={parameter.value}>
                        <em>{parameter.label}</em>
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="comparison-label">Condição</InputLabel>
                  <Field
                    as={Select}
                    name="comparison"
                    label="Condição"
                    value={values.comparison}
                    fullWidth
                  >
                    {RULE_COMPARISON_CHOICES?.map((condition, index) => (
                      <MenuItem key={index} value={condition.value}>
                        <em>{condition.label}</em>
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <Field
                  as={TextField}
                  type="number"
                  name="threshold"
                  label="Valor"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  InputProps={{ style: { fontSize: 18 } }}
                  required
                />
              </Grid>

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
                      setOpenConfirm(false);
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

export default NewRuleForm;
