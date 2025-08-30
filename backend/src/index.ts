import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { getConfig } from '@/config/environment';

const app: Application = express();
const appConfig = getConfig();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: appConfig.app.corsOrigins,
  credentials: true
})); // Enable CORS with configured origins
app.use(express.json({ 
  limit: `${Math.floor(appConfig.externalServices.imageProcessing.maxFileSize / 1024 / 1024)}mb` 
})); // Parse JSON bodies
app.use(express.urlencoded({ 
  extended: true, 
  limit: `${Math.floor(appConfig.externalServices.imageProcessing.maxFileSize / 1024 / 1024)}mb` 
})); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'CaskChain Backend API is running',
    timestamp: new Date().toISOString(),
    version: appConfig.app.apiVersion,
    environment: appConfig.app.nodeEnv
  });
});

// Default route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to CaskChain Backend API',
    documentation: '/docs',
    version: appConfig.app.apiVersion,
    environment: appConfig.app.nodeEnv
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

// Start server
app.listen(appConfig.app.port, () => {
  console.log(`🚀 CaskChain Backend server is running on port ${appConfig.app.port}`);
  console.log(`📊 Health check: http://localhost:${appConfig.app.port}/health`);
  console.log(`🌍 Environment: ${appConfig.app.nodeEnv}`);
  console.log(`📝 API Version: ${appConfig.app.apiVersion}`);
  console.log(`🔐 Security: CORS origins configured for ${appConfig.app.corsOrigins.join(', ')}`);
});

export default app;