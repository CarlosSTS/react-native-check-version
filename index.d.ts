import { PlatformOSType } from "react-native";

export type CheckVersionUpdateType = "major" | "minor" | "patch";

export interface CheckVersionOptions {
  endpoint?: string;
  platform?: PlatformOSType;
  bundleId?: string;
  currentVersion?: string;
  country?: string;
}

export interface CheckVersionResponse {
  version: string | null;
  releasedAt?: string;
  updatedAt?: string;
  url: string | null;
  notes?: string;
  appIcon?: string;
  appName?: string;
  description?: string;
  needsUpdate: boolean;
  updateType?: CheckVersionUpdateType | null;
  platform?: PlatformOSType;
  bundleId?: string;
  lastChecked?: string;
  country?: string;
  notice?: string;
  error?: Error;
}

declare const checkVersion: (
  options?: CheckVersionOptions
) => Promise<CheckVersionResponse>;
