module.exports = {
  name: 'tickets-management-domain',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/tickets-management/domain',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
