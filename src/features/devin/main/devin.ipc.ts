/**
 * Devin IPC Handlers
 *
 * IPC handlers for the Cognition Devin CLI integration. Model listing is a thin
 * call to the daemon's per-provider catalog (`models.list { providerId }`,
 * PROTOCOL §6.7) — the daemon owns probing, caching, and warning labeling,
 * degrading to an empty list plus a `warning` when no model source is
 * available.
 */

import { ipcMain } from 'electron';
import { DEVIN_CHANNELS } from '../../../shared/ipc/channels';
import { getProviderModelsEnvelope } from '../../../main/utils/daemon-model-catalog';

export function setupDevinIPC() {
  // Get available models for devin — daemon-owned catalog (PROTOCOL §6.7)
  ipcMain.handle(
    DEVIN_CHANNELS.GET_MODELS,
    async (event, params?: { forceRefresh?: boolean; workspaceId?: string }) =>
      getProviderModelsEnvelope('devin', params, event),
  );
}
