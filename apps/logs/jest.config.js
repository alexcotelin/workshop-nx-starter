module.exports = {
  name: 'logs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/logs',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
