import yup from 'yup';
import { Response, Request as ExpressRequest } from 'express';
import { appointmentCreateSchema, idSchema, searchSchema, updateAppointmentSchema } from '../../../utils/validator';
import { AppointmentCreateDTO } from '../../types/appointment.type';
import appointmentService from '../services/appointment.service';

const appointmentController = {
  bookAppointment: async (req: ExpressRequest, res: Response) => {
    try {
      const validatedData = await appointmentCreateSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      const calculateEndTime = (startTime: string): string => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes + 30);
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      };
      const user_id = req.user?.id as string;
      const appointmentData: AppointmentCreateDTO = {
        user_id: user_id,
        doctor_id: validatedData.doctor_id,
        hospital_id: validatedData.hospital_id,
        date: validatedData.date,
        start_time: validatedData.start_time,
        end_time: validatedData.end_time || calculateEndTime(validatedData.start_time),
        notes: validatedData.notes || ''
      };
  
      const result = await appointmentService.createAppointment(appointmentData);
      return res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.inner.map(err => ({
            field: err.path || 'unknown',
            message: err.message
          }))
        });
      }
  
      console.error('Appointment Creation Error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        data: null
      });
    }
  },

  getAppointments: async (req: ExpressRequest, res: Response) => {
    try {
      const searchData = await searchSchema.validate(req.body, { abortEarly: false });
      const appointments = await appointmentService.getAppointments(searchData);
      return res.status(appointments.statusCode).json({
        status: appointments.status,
        message: appointments.message,
        data: appointments.data
      })
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors
        });
      }
      console.error('Error', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  getOneAppointmentRecord: async (req: ExpressRequest, res: Response) => {
    try {
      const id = await idSchema.validate(req.params.id, {abortEarly: false});
      const getOneRecord = await appointmentService.getOneAppointmentRecord(id);
      if (!getOneRecord) {
        return res.status(404).json({
          status: 'fail',
          message: 'Appointment not found',
          data: null
        });
      }
      return {
        statusCode: getOneRecord.statusCode,
        status: getOneRecord.status,
        message: getOneRecord.message,
        data: getOneRecord.data
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors
        });
      }
      
      console.error('Error: ', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  updateAppointment: async (req: ExpressRequest, res: Response): Promise<Response> => {
    try {
      const id = await idSchema.validate(req.params.id, {abortEarly: false});
      const status = await updateAppointmentSchema.validate(req.body, {abortEarly: false });
      const updateAppointment = await appointmentService.updateAppointment(id, status);
      if (!updateAppointment) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to update appointment',
          data: null
        });
      }

      return res.status(updateAppointment.statusCode).json({
        status: updateAppointment.status,
        message: updateAppointment.message,
        data: updateAppointment.data
      });

    } catch (error) {
      // if (error instanceof yup.ValidationError) {
      //   return res.status(400).json({
      //     status: 'error',
      //     message: 'Validation failed',
      //     errors: error.errors
      //   });
      // }
      
      console.error('Error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  deleteAppointmentRecord: async (req: ExpressRequest, res: Response) => {
    try {
      const id = await idSchema.validate(req.params.id, {abortEarly: false});
      const deleteAppointment = await appointmentService.deleteAppointmentRecord(id);
      return {
        statusCode: deleteAppointment.statusCode,
        status: deleteAppointment.status,
        message: deleteAppointment.message,
        data: deleteAppointment.data
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors
        });
      }
      
      console.error('Error: ', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  cancelAppointment: async (req: ExpressRequest, res: Response) => {
    try {
      const id = await idSchema.validate(req.params.id, {abortEarly: false});
      const cancelAppoinntmet = await appointmentService.cancelAppointment(id);
      return {
        statusCode: cancelAppoinntmet?.statusCode,
        status: cancelAppoinntmet?.status,
        message: cancelAppoinntmet?.message,
        data: cancelAppoinntmet?.data
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors
        });
      }
      
      console.error('Error: ', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });     
    }
  }
}

export default appointmentController;
