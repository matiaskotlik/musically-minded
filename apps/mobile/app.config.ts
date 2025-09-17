import { ExpoConfig, ConfigContext } from 'expo/config';

function getAppNameSuffix(): string {
  switch (process.env.APP_VARIANT) {
    case 'development':
      return ' (Dev)';
    case 'preview':
      return ' (Preview)';
    default:
      return '';
  }
}

function getAppIdentifierSuffix(): string {
  switch (process.env.APP_VARIANT) {
    case 'development':
      return '.dev';
    case 'preview':
      return '.preview';
    default:
      return '';
  }
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Musically Minded' + getAppNameSuffix(),
  slug: config.slug!,
  ios: {
    ...config.ios,
    bundleIdentifier: 'io.github.musicallyminded' + getAppIdentifierSuffix(),
  },
  android: {
    ...config.android,
    package: 'io.github.musicallyminded' + getAppIdentifierSuffix(),
  },
});
