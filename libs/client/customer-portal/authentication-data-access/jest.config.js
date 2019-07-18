module.exports = {
  name: 'customer-portal-authentication-data-access',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/customer-portal/authentication-data-access',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
