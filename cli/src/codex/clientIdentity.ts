import { resolveCodexAppServerVersion } from './codexAppServerClient';
import type { InitializeParams } from './appServerTypes';

/**
 * Codex's own name for the interactive client. The app-server derives the
 * request `originator` header and the leading User-Agent token from
 * `clientInfo.name`, so a Codex session must be reported under this name: any
 * other value identifies HAPI to Codex and to everything upstream that reads
 * those headers.
 */
const CODEX_TUI_CLIENT_NAME = 'codex-tui';

/**
 * Version reported when `codex --version` cannot be read. The name still
 * identifies the client; only the version is genuinely unknown.
 */
const UNKNOWN_CODEX_VERSION = 'unknown';

/**
 * The client identity every Codex app-server handshake must use: the same name
 * and version a plain Codex session reports.
 *
 * The version is the version of the Codex build that actually serves this HAPI
 * process, never HAPI's own version and never a placeholder. Codex uses it both
 * in the `(name; version)` User-Agent suffix and in persisted session metadata,
 * so HAPI's own release number must not appear there.
 */
export function codexAppServerClientInfo(): InitializeParams['clientInfo'] {
    return {
        name: CODEX_TUI_CLIENT_NAME,
        title: 'HAPI',
        version: resolveCodexAppServerVersion() ?? UNKNOWN_CODEX_VERSION
    };
}
