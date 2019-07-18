module.exports = {
  name: 'client-customer-portal-tickets-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/client/customer-portal/tickets-data-access',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
