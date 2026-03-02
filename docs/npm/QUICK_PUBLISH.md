# Quick Publish Commands

Run these commands to publish both packages to npm:

## First Time Publishing

```bash
# 1. Login to npm (if not already logged in)
npm login

# 2. Publish @ducky.wtf/shared FIRST (CLI depends on it)
cd packages/shared
npm publish

# 3. Publish @ducky.wtf/cli SECOND
cd ../cli
npm publish

# 4. Verify both packages
npm info @ducky.wtf/shared
npm info @ducky.wtf/cli

# 5. Test installation (optional)
npm install -g @ducky.wtf/cli
ducky --help
```

## Why Publish Both?

- **Standard monorepo pattern**: Like `@babel/*`, `@typescript-eslint/*` packages
- **Clean architecture**: Proper separation of concerns
- **Future-proof**: Other tools can use `@ducky.wtf/shared` if needed
- **Tiny overhead**: @ducky.wtf/shared is only 2.1 KB
- **npm handles everything**: Automatic dependency resolution

## For Future Updates

```bash
# Update shared package (if types changed)
cd packages/shared
npm version patch  # or minor/major
npm publish

# Update CLI package
cd ../cli
npm version patch  # or minor/major
# Update @ducky.wtf/shared version in package.json if types changed
npm publish
```

## Version Types

- `patch` - Bug fixes: 1.0.0 → 1.0.1
- `minor` - New features: 1.0.0 → 1.1.0  
- `major` - Breaking changes: 1.0.0 → 2.0.0

## Two-Factor Authentication

If you have 2FA enabled, npm will automatically prompt you for your authenticator code during publish. Just have your authenticator app ready.

## Current Status

- ✅ Both packages configured with correct metadata
- ✅ Production URLs set (wss://ducky.wtf/_tunnel, https://api.ducky.wtf)
- ✅ READMEs created for both packages
- ✅ .npmignore configured
- ✅ Proper monorepo architecture (CLI uses @ducky.wtf/shared)
- ✅ Built and tested locally

**Publishing order is critical:**
1. **First**: `@ducky.wtf/shared` (2.1 KB)
2. **Second**: `@ducky.wtf/cli` (13.0 KB, depends on shared)

**Ready to publish!**
