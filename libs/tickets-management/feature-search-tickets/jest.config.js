module.exports = {
  name: 'tickets-management-feature-search-tickets',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/tickets-management/feature-search-tickets',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
