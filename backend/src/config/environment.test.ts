import { getConfig, isDevelopment, isProduction, isTest, getSafeDatabaseUri } from './environment';

describe('Environment Configuration', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeAll(() => {
    originalEnv = { ...process.env };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  beforeEach(() => {
    // Reset environment variables for each test
    jest.resetModules();
  });

  test('should have valid configuration structure', () => {
    // Set minimal required environment variables
    process.env.MONGO_URI = 'mongodb://localhost:27017/test';
    process.env.JWT_ACCESS_TOKEN_SECRET = '12345678901234567890123456789012';
    process.env.JWT_REFRESH_TOKEN_SECRET = '12345678901234567890123456789012';
    process.env.ETHEREUM_RPC_URL = 'https://mainnet.infura.io/v3/test';
    process.env.POLYGON_RPC_URL = 'https://polygon-mainnet.infura.io/v3/test';
    process.env.BSC_RPC_URL = 'https://bsc-dataseed1.binance.org/';
    process.env.BLOCKCHAIN_PRIVATE_KEY = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    process.env.WHISKEY_CASK_CONTRACT = '0x1234567890123456789012345678901234567890';
    process.env.WHISKEY_NFT_CONTRACT = '0x1234567890123456789012345678901234567890';
    process.env.MARKETPLACE_CONTRACT = '0x1234567890123456789012345678901234567890';
    process.env.EMAIL_API_KEY = 'test-api-key';
    process.env.EMAIL_SENDER_EMAIL = 'test@example.com';

    const config = getConfig();

    expect(config).toHaveProperty('app');
    expect(config).toHaveProperty('database');
    expect(config).toHaveProperty('jwt');
    expect(config).toHaveProperty('blockchain');
    expect(config).toHaveProperty('externalServices');

    expect(config.app).toHaveProperty('nodeEnv');
    expect(config.app).toHaveProperty('port');
    expect(config.app).toHaveProperty('apiVersion');
    expect(config.app).toHaveProperty('corsOrigins');

    expect(config.database).toHaveProperty('mongoUri');
    expect(config.database).toHaveProperty('dbName');

    expect(config.jwt).toHaveProperty('accessTokenSecret');
    expect(config.jwt).toHaveProperty('refreshTokenSecret');

    expect(config.blockchain).toHaveProperty('ethereumRpcUrl');
    expect(config.blockchain).toHaveProperty('contractAddresses');

    expect(config.externalServices).toHaveProperty('ipfs');
    expect(config.externalServices).toHaveProperty('emailService');
    expect(config.externalServices).toHaveProperty('imageProcessing');
  });

  test('should detect development environment', () => {
    process.env.NODE_ENV = 'development';
    expect(isDevelopment()).toBe(true);
    expect(isProduction()).toBe(false);
    expect(isTest()).toBe(false);
  });

  test('should detect production environment', () => {
    process.env.NODE_ENV = 'production';
    expect(isDevelopment()).toBe(false);
    expect(isProduction()).toBe(true);
    expect(isTest()).toBe(false);
  });

  test('should detect test environment', () => {
    process.env.NODE_ENV = 'test';
    expect(isDevelopment()).toBe(false);
    expect(isProduction()).toBe(false);
    expect(isTest()).toBe(true);
  });

  test('should return safe database URI', () => {
    process.env.MONGO_URI = 'mongodb://user:password@localhost:27017/testdb';
    const safeUri = getSafeDatabaseUri();
    expect(safeUri).toBe('mongodb://***:***@localhost:27017/testdb');
    expect(safeUri).not.toContain('user');
    expect(safeUri).not.toContain('password');
  });

  test('should validate environment variables correctly', () => {
    // Test missing required variables
    delete process.env.MONGO_URI;
    
    expect(() => {
      jest.resetModules();
      require('./environment');
    }).toThrow('Environment validation failed');
  });

  test('should apply default values for optional variables', () => {
    // Set only required variables
    process.env.MONGO_URI = 'mongodb://localhost:27017/test';
    process.env.JWT_ACCESS_TOKEN_SECRET = '12345678901234567890123456789012';
    process.env.JWT_REFRESH_TOKEN_SECRET = '12345678901234567890123456789012';
    process.env.ETHEREUM_RPC_URL = 'https://mainnet.infura.io/v3/test';
    process.env.POLYGON_RPC_URL = 'https://polygon-mainnet.infura.io/v3/test';
    process.env.BSC_RPC_URL = 'https://bsc-dataseed1.binance.org/';
    process.env.BLOCKCHAIN_PRIVATE_KEY = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    process.env.WHISKEY_CASK_CONTRACT = '0x1234567890123456789012345678901234567890';
    process.env.WHISKEY_NFT_CONTRACT = '0x1234567890123456789012345678901234567890';
    process.env.MARKETPLACE_CONTRACT = '0x1234567890123456789012345678901234567890';
    process.env.EMAIL_API_KEY = 'test-api-key';
    process.env.EMAIL_SENDER_EMAIL = 'test@example.com';

    // Remove optional variables
    delete process.env.NODE_ENV;
    delete process.env.PORT;
    delete process.env.API_VERSION;

    const config = getConfig();

    expect(config.app.nodeEnv).toBe('development');
    expect(config.app.port).toBe(3001);
    expect(config.app.apiVersion).toBe('v1');
  });
});