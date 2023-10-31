import { Form, Formik, ErrorMessage } from 'formik'
import {
  Box,
  Button,
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { IEventFormData } from '../../../../types/calendar'
import {
  createEventAsync,
  updateEventAsync,
  deleteEventAsync,
  getEventsAsync,
  manageEventModal,
  resetEvent,
  selectEvent,
  selectIsOpenEventModal,
  selectCalendarStatus,
} from '../../../../store/calendarSlice'
import YupValidation from './yupValidation'

const EventFormModal = () => {
  const dispatch = useAppDispatch()
  const event = useAppSelector(selectEvent)
  const status = useAppSelector(selectCalendarStatus)
  const isOpenEventModal = useAppSelector(selectIsOpenEventModal)

  const createEvent = async (values: IEventFormData) => {
    await dispatch(createEventAsync(values)).unwrap()
    handleCloseModal()
    dispatch(getEventsAsync())
  }

  const updateEvent = async (values: IEventFormData) => {
    await dispatch(updateEventAsync(values)).unwrap()
    handleCloseModal()
    dispatch(getEventsAsync())
  }

  const deleteEvent = async (id: string | number | undefined) => {
    await dispatch(deleteEventAsync(id)).unwrap()
    handleCloseModal()
    dispatch(getEventsAsync())
  }

  const handleCloseModal = () => {
    dispatch(manageEventModal(false))
    dispatch(resetEvent())
  }

  const onSubmitEventForm = async (values: IEventFormData) => {
    if (!event?.id) createEvent(values)
    else updateEvent(values)
  }

  return (
    <Dialog
      open={isOpenEventModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClose={handleCloseModal}
    >
      <DialogTitle>{event?.id ? 'Update' : 'Create'} an event</DialogTitle>
      <DialogContent>
        <Box mx={2} mb={2} p={3}>
          <Formik
            onSubmit={onSubmitEventForm}
            initialValues={event}
            validationSchema={YupValidation}
            enableReinitialize
          >
            {({ values, errors, touched, setFieldValue, handleChange, handleBlur }) => {
              return (
                <Form>
                  {event.id && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Button
                          aria-label="delete"
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          onClick={() => deleteEvent(event.id)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          label="Completed"
                          name="status"
                          onChange={(e) => {
                            if ('checked' in e.target)
                              setFieldValue('status', e.target.checked ? 'complete' : 'incomplete')
                          }}
                          onBlur={handleBlur}
                          control={
                            <Checkbox
                              checked={values.status === 'complete'}
                              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            />
                          }
                        />
                      </Grid>
                    </Grid>
                  )}
                  <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="name" />}
                    error={errors.name ? touched.name : undefined}
                    required
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack sx={{ my: 1 }} spacing={2} direction="row">
                      <DateTimePicker
                        label="Start"
                        value={dayjs(values.start)}
                        views={['year', 'day', 'hours', 'minutes']}
                        onChange={(date) => {
                          if (!date) return
                          setFieldValue('start', date)
                          const endDate = new Date(date.format('YYYY-MM-DD HH:mm:ss'))
                          endDate?.setMinutes(endDate.getMinutes() + 10)
                          setFieldValue('end', endDate)
                        }}
                      />
                      <DateTimePicker
                        label="End"
                        value={dayjs(values.end)}
                        views={['year', 'day', 'hours', 'minutes']}
                        minDateTime={dayjs(values.start)}
                        onChange={(date) => {
                          setFieldValue('end', date)
                        }}
                      />
                    </Stack>
                  </LocalizationProvider>
                  <TextField
                    label="Location"
                    name="location"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="location" />}
                    error={errors.location ? touched.location : undefined}
                  />
                  <TextField
                    label="Notes"
                    name="notes"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={values.notes}
                    multiline
                    rows={4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="notes" />}
                    error={errors.notes ? touched.notes : undefined}
                  />
                  <LoadingButton
                    variant="contained"
                    loading={status === 'loading'}
                    type="submit"
                    color="primary"
                    sx={{ mt: 4 }}
                    fullWidth
                  >
                    Submit
                  </LoadingButton>
                </Form>
              )
            }}
          </Formik>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default EventFormModal
