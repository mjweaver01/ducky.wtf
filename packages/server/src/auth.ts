import * as crypto from 'crypto';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

export class AuthService {
  private validTokens: Set<string>;
  private secretsClient?: SecretsManagerClient;
  private secretName?: string;

  constructor() {
    this.validTokens = new Set();
    
    // Check if using AWS Secrets Manager
    if (process.env.AWS_SECRET_NAME) {
      this.secretName = process.env.AWS_SECRET_NAME;
      this.secretsClient = new SecretsManagerClient({ 
        region: process.env.AWS_REGION || 'us-east-1' 
      });
      this.loadTokensFromSecretsManager();

      // Refresh tokens every 5 minutes
      setInterval(() => this.loadTokensFromSecretsManager(), 5 * 60 * 1000);
    } else {
      // Fallback to environment variable
      const tokensEnv = process.env.VALID_TOKENS || '';
      this.validTokens = new Set(tokensEnv.split(',').filter(t => t.trim()));
      
      if (this.validTokens.size === 0) {
        const defaultToken = this.generateToken();
        this.validTokens.add(defaultToken);
        console.log('⚠️  No VALID_TOKENS configured. Generated default token:', defaultToken);
        console.log('   Set VALID_TOKENS environment variable or AWS_SECRET_NAME for production use.');
      }
    }
  }

  private async loadTokensFromSecretsManager(): Promise<void> {
    if (!this.secretsClient || !this.secretName) return;

    try {
      const command = new GetSecretValueCommand({
        SecretId: this.secretName,
      });

      const response = await this.secretsClient.send(command);
      
      if (response.SecretString) {
        const secret = JSON.parse(response.SecretString);
        
        // Support multiple formats:
        // 1. { "tokens": ["token1", "token2"] }
        // 2. { "validTokens": "token1,token2" }
        
        let tokens: string[] = [];
        
        if (Array.isArray(secret.tokens)) {
          tokens = secret.tokens;
        } else if (secret.validTokens && typeof secret.validTokens === 'string') {
          tokens = secret.validTokens.split(',').filter((t: string) => t.trim());
        }

        this.validTokens = new Set(tokens);
        console.log(`✅ Loaded ${tokens.length} tokens from AWS Secrets Manager`);
      }
    } catch (error) {
      console.error('Error loading tokens from Secrets Manager:', error);
      // Keep existing tokens if refresh fails
    }
  }

  generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  validateToken(token: string): boolean {
    return this.validTokens.has(token);
  }

  addToken(token: string): void {
    this.validTokens.add(token);
  }

  getValidTokens(): string[] {
    return Array.from(this.validTokens);
  }
}
