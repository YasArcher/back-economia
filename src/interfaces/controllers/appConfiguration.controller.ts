import { Request, Response } from 'express';
import { SqlServerUnitOfWork } from '../../infrastructure/unitOfWork/SqlServerUnitOfWork';

import { GetConfiguracionGlobalService } from '../../application/appConfiguration/services/GetConfiguracionGlobalService';
import { UpdateConfiguracionGlobalService } from '../../application/appConfiguration/services/UpdateConfiguracionGlobalService';
import { GetHomeBannerService } from '../../application/appConfiguration/services/GetHomeBannerService';
import { UpdateHomeBannerService } from '../../application/appConfiguration/services/UpdateHomeBannerService';
import { GetHomeContactoService } from '../../application/appConfiguration/services/GetHomeContactoService ';
import { UpdateHomeContactoService } from '../../application/appConfiguration/services/UpdateHomeContactoService';
import { GetHomeServiciosService } from '../../application/appConfiguration/services/GetHomeServiciosService';
import { UpdateHomeServicioService } from '../../application/appConfiguration/services/UpdateHomeServicioService';
import { GetHomeTestimoniosService } from '../../application/appConfiguration/services/GetHomeTestimoniosService';
import { UpdateHomeTestimonioService } from '../../application/appConfiguration/services/UpdateHomeTestimonioService';
import { GetInformesEconomicosService } from '../../application/appConfiguration/services/GetInformesEconomicosService';
import { UpdateInformeEconomicoService } from '../../application/appConfiguration/services/UpdateInformeEconomicoService';
import { GetPerspectivasMercadoService } from '../../application/appConfiguration/services/GetPerspectivasMercadoService';
import { UpdatePerspectivaMercadoService } from '../../application/appConfiguration/services/UpdatePerspectivaMercadoService';
import { UpdateHomeQuienesSomosService } from '../../application/appConfiguration/services/UpdateHomeQuienesSomosService';
import { GetHomeQuienesSomosService } from '../../application/appConfiguration/services/GetHomeQuienesSomosService';

// =======================
// Configuración Global
// =======================
export const getConfiguracionGlobalController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new GetConfiguracionGlobalService(unitOfWork);

  try {
    const data = await service.execute();
    await unitOfWork.complete();
    res.status(200).json(data);
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

export const updateConfiguracionGlobalController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new UpdateConfiguracionGlobalService(unitOfWork);

  try {
    await service.execute(req.body);
    await unitOfWork.complete();
    res.status(200).json({ message: 'Configuración actualizada exitosamente' });
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

// =======================
// Home Banner
// =======================
export const getHomeBannerController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new GetHomeBannerService(unitOfWork);

  try {
    const data = await service.execute();
    await unitOfWork.complete();
    res.status(200).json(data);
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

export const updateHomeBannerController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new UpdateHomeBannerService(unitOfWork);

  try {
    await service.execute(req.body);
    await unitOfWork.complete();
    res.status(200).json({ message: 'Banner actualizado exitosamente' });
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

// =======================
// Home Contacto
// =======================
export const getHomeContactoController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new GetHomeContactoService(unitOfWork);

  try {
    const data = await service.execute();
    await unitOfWork.complete();
    res.status(200).json(data);
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

export const updateHomeContactoController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new UpdateHomeContactoService(unitOfWork);

  try {
    await service.execute(req.body);
    await unitOfWork.complete();
    res.status(200).json({ message: 'Contacto actualizado exitosamente' });
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

// =======================
// Home Servicios
// =======================
export const getHomeServiciosController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new GetHomeServiciosService(unitOfWork);

  try {
    const data = await service.execute();
    await unitOfWork.complete();
    res.status(200).json(data);
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

export const updateHomeServicioController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new UpdateHomeServicioService(unitOfWork);

  try {
    await service.execute(req.body);
    await unitOfWork.complete();
    res.status(200).json({ message: 'Servicio actualizado exitosamente' });
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

// =======================
// Home Testimonios
// =======================
export const getHomeTestimoniosController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new GetHomeTestimoniosService(unitOfWork);

  try {
    const data = await service.execute();
    await unitOfWork.complete();
    res.status(200).json(data);
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

export const updateHomeTestimonioController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new UpdateHomeTestimonioService(unitOfWork);

  try {
    await service.execute(req.body);
    await unitOfWork.complete();
    res.status(200).json({ message: 'Testimonio actualizado exitosamente' });
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

// =======================
// Informes Económicos
// =======================
export const getInformesEconomicosController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new GetInformesEconomicosService(unitOfWork);

  try {
    const data = await service.execute();
    await unitOfWork.complete();
    res.status(200).json(data);
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

export const updateInformeEconomicoController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new UpdateInformeEconomicoService(unitOfWork);

  try {
    await service.execute(Number(req.params.id), req.body);
    await unitOfWork.complete();
    res.status(200).json({ message: 'Informe actualizado exitosamente' });
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

// =======================
// Perspectivas del Mercado
// =======================
export const getPerspectivasMercadoController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new GetPerspectivasMercadoService(unitOfWork);

  try {
    const data = await service.execute();
    await unitOfWork.complete();
    res.status(200).json(data);
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

export const updatePerspectivaMercadoController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new UpdatePerspectivaMercadoService(unitOfWork);

  try {
    await service.execute(Number(req.params.id), req.body);
    await unitOfWork.complete();
    res.status(200).json({ message: 'Perspectiva actualizada exitosamente' });
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

// =======================
// Quiénes Somos
// =======================

export const getHomeQuienesSomosController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new GetHomeQuienesSomosService(unitOfWork);

  try {
    const data = await service.execute();
    await unitOfWork.complete();
    res.status(200).json(data);
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

export const updateHomeQuienesSomosController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();
  const service = new UpdateHomeQuienesSomosService(unitOfWork);

  try {
    await service.execute(req.body);
    await unitOfWork.complete();
    res.status(200).json({ message: '"Quiénes somos" actualizado exitosamente' });
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};
