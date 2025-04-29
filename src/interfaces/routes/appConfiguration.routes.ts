import { Router } from 'express';
import {
  getConfiguracionGlobalController,
  updateConfiguracionGlobalController,
  getHomeBannerController,
  updateHomeBannerController,
  getHomeContactoController,
  updateHomeContactoController,
  getHomeServiciosController,
  updateHomeServicioController,
  getHomeTestimoniosController,
  updateHomeTestimonioController,
  getPerspectivasMercadoController,
  updatePerspectivaMercadoController,
  getHomeQuienesSomosController,
  updateHomeQuienesSomosController,
  getInformesEconomicosController,
  updateInformeEconomicoController
} from '../controllers/appConfiguration.controller';

const router = Router();

// Configuración Global
router.get('/configuracion-global', getConfiguracionGlobalController);
router.put('/configuracion-global', updateConfiguracionGlobalController);

// Home Banner
router.get('/home-banner', getHomeBannerController);
router.put('/home-banner', updateHomeBannerController);

// Home Contacto
router.get('/home-contacto', getHomeContactoController);
router.put('/home-contacto', updateHomeContactoController);

// Home Servicios
router.get('/home-servicios', getHomeServiciosController);
router.put('/home-servicios', updateHomeServicioController);

// Home Testimonios
router.get('/home-testimonios', getHomeTestimoniosController);
router.put('/home-testimonios', updateHomeTestimonioController);

//NAVBAR
router.get('/navbar', getInformesEconomicosController);
router.put('/navbar', updateInformeEconomicoController);

// Perspectivas del Mercado
router.get('/perspectivas-mercado', getPerspectivasMercadoController);
router.put('/perspectivas-mercado/:id', updatePerspectivaMercadoController);


router.get('/quienes-somos', getHomeQuienesSomosController);
router.put('/quienes-somos', updateHomeQuienesSomosController);

export { router as appConfigurationRouter };
