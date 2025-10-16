/**
 * WebSocket Configuration for Smart Chat
 *
 * Update these values with your actual backend host and port
 */

export const WEBSOCKET_CONFIG = {
  // Replace with your backend host (without protocol)
  // Examples: 'localhost', 'api.example.com', '192.168.1.100'
  HOST: 'indulge-ai-g2xdt.ondigitalocean.app',

  // Replace with your backend WebSocket port
  // Example: 8080, 3000, 443
  PORT: 443,

  // Username for the connection (as per protocol requirement)
  USER_NAME: 'Rajesh Nigam',

  // Connection settings
  MAX_RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY: 3000, // milliseconds

  // Rate limiting
  RATE_LIMIT_WINDOW: 2000, // milliseconds
  MAX_MESSAGES_PER_WINDOW: 5,

  // Heartbeat
  HEARTBEAT_INTERVAL: 20000, // milliseconds
  PONG_TIMEOUT: 10000, // milliseconds
};

/**
 * Example configurations for different environments:
 *
 * Local Development:
 * HOST: 'localhost'
 * PORT: 8080
 *
 * Staging:
 * HOST: 'staging-api.indulge-ai.com'
 * PORT: 443
 *
 * Production:
 * HOST: 'api.indulge-ai.com'
 * PORT: 443
 */
