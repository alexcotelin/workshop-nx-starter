module.exports = {
  name: 'client-logs-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/client/logs/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
