# Publishing the ducky CLI to npm

This guide walks you through publishing `@ducky.wtf/cli` and `@ducky.wtf/shared` to npm so users can install the CLI globally with `npm install -g @ducky.wtf/cli`.

## Prerequisites

1. **npm account**: You need an npm account. If you don't have one, create it at [npmjs.com](https://www.npmjs.com/signup)
2. **Access to `@ducky.wtf` scope**: Create the organization at [npmjs.com/org/create](https://www.npmjs.com/org/create) (free for public packages)
3. **2FA enabled**: If you have 2FA enabled (recommended), you'll need your authenticator app ready

## Architecture

The CLI depends on `@ducky.wtf/shared` for TypeScript types. Both packages need to be published:

1. **@ducky.wtf/shared** - Shared TypeScript types (publish first)
2. **@ducky.wtf/cli** - Command-line interface (publish second)

## Step 1: Login to npm

```bash
npm login
```

Follow the prompts to enter your npm username, password, and email. You may also need to provide a one-time password (OTP) if you have 2FA enabled.

Verify you're logged in:

```bash
npm whoami
```

## Step 2: Publish @ducky.wtf/shared (First)

The shared package must be published first since the CLI depends on it.

```bash
cd packages/shared

# Build the package
npm run build

# Verify what will be published
npm pack --dry-run

# Publish
npm publish
```

Verify it was published:

```bash
npm info @ducky.wtf/shared
```

## Step 3: Publish @ducky.wtf/cli (Second)

Now publish the CLI package:

```bash
cd ../cli

# Build the package
npm run build

# Verify what will be published
npm pack --dry-run

# Publish
npm publish
```

Verify it was published:

```bash
npm info @ducky.wtf/cli
```

## Step 4: Test the Published Packages

Install and test the CLI globally:

```bash
# Install globally
npm install -g @ducky.wtf/cli

# Test the CLI
ducky --help
ducky http 3000
```

## Publishing Updates

When you need to publish an update:

### 1. Update versions

```bash
# For shared package (if types changed)
cd packages/shared
npm version patch  # 1.0.0 → 1.0.1
npm run build
npm publish

# For CLI package
cd ../cli
npm version patch  # 1.0.0 → 1.0.1
# Update @ducky.wtf/shared version in package.json if needed
npm run build
npm publish
```

### 2. Version types

- `patch` - Bug fixes: 1.0.0 → 1.0.1
- `minor` - New features (backward compatible): 1.0.0 → 1.1.0
- `major` - Breaking changes: 1.0.0 → 2.0.0

## Handling 2FA

If you have 2FA enabled (recommended for security), npm will automatically prompt you for your authenticator code when you run `npm publish`. Just have your authenticator app ready.

**Note**: The OTP code expires in 30 seconds, so have your authenticator app open before running the publish command.

## Troubleshooting

### Error: "You do not have permission to publish"

- Make sure you're logged in: `npm whoami`
- Check if the package name is already taken: `npm info @ducky.wtf/cli`
- Verify you have access to the `@ducky.wtf` scope

### Error: "Cannot publish over previously published version"

- You need to bump the version number in `package.json`
- Use `npm version patch/minor/major` to update it

### Error: "Package @ducky.wtf/shared not found"

- Make sure you published `@ducky.wtf/shared` first
- Verify it's available: `npm info @ducky.wtf/shared`
- Wait a few minutes for npm registry to propagate

### The CLI doesn't work after installation

- Check that the shebang line is in `dist/index.js`: `#!/usr/bin/env node`
- Verify the `bin` field in `package.json` points to the correct file
- Make sure `dist/index.js` has execute permissions

## CI/CD Automation (Optional)

You can automate publishing with GitHub Actions. Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm install
      
      # Publish shared first
      - run: npm run build --workspace=packages/shared
      - run: npm publish --workspace=packages/shared
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      # Then publish CLI
      - run: npm run build --workspace=packages/cli
      - run: npm publish --workspace=packages/cli
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

For CI/CD, create an automation token:
1. Go to npmjs.com → Access Tokens → Generate New Token
2. Choose **Automation** token type
3. Add it to GitHub Secrets as `NPM_TOKEN`

## Summary

Your packages are now ready to publish! The key files:

### @ducky.wtf/shared
- ✅ `packages/shared/package.json` - Configured with metadata
- ✅ `packages/shared/README.md` - Documentation
- ✅ `packages/shared/.npmignore` - Excludes source files
- ✅ `packages/shared/src/types.ts` - Shared TypeScript types

### @ducky.wtf/cli
- ✅ `packages/cli/package.json` - Configured with all metadata
- ✅ `packages/cli/README.md` - User-facing documentation
- ✅ `packages/cli/.npmignore` - Excludes source files from package
- ✅ `packages/cli/src/` - Source code using @ducky.wtf/shared types

**Production URLs configured:**
- Tunnel server: `wss://ducky.wtf/_tunnel`
- API: `https://api.ducky.wtf`

**Publishing order (important!):**
1. First: `@ducky.wtf/shared` (types)
2. Second: `@ducky.wtf/cli` (depends on shared)

Once published, users can install with:

```bash
npm install -g @ducky.wtf/cli
```
