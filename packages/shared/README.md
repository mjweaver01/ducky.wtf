# @ducky/shared

Shared TypeScript types and utilities for the ducky tunneling system.

## Installation

```bash
npm install @ducky/shared
```

## Usage

```typescript
import {
  TunnelConfig,
  TunnelMessage,
  HttpRequest,
  HttpResponse,
  Config
} from '@ducky/shared';
```

## Types

This package provides TypeScript interfaces for:

- **TunnelConfig** - Configuration for tunnel connections
- **TunnelRegistration** - Tunnel registration payload
- **TunnelAssignment** - Assigned tunnel information
- **HttpRequest** - HTTP request format for tunneling
- **HttpResponse** - HTTP response format for tunneling
- **TunnelMessage** - WebSocket message wrapper
- **Config** - CLI configuration structure

## Part of ducky

This is a shared package used by the ducky tunneling system components:

- `@ducky/cli` - Command-line interface
- `@ducky/server` - Tunnel server
- `@ducky/web-backend` - Web API backend

Learn more at [ducky.wtf](https://ducky.wtf)

## License

MIT
