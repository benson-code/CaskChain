import dotenv from 'dotenv';
import Joi from 'joi';

// Load environment variables from .env file
dotenv.config();

/**
 * Database configuration interface
 */
export interface DatabaseConfig {
  mongoUri: string;
  dbName: string;
  connectionTimeout: number;
  maxPoolSize: number;
  minPoolSize: number;
  retryWrites: boolean;
  serverSelectionTimeoutMS: number;
}

/**
 * JWT configuration interface
 */
export interface JWTConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  issuer: string;
  audience: string;
}

/**
 * Blockchain configuration interface
 */
export interface BlockchainConfig {
  ethereumRpcUrl: string;
  polygonRpcUrl: string;
  bscRpcUrl: string;
  privateKey: string;
  contractAddresses: {
    whiskeyCask: string;
    whiskeyNFT: string;
    marketplace: string;
  };
  gasSettings: {
    gasLimit: number;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
  };
  confirmations: number;
}

/**
 * External services configuration interface
 */
export interface ExternalServicesConfig {
  ipfs: {
    apiUrl: string;
    gatewayUrl: string;
    projectId?: string;
    projectSecret?: string;
  };
  emailService: {
    provider: string;
    apiKey: string;
    senderEmail: string;
    senderName: string;
  };
  imageProcessing: {
    maxFileSize: number;
    allowedFormats: string[];
    quality: number;
    thumbnailSize: {
      width: number;
      height: number;
    };
  };
}

/**
 * Application configuration interface
 */
export interface AppConfig {
  nodeEnv: string;
  port: number;
  apiVersion: string;
  corsOrigins: string[];
  rateLimiting: {
    windowMs: number;
    maxRequests: number;
    skipSuccessfulRequests: boolean;
  };
  logging: {
    level: string;
    format: string;
    datePattern: string;
    maxSize: string;
    maxFiles: string;
  };
  security: {
    bcryptRounds: number;
    sessionTimeout: number;
    maxLoginAttempts: number;
    lockoutTime: number;
  };
}

/**
 * Complete environment configuration interface
 */
export interface EnvironmentConfig {
  app: AppConfig;
  database: DatabaseConfig;
  jwt: JWTConfig;
  blockchain: BlockchainConfig;
  externalServices: ExternalServicesConfig;
}

/**
 * Environment variables validation schema
 */
const envSchema = Joi.object({
  // Application settings
  NODE_ENV: Joi.string().valid('development', 'staging', 'production', 'test').default('development'),
  PORT: Joi.number().port().default(3001),
  API_VERSION: Joi.string().default('v1'),
  CORS_ORIGINS: Joi.string().default('http://localhost:3000,http://localhost:5173'),

  // Database settings
  MONGO_URI: Joi.string().uri().required().messages({
    'any.required': 'MONGO_URI environment variable is required',
    'string.uri': 'MONGO_URI must be a valid MongoDB connection string'
  }),
  DB_NAME: Joi.string().default('caskchain'),
  DB_CONNECTION_TIMEOUT: Joi.number().default(30000),
  DB_MAX_POOL_SIZE: Joi.number().default(10),
  DB_MIN_POOL_SIZE: Joi.number().default(2),

  // JWT settings
  JWT_ACCESS_TOKEN_SECRET: Joi.string().min(32).required().messages({
    'any.required': 'JWT_ACCESS_TOKEN_SECRET environment variable is required',
    'string.min': 'JWT_ACCESS_TOKEN_SECRET must be at least 32 characters long'
  }),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().min(32).required().messages({
    'any.required': 'JWT_REFRESH_TOKEN_SECRET environment variable is required',
    'string.min': 'JWT_REFRESH_TOKEN_SECRET must be at least 32 characters long'
  }),
  JWT_ACCESS_TOKEN_EXPIRY: Joi.string().default('15m'),
  JWT_REFRESH_TOKEN_EXPIRY: Joi.string().default('7d'),
  JWT_ISSUER: Joi.string().default('caskchain'),
  JWT_AUDIENCE: Joi.string().default('caskchain-users'),

  // Blockchain settings
  ETHEREUM_RPC_URL: Joi.string().uri().required().messages({
    'any.required': 'ETHEREUM_RPC_URL environment variable is required'
  }),
  POLYGON_RPC_URL: Joi.string().uri().required().messages({
    'any.required': 'POLYGON_RPC_URL environment variable is required'
  }),
  BSC_RPC_URL: Joi.string().uri().required().messages({
    'any.required': 'BSC_RPC_URL environment variable is required'
  }),
  BLOCKCHAIN_PRIVATE_KEY: Joi.string().pattern(/^0x[a-fA-F0-9]{64}$/).required().messages({
    'any.required': 'BLOCKCHAIN_PRIVATE_KEY environment variable is required',
    'string.pattern.base': 'BLOCKCHAIN_PRIVATE_KEY must be a valid Ethereum private key'
  }),
  WHISKEY_CASK_CONTRACT: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required().messages({
    'any.required': 'WHISKEY_CASK_CONTRACT environment variable is required',
    'string.pattern.base': 'WHISKEY_CASK_CONTRACT must be a valid Ethereum contract address'
  }),
  WHISKEY_NFT_CONTRACT: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required().messages({
    'any.required': 'WHISKEY_NFT_CONTRACT environment variable is required',
    'string.pattern.base': 'WHISKEY_NFT_CONTRACT must be a valid Ethereum contract address'
  }),
  MARKETPLACE_CONTRACT: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required().messages({
    'any.required': 'MARKETPLACE_CONTRACT environment variable is required',
    'string.pattern.base': 'MARKETPLACE_CONTRACT must be a valid Ethereum contract address'
  }),
  GAS_LIMIT: Joi.number().default(500000),
  MAX_FEE_PER_GAS: Joi.string().default('30000000000'), // 30 gwei
  MAX_PRIORITY_FEE_PER_GAS: Joi.string().default('2000000000'), // 2 gwei
  BLOCKCHAIN_CONFIRMATIONS: Joi.number().default(3),

  // IPFS settings
  IPFS_API_URL: Joi.string().uri().default('https://ipfs.infura.io:5001'),
  IPFS_GATEWAY_URL: Joi.string().uri().default('https://gateway.pinata.cloud'),
  IPFS_PROJECT_ID: Joi.string().optional(),
  IPFS_PROJECT_SECRET: Joi.string().optional(),

  // Email service settings
  EMAIL_PROVIDER: Joi.string().valid('sendgrid', 'mailgun', 'ses').default('sendgrid'),
  EMAIL_API_KEY: Joi.string().required().messages({
    'any.required': 'EMAIL_API_KEY environment variable is required'
  }),
  EMAIL_SENDER_EMAIL: Joi.string().email().required().messages({
    'any.required': 'EMAIL_SENDER_EMAIL environment variable is required',
    'string.email': 'EMAIL_SENDER_EMAIL must be a valid email address'
  }),
  EMAIL_SENDER_NAME: Joi.string().default('CaskChain'),

  // Image processing settings
  MAX_FILE_SIZE: Joi.number().default(10485760), // 10MB
  ALLOWED_IMAGE_FORMATS: Joi.string().default('jpeg,jpg,png,webp'),
  IMAGE_QUALITY: Joi.number().min(1).max(100).default(85),
  THUMBNAIL_WIDTH: Joi.number().default(300),
  THUMBNAIL_HEIGHT: Joi.number().default(300),

  // Rate limiting
  RATE_LIMIT_WINDOW_MS: Joi.number().default(900000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: Joi.number().default(100),

  // Logging
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
  LOG_FORMAT: Joi.string().valid('json', 'simple', 'combined').default('json'),
  LOG_DATE_PATTERN: Joi.string().default('YYYY-MM-DD-HH'),
  LOG_MAX_SIZE: Joi.string().default('20m'),
  LOG_MAX_FILES: Joi.string().default('14d'),

  // Security
  BCRYPT_ROUNDS: Joi.number().min(10).max(15).default(12),
  SESSION_TIMEOUT: Joi.number().default(3600000), // 1 hour
  MAX_LOGIN_ATTEMPTS: Joi.number().default(5),
  LOCKOUT_TIME: Joi.number().default(900000), // 15 minutes
}).unknown();

/**
 * Validate environment variables
 * @returns Validated environment variables
 * @throws Error if validation fails
 */
function validateEnvironment(): any {
  const { error, value } = envSchema.validate(process.env, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errorMessages = error.details.map((detail: any) => detail.message);
    throw new Error(`Environment validation failed:\n${errorMessages.join('\n')}`);
  }

  return value;
}

/**
 * Create configuration object from validated environment variables
 * @param env Validated environment variables
 * @returns Configuration object
 */
function createConfig(env: any): EnvironmentConfig {
  return {
    app: {
      nodeEnv: env.NODE_ENV,
      port: env.PORT,
      apiVersion: env.API_VERSION,
      corsOrigins: env.CORS_ORIGINS.split(',').map((origin: string) => origin.trim()),
      rateLimiting: {
        windowMs: env.RATE_LIMIT_WINDOW_MS,
        maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
        skipSuccessfulRequests: true,
      },
      logging: {
        level: env.LOG_LEVEL,
        format: env.LOG_FORMAT,
        datePattern: env.LOG_DATE_PATTERN,
        maxSize: env.LOG_MAX_SIZE,
        maxFiles: env.LOG_MAX_FILES,
      },
      security: {
        bcryptRounds: env.BCRYPT_ROUNDS,
        sessionTimeout: env.SESSION_TIMEOUT,
        maxLoginAttempts: env.MAX_LOGIN_ATTEMPTS,
        lockoutTime: env.LOCKOUT_TIME,
      },
    },
    database: {
      mongoUri: env.MONGO_URI,
      dbName: env.DB_NAME,
      connectionTimeout: env.DB_CONNECTION_TIMEOUT,
      maxPoolSize: env.DB_MAX_POOL_SIZE,
      minPoolSize: env.DB_MIN_POOL_SIZE,
      retryWrites: true,
      serverSelectionTimeoutMS: 5000,
    },
    jwt: {
      accessTokenSecret: env.JWT_ACCESS_TOKEN_SECRET,
      refreshTokenSecret: env.JWT_REFRESH_TOKEN_SECRET,
      accessTokenExpiry: env.JWT_ACCESS_TOKEN_EXPIRY,
      refreshTokenExpiry: env.JWT_REFRESH_TOKEN_EXPIRY,
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
    },
    blockchain: {
      ethereumRpcUrl: env.ETHEREUM_RPC_URL,
      polygonRpcUrl: env.POLYGON_RPC_URL,
      bscRpcUrl: env.BSC_RPC_URL,
      privateKey: env.BLOCKCHAIN_PRIVATE_KEY,
      contractAddresses: {
        whiskeyCask: env.WHISKEY_CASK_CONTRACT,
        whiskeyNFT: env.WHISKEY_NFT_CONTRACT,
        marketplace: env.MARKETPLACE_CONTRACT,
      },
      gasSettings: {
        gasLimit: env.GAS_LIMIT,
        maxFeePerGas: env.MAX_FEE_PER_GAS,
        maxPriorityFeePerGas: env.MAX_PRIORITY_FEE_PER_GAS,
      },
      confirmations: env.BLOCKCHAIN_CONFIRMATIONS,
    },
    externalServices: {
      ipfs: {
        apiUrl: env.IPFS_API_URL,
        gatewayUrl: env.IPFS_GATEWAY_URL,
        projectId: env.IPFS_PROJECT_ID,
        projectSecret: env.IPFS_PROJECT_SECRET,
      },
      emailService: {
        provider: env.EMAIL_PROVIDER,
        apiKey: env.EMAIL_API_KEY,
        senderEmail: env.EMAIL_SENDER_EMAIL,
        senderName: env.EMAIL_SENDER_NAME,
      },
      imageProcessing: {
        maxFileSize: env.MAX_FILE_SIZE,
        allowedFormats: env.ALLOWED_IMAGE_FORMATS.split(',').map((format: string) => format.trim()),
        quality: env.IMAGE_QUALITY,
        thumbnailSize: {
          width: env.THUMBNAIL_WIDTH,
          height: env.THUMBNAIL_HEIGHT,
        },
      },
    },
  };
}

// Validate environment variables and create configuration
let config: EnvironmentConfig;

try {
  const validatedEnv = validateEnvironment();
  config = createConfig(validatedEnv);
  
  // Log successful configuration load (but don't log sensitive data)
  console.log('✅ Environment configuration loaded successfully');
  console.log(`🌍 Environment: ${config.app.nodeEnv}`);
  console.log(`🚀 Port: ${config.app.port}`);
  console.log(`📊 API Version: ${config.app.apiVersion}`);
  console.log(`📝 Log Level: ${config.app.logging.level}`);
} catch (error) {
  console.error('❌ Environment configuration failed:', (error as Error).message);
  process.exit(1);
}

/**
 * Get the current environment configuration
 * @returns Environment configuration object
 */
export function getConfig(): EnvironmentConfig {
  return config;
}

/**
 * Check if running in development environment
 * @returns true if in development mode
 */
export function isDevelopment(): boolean {
  return config.app.nodeEnv === 'development';
}

/**
 * Check if running in production environment
 * @returns true if in production mode
 */
export function isProduction(): boolean {
  return config.app.nodeEnv === 'production';
}

/**
 * Check if running in test environment
 * @returns true if in test mode
 */
export function isTest(): boolean {
  return config.app.nodeEnv === 'test';
}

/**
 * Get database connection string with hidden credentials for logging
 * @returns Safe database connection string for logging
 */
export function getSafeDatabaseUri(): string {
  const uri = config.database.mongoUri;
  return uri.replace(/(:\/\/)([^:]+):([^@]+)@/, '$1***:***@');
}

// Export the configuration object as default
export default config;